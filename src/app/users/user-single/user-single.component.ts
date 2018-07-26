import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {
  user: User;
  users: User[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: UserService
  ) {
  }

  ngOnInit() {
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   const id = +params['id'];
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      const id = +params.get('id');
      this.service.getUser(id)
        .subscribe(user => {
          if (user) {
            this.user = user;
          }
        });
    });

    this.service.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser() {
    this.service.deleteUser(this.user.id)
      .subscribe(() => {
        this.service.getUsers().subscribe(users => {
          this.users = users;
        });
        this.router.navigate(['/users', {action: 'deleted'}]);
      });
  }

  nextUser() {
    const userIndex = this.users.indexOf(this.user);
    const nextUser = (userIndex + 1) < this.users.length ? this.users[userIndex + 1] : this.users[0];

    this.router.navigate(['/users', nextUser.id]);
  }

}
