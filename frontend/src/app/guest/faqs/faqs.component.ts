import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {

  constructor(private title:Title, private titleService: TitleService) {
    
  }

  ngOnInit(): void {
    this.titleService.updateTitle('FAQs');
  }
}
