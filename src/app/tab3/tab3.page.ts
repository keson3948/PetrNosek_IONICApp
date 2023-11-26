import { Component } from '@angular/core';
import {TvshowsApiService} from "../services/tvshows-api/tvshows-api.service";
import {
  InfiniteScrollCustomEvent,
  LoadingController,
  SearchbarChangeEventDetail,
  SearchbarInputEventDetail
} from "@ionic/angular";
import {Show} from "../models/show.model";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  data: any =  {};
  shows:any = [];
  page = 1;
  maxPages: number = 1;
  search = "";

  constructor(
    private showApiService: TvshowsApiService,
    private loadingCtrl: LoadingController
  ) {
    this.fetchData();  // Volání fetchData zde
    this.loadShows();
  }

  async loadShows(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: "Načítání...",
      spinner: "bubbles",
    });

    await loading.present();

    this.load();

    await loading.dismiss();

    if (this.page < this.maxPages) {
      this.page++;
    } else {
      if(event){
        event.target.disabled = true; // Deaktivace infinite scroll
      }
    }
    event?.target.complete();
  }

  load() {
    this.showApiService.getShowSearch$(this.search, this.page).subscribe((res) => {
      this.shows.push(...res.tv_shows);
      this.maxPages = res.pages;
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

  handleInput(event: any) {
    this.search = event.target.value.toLowerCase();
    this.shows = [];
    this.page = 1;
    this.load();
    this.enableInfiniteScroll();
  }

  private enableInfiniteScroll() {
    const infiniteScroll = document.querySelector('ion-infinite-scroll');
    if (infiniteScroll) {
      infiniteScroll.disabled = false;
    }
  }

}
