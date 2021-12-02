import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyImagesComponent } from './tiny-images.component';

describe('TinyImagesComponent', () => {
  let component: TinyImagesComponent;
  let fixture: ComponentFixture<TinyImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinyImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
