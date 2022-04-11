import { Component, Input, OnInit } from '@angular/core';
import { PageType } from '../types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() page!: PageType;
  
  constructor() { }

  ngOnInit() {
  }

}
