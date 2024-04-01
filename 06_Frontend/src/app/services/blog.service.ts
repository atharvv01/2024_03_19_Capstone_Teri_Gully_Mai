import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../../app/components/inner-blog/inner-blog.component'; // Assuming you have a Place model

@Injectable({
  providedIn: 'root'
})
export class BlogService {
    private baseUrl = 'http://localhost:3000/blogs'; // Replace with your actual API base URL
  
    constructor(private http: HttpClient) { }
  
    getAllPlaces(blogId: string): Observable<Place[]> {
      const url = `${this.baseUrl}/get_places_of_blog?blogId=${blogId}`;
      return this.http.get<Place[]>(url);
    }
  }
