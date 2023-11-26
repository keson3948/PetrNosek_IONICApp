import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TvshowsApiService} from "../services/tvshows-api/tvshows-api.service";
import {RootInterface, Show} from "../models/show.model";
import {InfiniteScrollCustomEvent, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.page.html',
  styleUrls: ['./show-detail.page.scss'],
})
export class ShowDetailPage implements OnInit {

  show: Show;
  details:any = {};

  constructor(
    private showApiService: TvshowsApiService,
    private loadingCtrl: LoadingController
  ) {
    this.show = this.showApiService.detail;
    this.loadShows();
  }

  async loadShows(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: "Načítání...",
      spinner: "bubbles",
    });

    await loading.present();

    this.showApiService.getShowDetails$(this.show.id).subscribe((res) =>{
      loading.dismiss();
      this.details = res;

      event?.target.complete();
    });
  }

  fetchData() {
    this.showApiService.getShowDetails$(this.show.id)
      .subscribe(data => {
        this.details = data;
      }, error => {
        console.error('Chyba při načítání dat: ', error);
      });
  }

  ngOnInit() {

  }

}
