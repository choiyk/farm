import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Content } from 'ionic-angular';

import { HomePage } from '../home/home';
import { FarmingEditPage } from '../farming-edit/farming-edit';
import { FarmingDetailPage } from './../farming-detail/farming-detail';

@Component({
  selector: 'page-farming',
  templateUrl: 'farming.html'
})
export class FarmingPage {
  @ViewChild(Content) content: Content;

  items = [];

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
  }

  openMenu() {
    this.menuCtrl.open();
  }

  goFarmingEdit(){
    this.navCtrl.push(FarmingEditPage);
  }

  goFarmingDetail(){
    this.navCtrl.push(FarmingDetailPage);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
}
