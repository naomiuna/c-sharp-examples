import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvigilatorComponent } from './edit-invigilator.component';

describe('EditInvigilatorComponent', () => {
  let component: EditInvigilatorComponent;
  let fixture: ComponentFixture<EditInvigilatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInvigilatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvigilatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
