import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = "http://localhost:3000/users"; // Replace with your actual API base URL
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.token = this.getToken();
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    // this.snackBar.open("An error occurred. Please try again.", "", { duration: 3000 });
    return Promise.reject(error);
  }

  private getHeaders(): { [header: string]: string } {
    return this.token ? { Authorization: this.token } : {};
  }

  private getToken(): string | null {
    return localStorage.getItem("authToken");
  }
  getUserDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${this.baseUrl}/mydetails`, {
          headers: this.getHeaders() 
        })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }
}
