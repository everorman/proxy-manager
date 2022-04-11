import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modalBasic',
  templateUrl: './modalBasic.component.html',
  styleUrls: ['./modalBasic.component.scss']
})
export class ModalBasicComponent implements OnInit {

  title?: string;
  closeBtnName?: string;
  modalBody: any[] = [];
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
  }

}
