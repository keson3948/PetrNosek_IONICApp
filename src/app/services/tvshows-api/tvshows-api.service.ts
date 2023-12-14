import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PopularShows, RootInterface, Show} from "../../models/show.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TvshowsApiService {

  detail!: Show;


  constructor(
    private http: HttpClient,
  ) {

  }

  getMostPopular$(page: number) : Observable<PopularShows>{
    return this.http.get<PopularShows>(`${environment.baseUrl}most-popular?page=${page}`);
  }

  getShowDetails$(id: number) : Observable<RootInterface>{
    return this.http.get<RootInterface>(`${environment.baseUrl}show-details?q=${id}`);
  }

  getShowSearch$(value: string, page: number) : Observable<PopularShows>{
    return this.http.get<PopularShows>(`${environment.baseUrl}search?q=${value}&page=${page}`);
  }

  setFavorite() {

  }
}


