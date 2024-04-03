import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-a-blog',
  templateUrl: './create-a-blog.component.html',
  styleUrls: ['./create-a-blog.component.css']
})
export class CreateABlogComponent {
  blogData = {
    title: '',
    description: '',
    city: '',
    thumbnail: '',
    places: [], // Assuming this is an array of places, modify as needed
    likes: 0, // Default values
    views: 0,
    comments: [],
    isCommentsEnabled: true,
    status: 'draft',
    isTrending: false,
    isPromoted: false,
    saves: [],
    flags: [],
    type: 'default'
  };

  constructor(private http: HttpClient) {}

  postBlog(): void {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.post('http://localhost:3000/blogs/create', this.blogData, { headers })
      .subscribe(
        (response) => {
          console.log('Blog created successfully:', response);
          // Reset form or perform any other actions after successful creation
        },
        (error) => {
          console.error('Error creating blog:', error);
        }
      );
  }
}
