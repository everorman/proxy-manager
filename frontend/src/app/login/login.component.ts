import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showSigUp = false;
  userForm:FormGroup = new FormGroup({});
  


  constructor(private fb: FormBuilder) {
    this.userForm = fb.group({
      name: new FormControl('', [
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
    },{
      validator: ConfirmedValidator('password', 'passwordRepeat')
    })
   }

  ngOnInit() {
  }

  showSigUpForm(){
    this.showSigUp = !this.showSigUp;
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Password', form.value.password);
    console.log('Password', form.value.passwordRepeat);
  }

  get f(){
    return this.userForm.controls;
  }

}
