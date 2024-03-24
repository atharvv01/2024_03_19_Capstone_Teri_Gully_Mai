import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-inner-blog',
  templateUrl: './inner-blog.component.html',
  styleUrl: './inner-blog.component.css'
})
export class InnerBlogComponent{
  // posts: any[];

  // constructor(private http: HttpClient) { 
  //   this.posts=[];
  // }

  // ngOnInit(): void {
  //   // Make HTTP GET request to fetch blog posts from backend
  //   this.http.get<any[]>('http://localhost:3000/api/posts')
  //     .subscribe(posts => {
  //       this.posts = posts;
  //     });
  // }
}
