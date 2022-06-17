import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { SearchUserType } from './searchUser.type';

@Component({
  selector: 'app-search-user',
  templateUrl: './searchUser.component.html',
  styleUrls: ['./searchUser.component.scss']
})
export class SearchUserComponent implements OnInit, OnDestroy {
  @Input() formControl!: FormControl;
  subscription!: Subscription;
  subscriptionSearch!: Subscription | undefined;
  users: SearchUserType[] = [];
  searchForm = new FormGroup({
    key: new FormControl(''),
  })
  constructor(private userService: UserService) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionSearch) {
      this.subscriptionSearch.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptionSearch = this.searchForm.get("key")?.valueChanges.subscribe(selectedValue => {
      console.log('key value changed')
      this.searchUser(selectedValue);

    })
  }

  searchUser(key:string) {
    console.log('searchUser');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.userService.search(key)
      .subscribe((res) => {
        this.users = (res as SearchUserType[]);
        console.log('searchUser', res);
      })
  }



}
