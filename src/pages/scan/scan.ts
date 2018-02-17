import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ShoppingCartService } from '../../services/shopping-cart-service';
import { ItemService } from '../../services/item-service';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  scannedItem: Object = null;
  cancelled: Boolean = false;

  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private shoppingCartService: ShoppingCartService,
    private itemService: ItemService) { }

  init() {
    this.scannedItem = null;
    this.cancelled = false;
  }

  ionViewWillEnter() {
    this.init();
    this.scanBarcode()
  }

  ionViewDidLeave() {
    this.init();
  }

  scanBarcode() {
    this.init();
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("Scan article cancelled.")
        this.cancelled = true;
      }
      else {
        const item = this.itemService.getItem(barcodeData.text);
        if (item) {
          this.scannedItem = item;
          console.log("Scanned new article:", this.scannedItem)
          this.shoppingCartService.addToCart(barcodeData.text);
        }
      }
    }, (err) => {
      this.cancelled = true;
      console.log("Error while scanning barcode");
    });
  }

  shouldOfferManualScan() {
    return this.cancelled || this.scannedItem != null;
  }
}
