import {Component} from '@angular/core';
import {TvshowsFavService} from "../services/tvshows-fav/tvshows-fav.service";
import {Show} from "../models/show.model";
import {firstValueFrom} from "rxjs";
import {TvshowsApiService} from "../services/tvshows-api/tvshows-api.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  favShows: Show[] = [];

  constructor(
    private tvshowFavService: TvshowsFavService,
    private showApiService: TvshowsApiService,
  ) {
    this.initFav();
  }

  async initFav() {
    this.tvshowFavService.favShows$.subscribe(shows => {
      this.favShows = shows;
    });
  }

  setDetailData(show: Show) {
    this.showApiService.detail = show;
  }


}
