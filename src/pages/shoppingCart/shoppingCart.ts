import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ShoppingCartService } from '../../services/shopping-cart-service';
import { ItemService } from '../../services/item-service';

@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shoppingCart.html'
})
export class ShoppingCartPage {

  shoppingCart = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private shoppingCartService: ShoppingCartService,
    private itemService: ItemService) { }


  // Initialize the page.
  // 1. retreive the shopping cart content
  init() {
    console.log('ShoppingCartPage.init, load shopping cart.')
    this.shoppingCart = [];
    this.shoppingCartService.get().then((value) => {
      if (value) {
        // Transform dictionary in a list of
        for (var code of Object.keys(value)) {
          var item = this.itemService.getItem(code);
          if (item) {
            this.shoppingCart.push({
              "code": code,
              "quantity": value[code],
              "name": item.name,
              "price": item.price,
              "category": item.category,
              "img": item.img
            });
          }
        }
        console.log('ShoppingCart: ', JSON.stringify(this.shoppingCart));
      }
      else {
        console.log('Shopping cart is empty');
      }
    });
  }

  // Get shopping cart content
  ionViewWillEnter() {
    console.log('ShoppingCartPage.enter, load shopping cart.')
    this.init();
  }

  // Clear the shopping cart after confirmation
  clear() {
    let alert = this.alertCtrl.create({
      title: 'Empty Shopping Cart',
      message: 'Are you sure that you want to empty your shopping cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Empty Shopping Cart cancelled.');
          }
        },
        {
          text: 'Empty',
          handler: () => {
            console.log('Empty Shopping Cart');
            this.shoppingCartService.clear();
            this.init();
          }
        }
      ]
    });
    alert.present();
  }
}
