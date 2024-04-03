import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrl: './admin-approval.component.css'
})
export class AdminApprovalComponent implements OnInit{
  blogs: any[] = []; // Initialize with your data
  // flaggedBlogs: any[] = []; // Initialize with your data

  // scrollBlogs(direction: string) {
  //   const container = document.querySelector('.blogs-wrapper');
  //   if (container) {
  //     if (direction === 'left') {
  //       container.scrollLeft -= 100; // Adjust as needed
  //     } else {
  //       container.scrollLeft += 100; // Adjust as needed
  //     }
  //   }
  // }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchPendingBlogs();
  }

  fetchPendingBlogs() {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Setting authorization header
      
      // Fetch issue history from API
      this.http.get<any[]>('http://localhost:3000/admin/pendingblogs', { headers: headers })
        .subscribe(
          (response) => {
            // Process the API response to extract only the required data
          this.blogs = response.map(blog => ({
          title: blog.title,
          likes: blog.likes,
          views: blog.views
        }));
        console.log(this.blogs);
          },
          (error) => {
            console.error('Error fetching data:', error); // Log error if fetching data fails
          }
        );
    } else {
      console.error('No token provided'); // Log error if no token is found in local storage
    }
  }

}
