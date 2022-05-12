import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalBasicComponent } from '../modals/modalBasic/modalBasic.component';
import { AuthService } from '../services/auth/auth.service';
import { ConfirmedValidator } from './confirmed.validator';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showSigUp = false;
  userForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', Validators.required)
  });
  bsModalRef?: BsModalRef;
  alerts: any[] = [];

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.userForm = fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl('', Validators.required),
      passwordRepeat: new FormControl('', Validators.required)
    }, {
      validator: ConfirmedValidator('password', 'passwordRepeat')
    })
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/app');
    }
  }

  showSigUpForm() {
    this.showSigUp = !this.showSigUp;
  }

  openModal(title: string, body: string) {
    const initialState: ModalOptions = {
      initialState: {
        modalBody: body,
        title: title
      }
    };
    this.bsModalRef = this.modalService.show(ModalBasicComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  async onSubmit(form: FormGroup) {
    if (form.valid) {
      try {
        const result = await this.authService.signUp(form.value);
        console.log(result);
        this.alerts.push({
          type: 'success',
          msg: `User registered successfully`,
          timeout: 3000
        });
      } catch (error) {
        this.alerts.push({
          type: 'danger',
          msg: `The email entered already exists`,
          timeout: 3000
        });
      }

    }
  }

  async login() {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      const result = await this.authService.signIn(val.email, val.password)
      console.log(result)
      if (result.code > 0) {
        console.log("login result", result);
        this.router.navigateByUrl('/app');
      } else {
        this.alerts.push({
          type: 'danger',
          msg: result.message,
          timeout: 5000
        });
      }
    }
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  get f() {
    return this.userForm.controls;
  }

}
