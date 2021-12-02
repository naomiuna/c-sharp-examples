import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentresEditFormComponent } from './centres-edit-form.component';

describe('CentresEditFormComponent', () => {
  let component: CentresEditFormComponent;
  let fixture: ComponentFixture<CentresEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentresEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentresEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
