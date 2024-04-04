// Import necessary Angular modules and components
import { CommonModule } from '@angular/common'; // Common module for Angular functionality
import { HttpClient, HttpClientModule } from '@angular/common/http'; // HTTP client module for making API requests
import { Component } from '@angular/core'; // Component decorator for defining Angular components
import { FormsModule } from '@angular/forms'; // FormsModule for handling forms in Angular
import { Router } from '@angular/router'; // Router module for navigation
import { Output, EventEmitter } from '@angular/core'; // Output and EventEmitter for emitting events
import { NgModel } from '@angular/forms';
import { AuthService } from '../../auth.service';

// Define an interface that represents the structure of your API response
interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    username: string;
    full_name?: string; // Assuming full_name is optional
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
    // Assuming your login button has a unique ID or class you can select
    const loginButton = document.querySelector('.text-button1');
    if (loginButton) {
      loginButton.classList.add('login-button-clicked');
      // Remove the class after the animation duration (500ms in this example)
      setTimeout(() => {
        loginButton.classList.remove('login-button-clicked');
      }, 500);
    }

    // Making HTTP POST request to login endpoint
    this.http.post<LoginResponse>('http://localhost:3000/users/login', {
      username: this.username,
      password: this.password
    })
      .subscribe({
        next: (response) => { // Success callback
          console.log('Response:', response);
          localStorage.setItem('authToken', response.token); // Store auth token in local storage
          console.log(localStorage.getItem('authToken'));
          this.authService.logIn()
          this.loginStateChange.emit(true); // Emit true on success
          this.router.navigate(['/']); // Navigate to home page
        },
        error: (error) => { // Error callback
          console.error('Error:', error);
          this.loginStateChange.emit(false); // Emit false on error
        }
      });
  }
}