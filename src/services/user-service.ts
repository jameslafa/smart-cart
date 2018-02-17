import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {
  constructor(private storage: Storage){}

  save(profile){
    this.storage.set('profile', profile);
    console.log('UserService.save called: ', JSON.stringify(profile));
  }

  get(){
    console.log('UserService.get called');
    return this.storage.get('profile');
  }

  empty(){
    console.log('UserService.empty called');
     this.storage.set('profile', null);
  }
}