import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesService} from '../../shared/services/messages.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  public editInProgress = false;

  constructor(
    private service: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    // const id = +this.activatedRoute.snapshot.paramMap.get('id');
    const id = +this.activatedRoute.snapshot.params['id'];
    this.service.getUser(id).subscribe(user => this.user = {...user});
    this.editInProgress = true;
  }

  updateUser() {
    this.editInProgress = false;

    this.service.updateUser(this.user)
      .subscribe(
        () => {
          this.messagesService.setMessage({
            type: 'success',
            body: 'Пользователь успешно отредактирован.'
          });
          setTimeout(() => {
            this.router.navigate(['/users', this.user.id]);
          }, 3000);
        },
        err => {
          this.messagesService.setMessage({
            type: 'danger',
            body: err
          });
          console.error(err);
        }
      );
  }

}
