import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  onSignupClick(){
    // Assuming your login button has a unique ID or class you can select
    const signupButton = document.querySelector('.text-button');
    if (signupButton) {
      signupButton.classList.add('signup-button-clicked');
      // Remove the class after the animation duration (500ms in this example)
      setTimeout(() => {
        signupButton.classList.remove('signup-button-clicked');
      }, 500);
    }

    // Making HTTP POST request to login endpoint
    this.http.post('http://localhost:3000/users/signup', {
      username: this.username,
      email:this.email,
      password: this.password
    })
      .subscribe({
        next: (response) => { // Success callback
          console.log('Response:', response);
          this.router.navigate(['/login']); // Navigate to home page
        },
        error: (error) => { // Error callback
          console.error('Error:', error);
        }
      });
  }
}
