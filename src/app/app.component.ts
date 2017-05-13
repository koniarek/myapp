import { Component, ViewChild } from '@angular/core';
import {Platform, NavController, MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { AddPlacePage } from '../pages/add-place/add-place'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  addPlacePage = AddPlacePage;

  @ViewChild('nav') nav: NavController

  constructor(platform: Platform, private menuCtrl: MenuController) {};

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

