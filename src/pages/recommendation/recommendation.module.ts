import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RecommendationPage } from './recommendation';

@NgModule({
  declarations: [
    RecommendationPage
  ],
  imports: [
    IonicPageModule.forChild(RecommendationPage)
  ],
  entryComponents: [
    RecommendationPage
  ]
})

export class RecommendationPageModule { }