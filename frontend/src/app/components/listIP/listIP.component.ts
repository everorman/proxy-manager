import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listIP',
  templateUrl: './listIP.component.html',
  styleUrls: ['./listIP.component.scss']
})
export class ListIPComponent implements OnInit {
  listado:any;

  constructor(
    protected http: HttpClient, 
    private spinner: NgxSpinnerService
  ) { }

  loadIp() {
    this.spinner.show();
    this.http.get('https://proxy.everorman.com/list.php').toPromise()
      .then((result) => {
        console.warn(result);
        this.listado = result;
      }).catch((err) => {
        alert('Ocurrió un error.')
        console.log(err);
      }).finally(() => {
        this.spinner.hide();
      })

  }

  ngOnInit() {
    this.loadIp();
  }

}
