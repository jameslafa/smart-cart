import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  profile = {
    vegetarian: false,
    vegan: false,
    glutenfree: false,
    lactosefree: false
  }

  constructor(public navCtrl: NavController, private userService: UserService) {

  }

  ionViewWillLeave(){
    // Save the profile
    this.userService.saveProfile(this.profile);
  }
}
