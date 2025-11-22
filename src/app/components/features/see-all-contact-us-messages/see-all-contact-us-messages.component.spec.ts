import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllContactUsMessagesComponent } from './see-all-contact-us-messages.component';

describe('SeeAllContactUsMessagesComponent', () => {
  let component: SeeAllContactUsMessagesComponent;
  let fixture: ComponentFixture<SeeAllContactUsMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeAllContactUsMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllContactUsMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
