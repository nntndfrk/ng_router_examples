import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() defaultColor: string;
  @Input('appHighlight') highlightColor: string;
  // @HostBinding через свойство класса
  @HostBinding('style.cursor') cursor;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  // @HostBinding через геттер
  @HostBinding('style.fontVariant') get fontVariant() {
    return 'small-caps';
  }

  ngOnInit() {
    // this.cursor = 'move';
    this.cursor = 'pointer';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || '#e0f4ff');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

}
