import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BlogService } from "../../services/blog.service";

@Component({
  selector: "app-create-a-blog",
  templateUrl: "./create-a-blog.component.html",
  styleUrls: ["./create-a-blog.component.css"],
})
export class CreateABlogComponent {

  placeData: any[] = [];

  blogData = {
    title:"",
    description: "",
    city: "",
    thumbnail: "",
    pplaces: [] as string[],
    type : "" ,
    isCommentsEnabled : true
  }

  constructor(private http: HttpClient, private blogService: BlogService) {}

  postBlog(): void {
    console.log("this is called");
    
    // Retrieve JWT token from local storage
    const token = localStorage.getItem('authToken');
  
    console.log(token);
  
    // Define headers with JWT token
    const headers = new HttpHeaders().set('Authorization', token ? token : '');
  
    // Call the first API to create a blog
    this.http.post<any>('http://localhost:3000/blogs/create', this.blogData, { headers }).subscribe(
      (res: any) => {
        console.log('First API call response:', res); // Log the response from the first API call
        // Upon successful completion of the first API call, call the second API
        const blogId = res?._id; // Extract the blogId from the response
        console.log("this is blog id"+blogId);
        
        if (blogId) {
          this.http.post<any>(`http://localhost:3000/blogs/${blogId}/places/add`, this.placeData, { headers }).subscribe(
            (secondRes: any) => {
              // Handle success of second API call
              console.log('Second API call successful:', secondRes);
            },
            (secondError: any) => {
              // Handle error of second API call
              console.error('Error in second API call:', secondError);
            }
          );
        } else {
          console.error('Error: No blogId found in the response from the first API call');
        }
      },
      (error: any) => {
        // Handle error of first API call
        console.error('Error in first API call:', error);
      }
    );
  }
  
  updatePlaces(updatedPlaces: any[]) {
    this.placeData = updatedPlaces;
    console.log(this.placeData)
  }

  addPlacesToBlog(blogId: string): void {
    // Iterate through the places array and add each place to the blog
    console.log(this.placeData)
    this.placeData.forEach((place) => {
      this.blogService
        .addPlaceToBlog(place, blogId)
        .then((response) => {
          console.log("Place added to blog successfully:", response);
          // Reset form or perform any other actions after successful addition
        })
        .catch((error) => {
          console.error("Error adding place to blog:", error);
        });
    });
  }

  addNewPlace(newPlaceData: any) {
    // Add the newly created place to the blogData.places array
    this.placeData.push(newPlaceData);
    console.log(this.placeData)
  }
}
