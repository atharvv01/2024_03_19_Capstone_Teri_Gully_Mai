import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router){}
  navigateToHome(){
    this.router.navigate(['/']);
  }
  navigateToCityGuides(){
    this.router.navigate(['/city_guides']);
  }
  navigateToSaves(){
    this.router.navigate(['/saved_blogs']);
  }
  navigateToMyBlogs(){
    this.router.navigate(['/my_blog']);
  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
  navigateToSignup(){
    this.router.navigate(['/signup']);
  }
}
