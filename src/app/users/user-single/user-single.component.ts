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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: UserService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.forEach((params: Params) => {
      const id = +params.get('id');
      this.service.getUser(id)
        .subscribe(user => {
          if (user) {
            this.user = user;
          }
        });
    });
  }

  deleteUser() {
    this.service.deleteUser(this.user.id)
      .subscribe(() => {
        this.router.navigate(['/users', {action: 'deleted'}]);
      });
  }

}
