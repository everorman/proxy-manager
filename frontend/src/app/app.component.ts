import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { TokenStorageService } from './services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'proxy-manager';
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService){
    setTheme('bs4');
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      
    }
  }
  
  


}
