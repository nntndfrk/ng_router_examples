import {Directive, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';
import {UtilsService} from '../services/utils.service';

@Directive({
  selector: '[appNl2br]'
})
export class Nl2brDirective {
  @Input() appNl2br: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private utils: UtilsService
  ) {
  }

  @HostBinding('innerHtml') get fixedValue() {
    return this.nl2br(this.appNl2br);
  }

  nl2br(html: string): string {
    return this.utils.nl2br(html);
  }

}
