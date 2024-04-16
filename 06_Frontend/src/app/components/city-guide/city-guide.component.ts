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
  selectedFilter: string = "popularity";

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
          
          this.topBlogs = this.blogs.filter( blog => blog.type === "Explore top Tourist attractions")
          // console.log("explore top tourist attraction"+this.topBlogs);
        
          this.foodBlogs = this.blogs.filter( blog => blog.type === "Where to eat")
          // console.log("Where to eat blogs"+this.foodBlogs);
          
          this.doBlogs = this.blogs.filter( blog => blog.type === "Things to do")
          // console.log("Things to do blogs"+this.doBlogs);
          

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

  // Method to set the selected filter and call the corresponding sorting method
  setFilter(filter: string): void {
    this.selectedFilter = filter;
    if (filter === "popularity") {
      this.sortByPopularity();
    } else if (filter === "latest") {
      this.sortByLatest();
    }
  }
  onBlogClicked(blog: any): void {
    this.router.navigate(['/blog', blog._id]);
    // console.log("Clicked blog ID:", blog._id); 
  }

  handleBlogSaved(): void {
    // Call the API again to refresh the data
    this.callMyApi(this.currentCity);
  }

  sortByPopularity(): void {
    // Sort topBlogs array by likes in descending order
    this.topBlogs.sort((a, b) => b.likes - a.likes);
    // Sort foodBlogs array by likes in descending order
    this.foodBlogs.sort((a, b) => b.likes - a.likes);
    // Sort doBlogs array by likes in descending order
    this.doBlogs.sort((a, b) => b.likes - a.likes);
  }

  sortByLatest(): void {
    // Sort topBlogs array by timestamp in descending order
    this.topBlogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    // Sort foodBlogs array by timestamp in descending order
    this.foodBlogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    // Sort doBlogs array by timestamp in descending order
    this.doBlogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
}
