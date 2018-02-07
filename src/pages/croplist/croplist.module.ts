import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CroplistPage } from './croplist';

@NgModule({
  declarations: [
    CroplistPage,
  ],
  imports: [
    IonicPageModule.forChild(CroplistPage),
  ],
})
export class CroplistPageModule {}
