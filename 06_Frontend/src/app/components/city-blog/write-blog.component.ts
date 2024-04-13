import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-write-blog",
  templateUrl: "./write-blog.component.html",
  styleUrls: ["./write-blog.component.css"],
})
export class WriteBlogComponent implements OnInit {

  blogData: any; // Define a property to store blog data
  blogId: string = ''; // Initialize with an empty string
  authorName: string = ''; // Define a property to store author name
  authorPic: string = ''; //profile photo of author
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.blogId = params.get('blogId') ?? ''; // Use nullish coalescing operator
      this.callApi(this.blogId);
    });
  }

  callApi(blogId: string): void {
    this.http.get(`http://localhost:3000/blogs/get_blog_by_id?blogId=${blogId}`)
      .subscribe(
        (response: any) => {
          console.log("API Response:", response);
          this.blogData = response; 
          this.fetchAuthorName(this.blogData.author);
        },
        (error) => {
          console.error("API Error:", error);
        }
      );
  }
  fetchAuthorName(authorId: string): void {
    this.http.get<any>(`http://localhost:3000/users/getUserDetails?authorId=${authorId}`)
      .subscribe(
        (response: any) => {
          console.log("Author Details:", response);
          this.authorName = response.username; // Extract author's name from the response


          // this.authorPic = response.   

          
        },
        (error) => {
          console.error("API Error:", error);
        }
      );
  }
}
