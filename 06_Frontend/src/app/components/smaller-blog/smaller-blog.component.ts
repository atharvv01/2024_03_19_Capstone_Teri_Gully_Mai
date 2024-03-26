import { Component,Input,Output,EventEmitter } from '@angular/core';

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

  onClick(): void {
    this.blogClicked.emit(this.blogId); // Emit the blog ID when clicked
  }
}

