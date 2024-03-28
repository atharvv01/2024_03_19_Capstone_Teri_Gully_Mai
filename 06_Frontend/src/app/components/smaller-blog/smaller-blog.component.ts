import { Component,Input,Output,EventEmitter } from '@angular/core';
import { SaveCollectionService } from '../../services/save-collection.service';

@Component({
  selector: 'app-smaller-blog',
  templateUrl: './smaller-blog.component.html',
  styleUrl: './smaller-blog.component.css'
})
export class SmallerBlogComponent {
  @Input() title: string =''; // Input property to receive the title from the parent component
  @Input() likes: number = 0 ;
  @Input() blogId: string = '';

  @Output() blogClicked: EventEmitter<string> = new EventEmitter<string>(); // Event emitter for click event


  constructor(private saveService: SaveCollectionService) { }
  onClick(): void {    
    this.blogClicked.emit(this.blogId); // Emit the blog ID when clicked
  }

  onSave(blogId : string): void {
    // Call the saveBlog method from the BlogService
    this.saveService.saveBlog(blogId)
      .then(response => {
        // Handle success
        console.log('Blog saved successfully', response);
      })
      .catch(error => {
        // Handle error
        console.error('Failed to save blog', error);
      });
  }
}

