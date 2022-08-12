import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-terminosCondiciones',
  templateUrl: './terminosCondiciones.component.html',
  styleUrls: ['./terminosCondiciones.component.scss'],
})
export class TerminosCondicionesComponent implements OnInit {

  constructor(
    private title:Title, 
    private titleService: TitleService,
  ){ }

  ngOnInit(): void {
    this.titleService.updateTitle('Refund Policy')
  }

}
