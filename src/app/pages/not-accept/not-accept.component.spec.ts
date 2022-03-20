import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAcceptComponent } from './not-accept.component';

describe('NotAcceptComponent', () => {
  let component: NotAcceptComponent;
  let fixture: ComponentFixture<NotAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
