import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {User} from '../models/user';
import {catchError, map, pluck, retry, tap} from 'rxjs/operators';

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
      headers.append('Content-Type', 'application/json');

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
    if (!this.userData || !this.checkExistingId(id)) {
      return this.http.get<Observable<User>>(`${this.usersUrl}/${id}`)
        .pipe(
          pluck('data'),
          map(this.toUser),
          // обработка ошибки Http-запроса
          catchError((err: HttpErrorResponse) => {
            if (err.status === 404) {
              return throwError('Not found');
            } else {
              return throwError(err.message);
            }
          })
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
      .pipe(tap(() => {
        user.id = this.userData.length;
        this.userData.push(user);
      }));
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
      .pipe(
        retry(2)
      );
  }

  checkExistingId(id) {
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i].id === id) {
        return true;
      }
    }
    return false;
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

  uploadFile(file: File): Observable<File> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'multipart/form-data'),
    };
    return this.http.post<File>(`${this.usersUrl}/file`, formData, options);
  }


}
