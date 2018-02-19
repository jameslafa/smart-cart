import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { UserService } from '../../services/user-service';
import { ShoppingCartService } from '../../services/shopping-cart-service';
import { ItemService } from '../../services/item-service';
import { RecommendationService } from '../../services/recommendation-service';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  scannedItem: Object = null;
  cancelled: Boolean = false;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private barcodeScanner: BarcodeScanner,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private itemService: ItemService,
    private recommendationService: RecommendationService) { }

  // Initialize state
  init() {
    this.scannedItem = null;
    this.cancelled = false;
  }

  // Before entering the page, init state and trigger barcode scanner
  ionViewWillEnter() {
    this.init();
    this.scanBarcode()
  }

  // Reinitialize state when leaving page
  ionViewDidLeave() {
    this.init();
  }

  // Trigger barcode scanning
  scanBarcode() {
    this.init();
    // Activate barcode scanner
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("Scan item cancelled.")
        this.cancelled = true;
      }
      else {
        console.log("Scanned new code: ", barcodeData.text)
        // Item has been scanned
        const item = this.itemService.getItem(barcodeData.text);
        if (item) {
          this.scannedItem = item;
          console.log("New item found: ", JSON.stringify(this.scannedItem));

          this.userService.get().then((profile) => {
            // Check if the item matched the user diet
            const matchDiet = this.itemService.matchDiet(item, profile);

            if (matchDiet === true) {
              console.log("Item matches user's diet", item.diet, profile);
              this.addItemToCart(barcodeData.text);
            }

            else {
              // If it does not match, we ask him if he wants to add it to cart or not
              console.log("Item does not match user's diet", JSON.stringify(item.diet), JSON.stringify(profile));
              let confirm = this.alertCtrl.create({
                title: 'This item does not match your diet!',
                message: 'This item is not ' + matchDiet,
                buttons: [
                  {
                    text: 'Do not add',
                    handler: () => {
                      console.log('User did not add the item to cart');
                      this.cancelled = true;
                      this.scannedItem = null;
                    }
                  },
                  {
                    text: 'Add anyway',
                    handler: () => {
                      console.log('User added the item to cart');
                      this.addItemToCart(barcodeData.text);
                    }
                  }
                ]
              });
              confirm.present();
            }
          });
        }
        else{
          console.log("The scanned item does not exist: ", barcodeData.text, JSON.stringify(Object.keys(this.itemService.allItems())))
        }
      }
    }, (err) => {
      this.cancelled = true;
      console.log("Error while scanning barcode");
    });
  }

  // Add the item to cart and show confirmation
  addItemToCart(itemCode){
    this.shoppingCartService.addToCart(itemCode);
    this.recommendationService.requestRecommendation();
    let toast = this.toastCtrl.create({
      message: 'Item added successfully',
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });
    toast.present();
  }

  // Return if the barcode button should be displayed depending on the state
  shouldOfferManualScan() {
    return this.cancelled || this.scannedItem != null;
  }
}
