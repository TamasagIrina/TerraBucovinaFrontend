import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllOredersComponent } from './see-all-oreders.component';

describe('SeeAllOredersComponent', () => {
  let component: SeeAllOredersComponent;
  let fixture: ComponentFixture<SeeAllOredersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeAllOredersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllOredersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
