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
  flaggedBlogs: any[] = []; // Initialize with your data

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchPendingBlogs();
    this.fetchFlaggedBlogs();
  }

  scrollBlogs(direction: string) {
    const container = document.querySelector('.blogs-wrapper');
    if (container) {
      if (direction === 'left') {
        container.scrollLeft -= 100;
      } else {
        container.scrollLeft += 100;
      }
    }
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
          views: blog.views,
          _id: blog._id
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

  approveBlog(blogId: string): void {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Setting authorization header

      // Prepare the request body
    const body = { type: 'approved' };

      // Call the API endpoint to approve the blog
      this.http.put(`http://localhost:3000/admin/approve/${blogId}`, body, { headers: headers })
        .subscribe(
          (response) => {
            console.log('Blog approved successfully:', response);
            // Refresh the list of pending blogs after approval
            this.fetchPendingBlogs();
          },
          (error) => {
            console.error('Error approving blog:', error);
          }
        );
    } else {
      console.error('No token provided');
    }
  }

  deleteBlog(blogId: string): void {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Setting authorization header

      // Prepare the request body
    const body = { type: 'rejected' };

      // Call the API endpoint to approve the blog
      this.http.put(`http://localhost:3000/admin/reject/${blogId}`, body, { headers: headers })
        .subscribe(
          (response) => {
            console.log('Blog rejected successfully:', response);
            // Refresh the list of pending blogs after approval
            this.fetchPendingBlogs();
          },
          (error) => {
            console.error('Error rejecting blog:', error);
          }
        );
    } else {
      console.error('No token provided');
    }
  }

  fetchFlaggedBlogs(){
    const token = localStorage.getItem('authToken');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Setting authorization header
      
      // Fetch issue history from API
      this.http.get<any[]>('http://localhost:3000/admin/flagged-blogs', { headers: headers })
        .subscribe(
          (response) => {
            // Process the API response to extract only the required data
          this.flaggedBlogs = response.map(blog => ({
          title: blog.title,
          likes: blog.likes,
          views: blog.views,
          _id: blog._id
        }));
        console.log("Flagged blogs are" , this.flaggedBlogs);
          },
          (error) => {
            console.error('Error fetching data:', error); // Log error if fetching data fails
          }
        );
    } else {
      console.error('No token provided'); // Log error if no token is found in local storage
    }

  }

  ignoreFlaggedBlog(blogId: string) {
    const token = localStorage.getItem('authToken');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Make a PUT request to reset flags for the flagged blog
      this.http.put(`http://localhost:3000/admin/reset-flags/${blogId}`, {}, { headers })
        .subscribe(
          (response) => {
            // Blog flags reset successfully, you might want to update UI or take further action
            console.log('Flags reset for blog:', response);
            // Optionally, you can update the UI to remove the ignored blog from the flaggedBlogs array
            this.flaggedBlogs = this.flaggedBlogs.filter(blog => blog._id !== blogId);
          },
          (error) => {
            console.error('Error ignoring flagged blog:', error);
            // Handle error here, show a toast, or provide user feedback
          }
        );
    } else {
      console.error('No token provided');
      // Handle case where no token is found in local storage
    }
  }

  deleteFlaggedBlog(blogId: string) {
    const token = localStorage.getItem('authToken');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Make a DELETE request to delete the flagged blog
      this.http.delete(`http://localhost:3000/admin/delete-blogs/${blogId}` ,{ headers })
        .subscribe(
          (response) => {
            // Blog deleted successfully, you might want to update UI or take further action
            console.log('Flagged blog deleted:', response);
            // Optionally, you can update the UI to remove the deleted blog from the flaggedBlogs array
            this.flaggedBlogs = this.flaggedBlogs.filter(blog => blog._id !== blogId);
          },
          (error) => {
            console.error('Error deleting flagged blog:', error);
            // Handle error here, show a toast, or provide user feedback
          }
        );
    } else {
      console.error('No token provided');
      // Handle case where no token is found in local storage
    }
  }

}
