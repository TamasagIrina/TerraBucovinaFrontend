import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPlantsComponent } from './about-plants.component';

describe('AboutPlantsComponent', () => {
  let component: AboutPlantsComponent;
  let fixture: ComponentFixture<AboutPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPlantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
