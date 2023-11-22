import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProject } from '../../../shared/models/project';
import { FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.sass'
})
export class ProjectCardComponent implements OnInit{
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

  ngOnInit(): void {
    this.techValues = [this.project.projectTech]
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
      this.delete.emit(this.project.id)
    })
  }

}
