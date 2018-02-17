import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ItemService {

  constructor(private storage: Storage) { }

  // Harcoded item list for the demo
  items = {
    '818290012586': { code: '818290012586', name: 'Chonani Fruit', price: 2.65, category: 'Dairy', img: 'assets/items/818290012586.jpg', diet: { vegetarian: true, vegan: false, glutenfree: true, lactosefree: false } },
    '025293001961': { code: '025293001961', name: 'Silk Soy Yogurt', price: 2.95, category: 'Dairy', img: 'assets/items/025293001961.jpg', diet: { vegetarian: true, vegan: true, glutenfree: true, lactosefree: false } },
    '030000010204': { code: '030000010204', name: 'Quaker Oats', price: 3.95, category: 'Cereals', img: 'assets/items/030000010204.jpg', diet: { vegetarian: true, vegan: true, glutenfree: false, lactosefree: true } },
    '720379501181': { code: '720379501181', name: 'Organic Dried Apricots', price: 4.75, category: 'Fruits', img: 'assets/items/720379501181.jpg', diet: { vegetarian: true, vegan: true, glutenfree: true, lactosefree: true } },
  }

  // Get item details
  getItem(itemCode) {
    return this.items[itemCode]
  }

  // Get all items with details
  allItems(){
    return this.items;
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