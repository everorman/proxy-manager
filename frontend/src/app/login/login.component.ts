import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalBasicComponent } from '../modals/modalBasic/modalBasic.component';
import { AuthService } from '../services/auth/auth.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showSigUp = false;
  userForm: FormGroup = new FormGroup({});
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private fb: FormBuilder,private authService: AuthService) {
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
    if(form.valid){
      try {
        const result = await this.authService.signUp(form.value);
        console.log(result);
      } catch (error) {
        this.openModal('Error', `The email entered already exists`)
      }
      
    }
  }

  get f() {
    return this.userForm.controls;
  }

}
