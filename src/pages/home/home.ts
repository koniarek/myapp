import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Place } from '../../models/place';
import { PlacesServices } from '../../services/places';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  places: Place[] = [];
  constructor(public navCtrl: NavController, private placesService: PlacesServices) {

  }
  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

}
