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
  ionViewWillEnter(){
    console.log('ProfilePage.enter, load profile.')
    this.userService.get().then((profile) => {
      if(profile){
        this.profile = profile;
        console.log('Profile: ', JSON.stringify(this.profile));
      }
      else{
        this.profile = {
          vegetarian: false,
          vegan: false,
          glutenfree: false,
          lactosefree: false
        }
        console.log('Default Profile: ', JSON.stringify(this.profile));
      }
    });

  }

  // Save the profile on exit
  ionViewWillLeave(){
    console.log('ProfilePage.leave, save profile: ', JSON.stringify(this.profile));
    this.userService.save(this.profile);
  }
}
