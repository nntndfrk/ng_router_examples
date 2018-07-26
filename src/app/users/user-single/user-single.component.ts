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
  totalUserCount: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: UserService
  ) {
  }

  ngOnInit() {
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
      this.totalUserCount = users.length;
    });
  }

  deleteUser() {
    this.service.deleteUser(this.user.id)
      .subscribe(() => {
        this.service.getUsers().subscribe(users => {
          this.users = users;
          this.totalUserCount = users.length;
        });
        this.router.navigate(['/users', {action: 'deleted'}]);
      });
  }

  getNextId() {
    return this.user.id += 1;
  }

}
