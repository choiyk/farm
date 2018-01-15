import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

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
export class FarmingEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
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

}
