import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { RecommendationPage } from '../recommendation/recommendation';

import { ShoppingCartService } from '../../services/shopping-cart-service';
import { ItemService } from '../../services/item-service';
import { RecommendationService } from '../../services/recommendation-service';

@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shoppingCart.html'
})
export class ShoppingCartPage {

  shoppingCart = [];
  recommendations = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private shoppingCartService: ShoppingCartService,
    private itemService: ItemService,
    private recommendationService: RecommendationService) { }


  // Initialize the page.
  // 1. retreive the shopping cart content
  init() {
    console.log('ShoppingCartPage.init, load shopping cart.')
    this.shoppingCart = [];
    this.recommendations = [];
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
        if(this.shoppingCart.length > 0){
          this.recommendations = this.recommendationService.allRecipes();
        }
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

  showRecommendation(recommendation){
    this.navCtrl.push(RecommendationPage, {recommendation: recommendation});
  }
}
