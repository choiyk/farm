import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController, Events } from 'ionic-angular';

import { AuthService } from './../../app/service/auth.service';
import { StorageService } from './../../app/service/storage.service';

import { User } from './../../app/domain/User';

import { JoinPage } from './../join/join';
import { HomePage } from './../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  private user : User;
  isEmail : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private storage: StorageService, private authService : AuthService, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.user = new User();
    this.storage.getId().then(id=>{console.log('id'+id)});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    if(this.isNull(this.user.email) || this.isNull(this.user.pw)){
      this.presentToast("모든 항목을 입력해주세요.");
    }
    else if(!this.isEmail){
      this.presentToast("이메일 형식이 옳바르지 않습니다.");
    }
    else{
      this.showLoading();
      this.authService.login(this.user).then(apiResult=>{
        if(apiResult.success){
          this.user = apiResult.data;
          this.storage.setUser(this.user).then(data=>this.events.publish('reloadCurrentUser'));
          this.presentToast(apiResult.message);
          this.goHome();
        }
        else{
          this.user.email="";
          this.user.pw="";
          this.presentToast(apiResult.message);
        }
      });
    }
  }

  checkEmail($event){
    let pattern=new RegExp("^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$");
    this.isEmail=pattern.test(this.user.email);
  }

  isNull(s : string) : boolean{
    if(s === null || s === undefined || s.length === 0) return true;
  }

  goJoin(){
    this.navCtrl.push(JoinPage);
  }

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
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
