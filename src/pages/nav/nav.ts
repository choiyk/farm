import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, List, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { FarmingPage } from '../farming/farming';
import { QuestionBoardPage } from './../questionBoard/questionBoard';
import { ShareBoardPage } from './../shareBoard/shareBoard';
import { FarmingEditPage } from './../farming-edit/farming-edit';
import { MyPage } from './../my/my';

/**
 * Generated class for the NavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nav',
  templateUrl: 'nav.html',
})
export class NavPage {

  rootPage: any = HomePage;

  pages: Array<{title: string, subMenu: Array<{title: string, component: any}>}>;

  constructor(public navCtrl: NavController, private app: App, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      //{ title: 'List', component: ListPage }
      {title: '영농일기', subMenu:[{title:'영농일기', component: FarmingPage}, {title:'내 알람', component: FarmingPage}]},
      {title: '영농 기술 공유 게시판', subMenu:[{title:'병해충 관리', component:FarmingPage}, {title:'재배법 리뷰', component:FarmingPage}]},
      {title: '질문게시판', subMenu:[{title:'질문게시판', component: FarmingPage}]}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need

      platform.registerBackButtonAction(() => {


        //uncomment this and comment code below to to show toast and exit app
        // if (this.backButtonPressedOnceToExit) {
        //   this.platform.exitApp();
        // } else if (this.nav.canGoBack()) {
        //   this.nav.pop({});
        // } else {
        //   this.showToast();
        //   this.backButtonPressedOnceToExit = true;
        //   setTimeout(() => {

        //     this.backButtonPressedOnceToExit = false;
        //   },2000)
        // }

        if(this.navCtrl.canGoBack()){
          this.navCtrl.pop();
        }else{
          this.platform.exitApp();
        }
      });
    });


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goMy(){
    this.navCtrl.push(MyPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
    // var nav = this.app.getRootNav();
    // nav.push(page.component);
  }

}
