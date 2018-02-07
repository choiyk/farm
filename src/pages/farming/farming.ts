import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController, Content, AlertController, Events } from 'ionic-angular';

import { StorageService } from './../../app/service/storage.service';
import { ServerService } from './../../app/service/server.service';

import { HomePage } from '../home/home';
import { FarmingEditPage } from '../farming-edit/farming-edit';
import { FarmingDetailPage } from './../farming-detail/farming-detail';

import { MyCrop } from './../../app/domain/MyCrop';
import { Farming } from './../../app/domain/Farming';
import { Pagination } from './../../app/domain/Pagination';

@Component({
  selector: 'page-farming',
  templateUrl: 'farming.html'
})
export class FarmingPage implements OnInit {
  @ViewChild(Content) content: Content;
  page: {pid: number, name: string};
  myCrops: MyCrop[];
  farmings: Farming[];
  pagination: Pagination;
  deleteIndex: number;
  selectedCrop: string;
  checkAlarm: number;

  constructor(public events: Events, public navCtrl: NavController, public navParams:NavParams, public menuCtrl: MenuController, private storage: StorageService, private server: ServerService, public alertCtrl: AlertController) {
    this.page = {pid:this.navParams.get('pid'), name:this.navParams.get('name')};
    this.selectedCrop = "내 작물";
    this.checkAlarm = 0;

    this.events.subscribe('reloadFarming',() => {
      this.farmings.splice(this.deleteIndex, 1);
    });
  }

  ngOnInit() {
    this.storage.getUser().then(user=>{
      this.server.getMyCrops(user.id).then(data=>this.myCrops = data);
      this.pagination = new Pagination(user.id, 0, 1, 10, 0, 0);
      this.server.getFarming(this.pagination).then(data=>this.farmings = data);
    });
  }

  openMenu() {
    this.menuCtrl.open();
  }

  goFarmingEdit(){
    this.navCtrl.push(FarmingEditPage, {pid: this.page.pid});
  }

  goFarmingDetail(id: number, index:number){
    this.deleteIndex = index;
    this.navCtrl.push(FarmingDetailPage, {id:id, pid: this.page.pid});
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  showMyCrop() {
    let alert = this.alertCtrl.create();
    alert.setTitle('내 작물');

    alert.addInput({
      type:'radio',
      label: "전체",
      value: "-1"
    });
    for(let i=0; i<this.myCrops.length; i++){
      alert.addInput({
        type:'radio',
        label: this.myCrops[i].crop,
        // value: String(this.myCrops[i].id)
        value: String(i)
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        let cropId: number;
        if(Number(data)===-1){ 
          cropId = 0;
          this.selectedCrop = "내 작물";
        }
        else{ 
          cropId = this.myCrops[Number(data)].id;
          this.selectedCrop = this.myCrops[Number(data)].crop;
        }
        
        this.pagination.sb = cropId;
        this.pagination.pg = 1;
        this.server.getFarming(this.pagination).then(data=>this.farmings = data);
      }
    });
    alert.present();
  }

  showAlarm(){
    this.checkAlarm = this.checkAlarm===1?0:1;
    if(this.checkAlarm===1){
      this.pagination.ab = 1;
    }
    else{
      this.pagination.ab = 0;
    }
    this.pagination.pg = 1;
    this.server.getFarming(this.pagination).then(data=>this.farmings = data);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.pagination.pg = this.pagination.pg+1;
      this.server.getFarming(this.pagination).then(data =>{
        for(let i=0; i<data.length; i++){
          this.farmings.push(data[i]);
        }
      });
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.pagination.pg = 1;
      this.server.getFarming(this.pagination).then(data=>this.farmings = data);
      refresher.complete();
    }, 2000);
  }
  
}
