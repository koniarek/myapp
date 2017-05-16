import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';

import { SetLocationPage } from '../set-location/set-location'
import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
    location: Location = {
        lat: 51.1000000,
        lng: 17.0333300
    };
    locationIsSet = false;

      constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public modalCtrl: ModalController){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  selectOnMap() {
        const modal = this.modalCtrl.create(SetLocationPage, {location: this.location,
        isSet: this.locationIsSet});
        modal.present();
        modal.onDidDismiss(
            data => {
                if(data) {
                    this.location = data.location;
                    this.locationIsSet = true;
                }
            }
        );
  }

}
