import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
   // Boolean flag to track whether the email input is focused
   emailInputFocused: boolean = false;
  
   // String variable to store the user's email
   email: string = '';
   constructor(private http: HttpClient) {}

   //when button it clicked 
  forgetPassword(): void {

    this.http.post('http://localhost:3000/users/forget_password', { email: this.email })
    .subscribe(
      (response) => {
        // Handle the response from the backend
        console.log('Response:', response);
        Swal.fire("Link to rest passoword sent to you mail id");
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      }
    );
  }
}
