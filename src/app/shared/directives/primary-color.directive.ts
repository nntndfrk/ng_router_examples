import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appPrimaryColor]'
})
export class PrimaryColorDirective implements OnInit {
  private primaryColor = '#fafafa';
  private primaryBackgroundColor = '#0094d2';
  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.primaryBackgroundColor;
    this.el.nativeElement.style.color = this.primaryColor;
  }
}
