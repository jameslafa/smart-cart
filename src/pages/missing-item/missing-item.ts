import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { ItemService } from '../../services/item-service';

@Component({
  selector: 'page-missing-item',
  templateUrl: 'missing-item.html'
})
export class MissingItemPage {
  items = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private itemService: ItemService) {
    const allItems = this.itemService.allItems();
    for (var itemCode of Object.keys(allItems)){
      var item = allItems[itemCode];
      this.items.push(item);
    }
  }

  request(item){
    let toast = this.toastCtrl.create({
      message: item.name + ' has been requested. It will be delivered shortly to your cart.',
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });
    toast.present();
  }
}