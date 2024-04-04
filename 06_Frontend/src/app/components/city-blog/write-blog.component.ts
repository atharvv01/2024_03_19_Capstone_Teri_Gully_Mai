import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent {
 
  place:any={
    title:"17 Best Outdoor Restaurants And Cafes In Delhi To Make The Best Of Winter Sun"
  }
  sliders: number[] = [1, 2, 3, 4, 5]; 
  images: string[] = [
    'https://images.unsplash.com/flagged/photo-1556667885-a6e05b14f2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1556815054-cd8e705a758e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1556228721-e65f06ab45c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1556228578-626e9590b81f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1556228454-1690896f350c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ]; 
}
