import { Component, OnInit } from '@angular/core';
import { SaveCollectionService } from '../../services/save-collection.service';

@Component({
  selector: 'app-saved-blog',
  templateUrl: './saved-blog.component.html',
  styleUrl: './saved-blog.component.css'
})
export class SavedBlogComponent implements OnInit {

  savedBlogs: any[] = [];

  constructor(private saveService: SaveCollectionService) { }

  ngOnInit(): void {
    // Call a method to fetch saved blogs when the component initializes
    this.fetchSavedBlogs();
  }

  fetchSavedBlogs(): void {
    // Call the service to fetch saved blogs
    this.saveService.getSavedBlogs()
      .then((blogs: any[]) => {
        this.savedBlogs = blogs;
      })
      .catch(error => {
        console.error('Failed to fetch saved blogs:', error);
      });
  }

  onBlogClicked(blogId: string) {
    // Handle the event here
    console.log('Blog clicked:', blogId);
  }
}
