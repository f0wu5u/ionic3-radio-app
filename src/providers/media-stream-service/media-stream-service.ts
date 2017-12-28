import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../../app/globals/station';
import { Media } from '@ionic-native/media';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Platform } from 'ionic-angular';
/*
  Generated class for the MediaStreamServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaStreamServiceProvider {
  
  private streamUrl = { streamHttp: 'http://listen.181fm.com/', streamPort:'http://listen.181fm.com:'}

  private defaultStreamQuality = 'aac';
  private station: Station = null
  private mediaFile: any
  private meta:stream_meta = null
  private notPlaying:boolean = false

  public streamMeta: BehaviorSubject<stream_meta> = new BehaviorSubject(this.meta)
  public streamPause: BehaviorSubject<boolean> = new BehaviorSubject(this.notPlaying)

  private uSubscriptions: Subscription
  private httpSubscriptions: Subscription

  private local_song: string = ''
  private timeout = 0


  constructor(private http: HttpClient, private media: Media,private platform:Platform) {
    this.httpSubscriptions = new Subscription()
    this.uSubscriptions = new Subscription()
    this.streamPause.next(this.notPlaying)
    this.checkPlatform()
  }

  private checkPlatform(){
    if(this.platform.is('core')||this.platform.is('mobileweb')){
      delete this.media
      this.mediaFile = new Audio()
      
      this.checkMediaFile = ()=>{
        this.mediaFile.pause()
        this.mediaFile.currentTime = 0
      }

      this.setStreamSource = (src:string)=>{
        this.mediaFile.src = this.streamUrl.streamHttp+src
      }
    }
  }
  pauseStream() {
    this.mediaFile.pause()
    this.notPlaying = true
    this.streamPause.next(this.notPlaying)
  }
  resumeStream() {
    this.notPlaying = false
    this.streamPause.next(this.notPlaying)
    this.mediaFile.play()
  }
  
  getActiveStation(): Station {
    return this.station
  }

  changeStreamSource(station: Station) {
    this.station = station
    this.checkMediaFile()
    this.updateStreamMeta()
    this.notPlaying = false
    this.streamPause.next(this.notPlaying)
  }
  
  private checkMediaFile(){
    if (this.mediaFile != undefined) {
      this.mediaFile.stop()
      this.mediaFile.release()
      // this.mediaFile = null
    }
  }
  private updateStreamMeta() {
    let stationURL = this.defaultStreamQuality == 'mp3' ? this.station.getMP3PlaybackURL() : this.station.getAACPlaybackURL();
    this.setStreamSource(stationURL)
    this.die()
    this.uSubscriptions.add(this.httpSubscriptions)
    this.mediaFile.play()
    this.getStationMeta(stationURL)
  }
  
  private setStreamSource(src:string){
    this.mediaFile = this.media.create(this.streamUrl.streamHttp+src)
  }
  private getStationMeta(station) {
    this.httpSubscriptions = this.http.get<any>(`http://stream-meta.jdevcloud.com/?id=${station}&action=stationMeta`)
      .subscribe({
        next: (e) => {
          return (e.song != this.local_song && e.song != '181.fm - Music Promo60') ? this.getSongMeta(e.song, station) : this.refreshStreamMeta(station)
        },
        error: (e) => {
          console.log(e)
          this.die()
          return
        }
      })
  }

  private getSongMeta(song: string, station) {
    var s = song
    if (song.indexOf('f/') != -1) {
      s = song.replace('f/', 'feat. ')
      s = s.substring(0, s.lastIndexOf(' -'))
    }

    this.httpSubscriptions = this.http.get<stream_meta>(`http://stream-meta.jdevcloud.com/?action=songMeta&key=${s}`)
      .subscribe(e => {
        let d = { ...e, song: s }
        this.meta = d
        this.streamMeta.next(d)
      },error=>{
        console.log(error)
          this.die()
          return
      })

    this.local_song = song
    this.refreshStreamMeta(station)
  }

  private refreshStreamMeta(station) {
    this.timeout = setTimeout(() => {
      this.getStationMeta(station)
    }, 22000)
    this.timeout
  }
  private die() {
    this.uSubscriptions.unsubscribe();
    clearTimeout(this.timeout || 1)
  }

//   private addStreamListners(){
//     this.mediaFile.onError.subscribe(e => {
//       if (e == this.media.MEDIA_ERR_NONE_SUPPORTED) {
//         this.mediaFile = this.media.create(this.streamUrl.streamPort+this.station.getPlaybackFallbackPort())
//       }
//     })
// }
}

export interface stream_meta {
  readonly Title: string
  readonly Artist: string
  readonly Image: string
  readonly LargeImage: string
  song: string
}