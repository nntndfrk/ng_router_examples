import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../shared/services/messages.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  photoUrl: string;
  public editInProgress = false;
  userForm: FormGroup;

  constructor(
    private service: UserService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  ngOnInit() {
    this.editInProgress = true;
    this.userForm = new FormGroup({
      photo: new FormControl(
        ''
      ),
      name: new FormControl(
        '',
        [Validators.required]
      ),
      login: new FormControl(
        '',
        [Validators.required]
      ),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      phoneNumber: new FormControl(
        '',
        [Validators.required, this.checkForNumers]
      ),
      dob: new FormControl(
        ''
      ),
      other: new FormControl(
        ''
      )
    });

  }

  createUser() {
    this.editInProgress = false;
    const user = {
      name: this.userForm.get('name').value,
      username: this.userForm.get('login').value,
      avatar: 'http://via.placeholder.com/128x128'
    };
    this.service.createUser(user)
      .subscribe(() => {
        this.msgService.setMessage({
          type: 'success',
          body: 'Пользователь успешно создан!'
        });

        setTimeout(() => {
          this.router.navigate(['/users', {action: 'created'}]);
        }, 3000);

      });
  }

  onAttachPic(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.photoUrl = event.target.result;
      };
    }
  }

  checkForNumers(control: FormControl) {
    const reg = new RegExp('^\\d+$');
    if (!reg.test(control.value)) {
      return {
        'onlyNumberError': true
      };
    }
    return null;
  }

}
