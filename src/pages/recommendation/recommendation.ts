import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

import { ShoppingCartService } from '../../services/shopping-cart-service';
import { ItemService } from '../../services/item-service';

@IonicPage({
  name: 'page-recommendation',
})
@Component({
  selector: 'page-recommendation',
  templateUrl: 'recommendation.html'
})
export class RecommendationPage {
  recommendation = null;
  ingredients = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private itemService: ItemService,
    private shoppingCartService: ShoppingCartService) {
    this.recommendation = navParams.get('recommendation');

    shoppingCartService.get().then((data) => {
      for (var ingredientCode of this.recommendation.ingredients){
        this.ingredients.push({
          present: Object.keys(data).indexOf(ingredientCode) > -1,
          name: this.itemService.getItem(ingredientCode).name
        })
      }

    });
  }

  // Before entering the page, fetch recipe data
  ionViewWillEnter() {
    console.log("Display recommendation: ", JSON.stringify(this.recommendation));
  }

  goBack(){
    console.log("Go back to shopping cart");
    this.navCtrl.pop();
  }
}