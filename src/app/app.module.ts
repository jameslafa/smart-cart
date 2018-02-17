import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { UserService } from '../services/user-service';
import { ShoppingCartService } from '../services/shopping-cart-service';
import { ItemService } from '../services/item-service';
import { RecommendationService } from '../services/recommendation-service';

import { ShoppingCartPage } from '../pages/shoppingCart/shoppingCart';
import { ScanPage } from '../pages/scan/scan';
import { StoreMapPage } from '../pages/storeMap/storeMap';
import { ProfilePage } from '../pages/profile/profile';
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
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingCartPage,
    ScanPage,
    StoreMapPage,
    ProfilePage,
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
