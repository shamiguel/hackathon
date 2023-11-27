import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectService } from './project.service';
import { IProject } from '../../shared/models/project';
import { ProjectCardComponent } from './project-card/project-card.component';
@Component({
  selector: 'app-projects',
  standalone: true,
  providers: [EventEmitter],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass'
})
export class ProjectsComponent implements OnInit{
  @Input() projects: IProject[] = [];
  @Input() isLoggedIn: boolean = false;
  isAdding: boolean; 
  techValues: string[];
  selectedProject: IProject = this.projects[0];

  constructor(private projectService: ProjectService, private http: HttpClient, @Inject(EventEmitter) private eventEmitter: EventEmitter<IProject>){
    this.isAdding = false;
    this.techValues = [];
  }

  toggleSelectedProject(project:IProject){
    this.selectedProject = project;
  }

  addUpdatedItem(updatedProject:IProject){
    console.log(updatedProject)
    
      console.log("updating in progresss...")
      const projectIndex = this.projects.findIndex((project) => project.id === updatedProject.id);
      this.projects[projectIndex] = updatedProject
  
  }

  removeDeletedItem(id:any){
    console.log(this.projects, id)
    const remove = id
    const removeId = parseInt(remove.id)
    this.projects = this.projects.filter((p) => p.id !== removeId)
    console.log("Successfully removed project", this.projects)

  }

  ngOnInit(): void {
   this.getProjects();
  }

  getProjects(): void{
    this.projectService.getAll()
    .subscribe((projects:any) => {
      for(const item of projects){
        const data = item.dataValues 
        const project = new IProject(data.id, data.title, data.description, data.tech, data.github)
        this.projects.push(project)
        //can only initialize like this for some reason?
        this.selectedProject = project
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
  removeTech(tech:String){
    this.techValues = this.techValues.filter((item) => item !== tech)
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


    this.projectService.create(this.projectForm.value)
    .subscribe((response:any) => {
      console.log('Post request successful:', response);
      const newProject = new IProject(response.project.id, response.project.title, response.project.description, response.project.tech, response.project.github)
      console.log(newProject)
      this.projects.push(newProject)
      this.projectForm.reset();
      this.isAdding = false;
      this.techValues = [];
    }, error=>{
      console.error("Post request error:", error)
    })
  }

  updateProject(project:any){
    console.log("update:", event)
    this.projectService.update(project)
    .subscribe((response:any)=>{
      console.log('Project updated successfully:', response);
      project.projectTitle = response.project.title;
      project.projectDescription = response.project.description;
      project.projectTech = response.project.tech;
      project.projectUrl = response.project.github;
      console.log("Updated exisiting Item: ", project)
    })
  }
}
