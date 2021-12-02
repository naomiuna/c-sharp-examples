import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationStatementComponent } from './confirmation-statement.component';

describe('ConfirmationStatementComponent', () => {
  let component: ConfirmationStatementComponent;
  let fixture: ComponentFixture<ConfirmationStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
