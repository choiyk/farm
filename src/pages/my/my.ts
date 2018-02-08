import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content, Events } from 'ionic-angular';
import { MyEditPage } from './../my-edit/my-edit';

import { StorageService } from './../../app/service/storage.service';

/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {
  @ViewChild(Content) content: Content;
  cuser: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public events: Events, private storage: StorageService) {
    this.storage.getUser().then(user=>this.cuser = user.nickname);

    this.events.subscribe('reloadCurrentUser', () =>{
      this.storage.getUser().then(user=>this.cuser = user.nickname);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }

  openMenu() {
    this.menuCtrl.open();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  goMyEdit(){
    this.navCtrl.push(MyEditPage);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        
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
