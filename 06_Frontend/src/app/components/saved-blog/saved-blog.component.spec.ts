import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedBlogComponent } from './saved-blog.component';

describe('SavedBlogComponent', () => {
  let component: SavedBlogComponent;
  let fixture: ComponentFixture<SavedBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
