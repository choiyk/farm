import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the MyEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-edit',
  templateUrl: 'my-edit.html',
})
export class MyEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEditPage');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '회원탈퇴',
      subTitle: '탈퇴하면 모든 데이터가 사라집니다. 탈퇴하시겠습니까?',
      buttons: ['OK']
    });
    alert.present();
  }

}
