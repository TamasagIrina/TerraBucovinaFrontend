import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDropdownComponent } from './favorite-dropdown.component';

describe('FavoriteDropdownComponent', () => {
  let component: FavoriteDropdownComponent;
  let fixture: ComponentFixture<FavoriteDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
