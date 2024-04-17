// Import necessary Angular modules and components
import { CommonModule } from '@angular/common'; // Common module for Angular functionality
import { HttpClient, HttpClientModule } from '@angular/common/http'; // HTTP client module for making API requests
import { Component } from '@angular/core'; // Component decorator for defining Angular components
import { FormsModule } from '@angular/forms'; // FormsModule for handling forms in Angular
import { Router } from '@angular/router'; // Router module for navigation
import { Output, EventEmitter } from '@angular/core'; // Output and EventEmitter for emitting events
import { NgModel } from '@angular/forms';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';


interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    username: string;
    full_name?: string; 
  };
}

// LoginComponent class definition
@Component({
  selector: 'app-login', // Selector for the component
  templateUrl: './login.component.html', // Template URL for the component
  styleUrl: './login.component.css' // CSS file URL for the component
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { } // Constructor with Router and HttpClient injection

  // Initialize username and password variables
  username: string = '';
  password: string = '';

  // Track if username and password inputs are focused
  usernameInputFocused: boolean = false;
  passwordInputFocused: boolean = false;

  // Define an EventEmitter for emitting login state changes
  @Output() loginStateChange = new EventEmitter<boolean>();

  // Method to navigate to forgot password page
  navigateToForgotPassword() {
    this.router.navigate(['/forgot_password']);
  }

  // Method to navigate to signup page
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  // Method to handle login button click
  onloginClick() {
    // Making HTTP POST request to login endpoint
    this.http.post<LoginResponse>('http://localhost:3000/users/login', {
      username: this.username,
      password: this.password
    })
      .subscribe({
        next: (response) => { // Success callback

          console.log('Response:', response);
          localStorage.setItem('authToken', response.token);
          this.loginStateChange.emit(true); // Emit true on success
          Swal.fire({
            title: 'Login Successful',
            text: 'Welcome to the Teri Gully Mai',
            icon: 'success',
          })
          this.authService.logIn();
          this.router.navigate(['/']); // Navigate to home page
        },
        error: (error) => { // Error callback
          // Extract the "message" property from the error object
          const errorMessage = error.error ? error.error.message : 'An error occurred';
        
          // Display the error message using Swal
          Swal.fire({
            title: 'Login unsuccessful',
            text: errorMessage,
            icon: 'error',
          });
        
          // Log the full error object to the console for debugging
          console.error('Error:', error);
        
          // Emit false to indicate that the login attempt was unsuccessful
          this.loginStateChange.emit(false);
        }
      });
  }
}