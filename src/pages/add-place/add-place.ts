import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SetLocationPage } from '../set-location/set-location'
import { Location } from '../../models/location';
import { PlacesServices } from "../../services/places";
import { File } from '@ionic-native/file';

declare var cordova: any;

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
      private camera: Camera,
      private placesService: PlacesServices,
      private file: File){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }
  onSubmit(form: NgForm) {
      this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
      form.reset();
      this.location = {
          lat: 51.1000000,
          lng: 17.0333300
      };
      this.locationIsSet = false;
      this.imageUrl = '';

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
                      const currentName = imageData.replace(/^.*[\\\/]/, '');
                      const path = imageData.replace(/[^\/]*$/, '');
                      this.file.moveFile(path, currentName, cordova.file.dataDirectory, currentName)
                          .then(
                              (data) => {
                                  this.imageUrl = data.nativeURL;
                                  this.camera.cleanup();
                              }
                          )
                          .catch(
                              (error) => {
                              this.imageUrl = ''
                              const toast = this.toastCtrl.create({
                                  message: 'Could not to save image',
                                  duration: 2500
                              });
                              toast.present();
                              this.camera.cleanup();
                          })
                      console.log(imageData);
                      this.imageUrl = imageData;
                  }
              )
              .catch(
                  error => {
                      const toast = this.toastCtrl.create({
                          message: 'Could not to do image',
                          duration: 2500
                      });
                      toast.present();
                  }
              )
  }

}
