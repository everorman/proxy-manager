import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageService } from '../services/page/page.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { CurrentIpType, PageType } from '../types';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertComponent } from 'ngx-bootstrap/alert';


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
  searchForm = new FormGroup({
    seachText: new FormControl(''),
  });;
  ipRemoteDetail!: PageType;
  ipRecord!:PageType;
  totalPages: number = 0;
  currentPage: number = 0;
  alerts: any[] = [];
  constructor(
    private pageService: PageService, 
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) {
      
    }

  async ngOnInit() {
    const resultRequest =  await this.pageService.getItems();
    this.totalPages = resultRequest.totalPages;
    this.currentPage = resultRequest.currentPage;
    this.items = resultRequest.result;
    const consultaIp: CurrentIpType = this.route.snapshot.data.currentIP;
    this.currentIp = consultaIp ? consultaIp.ip : '';

    await this.loadIpDetail();
    await this.getIpRecord();
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
      console.log('Existe:', checkIfIpExist)
      if(checkIfIpExist){
        await this.pageService.updateSite({...this.itemForm.value, id:checkIfIpExist.id});
      }
      await this.pageService.addItem(this.itemForm.value)
    }
    this.spinner.hide();
  }

  async pageChanged(event: PageChangedEvent) {
    this.spinner.show();
    const resultRequest =  await this.pageService.getItems(event.page);
    this.totalPages = resultRequest.totalPages;
    // this.currentPage = resultRequest.currentPage;
    this.items = resultRequest.result;
    this.spinner.hide();
  }

  async search(){
    this.spinner.show();
    const {seachText} = this.searchForm.value
    const resultRequest =  await this.pageService.seachIp(1,seachText);
    this.totalPages = resultRequest.totalPages;
    this.currentPage = resultRequest.currentPage;
    this.items = resultRequest.result;
    this.spinner.hide();
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }


}
