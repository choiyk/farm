import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmingDetailPage } from './farming-detail';

@NgModule({
  declarations: [
    FarmingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmingDetailPage),
  ],
})
export class FarmingDetailPageModule {}
