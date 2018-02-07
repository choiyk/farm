import "froala-editor/js/froala_editor.pkgd.min.js";

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

//service
import { ServerService } from './service/server.service';
import { AuthService } from './service/auth.service';
import { StorageService } from './service/storage.service';

//editor
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { CKEditorModule } from 'ng2-ckeditor';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FarmingPage } from '../pages/farming/farming';
import { FarmingEditPage } from './../pages/farming-edit/farming-edit';
import { FarmingDetailPage } from './../pages/farming-detail/farming-detail';
import { MyPage } from './../pages/my/my';
import { MyEditPage } from './../pages/my-edit/my-edit';
import { JoinPage } from './../pages/join/join';
import { LoginPage } from './../pages/login/login';
import { CroplistPage } from './../pages/croplist/croplist';

function getPages(){
  return [
    MyApp,
    HomePage,
    FarmingPage,
    FarmingEditPage,
    FarmingDetailPage,
    MyPage,
    MyEditPage,
    LoginPage,
    JoinPage,
    CroplistPage
  ]
}

@NgModule({
  declarations: getPages(),
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    FormsModule,
    HttpModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    CKEditorModule
  ],
  bootstrap: [IonicApp],
  entryComponents: getPages(),
  providers: [
    ServerService,
    AuthService,
    StorageService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
