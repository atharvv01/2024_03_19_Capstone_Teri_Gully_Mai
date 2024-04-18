import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports:[FormsModule,CommonModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router,private http: HttpClient) { }
  // navigateToLogin(){
  //   this.router.navigate(['/login']);
  // }

  // Initializing variables and form controls for user inputs
  username: string = '';
  usernameInputFocused: boolean = false;
  fullName: string = '';
  fullNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);
  emailInputFocused: boolean = false;
  passwordInputFocused: boolean = false;
  email: string = '';
  password: string = '';

  goToLogin(){
    this.router.navigate(['/login'])
  }

  onSignupClick() {
    // Making HTTP POST request to signup endpoint
    this.http.post('http://localhost:3000/users/signup', {
      username: this.username,
      email: this.email,
      password: this.password
    })
    .subscribe({
      next: (response) => { // Success callback
        console.log('Response:', response);
        this.router.navigate(['/login']); // Navigate to login page
        Swal.fire({
          title: 'Signup Successful',
          text: 'Welcome to Teri Gully Mai',
          icon: 'success'
        });
      },
      error: (error) => { // Error callback
        console.error('Error:', error);
        if (error.error.message === "An account already exists with the provided email.") {
          Swal.fire({
            title: 'Error!',
            text: 'An account already exists with the provided email.',
            icon: 'error'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error'
          });
        }
      }
    });
  }
}
