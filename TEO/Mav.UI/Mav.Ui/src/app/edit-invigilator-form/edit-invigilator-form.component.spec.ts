import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvigilatorFormComponent } from './edit-invigilator-form.component';

describe('EditInvigilatorFormComponent', () => {
  let component: EditInvigilatorFormComponent;
  let fixture: ComponentFixture<EditInvigilatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInvigilatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvigilatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
