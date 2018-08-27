import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from '../shared/models/post';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        map(posts => [...posts.slice(0, 2), ...posts.slice(10, 11), ...posts.slice(22, 24), ...posts.slice(32, 34)])
      );
  }

}
