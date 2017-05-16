import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
    imageUrl = '';

      constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public modalCtrl: ModalController,
      private geolocation: Geolocation,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private camera: Camera){}

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

  locateMe() {
    const loader = this.loadingCtrl.create({
        content: 'Getting your location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
        .then(
            location => {
                loader.dismiss();
                this.location.lat = location.coords.latitude;
                this.location.lng = location.coords.longitude;
                this.locationIsSet = true;
            }
        )
        .catch(
            error => {
                loader.dismiss();
                const toast = this.toastCtrl.create({
                    message: 'Could get connection',
                    duration: 2500
                })
                toast.present();
            }
        );
  }

  openCamera() {
          this.camera.getPicture({
              encodingType: this.camera.EncodingType.JPEG,
              correctOrientation: true
          })
              .then(
                  imageData => {
                      console.log(imageData);
                      this.imageUrl = imageData;
                  }
              )
              .catch(
                  error => {
                      console.log(error);
                  }
              )
  }

}
