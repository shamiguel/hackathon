import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectService } from './project.service';
import { IProject } from '../../shared/models/project';
import { ProjectCardComponent } from './project-card/project-card.component';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass'
})
export class ProjectsComponent implements OnInit{
  //@Input() projects : Project[] = [];
  //@Output() addProject = new EventEmitter<Project>();
  @Input() projects: IProject[] = [];
  isAdding: boolean; 
  techValues: string[];

  constructor(private projectService: ProjectService, private http: HttpClient){
    this.isAdding = false;
    this.techValues = [];
  }

  ngOnInit(): void {
   this.getProjects();
  }

  getProjects(): void{
    this.projectService.getAll()
    .subscribe((projects:any) => {
      for(const item of projects){
        const data = item.dataValues 
        const project = new IProject(data.title, data.description, data.tech, data.github)
        this.projects.push(project)
      }
    })
  }

  toggleAdding(){
    console.log(`toggling isAdding to ${this.isAdding}`)
    this.isAdding = !this.isAdding
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
    .subscribe((response:any) => {
      console.log('Post request successful:', response);
      const newProject = new IProject(response.project.title, response.project.description, response.project.tech, response.project.github)
      console.log(newProject)
      this.projects.push(newProject)
      this.projectForm.reset();
      this.isAdding = false;
    }, error=>{
      console.error("Post request error:", error)
    })
  }
}
