import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvigilatorFormComponent } from './add-invigilator-form.component';

describe('AddInvigilatorFormComponent', () => {
  let component: AddInvigilatorFormComponent;
  let fixture: ComponentFixture<AddInvigilatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvigilatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvigilatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
