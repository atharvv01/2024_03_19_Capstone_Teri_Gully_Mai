import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../../app/components/inner-blog/inner-blog.component'; // Assuming you have a Place model
// import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://localhost:3000/blogs'; // Replace with your actual API base URL
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
    return this.token ? { 'Authorization': this.token } : {};
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  createBlog(blogData: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      // Log the headers before making the request
      console.log('Headers:', this.getHeaders());

      this.http.post<any>(`${this.baseUrl}/create`, blogData, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {

            // this.snackBar.open("Blog created successfully", "", { duration: 3000 });
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  addPlaceToBlog(placeData: any, blogId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${this.baseUrl}/${blogId}/places/add`, placeData, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            // this.snackBar.open("Place added to blog successfully", "", { duration: 3000 });
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  deletePlace(placeId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>(`${this.baseUrl}/deletePlace?placeId=${placeId}`, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            // this.snackBar.open("Place deleted successfully", "", { duration: 3000 });
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  getBlogsByCity(city: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.baseUrl}/city?city=${city}`, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  getBlogsByAuthorId(authorId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.baseUrl}/get_blog_by_author_id?authorId=${authorId}`, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  getBlogById(blogId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.baseUrl}/get_blog_by_id?blogId=${blogId}`, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  deleteBlog(blogId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>(`${this.baseUrl}/deleteBlog?blogId=${blogId}`, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            // this.snackBar.open("Blog and associated places deleted successfully", "", { duration: 3000 });
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  modifyBlog(blogId: string, updatedData: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.put<any>(`${this.baseUrl}/update_blog?blogId=${blogId}`, updatedData, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            // this.snackBar.open("Blog and places updated successfully", "", { duration: 3000 });
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }

  getAllPlacesOfBlog(blogId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`${this.baseUrl}/get_places_of_blog?blogId=${blogId}`, { headers: this.getHeaders() })
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          error => {
            this.handleError(error);
            reject(error);
          }
        );
    });
  }
}


