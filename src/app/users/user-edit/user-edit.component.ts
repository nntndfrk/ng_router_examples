import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  editInProgress = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private service: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // const id = +this.activatedRoute.snapshot.paramMap.get('id');
    const id = +this.activatedRoute.snapshot.params['id'];
    this.service.getUser(id).subscribe(user => this.user = user);
    this.editInProgress = true;
  }

  updateUser() {
    this.successMessage = '';
    this.errorMessage   = '';
    this.editInProgress = false;

    this.service.updateUser(this.user)
      .subscribe(
        () => {
          this.successMessage = 'Пользователь успешно отредактирован.';
          setTimeout(() => {
            this.router.navigate(['/users', this.user.id]);
          }, 3000);
        },
        err => {
          this.errorMessage = err;
          console.error(err);
        }
      );
  }

}
