import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-city-guide",
  templateUrl: "./city-guide.component.html",
  styleUrl: "./city-guide.component.css",
})
export class CityGuideComponent implements OnInit {
  currentCity: string = "Delhi"; // Initialize currentCity with 'Delhi'
  blogs: any[] = [];
  doBlogs : any[] = []
  foodBlogs: any[] = [];
  topBlogs: any[] = [];
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.callMyApi(this.currentCity);
  }
   
  // Function to call  API
  callMyApi(city: string): void {
    this.http
      .get<any[]>(`http://localhost:3000/blogs/city?city=${city}`)
      .subscribe(
        (response: any[]) => {
          // Specify the type as any[]
          console.log("API Response:", response);
          this.blogs = response; // Assign API response to blogs array
          console.log(this.blogs);
          
          this.topBlogs = this.blogs.filter( blog => blog.type === "Explore top Tourist attractions")
          console.log(this.topBlogs);
        
          this.foodBlogs = this.blogs.filter( blog => blog.type === "Where to Eat")
          console.log(this.foodBlogs);
          
          this.doBlogs = this.blogs.filter( blog => blog.type === "Things to do")
          console.log(this.doBlogs);
          

        },
        (error) => {
          console.error("API Error:", error);
        }
      );
  }
  // Function to select a city and call the API
  selectCity(city: string): void {
    this.currentCity = city;
    this.callMyApi(city);
  }

  onBlogClicked(blog: any): void {
    this.router.navigate(['/blog', blog._id]);
    // console.log("Clicked blog ID:", blog._id); 
  }

  handleBlogSaved(): void {
    // Call the API again to refresh the data
    this.callMyApi(this.currentCity);
  }
}
