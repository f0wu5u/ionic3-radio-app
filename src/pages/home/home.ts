import { Component, AfterViewInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Genre } from '../../app/globals/genre';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";
import { genres } from '../../app/globals/constants';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit{

  public genres:Observable<Genre[]>
  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit(){
    this.genres =  Observable.of(genres)
  }

  browseGenre(genre:Genre){
    this.navCtrl.push("GenreBrowserPage",genre,{direction:'top',updateUrl:false})
  }
}
