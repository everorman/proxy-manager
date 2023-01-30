import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalBasicComponent } from '../components/modalBasic/modalBasic.component';
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
  userForm: UntypedFormGroup = new UntypedFormGroup({});
  loginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new UntypedFormControl('', Validators.required)
  });
  bsModalRef?: BsModalRef;
  alerts: any[] = [];

  constructor(
    private modalService: BsModalService,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.userForm = fb.group({
      firstName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new UntypedFormControl('', Validators.required),
      passwordRepeat: new UntypedFormControl('', Validators.required)
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

  async onSubmit(form: UntypedFormGroup) {
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
      const result: any = await this.authService.signIn(val.email, val.password)
      console.log(result)
      if (result.error) {
        this.alerts.push({
          type: 'danger',
          msg: result.error,
          timeout: 5000
        });
      } else {
        if (result && result.data) {
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
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  get f() {
    return this.userForm.controls;
  }

}
