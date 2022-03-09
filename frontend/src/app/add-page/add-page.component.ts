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
  items: PageType[] = [];
  currentIp: string = '';
  modalRef!: BsModalRef;
  itemForm = new FormGroup({
    url: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
  });
  constructor(private pageService: PageService, private modalService: BsModalService) { }

  async ngOnInit() {
    this.items = await this.pageService.getItems();
    const consultaIp: {ip:string} = await this.pageService.currentIp();
    this.currentIp = consultaIp ? consultaIp.ip : '';
  }


  openAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async addItem() {
    this.modalRef.hide();

    await this.pageService.addItem(this.itemForm.value)
    this.items = await this.pageService.getItems();
    console.log('Guardando...', this.itemForm.value);
  }


}
