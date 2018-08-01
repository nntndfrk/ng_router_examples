import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {MessagesService} from '../shared/services/messages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private service: UserService,
    private activatedRoute: ActivatedRoute,
    private msgService: MessagesService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const action = params.get('action');
      if (action === 'created') {
        this.msgService.setMessage({
          type: 'success',
          body: 'Пользователь успешно создан'
        });
      }
      if (action === 'deleted') {
        this.msgService.setMessage({
          type: 'info',
          body: 'Пользователь успешно удален'
        });
      }
    });
  }

}
