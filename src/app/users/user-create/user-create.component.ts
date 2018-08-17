import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../shared/services/messages.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


const emptyString = '';

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
    this.userForm = new FormGroup({
      photo: new FormControl(emptyString),
      name: new FormControl(emptyString,
        [Validators.required]
      ),
      login: new FormControl(emptyString,
        [Validators.required]
      ),
      email: new FormControl(emptyString,
        [
          Validators.required,
          Validators.email
        ]
      ),
      phoneNumber: new FormControl(emptyString,
        [Validators.required, this.checkForNumers]
      ),
      dob: new FormControl(emptyString),
      other: new FormControl(emptyString)
    });

    this.userForm.valueChanges.subscribe(() => {
        if (this.userForm.touched || this.userForm.dirty) {
          this.editInProgress = true;
        }
      }
    );

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
