import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SaveCollectionService } from '../../services/save-collection.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Interface to describe the structure of the savedBlog objects
interface SavedBlog {
  blog: string;
  // Add more properties if needed
}

@Component({
  selector: 'app-smaller-blog',
  templateUrl: './smaller-blog.component.html',
  styleUrls: ['./smaller-blog.component.css']
})
export class SmallerBlogComponent implements OnInit {
  @Input() title: string = ''; // Input property to receive the title from the parent component
  @Input() likes: number = 0;
  @Input() blogId: string = '';
  @Input() views: number = 0;
  @Input() saves: number = 0;
  @Input() thumbnail: string = ''; // Input property to receive the thumbnail from the parent component
  
  isSaved: boolean = false;

  @Output() blogClicked: EventEmitter<string> = new EventEmitter<string>(); // Event emitter for click event
  @Output() blogSaved: EventEmitter<void> = new EventEmitter<void>();
  constructor(private saveService: SaveCollectionService, private router: Router) { }

  ngOnInit(): void {
    // Check if the blog is saved when initializing the component
    this.checkIfSaved();
  }

  onClick(): void {
    console.log("Clicked");
    this.blogClicked.emit(this.blogId); // Emit the blog ID when clicked
  }

  checkIfSaved(): void {
    // Call the method to check if the blog is saved by the current user
    this.saveService.getSavedBlogs()
      .then((savedBlogs: SavedBlog[]) => {
        // Check if the current blog ID exists in the savedBlogs array
        this.isSaved = savedBlogs.some(savedBlog => savedBlog.blog === this.blogId);
      })
      .catch(error => {
        // Handle error
        console.error('Failed to check if blog is saved', error);
      });
  }

  onSave(blogId: string): void {
    console.log("onsave called");
    
    // Check if the blog is already saved
    if (!this.isSaved) {
      // If not saved, call the saveBlog method from the BlogService
      this.saveService.saveBlog(blogId)
        .then(() => {
          // Update isSaved flag
          this.isSaved = true;
          // Show success message
          Swal.fire("Blog Saved");
          this.blogSaved.emit(); // Emit event when blog is saved
        })
        .catch(error => {
          Swal.fire("Please login first");
          // Handle error
          console.error('Failed to save blog', error);
        });
    } else {
      // If already saved, call the unsaveBlog method
      this.unsaveBlog(blogId);
    }
  }

  unsaveBlog(blogId: string): void {
    this.saveService.unsaveBlog(blogId)
      .then(() => {
        // Update isSaved flag
        this.isSaved = false;
        Swal.fire("Blog Unsaved");
        this.blogSaved.emit(); // Emit event when blog is unsaved
      })
      .catch(error => {
        // Handle error
        console.error('Failed to unsave blog', error);
      });
  }
}
