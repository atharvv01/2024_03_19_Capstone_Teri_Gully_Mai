import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityGuideComponent } from './city-guide.component';

describe('CityGuideComponent', () => {
  let component: CityGuideComponent;
  let fixture: ComponentFixture<CityGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityGuideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
