import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() defaultColor: string;
  @Input('appHighlight') highlightColor: string;
  // @HostBinding через свойство класса
  @HostBinding('style.cursor') cursor;

  constructor(private el: ElementRef) {
  }

  // @HostBinding через геттер
  @HostBinding('style.fontVariant') get fontVariant() {
    return 'small-caps';
  }

  ngOnInit() {
    // this.cursor = 'move';
    this.cursor = 'pointer';
    setTimeout(() => this.cursor = 'move', 1000 * 2);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || '#e0f4ff');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
