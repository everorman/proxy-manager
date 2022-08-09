import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  titleBar = 'FAQs';
  constructor(private router: Router, private title:Title) {}

  back(): void {
    this.router.navigate(['/guest'])
  }

  ngOnInit() {
    this.titleBar = this.title.getTitle();
  }

}
