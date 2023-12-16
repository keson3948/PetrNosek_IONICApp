import { Component } from '@angular/core';
import {TvshowsApiService} from "../services/tvshows-api/tvshows-api.service";
import {InfiniteScrollCustomEvent, LoadingController, ModalController} from "@ionic/angular";
import {firstValueFrom, Observable} from "rxjs";
import {PopularShows, Show} from "../models/show.model";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any =  {};
  shows:any = [];
  page = 1;

  tv_shows:Observable<Show>[] = [];



  constructor(
    private showApiService: TvshowsApiService,
    private loadingCtrl: LoadingController
  ) {
    //this.fetchData();  // Volání fetchData zde
    this.loadShows();
  }

  async loadShows(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: "Načítání...",
      spinner: "bubbles",
    });

    //await loading.present();

    this.showApiService.getMostPopular$(this.page).subscribe((res) =>{
      //loading.dismiss();
      this.shows.push(...res.tv_shows);

      event?.target.complete();
      if(event){
        event.target.disabled = res.pages === this.page;
      }
    });
  }

  fetchData() {
    this.showApiService.getMostPopular$(this.page)
      .subscribe(data => {
        this.data = data;
      }, error => {
        console.error('Chyba při načítání dat: ', error);
      });
  }

  loadMore($event: InfiniteScrollCustomEvent) {
    this.page++;
    this.loadShows($event);
  }

  setDetailData(show: Show) {
    this.showApiService.detail = show;
  }

}
