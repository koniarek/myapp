import { Component, ViewChild } from '@angular/core';
import {Platform, NavController, MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild('nav') nav: NavController

  constructor(platform: Platform, private menuCtrl: MenuController) {};

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

