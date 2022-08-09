import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terminosCondiciones',
  templateUrl: './terminosCondiciones.component.html',
  styleUrls: ['./terminosCondiciones.component.scss']
})
export class TerminosCondicionesComponent implements OnInit {

  constructor(private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Refund Policy')
  }

}
