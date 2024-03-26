import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogsComponent } from './my-blogs.component';

describe('MyBlogsComponent', () => {
  let component: MyBlogsComponent;
  let fixture: ComponentFixture<MyBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
