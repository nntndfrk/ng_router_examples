import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostsRoutingModule} from './posts-routing.module';
import {PostsComponent} from './posts.component';
import {PostsService} from './posts.service';
import {HighlightDirective} from '../shared/directives/highlight.directive';
import {PrimaryColorDirective} from '../shared/directives/primary-color.directive';
import {Nl2brDirective} from '../shared/directives/nl2br.directive';
import {SpinnerDirective} from '../shared/directives/spinner.directive';
import {SpinnerComponent} from '../shared/components/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule
  ],
  declarations: [
    PostsComponent,
    HighlightDirective,
    PrimaryColorDirective,
    Nl2brDirective,
    SpinnerDirective,
    SpinnerComponent
  ],
  providers: [PostsService],
  entryComponents: [SpinnerComponent]
})
export class PostsModule {
}
