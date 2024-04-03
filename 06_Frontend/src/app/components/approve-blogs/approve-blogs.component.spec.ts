import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBlogsComponent } from './approve-blogs.component';

describe('ApproveBlogsComponent', () => {
  let component: ApproveBlogsComponent;
  let fixture: ComponentFixture<ApproveBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
