import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectService } from './project.service';
import { IProject } from '../../shared/models/project';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass'
})
export class ProjectsComponent implements OnInit{
  //@Input() projects : Project[] = [];
  //@Output() addProject = new EventEmitter<Project>();
  projects: IProject[] = [];
  isEditing: boolean; 
  techValues: string[];

  constructor(private projectService: ProjectService, private http: HttpClient){
    this.isEditing = false;
    this.techValues = [];
  }

  ngOnInit(): void {
   this.getProjects();
  }

  getProjects(): void{
    this.projectService.getAll()
    .subscribe((projects:any) => {
      for(const item of projects){
        console.log(item)
        const data = item.dataValues 
        const project = new IProject(data.title, data.description, data.tech, data.github)
        this.projects.push(project)
      }
    })
  }

  toggleEditing(){
    console.log(`toggling isEditing to ${this.isEditing}`)
    this.isEditing = !this.isEditing
  }

  addTech(){
    const input:any = document.getElementById("addTechInput")
    const techDiv = document.getElementById("techChoices")
    this.techValues.push(input.value)
    input.value = "";
  }

  projectForm = new FormGroup({
    projectTitle: new FormControl('', Validators.required),
    projectDescription: new FormControl('', Validators.required),
    projectTech: new FormControl([''], Validators.required),
    projectUrl: new FormControl('', Validators.required),

  })

  submitProject(){
    console.log("submitting:", this.projectForm)
    //this could be better
    this.projectForm.value.projectTech = this.techValues

    console.log("final:", this.projectForm.value)
    const url = "http://localhost:8080/api/auth/projects"

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    this.http.post(url, this.projectForm.value, httpOptions)
    .subscribe(response => {
      console.log('Post request successful:', response);
      //this.addProject.emit(new Project(projectTitle: response.title, ))
      
    }, error=>{
      console.error("Post request error:", error)
    })
  }
}
