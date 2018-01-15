import "froala-editor/js/froala_editor.pkgd.min.js";

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { CKEditorModule } from 'ng2-ckeditor';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FarmingPage } from '../pages/farming/farming';
import { QuestionBoardPage } from './../pages/questionBoard/questionBoard';
import { ShareBoardPage } from './../pages/shareBoard/shareBoard';
import { FarmingEditPage } from './../pages/farming-edit/farming-edit';
import { FarmingDetailPage } from './../pages/farming-detail/farming-detail';
import { MyPage } from './../pages/my/my';
import { MyEditPage } from './../pages/my-edit/my-edit';
import { JoinPage } from './../pages/join/join';
import { LoginPage } from './../pages/login/login';
import { NavPage } from './../pages/nav/nav';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

function getPages(){
  return [
    MyApp,
    HomePage,
    ListPage,
    FarmingPage,
    QuestionBoardPage,
    ShareBoardPage,
    FarmingEditPage,
    FarmingDetailPage,
    MyPage,
    MyEditPage,
    LoginPage,
    JoinPage,
    NavPage
  ]
}

@NgModule({
  declarations: getPages(),
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    CKEditorModule
  ],
  bootstrap: [IonicApp],
  entryComponents: getPages(),
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
