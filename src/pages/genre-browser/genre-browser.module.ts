import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenreBrowserPage } from './genre-browser';
import { HttpClientModule } from '@angular/common/http';
import { Media } from '@ionic-native/media';
import { MediaStreamServiceProvider } from '../../providers/media-stream-service/media-stream-service';

@NgModule({
  declarations: [
    GenreBrowserPage
  ],
  imports: [
    IonicPageModule.forChild(GenreBrowserPage),
    HttpClientModule
  ],
  providers:[Media,MediaStreamServiceProvider]
})
export class GenreBrowserPageModule {}
