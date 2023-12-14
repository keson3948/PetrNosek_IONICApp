import { Injectable } from '@angular/core';
import {Preferences} from "@capacitor/preferences";
import {Show} from "../../models/show.model";
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TvshowsFavService {

  private privateShowsSubject = new ReplaySubject<Show[]>(1);

  private shows: Show[] = [];

  constructor() {
    this.loadFavShows();
  }

  private async loadFavShows() {
    const { value } = await Preferences.get({ key: 'favShows' });
    if (value) {
      this.shows = JSON.parse(value);
      this.privateShowsSubject.next(this.shows);
    }
  }

  public async addFavShow(show: Show) {
    if (!this.shows.some(favShow => favShow.id === show.id)) {
      this.shows.push(show); // Přidání nového pořadu do pole shows
      this.privateShowsSubject.next(this.shows); // Vyslání aktualizovaného seznamu pořadů
      await Preferences.set({
        key: 'favShows',
        value: JSON.stringify(this.shows) // Ukládání aktualizovaného seznamu do local storage
      });
    }
  }

  public async removeFavShow(show: Show) {
    this.shows = this.shows.filter(favShow => favShow.id !== show.id);
    this.privateShowsSubject.next(this.shows);
    await Preferences.set({
      key: 'favShows',
      value: JSON.stringify(this.shows)
    });
  }

  public isFav$(showId: number): boolean {
    return this.shows.some(show => show.id === showId);
  }

  get favShows$() {
    return this.privateShowsSubject;
  }

}
