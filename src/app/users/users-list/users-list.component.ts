import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { users: User[] }) => {
      this.users = data.users;
    });
  }

}
