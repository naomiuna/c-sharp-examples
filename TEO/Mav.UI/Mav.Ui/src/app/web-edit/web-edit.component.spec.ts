import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebEditComponent } from './web-edit.component';

describe('WebEditComponent', () => {
  let component: WebEditComponent;
  let fixture: ComponentFixture<WebEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
