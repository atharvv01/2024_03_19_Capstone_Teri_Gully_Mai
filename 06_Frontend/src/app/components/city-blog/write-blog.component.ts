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
export class WriteBlogComponent {
  
}
