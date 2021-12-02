import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebListItemComponent } from './web-list-item.component';

describe('WebListItemComponent', () => {
  let component: WebListItemComponent;
  let fixture: ComponentFixture<WebListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
