import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageService } from '../services/page/page.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { PageType } from '../types';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  items:PageType[] = [];
  modalRef!: BsModalRef;
  itemForm = new FormGroup({
    url: new FormControl(''),
    descripcion: new FormControl(''),
    status: new FormControl(''),
  });
  constructor(private pageService:PageService, private modalService: BsModalService) { }
  
  ngOnInit() {
    this.items = this.pageService.getItems();
  }

  openAddCola(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  addCola(){
    this.modalRef.hide();
    this.pageService.addItem(this.itemForm.value)
    console.log('Guardando...', this.itemForm.value);
  }


}
