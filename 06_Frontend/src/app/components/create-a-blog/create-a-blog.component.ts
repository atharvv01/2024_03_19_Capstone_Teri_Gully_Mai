import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogService } from '../../services/blog.service';

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
    isTrending: false,
    isPromoted: false,
    saves: [],
    type: 'default'
  };

  constructor(
    private http: HttpClient,
    private blogService : BlogService) {}

    postBlog(): void {
      this.blogService.createBlog(this.blogData)
        .then((response) => {
          console.log('Blog created successfully:', response);
          // Reset form or perform any other actions after successful creation
        })
        .catch((error) => {
          console.error('Error creating blog:', error);
        });
    }
}
