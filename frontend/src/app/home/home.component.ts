import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./extras/animate.scss', './extras/lineicons.scss', './home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(protected http: HttpClient, private spinner: NgxSpinnerService) { }

  reset() {
    this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3000);
    const host = `${environment.apiHost}/extras/rotate`;
    this.http.get(host).toPromise()
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

  scrollTo(className: string):void {
    const elementList = document.querySelectorAll(className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
 }

  ngOnInit() {
    let navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navbarToggler?.addEventListener("click", function () {
      console.log("clicked");
      navbarToggler?.classList.toggle("active");
      navbarCollapse?.classList.remove("show");
    });

    
  }

}
