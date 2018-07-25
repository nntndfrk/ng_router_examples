import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {map, pluck} from 'rxjs/operators';

@Injectable()
export class UserService {
  private usersUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    // добавляем токен
    const headers = new HttpHeaders();
    const token = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const params = new HttpParams().set('per_page', '9');

    return this.http.get(this.usersUrl, {headers: headers, params: params})
      .pipe(
        pluck('data'),
        map((users: User[]) => users.map(this.toUser))
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.usersUrl}/${id}`)
      .pipe(
        pluck('data'),
        map(this.toUser)
      );
  }

  createUser(user: User) {
    return this.http.post(this.usersUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(`${this.usersUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

  /**
   * Преобразовать данные "на лету" в тот формат который нужен нам
   */
  private toUser(user): User {
    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      username: user.first_name,
      avatar: user.avatar
    };
  }


  // private handleError(err) {
  //   let errMessage: string;
  //
  //   if (err instanceof Response) {
  //     let body   = err.json() || '';
  //     let error  = body.error || JSON.stringify(body);
  //     errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
  //   } else {
  //     errMessage = err.message ? err.message : err.toString();
  //   }
  //
  //   return Observable.throw(errMessage);
  // }
}
