import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmingEditPage } from './farming-edit';

@NgModule({
  declarations: [
    FarmingEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmingEditPage),
  ],
})
export class FarmingEditPageModule {}
