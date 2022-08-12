import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TitleService } from '../services/title/title.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestComponent implements AfterViewInit {
  titleBar = 'FAQs';
  constructor(
    private router: Router,
    private titleService: TitleService,
    private  renderer:Renderer2, 
    private ref: ChangeDetectorRef
  ) { }
  title$!: Observable<string>;

  back(): void {
    this.router.navigate(['/guest'])
  }

  ngAfterViewInit() {

    this.title$ = this.titleService.title$;
    this.title$.subscribe((title: string) => {
      if(title){
        this.titleBar = title;
        this.ref.detectChanges();
      }
      console.log('Recibido', title);
    })
    
  }

}
