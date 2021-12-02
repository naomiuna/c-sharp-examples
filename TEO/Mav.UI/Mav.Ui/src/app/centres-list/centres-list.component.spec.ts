import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentresListComponent } from './centres-list.component';

describe('CentresListComponent', () => {
  let component: CentresListComponent;
  let fixture: ComponentFixture<CentresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
