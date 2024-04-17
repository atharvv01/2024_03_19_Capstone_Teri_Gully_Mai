import { Component,Output,EventEmitter, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class DropdownComponent implements OnInit { 
  userDetails: any;
  
  @Output() loginStateChange = new EventEmitter<boolean>();

  constructor(private http: HttpClient,private router: Router,private authService: AuthService, private jwtHelper: JwtHelperService) { }
  /** Flag indicating whether the dropdown is active or not. */
  dropdownActive = false;

  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  ngOnInit(): void {
    // Retrieve JWT token from local storage
    const authToken = localStorage.getItem('authToken');
  
    if (authToken) {
      // Decode author ID from JWT token
      const decodedToken = this.decodeToken(authToken);
      const authorId = decodedToken ? decodedToken.userId : '';
      this.getUserDetails(authorId);
  }
  else {
    console.log("JWT token not found in local storage");
  }
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



  /**
   * Function to toggle the dropdown menu's visibility.
   */
  toggleDropdown(): void {
    console.log("button clicked");
    
    this.dropdownActive = !this.dropdownActive;
  }

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);
  }

  logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ad77f3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      iconColor: "#ad77f3"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logOut();
        this.loginStateChange.emit(false);
        
        Swal.fire({
          title: "Logged Out",
          text: "Please Signin.",
          icon: "success",
          iconColor: "#ad77f3"
        });
        this.router.navigate(['/']);
      }
    });

  }

}
