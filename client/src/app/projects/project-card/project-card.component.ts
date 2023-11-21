import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProject } from '../../../shared/models/project';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.sass'
})
export class ProjectCardComponent implements OnInit{
  @Input() project! : IProject
  ngOnInit(): void {
    
  }
}
