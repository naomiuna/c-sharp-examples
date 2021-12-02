import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentresListItemComponent } from './centres-list-item.component';

describe('CentresListItemComponent', () => {
  let component: CentresListItemComponent;
  let fixture: ComponentFixture<CentresListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentresListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentresListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
