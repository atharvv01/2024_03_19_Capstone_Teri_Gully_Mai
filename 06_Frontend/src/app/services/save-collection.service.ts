import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SaveCollectionService {
  private url = "http://localhost:3000/saves";
  private token: string | null = null;

  constructor(
    private http: HttpClient,
    // private snackBar: MatSnackBar
  ) {
    this.token = this.getToken();
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    // this.snackBar.open('An error occurred. Please try again.', '', { duration: 3000 });
    return Promise.reject(error);
  }

  private getHeaders(): { [header: string]: string } {
    return this.token ? { 'Authorization': this.token } : {};
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  saveBlog(blogId: string): Promise<any> {
    console.log(blogId)
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${this.url}/save_blog?blogId=${blogId}`, {}, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            // this.snackBar.open('Blog saved successfully', '', { duration: 3000 });
            console.log(res)
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  unsaveBlog(blogId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${this.url}/unsave_blog?blogId=${blogId}`, {}, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            // this.snackBar.open('Blog unsaved successfully', '', { duration: 3000 });
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  getSavedBlogs(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.url}/saved_blogs_by_user`, { headers: this.getHeaders() })
        .subscribe(
          (data: any) => {
            console.log(data)
            resolve(data);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }
}
