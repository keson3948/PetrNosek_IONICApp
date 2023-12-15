import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModalController, ToastController} from '@ionic/angular';
import {TvshowsApiService} from "../services/tvshows-api/tvshows-api.service";
import {TvshowsFavService} from "../services/tvshows-fav/tvshows-fav.service";
import {Episode, RootInterface, Show} from "../models/show.model";
import {InfiniteScrollCustomEvent, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.page.html',
  styleUrls: ['./show-detail.page.scss'],
})
export class ShowDetailPage implements OnInit {

  show: Show;
  details:any = {};

  isToastOpen = false;
  message: string = "";
  ikona: string = "";
  selectedSegment = 'times';

  groupedEpisodes: {[season: number]: Episode[]} = {};

  constructor(
    private showApiService: TvshowsApiService,
    private tvshowFavService: TvshowsFavService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
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
      this.groupEpisodesBySeason(res.tvShow.episodes);
      event?.target.complete();
    });
  }

  groupEpisodesBySeason(episodes: Episode[]) {
    this.groupedEpisodes = episodes.reduce((grouped, episode) => {
      // Upravit tuto část pro přístup k seskupení
      const season = episode.season;
      if (!grouped[season]) {
        grouped[season] = [];
      }
      grouped[season].push(episode);
      return grouped;
    }, {} as {[season: number]: Episode[]}); // Přidání asserce typu
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


  toggleFavorite() {
    if (this.details) {
      if (!this.isFav()) {
        this.tvshowFavService.addFavShow(this.show).then(() => {
          this.presentToast("Pořad byl přidán do oblibených", "heart-outline");
        });
      } else {
        this.tvshowFavService.removeFavShow(this.show).then(() => {
          this.presentToast("Pořad byl odebrán z oblibených", "heart-dislike-outline");
        });
      }
    }
  }
  isFav(): boolean {
    return this.tvshowFavService.isFav$(this.show.id);
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async presentToast(message:string, icon:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: "bottom",
      icon: icon,
    });

    await toast.present();
  }
}
