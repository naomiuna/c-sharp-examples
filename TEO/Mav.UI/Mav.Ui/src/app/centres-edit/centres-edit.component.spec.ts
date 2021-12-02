import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentresEditComponent } from './centres-edit.component';

describe('CentresEditComponent', () => {
  let component: CentresEditComponent;
  let fixture: ComponentFixture<CentresEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentresEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
