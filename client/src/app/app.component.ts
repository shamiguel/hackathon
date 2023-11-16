import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit { 
  title = 'frontEnd'; 
  message: any; 
  constructor(private apiService: ApiService) { }; 
  ngOnInit() { 
      this.apiService.getMessage().subscribe(data => { 
          this.message = data; 
      }); 
  } 
}
