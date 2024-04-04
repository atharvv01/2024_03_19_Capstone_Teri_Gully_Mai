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
    console.log(this.blogData)
    this.blogService
      .createBlog(this.blogData)
      .then((response) => {
        console.log("Blog created successfully:", response);
        const blogId = response._id; // Assuming the blog ID is returned in the response
        
        if (blogId) {
          // After blog creation, add places to the blog
          this.addPlacesToBlog(blogId);
        } else {
          console.error("Error: Blog ID not found in response");
        }
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
      });
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
