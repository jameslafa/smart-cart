import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ItemService {

  constructor(private storage: Storage) { }

  // Harcoded item list for the demo
  items = {
    'X000N7TXLZ': { name: 'Soldering Iron Kit', price: 29.95, category: 'DIY', img: 'assets/items/X000N7TXLZ.jpg', diet: { vegetarian: true, vegan: true, glutenfree: true, lactosefree: true } },
    '4046719386918': { name: '3M Pelto Optime III', price: 17.75, category: 'DIY', img: 'assets/items/4046719386918.jpg', diet: { vegetarian: true, vegan: false, glutenfree: true, lactosefree: true } }
  }

  // Get item details
  getItem(itemCode) {
    return this.items[itemCode]
  }

  // Check that an item match the user profile
  matchDiet(item, userProfile) {
    for (var attribute of Object.keys(userProfile)) {
      if (userProfile[attribute] && !item.diet[attribute]) {
        return attribute;
      }
    }
    return true;
  }
}