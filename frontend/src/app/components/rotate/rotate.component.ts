import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rotate',
  templateUrl: './rotate.component.html',
  styleUrls: ['./rotate.component.scss']
})
export class RotateComponent implements OnInit {

  constructor(protected http: HttpClient, private spinner: NgxSpinnerService) { }

  reset() {
    this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3000);
    const host = `${environment.apiHost}/extras/rotate`;
    this.http.post(host,{}).toPromise()
    .then((result) => {
      console.warn(result);
      alert('The rotation may take 1 minute to complete.');
    }).catch((err) => {
      alert('An error occurred.')
      console.log(err);
    }).finally(() => {
      this.spinner.hide();
    })
  }

  ngOnInit() {
  }

}
