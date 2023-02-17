import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rotate',
  templateUrl: './rotate.component.html',
  styleUrls: ['./rotate.component.scss']
})
export class RotateComponent implements OnDestroy {
  id: number = 0;
  private sub: any;
  constructor(protected http: HttpClient, private spinner: NgxSpinnerService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  reset() {
    this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3000);
    const host = `${environment.apiHost}/extras/rotate`;
    this.http.post(host, { id: this.id }).toPromise()
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
