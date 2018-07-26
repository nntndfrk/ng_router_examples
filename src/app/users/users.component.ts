import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  showCreateMessage = false;
  showDeleteMessage = false;

  constructor(
    private service: UserService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const action = params.get('action');
      if (action === 'created') {
        this.showCreateMessage = true;
        this.clearMessages();
      }
      if (action === 'deleted') {
        this.showDeleteMessage = true;
        this.clearMessages();
      }
    });
  }

  clearMessages() {
    setTimeout(() => {
      this.showCreateMessage = false;
      this.showDeleteMessage = false;
    }, 5000);
  }

}
