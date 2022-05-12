import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageService } from '../services/page/page.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { CurrentIpType, PageType } from '../types';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  QUALITY_KEY = 'dNyiZ0Btm24v9PmFR3cfmZJVZYOPVytH';
  items: PageType[] = [];
  currentIp: string = '';
  modalRef!: BsModalRef;
  itemForm!: FormGroup;
  ipRemoteDetail!: PageType;
  ipRecord!:PageType;
  constructor(
    private pageService: PageService, 
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) {
      // this.itemForm = new FormGroup({
      //   ip: new FormControl(this.currentIp),
      //   description: new FormControl(''),
      //   organization: new FormControl(''),
      //   region: new FormControl(''),
      //   score: new FormControl(''),
      // });
    }

  async ngOnInit() {
    this.items = await this.pageService.getItems();
    const consultaIp: CurrentIpType = this.route.snapshot.data.currentIP;
    this.currentIp = consultaIp ? consultaIp.ip : '';

    await this.loadIpDetail();
    await this.getIpRecord();
    console.log('this.ipDetail', this.ipRemoteDetail)
    this.itemForm = new FormGroup({
      ip: new FormControl(this.currentIp),
      description: new FormControl(''),
      organization: new FormControl(this.ipRemoteDetail.organization),
      region: new FormControl(this.ipRemoteDetail.region),
      score: new FormControl(this.ipRemoteDetail.score),
    });
    

    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    
  }

  private async loadIpDetail(){
    const result = await this.pageService.getIpDetails(this.currentIp);
    this.ipRemoteDetail = {
      ip: this.currentIp,
      description: '',
      organization: result.organization,
      region: result.region,
      score: result.fraud_score || 0
    }
  }

  private async getIpRecord(){
    const result = await this.pageService.getSite(this.currentIp);
    this.ipRecord = result;
  }

  


  openAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async addItem() {
    
    this.spinner.show;
    this.modalRef.hide();
    if(this.ipRecord && (this.ipRecord.ip === this.itemForm.value.ip)){
      await this.pageService.updateSite({...this.itemForm.value, id:this.ipRecord.id});
    }else{
      const checkIfIpExist:PageType = await this.pageService.getSite(this.itemForm.value.ip);
      if(checkIfIpExist){
        await this.pageService.updateSite({...this.itemForm.value, id:checkIfIpExist.id});
      }
      await this.pageService.addItem(this.itemForm.value)
    }
    this.items = await this.pageService.getItems();
    this.spinner.hide();
  }


}
