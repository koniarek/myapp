import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';

import { SetLocationPage } from '../set-location/set-location'

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public modalCtrl: ModalController){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  selectOnMap() {
        const modal = this.modalCtrl.create(SetLocationPage);
        modal.present();
  }

}
