import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events, Content } from 'ionic-angular';
// import { Keyboard } from '@ionic-native/keyboard';

import { ServerService } from './../../app/service/server.service';
import { StorageService } from './../../app/service/storage.service';

import { MyCrop } from './../../app/domain/MyCrop';
import { User } from './../../app/domain/User';

/**
 * Generated class for the CroplistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-croplist',
  templateUrl: 'croplist.html',
})
export class CroplistPage {
  @ViewChild(Content) content: Content;
  cuser: User;
  myCrops: MyCrop[];
  edit: MyCrop;
  editIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private server: ServerService, private storage: StorageService, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.storage.getUser().then(user=>{
      this.cuser = user;
      this.server.getMyCrops(user.id).then(data=>this.myCrops = data);
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CroplistPage');
  }

  editMyCrop(c, i){
    this.edit = new MyCrop();
    this.edit.id = c.id;
    this.edit.user = c.user;
    this.edit.crop = c.crop;
    this.editIndex = i;
  }

  saveMyCrop(){
    if(this.isNull(this.edit.crop)){
      this.presentToast("작물을 입력해주세요.");
    }
    else{
      this.server.saveMyCrop(this.edit).then(data=>{
        this.myCrops[this.editIndex].crop = this.edit.crop;
        this.presentToast(data);
        this.edit=null;
      });
    }
  }

  deleteMyCrop(c, i){
    let alert = this.alertCtrl.create({
      title: '내 작물 삭제',
      message: '내 작물을 삭제하시면 영농일지도 삭제됩니다. 삭제하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '삭제',
          handler: () => {
            this.server.deleteMyCrop(c.id).then(data=>this.presentToast(data));
            this.myCrops.splice(i, 1);
          }
        }
      ]
    });
    alert.present();
  }

  addMyCrop(){
    let alert = this.alertCtrl.create({
      title: '내 작물 추가',
      inputs: [
        {
          name: 'newcrop',
          placeholder: '작물을 입력해주세요.'
        }
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '추가',
          handler: data => {
            if(this.isNull(data.newcrop)){
              this.presentToast("작물을 입력해주세요.");
            }
            else{
              let newMyCrop = new MyCrop();
              newMyCrop.id=0;
              newMyCrop.crop = data.newcrop;
              newMyCrop.user = this.cuser;
              this.server.saveMyCrop(newMyCrop).then(data=>{
                this.server.getMyCrops(this.cuser.id).then(data=>{
                  this.myCrops = data;
                });
                this.presentToast(data);
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  isNull(s : any) : boolean{
    if(s === null || s === undefined || s.length === 0) return true;
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

  scrollToTop() {
    this.content.scrollToTop();
  }

}
