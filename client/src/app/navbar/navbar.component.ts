import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  scrolltoElement(id:string){
    let elem:any = document.getElementById(id)
    elem.
    scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    })
  }
}
