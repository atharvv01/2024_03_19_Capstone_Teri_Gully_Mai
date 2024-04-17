import { Component, Input , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

export interface Place {
  description: string;
  googleMapLink: string;
  img: string[];
  placeName: string;
  price: number;
  // ratings: number;
  // timings: string;
  // where: string;
  mustTry: string;
  officalLink: string;
}

@Component({
  selector: 'app-inner-blog',
  templateUrl: './inner-blog.component.html',
  styleUrls: ['./inner-blog.component.css']
})
export class InnerBlogComponent  implements OnInit {

  @Input() places!: Place;

  blogPlaces: Place[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

    ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('blogId');
    if (blogId) {
      this.blogService.getAllPlacesOfBlog(blogId).then(
        (places: Place[]) => {
          this.blogPlaces = places;
          console.log('Places:', this.blogPlaces);
        },
        (error) => {
          console.error('Error fetching places:', error);
        }
      );
    }
    
  }
}

