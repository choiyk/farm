import { Component, ViewChild, Injector } from '@angular/core';
import { Nav, Platform, List, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StorageService } from './service/storage.service';

import { HomePage } from '../pages/home/home';
import { FarmingPage } from '../pages/farming/farming';
import { FarmingEditPage } from './../pages/farming-edit/farming-edit';
import { MyPage } from './../pages/my/my';
import { LoginPage } from './../pages/login/login';
import { CroplistPage } from './../pages/croplist/croplist';

@Component({
  selector: 'app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, subMenu: Array<{id: number, title: string, component: any}>}>;
  nickname : string;

  constructor(private app: App, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, protected injector: Injector, public events: Events, private storage: StorageService) {
    this.initializeApp();

    this.storage.getUser().then(user=>{
      if(user===null){
        this.rootPage = LoginPage;
      }
      else{
        this.nickname = user.nickname;
        this.rootPage = FarmingPage;
      }
    });

    this.events.subscribe('reloadCurrentUser',() => {
      this.storage.getUser().then(user=>{
        if(user===null){
          this.nickname = "null";
        }
        else{
          this.nickname = user.nickname;
        }
      });
    });
    

    // this.storage.getNickname().then(nickname=>{
    //   if(nickname==null){
    //     this.rootPage = LoginPage;
    //   }
    //   else{
    //     this.rootPage = HomePage;
    //   }
    //   this.cuser = new CurrentUser(); 
    //   this.cuser.nickname = nickname
    // });

    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      //{ title: 'List', component: ListPage }
      {title: '영농일기', subMenu:[{id:1, title:'영농일기', component: FarmingPage}, {id:3, title:'내 작물', component: CroplistPage}]},
      {title: '영농 기술 공유 게시판', subMenu:[{id:4, title:'병해충 관리', component:FarmingPage}, {id:5, title:'재배법 리뷰', component:FarmingPage}]},
      {title: '질문게시판', subMenu:[{id:6, title:'질문게시판', component: FarmingPage}]}
    ];

/*
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

        if(this.nav.canGoBack()){
          this.nav.pop();
        }else{
          this.platform.exitApp();
        }
      });
    });
*/

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
    var nav = this.app.getRootNav();
    nav.push(MyPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    //this.storage.setPage(page.id);
    var nav = this.app.getRootNav();
    nav.push(page.component,{pid:page.id, name:page.title});
  }

}
