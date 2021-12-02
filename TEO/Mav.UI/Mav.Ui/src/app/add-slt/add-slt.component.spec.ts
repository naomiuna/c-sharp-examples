import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSltComponent } from './add-slt.component';

describe('AddSltComponent', () => {
  let component: AddSltComponent;
  let fixture: ComponentFixture<AddSltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
