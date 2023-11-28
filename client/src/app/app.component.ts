import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TitleComponent } from './title/title.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HttpClientModule, 
    NavbarComponent, 
    TitleComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit { 
  title = 'frontEnd'; 
  message: any; 
  @Input() isLoggedIn: boolean = false;
  constructor(
    private apiService: ApiService,
    private scroller: ViewportScroller,
    private router: Router,
    private authService: AuthService
    ) { }; 

  ngOnInit() { 
    console.log(process.env['NODE_ENV']);
      this.router.navigate(["/"])
      this.apiService.getMessage().subscribe(data => { 
          this.message = data; 
          console.log(this.message)
      }); 
      console.log("Logged in: ", this.authService.isLoggedIn())
      this.isLoggedIn = this.authService.isLoggedIn()
      console.log(this.isLoggedIn)
  } 

  onLoginStatusChange(newState: boolean){
    this.isLoggedIn = newState;
    console.log("App: Login Status changed to: ", newState)
    if(!this.isLoggedIn){
      this.authService.logout();
    }
  }
}
