import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageService } from '../services/page/page.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { CurrentIpType, PageType } from '../types';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  QUALITY_KEY = 'dNyiZ0Btm24v9PmFR3cfmZJVZYOPVytH';
  items: PageType[] = [];
  currentIp: string = '';
  modalRef!: BsModalRef;
  itemForm = new FormGroup({
    url: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
  });
  constructor(
    private pageService: PageService, 
    private modalService: BsModalService,
    private route: ActivatedRoute
    ) { }

  async ngOnInit() {
    // this.items = await this.pageService.getItems();
    console.log(this.route.snapshot.data);
    const consultaIp: CurrentIpType = this.route.snapshot.data.currentIP;
    this.currentIp = consultaIp ? consultaIp.ip : '';
  }

  async loadIpDetail(){
    const result = await this.pageService.getIpDetails(this.QUALITY_KEY, this.currentIp);
    console.log(result);
  }


  openAdd(template: TemplateRef<any>) {
    this.loadIpDetail();
    this.modalRef = this.modalService.show(template);
  }

  async addItem() {
    this.modalRef.hide();

    await this.pageService.addItem(this.itemForm.value)
    this.items = await this.pageService.getItems();
    console.log('Guardando...', this.itemForm.value);
  }


}
