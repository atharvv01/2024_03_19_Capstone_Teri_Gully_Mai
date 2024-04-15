import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BlogService } from "../../services/blog.service";

@Component({
  selector: "app-create-a-blog",
  templateUrl: "./create-a-blog.component.html",
  styleUrls: ["./create-a-blog.component.css"],
})
export class CreateABlogComponent {
  blogId:any;
  placeData: any[] = [];
  // image: File | null = null;

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
        this.blogId = res?._id; // Extract the blogId from the response
        console.log("this is blog id"+this.blogId);
        
        if (this.blogId) {
          console.log(this.placeData);
          // console.log(this.blogId)

          this.http.post<any>(`http://localhost:3000/blogs/${this.blogId}/places/add`, { placeData: this.placeData }, { headers }).subscribe(
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
    console.log("updatedplaces"+JSON.stringify(this.placeData))
  }

  addNewPlace(newPlaceData: any) {
    // Add the newly created place to the placeData array
    this.placeData.push(newPlaceData);
    console.log("New place added:", newPlaceData);
  }

  onPlaceAdded(newPlace: any) {
    // Log the received data
    console.log("New place added:", newPlace);
    
    // You can perform additional actions here, such as sending the data to your backend
    // or updating other component properties as needed.
  }

}
