import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/blog.service';

interface BlogResponse {
  author: string;
  city: string;
  description: string;
  likes: number;
  places: Place[];
  thumbnail: string;
  timestamp: string;
  title: string;
  _id: string;
}

export interface Place {
  description: string;
  googleMapLink: string;
  img: string[];
  placeName: string;
  price: number;
  ratings: number;
  timings: string;
  where: string;
}

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent implements OnInit {
  blogTitle: string="";
  blogData: BlogResponse | null = null; // Declare blogData property
  blogPlaces: Place[] = [];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {

    // Retrieve the blog ID from the route parameters
    const blogID = this.route.snapshot.paramMap.get('blogId');
    console.log(blogID);
    
    if (blogID) {
      // Construct the API URL with the blog ID as a query parameter
      const apiUrl = `http://localhost:3000/blogs/get_blog_by_id?blogId=${blogID}`;

      // Make an HTTP request to the API
      this.http.get(apiUrl).subscribe(
        (response) => {
          const blogData: BlogResponse = response as BlogResponse;
          this.blogTitle = blogData.title;
          this.blogData = blogData; // Assign the response to blogData property
          console.log('API Response:', blogData);
        },
        (error) => {
          // Handle API error
          console.error('API Error:', error);
        }
      );

      this.blogService.getAllPlaces(blogID).subscribe(
        (places: Place[]) => {
          this.blogPlaces = places;
          console.log('Places:', this.blogPlaces);
        },
        (error) => {
          console.error('Error fetching places:', error);
        }
      );
    }
  }
}
