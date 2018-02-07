import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.storage.get('id').then((val) => {
      console.log('Your id is', val);
    });
    this.storage.get('nickname').then((val) => {
      console.log('Your nickname is', val);
    });
  }

}
