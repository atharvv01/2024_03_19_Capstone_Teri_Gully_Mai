import { Component, Input, Output, EventEmitter, OnInit, input } from '@angular/core';
import { SaveCollectionService } from '../../services/save-collection.service';
import { Router } from '@angular/router';

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
  @Input() thumbnail: string = ''; // Input property to receive the thumbnail from the parent component
  
  isSaved: boolean = false;

  @Output() blogClicked: EventEmitter<string> = new EventEmitter<string>(); // Event emitter for click event

  constructor(private saveService: SaveCollectionService, private router: Router) { }

  ngOnInit(): void {

  // console.log("thumbnail"+this.thumbnail);
    // Check if the blog is saved by the current user when initializing the component
    // this.checkIfSaved();

    // Log the value of thumbnail
    // console.log('Thumbnail:', this.title);
  }

  onClick(): void {
    console.log("Clicked");
    
    this.blogClicked.emit(this.blogId); // Emit the blog ID when clicked
    // console.log(this.blogClicked.emit(this.blogId));
    
  }



  checkIfSaved(): void {
    // Call the method to check if the blog is saved by the current user
    this.saveService.getSavedBlogs()
      .then((savedBlogs: SavedBlog[]) => { // Annotate the type of savedBlogs
        // Check if the current blog ID exists in the savedBlogs array
        this.isSaved = savedBlogs.some(savedBlog => savedBlog.blog === this.blogId);
      })
      .catch(error => {
        // Handle error
        console.error('Failed to check if blog is saved', error);
      });
  }

  // onSave(){
  //   this.router.navigate(['/user_profile']);
  // }

  onSave(blogId: string): void {
    // Call the saveBlog method from the BlogService
    this.saveService.saveBlog(blogId)
      .then(response => {
        // Handle success
        console.log('Blog saved successfully', response);
        this.isSaved = true;
      })
      .catch(error => {
        // Handle error
        console.error('Failed to save blog', error);
      });
  }

  onUnsave(blogId: string): void {
    // Call the unsaveBlog method from the SaveCollectionService
    this.saveService.unsaveBlog(blogId)
      .then(response => {
        // Handle success
        console.log('Blog unsaved successfully', response);
        this.isSaved = false; // Update the isSaved property
      })
      .catch(error => {
        // Handle error
        console.error('Failed to unsave blog', error);
      });
  }
}
