import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradePlanComponent } from './upgrade-plan.component';

describe('UpgradePlanComponent', () => {
  let component: UpgradePlanComponent;
  let fixture: ComponentFixture<UpgradePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpgradePlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpgradePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
