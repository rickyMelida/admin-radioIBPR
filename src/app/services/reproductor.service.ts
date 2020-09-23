import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAudios } from './global.audios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReproductorService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GlobalAudios.urlPlaylist
  }

  getPlayList(fecha): Observable<any> {
    return this._http.get(this.url + 'ver/' + fecha);
  }

  add(data): Observable<any> {
    return this._http.post(this.url + 'add', data);
  }

  getFechas(): Observable<any> {
    return this._http.get(this.url + 'getfecha');
  }
}
