import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController, Events } from 'ionic-angular';

import { StorageService } from './../../app/service/storage.service';
import { ServerService } from './../../app/service/server.service';

import { MyCrop } from './../../app/domain/MyCrop';
import { Farming } from './../../app/domain/Farming';
import { User } from './../../app/domain/User';

/**
 * Generated class for the FarmingEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farming-edit',
  templateUrl: 'farming-edit.html',
})
export class FarmingEditPage implements OnInit {

  page: {pid: number, name: string};
  myCrops: MyCrop[];
  farming: Farming;
  selectedCrop:string;

  constructor(public events:Events, public navCtrl: NavController, public navParams:NavParams, public menuCtrl: MenuController, private storage: StorageService, private server: ServerService, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.page = {pid: this.navParams.get('pid'), name:""};
    
    if(this.navParams.get('id') && this.page.pid===1){  //영농일기 수정
      this.page.name = "영농일기 수정";
      this.server.getFarmingById(this.navParams.get('id')).then(data => {
        this.farming = data;
        this.selectedCrop = data.myCrop.crop;
      });
    }
    else if(this.page.pid===1){   //영농일기 신규 작성
      this.page.name = "새 영농일기 작성";
      this.farming = new Farming();
      this.farming.id=0;
      this.selectedCrop = "내 작물";
    }
    
  }

  ngOnInit() {
    this.storage.getUser().then(user=>{
      this.farming.user = user;
      this.server.getMyCrops(user.id).then(data=>{
        this.myCrops = data;
      });
    });
    // this.storage.getId().then(id=>{
    //   this.server.getUser(id).then(data=>this.farming.user=data);
    //   this.server.getMyCrops(id).then(data=>{
    //     this.myCrops = data;
    //   });
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmingEditPage');
  }

  openMenu() {
    this.menuCtrl.open();
  }
/*froala
  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: true,
    toolbarButtonsXS: ['bold', 'fontSize', '|', 'insertLink', 'insertImage', 'insertFile','alert'],
    toolbarButtonsSM: ['bold', 'fontSize', '|', 'insertLink', 'insertImage', 'insertFile','alert'],
    toolbarButtonsMD: ['bold', 'fontSize', '|', 'insertLink', 'insertImage', 'insertFile','alert'],
    height:270
  }
*/
d2(n: number): any{
  if(n<=9) return "0"+n;
  return n;
}

save(){
  this.farming.alarm = this.farming.alarm ? 1 : 0;
  if(this.isNull(this.farming.myCrop)) this.presentToast("작물을 선택해주세요.");
  else if(this.farming.alarm===1 && this.isNull(this.farming.startDate)) this.presentToast("날짜를 입력해주세요.");
  else if(this.isNull(this.farming.title)) this.presentToast("제목을 입력하세요.");
  else{
    this.server.saveFarming(this.farming).then(data=>{
      this.presentToast(data);
      this.events.publish('reloadFarmings');
      this.navCtrl.pop();
    });
  }
}

showMyCrop() {
  let alert = this.alertCtrl.create();
  alert.setTitle('내 작물');

  for(let i=0; i<this.myCrops.length; i++){
    alert.addInput({
      type:'radio',
      label: this.myCrops[i].crop,
      value: String(i)
    });
  }

  alert.addButton('Cancel');
  alert.addButton({
    text: 'OK',
    handler: data => {
      this.farming.myCrop = this.myCrops[Number(data)];
    }
  });
  alert.present();
}

addMyCrop() {
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
            newMyCrop.user = this.farming.user;
            this.server.saveMyCrop(newMyCrop).then(data=>{
              this.server.getMyCrops(this.farming.user.id).then(data=>{
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

}
