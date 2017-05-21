import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Place } from '../../models/place';
import { PlacesServices } from '../../services/places';
@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: Place;
  index: number
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private placesService:  PlacesServices)  {
    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
  }
  onLeave() {
    this.viewCtrl.dismiss();
  }
  onDelete(index) {
    this.placesService.deletePlaces(this.index);
    this.onLeave();
  }

}
