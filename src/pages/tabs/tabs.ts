import { Component } from '@angular/core';

import { ShoppingCartPage } from '../shoppingCart/shoppingCart';
import { ScanPage } from '../scan/scan';
import { StoreMapPage } from '../storeMap/storeMap';
import { ProfilePage } from '../profile/profile';
import { MissingItemPage } from '../missing-item/missing-item';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ShoppingCartPage;
  tab2Root = ScanPage;
  tab3Root = StoreMapPage;
  tab4Root = MissingItemPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
