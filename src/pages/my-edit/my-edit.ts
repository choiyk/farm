import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';

import { StorageService } from './../../app/service/storage.service';
import { AuthService } from './../../app/service/auth.service';

import { LoginPage } from './../login/login';

import { User } from './../../app/domain/User';

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
  user: User;
  pw: string;
  pw2: string;
  nickname: string;
  isMatchPw: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public events: Events, private toastCtrl: ToastController, private storage: StorageService, private authService: AuthService) {
    this.storage.getUser().then(user=>this.user = user);
    this.isMatchPw=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEditPage');
  }

  logout(){
    this.storage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

  editMy(){
    if(this.isNull(this.pw) && this.isNull(this.nickname)){}
    else if(this.isMatchPw===false){
      this.presentToast('비밀번호가 다릅니다.');
    }
    else{
      if(this.isNull(this.pw)===false && this.isMatchPw){
        this.user.pw = this.pw;
        console.log('비밀번호 변경');
      }
      if(this.isNull(this.nickname)===false){
        this.user.nickname = this.nickname;
        console.log('닉네임 변경');
      }
      this.authService.saveUser(this.user).then(apiResult=>{
        if(apiResult.success){
          this.pw = null;
          this.pw2 = null;
          this.nickname = null;
          this.storage.setUser(this.user).then(data=>{
            this.events.publish('reloadCurrentUser');
          });
          this.presentToast("저장되었습니다.");
        }
        else{
          this.pw = null;
          this.pw2 = null;
          this.nickname = null;
          this.presentToast(apiResult.message);
        }
      });
    }
    
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '회원탈퇴',
      subTitle: '탈퇴하면 모든 데이터가 사라집니다. 탈퇴하시겠습니까?',
      buttons: ['OK']
    });
    alert.present();
  }

  checkPw($event){
    if(this.pw!=this.pw2){
      this.isMatchPw = false;
    }
    else{
      this.isMatchPw = true;
    }
  }

  isNull(s : string) : boolean{
    if(s === null || s === undefined || s.length === 0) return true;
    else return false;
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
