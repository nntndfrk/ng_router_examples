import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appPrimaryColor]'
})
export class PrimaryColorDirective implements OnInit {
  private primaryColor = '#fafafa';
  private primaryBackgroundColor = '#0094d2';
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.primaryBackgroundColor);
    this.renderer.setStyle(this.el.nativeElement, 'color', this.primaryColor);
  }
}
