import { Component } from '@angular/coreioni';
import { NavController, ModalController } from 'ionic-angular';
import { Place } from '../../models/place';
import { PlacesServices } from '../../services/places';
import { PlacePage } from '../place/place';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  places: Place[] = [];
  constructor(public navCtrl: NavController, private placesService: PlacesServices, private modalCtrl: ModalController) {

  }
  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  openPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
  }

}
