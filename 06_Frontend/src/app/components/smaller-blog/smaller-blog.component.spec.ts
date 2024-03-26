import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallerBlogComponent } from './smaller-blog.component';

describe('SmallerBlogComponent', () => {
  let component: SmallerBlogComponent;
  let fixture: ComponentFixture<SmallerBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallerBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallerBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
