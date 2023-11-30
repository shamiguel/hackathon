import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProject } from '../../../shared/models/project';
import { FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ProjectService } from '../project.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.sass'
})
export class ProjectCardComponent implements OnChanges{
  @Input() isLoggedIn:boolean = false;
  @Input() project! : IProject
  @Input() updateProject!: (project:any) => void;
  @Input() addTech!:() => void;
  @Input() removeTech!:(tech:string) => void;
  @Input() projects! : any[];
  @Output() change: EventEmitter<IProject> =  new EventEmitter<IProject>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>
  isEditing = false;
  techValues:any;
  projectEditForm: FormGroup;

  ngOnChanges(): void {
    this.techValues = this.project.projectTech
    this.projectEditForm = this.fb.group({
      id: new FormControl(),
      projectTitle: new FormControl('', Validators.required),
      projectDescription: new FormControl('', Validators.required),
      projectTech: new FormControl([], Validators.required),
      projectUrl: new FormControl('', Validators.required),
      
    });
    this.setProjectEditForm()
    console.log(this.projectEditForm.value)
    
  }
  constructor(private fb: FormBuilder, private projectService: ProjectService){ 
    this.projectEditForm = this.fb.group({})
  }

  submitEdit(){
    console.log(this.projects)
    this.projectEditForm.value.projectTech = this.techValues
    console.log(this.projectEditForm.value)
    this.projectService.update(this.projectEditForm)
    .subscribe((data:any) => {
      const response = data.updated
      const updatedProject = new IProject(response.id, response.title, response.description, response.tech, response.github)
      console.log(updatedProject)
      this.change.emit(updatedProject)
      this.project = updatedProject
    })
    this.projectEditForm.reset()
    this.isEditing = false; 
    this.setProjectEditForm();
  }

  setProjectEditForm(){
    this.projectEditForm.controls["id"].setValue(this.project.id)
    this.projectEditForm.controls["projectTitle"].setValue(this.project.projectTitle)
    this.projectEditForm.controls["projectDescription"].setValue(this.project.projectDescription)
    this.projectEditForm.controls["projectTech"].setValue(this.project.projectTech)
    this.projectEditForm.controls["projectUrl"].setValue(this.project.projectUrl)
  }

  handleDelete(){
    let response = prompt("Please enter the title of the project to confirm delete")
    if(response == this.project.projectTitle){
      this.submitDelete()
    }
  }

  submitDelete(){
    this.projectService.destroy(this.project.id)
    .subscribe((data:any)=>{
      console.log(data)
      this.isEditing = false; 
      console.log("emitting...")
      this.delete.emit(data)
    })
  }

}
