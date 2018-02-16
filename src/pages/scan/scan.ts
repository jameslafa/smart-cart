import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
	selector: 'page-scan',
	templateUrl: 'scan.html'
})
export class ScanPage {

	options: BarcodeScannerOptions;
	scannedArticle: {};

	constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {
	}

	ionViewDidEnter(){
		this.scanBarcode()
	}

	async scanBarcode(){
		this.scannedArticle = await this.barcodeScanner.scan();
		console.log("New scanned article: ", this.scannedArticle);
	}
}
