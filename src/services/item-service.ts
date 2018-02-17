import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ItemService {
  items = {
    'X000N7TXLZ': { name: 'Soldering Iron Kit', price: 29.95, category: 'DIY', img: 'assets/items/X000N7TXLZ.jpg' },
    '4046719386918': { name: '3M Pelto Optime III', price: 17.75, category: 'DIY', img: 'assets/items/4046719386918.jpg' }
  }

  constructor(private storage: Storage) { }

  getItem(itemCode) {
    return this.items[itemCode]
  }
}