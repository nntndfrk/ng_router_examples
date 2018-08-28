import {Component, OnInit} from '@angular/core';
import {PostsService} from './posts.service';
import {Observable} from 'rxjs';
import {Post} from '../shared/models/post';
import {UtilsService} from '../shared/services/utils.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  color: string;
  private posts$: Observable<Post[]>;

  constructor(
    private service: PostsService
  ) {
  }

  get posts() {
    return this.posts$;
  }

  ngOnInit() {
    this.posts$ = this.service.getPosts();
  }
}
