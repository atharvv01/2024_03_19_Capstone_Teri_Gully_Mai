import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router) { }

  navigateToCreateBlog() {
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/write_blog']);
    }
    else {
      // alert("Please Login to Continue");
      this.router.navigate(['/login']);
    }
  }
}
