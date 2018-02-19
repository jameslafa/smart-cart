import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { UserService } from '../services/user-service';
import { ShoppingCartService } from '../services/shopping-cart-service';
import { ItemService } from '../services/item-service';
import { RecommendationService } from '../services/recommendation-service';

import { ShoppingCartPage } from '../pages/shoppingCart/shoppingCart';
import { ScanPage } from '../pages/scan/scan';
import { StoreMapPage } from '../pages/storeMap/storeMap';
import { ProfilePage } from '../pages/profile/profile';
import { MissingItemPage } from '../pages/missing-item/missing-item';
import { RecommendationPage } from '../pages/recommendation/recommendation';
import { TabsPage } from '../pages/tabs/tabs';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    ShoppingCartPage,
    ScanPage,
    StoreMapPage,
    ProfilePage,
    MissingItemPage,
    RecommendationPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(RecommendationPage),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingCartPage,
    ScanPage,
    StoreMapPage,
    ProfilePage,
    MissingItemPage,
    RecommendationPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    UserService,
    ShoppingCartService,
    ItemService,
    RecommendationService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
