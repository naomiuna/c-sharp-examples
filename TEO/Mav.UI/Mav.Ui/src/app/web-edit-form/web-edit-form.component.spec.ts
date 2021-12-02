import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebEditFormComponent } from './web-edit-form.component';

describe('WebEditFormComponent', () => {
  let component: WebEditFormComponent;
  let fixture: ComponentFixture<WebEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
