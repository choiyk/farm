import { Type } from './../../app/domain/Type';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';

import { LoginPage } from './../login/login';

import { User } from './../../app/domain/User';

import { ServerService } from './../../app/service/server.service';
import { AuthService } from './../../app/service/auth.service';

/**
 * Generated class for the JoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join',
  templateUrl: 'join.html',
})
export class JoinPage implements OnInit{
  private serverService: ServerService;
  loading: Loading;
  private user : User;
  isEmail : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, serverService: ServerService, private authService: AuthService, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.serverService = serverService;
    this.user = new User();
    this.user.id=0;
    this.serverService.getType(1)
    .then(data=>{
      this.user.type = data;
    })
  }

  ngOnInit(){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinPage');
  }

  join(){
    if(this.isNull(this.user.email) || this.isNull(this.user.nickname) || this.isNull(this.user.pw)) {
      this.presentToast("모든 항목을 입력해주세요.");
    }
    else if(!this.isEmail){
      this.presentToast("이메일 형식이 옳바르지 않습니다.");
    }
    else{
      this.showLoading();
      this.authService.saveUser(this.user).then(apiResult=>{
        if(apiResult.success){
          this.presentToast("회원가입이 완료되었습니다.");
          this.goLogin();
        }
        else{
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
  
  goLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
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
