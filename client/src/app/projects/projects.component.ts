import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass'
})
export class ProjectsComponent {

  constructor(){
    this.isEditing = false;
  }

  isEditing: boolean; 

  toggleEditing(){
    console.log(`toggling isEditing to ${this.isEditing}`)
    this.isEditing = !this.isEditing
  }
}
