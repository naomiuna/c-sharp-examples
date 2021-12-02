import { Component, OnInit } from '@angular/core';

declare function tinyImagesClose(value: any, alt: any): any;

@Component({
  selector: 'app-tiny-images',
  templateUrl: './tiny-images.component.html',
  styleUrls: ['./tiny-images.component.css']
})
export class TinyImagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public submitForm() {
    tinyImagesClose('/assets/images/pictures/login__image.png', 'alt tag 123');
  }

}
