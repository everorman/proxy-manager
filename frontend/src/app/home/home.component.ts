import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(protected http: HttpClient, private spinner: NgxSpinnerService) { }

  reset() {
    this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3000);
    this.http.get('https://proxy.everorman.com/api.php').toPromise()
    .then((result) => {
      console.warn(result);
      alert('La rotación puede demorar 1 minuto para completarse.');
    }).catch((err) => {
      alert('Ocurrió un error.')
      console.log(err);
    }).finally(() => {
      this.spinner.hide();
    })
  }

  ngOnInit() {
  }

}
