import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INYTimes } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _apiKey = "GmQQskr9TUpsxcBdtRMbIv2VcAwW2T1O"

  constructor(private http: HttpClient) { }

  getResults(value: string): Observable<INYTimes> {
    return this.http.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=relevance&q=${value}&api-key=${this._apiKey}`) as Observable<INYTimes>;
  }
}
