import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateABlogComponent } from './create-a-blog.component';

describe('CreateABlogComponent', () => {
  let component: CreateABlogComponent;
  let fixture: ComponentFixture<CreateABlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateABlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateABlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
