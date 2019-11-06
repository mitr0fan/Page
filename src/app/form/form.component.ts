import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor( private snackBar: MatSnackBar ) { }

  options = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  mode = true;

  users: User[] = [
    {login: 'Anton', password: '000000'},
    {login: 'Baton', password: '111111'},
    {login: 'Karton', password: '222222'},
  ];

  ngOnInit() {
  }

  changeMode(elem: HTMLElement) {
    if (elem.id === 'reg') {
      this.mode = true;
    } else {
      this.mode = false;
    }
  }

  addUser() {
    let match = false;
    if ( this.options.status === 'VALID' ) {
      this.users.forEach((i) => {
        if ( i.login === this.options.value.login ) {
          match = true;
          this.openSnackBar('reg');
        }
      });
      if ( match === false ) {
        this.users.push(this.options.value);
        console.log(this.users);
      }
    }
  }

  signIn(log: HTMLInputElement, pas: HTMLInputElement) {
    const login = log.value;
    const password = pas.value;
    let link = '';

    this.users.forEach((i) => {
      if (i.login === login && i.password === password) {
        link = '/main';
      }
    });
    return link;
  }

  openSnackBar(param: string, log?: HTMLInputElement, pas?: HTMLInputElement) {
    if ( param === 'reg' ) {
      this.snackBar.open('Пользователь с данным логином уже существует. Поменяйте логин', '', {
        duration: 3000,
      });
    }
    if ( param === 'sign' ) {
      const login = log.value;
      const password = pas.value;
      let user = false;

      this.users.forEach((i) => {
        if (i.login === login && i.password === password) {
          user = true;
        }
      });

      if ( user === false ) {
        this.snackBar.open('Пользователя с таким логином и паролем не существует. повторите попытку', '', {
          duration: 3000,
        });
      }
    }
  }
}
