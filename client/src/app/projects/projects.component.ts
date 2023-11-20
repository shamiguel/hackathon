import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass'
})
export class ProjectsComponent {

  constructor(private http: HttpClient){
    this.isEditing = false;
    this.techValues = [];
  }

  isEditing: boolean; 
  techValues: string[];

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
    projectUrl: new FormControl(''),

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
      
    }, error=>{
      console.error("Post request error:", error)
    })
  }
}
