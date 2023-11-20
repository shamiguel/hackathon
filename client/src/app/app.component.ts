import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, NavbarComponent],
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
          console.log(this.message)
      }); 
  } 


  scrollInnerElement(id:string, parentId:string){
    //get parent element, scroll to that, then scroll to the element
    let elem:any = document.getElementById(id)
    elem.
    scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start"
    })
  }
}
