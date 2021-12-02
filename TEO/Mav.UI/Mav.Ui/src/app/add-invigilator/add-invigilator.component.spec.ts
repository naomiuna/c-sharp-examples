import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvigilatorComponent } from './add-invigilator.component';

describe('AddInvigilatorComponent', () => {
  let component: AddInvigilatorComponent;
  let fixture: ComponentFixture<AddInvigilatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvigilatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvigilatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
