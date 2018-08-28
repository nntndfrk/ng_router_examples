import {Component, OnInit} from '@angular/core';
import {PostsService} from './posts.service';
import {Observable, of} from 'rxjs';
import {Post} from '../shared/models/post';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  color: string;
  showSpinner = true;
  private posts$: Observable<Post[]>;

  constructor(
    private service: PostsService
  ) {
  }

  get posts() {
    return this.posts$;
  }

  ngOnInit() {
    this.service.getPosts()
      .pipe(delay(3 * 1000))
      .subscribe((data: Post[]) => {
        this.showSpinner = false;
        this.posts$ = of(data);
      });
  }
}
