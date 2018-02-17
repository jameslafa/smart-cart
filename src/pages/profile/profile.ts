import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  profile = {};

  constructor(public navCtrl: NavController, private userService: UserService) {

  }

  // Get user profile
  ionViewWillEnter() {
    this.userService.get().then((profile) => {
      if (profile) {
        this.profile = profile;
        console.log('Profile: ', JSON.stringify(this.profile));
      }
    });
  }

  // Save the profile on exit
  ionViewWillLeave() {
    this.userService.save(this.profile).then((data) => {
      console.log('ProfilePage.leave, save profile: ', JSON.stringify(this.profile));
    });
  }

  // Reset user profile to default
  reset(){
    this.userService.reset().then((profile) => {
      this.profile = profile;
    });
  }
}
