import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false; 
  

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToCityGuides() {
    this.router.navigate(['/city_guides']);
  }

  navigateToSaves() {
    this.router.navigate(['/saved_blogs']);
  }

  navigateToMyBlogs() {
    this.router.navigate(['/my_blog']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  } 

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']); 
  } 

}
