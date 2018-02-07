import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';

import { ServerService } from './../../app/service/server.service';

import { FarmingEditPage } from './../farming-edit/farming-edit';

import { Farming } from './../../app/domain/Farming';

/**
 * Generated class for the FarmingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farming-detail',
  templateUrl: 'farming-detail.html',
})
export class FarmingDetailPage {
  page: {pid: number, name: string};
  farming: Farming;

  constructor(public events:Events, public navCtrl: NavController, public navParams: NavParams, private serevr: ServerService, private toastCtrl: ToastController) {
    
    if(this.navParams.get('pid')===1){
      this.page = {pid:this.navParams.get('pid'), name:"영농일기"};
    }

    this.serevr.getFarmingById(this.navParams.get('id')).then(data=>this.farming = data);

    this.events.subscribe('reloadFarmings',() => {
      this.serevr.getFarmingById(this.navParams.get('id')).then(data=>this.farming = data);
    });
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmingDetailPage');
  }

  edit(id:number){
    this.navCtrl.push(FarmingEditPage, {id:id, pid:this.navParams.get('pid')});
  }

  delete(id: number){
    this.serevr.deleteFarming(id).then(data => {
      this.presentToast(data);
      this.events.publish('deleteFarming');
      this.navCtrl.pop();
    });
  }

  presentToast(m){
    let toast = this.toastCtrl.create({
      message: m,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
