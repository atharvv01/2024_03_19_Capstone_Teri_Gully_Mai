import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-city-guide',
  templateUrl: './city-guide.component.html',
  styleUrl: './city-guide.component.css'
})
export class CityGuideComponent implements OnInit {

  currentCity: string = 'Delhi'; // Initialize currentCity with 'Delhi'
  blogs: any[] = []; 
  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
          this.callMyApi(this.currentCity);
    
  }

  // Function to call  API
  callMyApi(city: string): void {
    this.http.get<any[]>(`http://localhost:3000/blogs/city?city=${city}`).subscribe(
      (response: any[]) => { // Specify the type as any[]
        console.log('API Response:', response);
        this.blogs = response; // Assign API response to blogs array
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
  // Function to select a city and call the API
  selectCity(city: string): void {
    this.currentCity = city;
    this.callMyApi(city);
  }

  onBlogClicked(blogId: string): void {
    this.router.navigate(['/blog', blogId]); // Navigate to the details page with blog ID as parameter
    
  }

}
