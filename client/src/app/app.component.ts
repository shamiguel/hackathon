import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit { 
  title = 'frontEnd'; 
  message: any; 
  constructor(
    private apiService: ApiService,
    private scroller: ViewportScroller,
    private router: Router
    ) { }; 

  ngOnInit() { 
      this.router.navigate(["/"])
      this.apiService.getMessage().subscribe(data => { 
          this.message = data; 
      }); 
  } 

  scrollToTitle(){
    let title:any = document.getElementById("title")
    title.
    scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    })
  }
  scrollToAbout(){
    let title:any = document.getElementById("about")
    title.
    scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    })
  }
  scrollToProjects(){
    let title:any = document.getElementById("project")
    title.
    scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    })
  }
  scrollToContact(){
    let title:any = document.getElementById("contact")
    title.
    scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    })
  }
}
