import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';
import {map, pluck, tap} from 'rxjs/operators';

@Injectable()
export class UserService {
  userData: User[];
  private usersUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  getUsers(): Observable<User[]> {
    if (!this.userData) {
      // добавляем токен
      const headers = new HttpHeaders();
      const token = localStorage.getItem('auth_token');
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);

      const params = new HttpParams().set('per_page', '9');


      return this.http.get(this.usersUrl, {headers: headers, params: params})
        .pipe(
          pluck('data'),
          map((users: User[]) => users.map(this.toUser)),
          tap(data => {
            this.userData = data;
          })
        );
    } else {
      return of(this.userData);
    }

  }

  getUser(id: number): Observable<User> {
    if (!this.userData) {
      return this.http.get(`${this.usersUrl}/${id}`)
        .pipe(
          pluck('data'),
          map(this.toUser)
        );
    } else {
      let curUser = new User();
      this.userData.forEach(user => {
        if (user.id === id) {
          curUser = user;
        }
      });
      return of(curUser);
    }

  }

  createUser(user: User) {
    return this.http.post(this.usersUrl, user)
      .pipe(tap(() => this.userData.push(user)));
  }

  updateUser(upUser: User) {
    return this.http.put(`${this.usersUrl}/${upUser.id}`, upUser)
      .pipe(tap(() => {
        this.userData.forEach(user => {
          if (user.id === upUser.id) {
            user.name = upUser.name;
            user.username = upUser.username;
          }
        });
      }));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`)
      .pipe(tap(() => {
        this.userData = this.userData.filter(user => user.id !== id);
      }));
  }

  /**
   * Преобразовать данные "на лету" в тот формат который нужен нам
   */
  private toUser(user): User {
    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      username: user.first_name,
      avatar: user.avatar,
      password: '123456'
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
