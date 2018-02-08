import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityEditPage } from './community-edit';

@NgModule({
  declarations: [
    CommunityEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityEditPage),
  ],
})
export class CommunityEditPageModule {}
