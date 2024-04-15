import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService for decoding JWT tokens

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: any;
  blogsByAuthor: any[] = []; // Initialize blogsByAuthor with an empty array

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    // Retrieve JWT token from local storage
    const authToken = localStorage.getItem('authToken');
  
    if (authToken) {
      // Decode author ID from JWT token
      const decodedToken = this.decodeToken(authToken);
      const authorId = decodedToken ? decodedToken.userId : '';
  
      // Call the first API to get user details
      this.getUserDetails(authorId);
  
      // Call the second API to get blogs by author
      this.getBlogsByAuthor(authorId, authToken); // Pass authToken to the getBlogsByAuthor method
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

  getBlogsByAuthor(authorId: string, authToken: string): void {
    // Prepare the headers with the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    // Make HTTP GET request to the second API with JWT token in header
    this.http.get<any>(`http://localhost:3000/blogs/get_blog_by_author_id?authorId=${authorId}`, { headers })
      .subscribe(
        (response: any) => {
          // Store blogs by author
          this.blogsByAuthor = response;
          console.log(this.blogsByAuthor);
          
        },
        (error) => {
          console.error('Error fetching blogs by author:', error);
        }
      );
  }
}
