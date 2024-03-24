import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerBlogComponent } from './inner-blog.component';

describe('InnerBlogComponent', () => {
  let component: InnerBlogComponent;
  let fixture: ComponentFixture<InnerBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InnerBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnerBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
