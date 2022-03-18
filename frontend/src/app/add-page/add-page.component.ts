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
  itemForm!: FormGroup;
  ipDetail!: PageType;
  constructor(
    private pageService: PageService, 
    private modalService: BsModalService,
    private route: ActivatedRoute
    ) { }

  async ngOnInit() {
    // this.items = await this.pageService.getItems();
    const consultaIp: CurrentIpType = this.route.snapshot.data.currentIP;
    this.currentIp = consultaIp ? consultaIp.ip : '';

    await this.loadIpDetail();
    console.log('this.ipDetail', this.ipDetail)
    this.itemForm = new FormGroup({
      ip: new FormControl(this.currentIp),
      description: new FormControl(''),
      organization: new FormControl(this.ipDetail.organization),
      region: new FormControl(this.ipDetail.region),
      score: new FormControl(this.ipDetail.fraud_score),
    });
    
  }

  async loadIpDetail(){
    this.ipDetail = await this.pageService.getIpDetails(this.currentIp);
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
