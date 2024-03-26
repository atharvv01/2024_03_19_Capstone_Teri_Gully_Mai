import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  }
}
