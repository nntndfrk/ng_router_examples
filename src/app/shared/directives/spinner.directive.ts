import {ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {SpinnerComponent} from '../components/spinner.component';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective {
  constructor(
    private templateRef: TemplateRef<void>,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {
  }

  @Input() set appSpinner(condition: boolean) {
    if (condition) {
      this.viewContainerRef.clear();
      const cmpFactory = this.cfr.resolveComponentFactory(SpinnerComponent);
      this.viewContainerRef.createComponent(cmpFactory);
    } else if (!condition) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
