import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {

  profile = null;
  defaultProfile = {
    vegetarian: false,
    vegan: false,
    glutenfree: false,
    lactosefree: false
  };

  constructor(private storage: Storage) { }

  // Save user profile in the storage
  save(profile) {
    return new Promise((resolve, reject) => {
      this.storage.set('profile', profile).then((data) => {
        this.profile = profile;
        console.log('UserService.save called: ', JSON.stringify(profile));
        resolve(this.profile);
      });
    });
  }

  // Retreive user profile from the storage
  get() {
    return new Promise((resolve, reject) => {
      console.log('UserService.get called');
      if (this.profile) {
        console.log('UserService.get - return local profile');
        resolve(this.profile);
      }
      else {
        this.storage.get('profile').then((result) => {
          if (result) {
            console.log('UserService.get - return profile from storage');
            this.profile = result;
          }
          else {
            console.log('UserService.get - return default profile');
            this.profile = this.defaultProfile;
          }
          resolve(this.profile);
        })
      }
    });
  }

  // Erase user profile
  reset() {
    return new Promise((resolve, reject) => {
      this.storage.set('profile', null).then((data) => {
        console.log('UserService.empty called');
        this.profile = null;
        this.get().then((data) => {
          resolve(data);
        })
      });
    });
  }
}