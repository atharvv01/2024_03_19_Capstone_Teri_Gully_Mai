import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router){}

  onLogIn(){
    this.router.navigate(['/login']);
  }

  onSignup(){
    this.router.navigate(['/signup']);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
