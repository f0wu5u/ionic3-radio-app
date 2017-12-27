import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Genre } from '../../app/globals/genre';
import { Station } from '../../app/globals/station';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MediaStreamServiceProvider, stream_meta } from '../../providers/media-stream-service/media-stream-service';

@IonicPage()

@Component({
  selector: 'page-genre-browser',
  templateUrl: 'genre-browser.html'
})

export class GenreBrowserPage implements OnInit{

  
  _genre:Genre
  _stations:Station[]
  _activeStation:Station
  _meta:stream_meta
  _streamPaused:boolean

  constructor(public navCtrl: NavController, public navParams: NavParams,private mediaStreamClient:MediaStreamServiceProvider) {
  }
  
  ngOnInit() {
    this._genre = this.navParams.data
    this._stations = this._genre.getStations()
    this._meta = null

    this._activeStation = this.mediaStreamClient.getActiveStation()
    this.mediaStreamClient.streamMeta.subscribe(e=>{
      this._meta = e      
    })

    this.mediaStreamClient.streamPause.subscribe(e=>{
      this._streamPaused = e
    })
  }

   streamStation(station:Station){
     if(this.isSelectedStation(station.getID())){
        if(this._streamPaused != true){
          this.mediaStreamClient.pauseStream()
        }else{
          this.mediaStreamClient.resumeStream()
        }
     }else{
       this._activeStation = station
       this.mediaStreamClient.changeStreamSource(station)
     }
  }



   isSelectedStation(id:string):boolean{
    return this._activeStation != null ? this._activeStation.getID() == id : false
  }

   setStreamMetaImage(image){
    if(image)
    return {
      'background-image':"url('"+image+"')"
    }
  }

  goBack(){
    // this.mediaStreamClient.die()
    this.navCtrl.pop({animate:false})
  }

}
