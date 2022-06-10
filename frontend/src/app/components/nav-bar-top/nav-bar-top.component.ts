import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'app-nav-bar-top',
  templateUrl: './nav-bar-top.component.html',
  styleUrls: ['./nav-bar-top.component.scss']
})
export class NavBarTopComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,) { }

  ngOnInit() {
  }

  logout(){
    console.log('Logout')
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
