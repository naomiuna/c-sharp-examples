import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSltFormComponent } from './add-slt-form.component';

describe('AddSltFormComponent', () => {
  let component: AddSltFormComponent;
  let fixture: ComponentFixture<AddSltFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSltFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSltFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
