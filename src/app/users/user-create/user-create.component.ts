import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User = {name: '', username: '', avatar: 'http://via.placeholder.com/128x128'};
  successMessage = '';
  errorMessage = '';

  constructor(
    private service: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.service.getUsers().subscribe(users => {
      this.user.id = users.length;
    });
  }

  createUser() {
    this.successMessage = '';
    this.errorMessage = '';

    this.service.createUser(this.user)
      .subscribe(() => {
        this.successMessage = 'Пользователь успешно создан!';

        setTimeout(() => {
          this.router.navigate(['/users', {action: 'created'}]);
        }, 3000);

      });
  }

}
