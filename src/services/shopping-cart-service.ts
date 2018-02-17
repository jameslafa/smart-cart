import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ShoppingCartService {

  constructor(private storage: Storage) { }

  addToCart(itemCode) {
    this.storage.get('shoppingCart').then((cart) => {
      if (cart == null) {
        cart = {}
      }

      if (cart[itemCode]) {
        cart[itemCode] += 1;
      } else {
        cart[itemCode] = 1;
      }

      this.save(cart);
      return cart;
    });
  }

  async getItemQuantity(itemCode) {
    return await this.storage.get('shoppingCart').then((cart) => {
      if (cart == null) {
        return 0;
      }
      if (cart[itemCode]) {
        return cart[itemCode];
      } else {
        return 0
      }
    });
  }

  get() {
    return this.storage.get('shoppingCart');
  }

  save(shoppingCart) {
    this.storage.set('shoppingCart', shoppingCart);
    console.log('ShoppingCartService.save called: ', JSON.stringify(shoppingCart));
  }

  clear() {
    console.log('ShoppingCartService.empty called');
    this.storage.set('shoppingCart', {});
  }
}