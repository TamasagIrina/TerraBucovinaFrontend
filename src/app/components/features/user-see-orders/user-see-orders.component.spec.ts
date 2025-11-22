import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSeeOrdersComponent } from './user-see-orders.component';

describe('UserSeeOrdersComponent', () => {
  let component: UserSeeOrdersComponent;
  let fixture: ComponentFixture<UserSeeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSeeOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSeeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
