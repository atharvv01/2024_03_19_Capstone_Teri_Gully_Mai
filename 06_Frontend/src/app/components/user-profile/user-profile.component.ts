import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService for decoding JWT tokens
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: any;
  blogsByAuthor: any[] = []; // Initialize blogsByAuthor with an empty array
  blogDetails: any[] = []; // Initialize blogDetails with an empty array to store third API responses

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService,private router: Router) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    // Retrieve JWT token from local storage
    const authToken = localStorage.getItem('authToken');
  
    if (authToken) {
      // Decode author ID from JWT token
      const decodedToken = this.decodeToken(authToken);
      const authorId = decodedToken ? decodedToken.userId : '';
  
      // Clear the arrays before fetching new data
      this.blogsByAuthor = [];
      this.blogDetails = [];
  
      // Call the APIs to get user details and blogs by author
      this.getUserDetails(authorId);
      this.getSavedBlogsByAuthor(authorId, authToken);
      
    } else {
      console.log("JWT token not found in local storage");
    }
  }
  
  // Method to decode JWT token
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  getUserDetails(authorId: string): void {
    // Make HTTP GET request to the first API without JWT token in header
    this.http.get<any>(`http://localhost:3000/users/getUserDetails?authorId=${authorId}`)
      .subscribe(
        (response: any) => {
          // Store user details
          this.userDetails = response;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
  }
  
  getSavedBlogsByAuthor(authorId: string, authToken: string): void {
    // Prepare the headers with the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  
    // Make HTTP GET request to the new API with JWT token in header
    this.http.get<any[]>('http://localhost:3000/saves/saved_blogs_by_user', { headers })
      .subscribe(
        (response: any[]) => {
          // Since we already cleared the arrays, we can directly assign
          this.blogsByAuthor = response;
          console.log(this.blogsByAuthor);
  
          // No need to clear blogDetails here since it's already cleared in refreshData
          // Iterate over the array of blogs and fetch details for each blog
          this.blogsByAuthor.forEach((blog: any) => {
            this.getBlogById(blog.blog, authToken);
          });
        },
        (error) => {
          console.error('Error fetching blogs by author:', error);
        }
      );
  }

  getBlogById(blogId: string, authToken: string): void {
    // Prepare the headers with the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    console.log(blogId);
    
    // Make HTTP GET request to the third API with blogId as query parameter
    this.http.get<any>(`http://localhost:3000/blogs/get_blog_by_id?blogId=${blogId}`, { headers })
      .subscribe(
        (response: any) => {
          // Store the response in the blogDetails array
          this.blogDetails.push(response);
          console.log("getting blog details response", JSON.stringify(this.blogDetails));

          
        },
        (error) => {
          console.error('Error fetching blog by ID:', error);
        }
      );
  }

  onBlogClicked(blog: any): void {
    this.router.navigate(['/blog', blog._id]);
    // console.log("Clicked blog ID:", blog._id); 
  }
  
  
}
