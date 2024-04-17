import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) {
    // Extract the token from the URL query parameters
    this.token = this.route.snapshot.queryParamMap.get('token'); 
  }

  passwordInputFocused: boolean = false;
  password: string = '';
  token: string | null = ''; // Variable to store the token
  resetPassword()
  {
    // Ensure the token is present
    if (!this.token) {
      console.error('Token is missing');
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `http://localhost:3000/users/reset_password?token=${this.token}`;

    this.http.post(url, { password: this.password })
      .subscribe(
        (response) => {
          // Handle the response from the backend
          console.log('Response:', response);
          this.router.navigate(['/login']); // Navigate to login page
        },
        (error) => {
          // Handle any errors that occur during the request
          console.error('Error:', error);
        }
      );
        Swal.fire({
          title: "DONE!",
          text: "Your password has been resetted.",
          icon: "success"
        });
      }
    });
  }
}
