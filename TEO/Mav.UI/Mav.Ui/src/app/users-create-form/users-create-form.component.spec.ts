import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCreateFormComponent } from './users-create-form.component';

describe('UsersCreateFormComponent', () => {
  let component: UsersCreateFormComponent;
  let fixture: ComponentFixture<UsersCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
