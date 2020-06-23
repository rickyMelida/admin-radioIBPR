import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Canciones } from '../interfaces/canciones.interface';
import { Observable } from 'rxjs';
import { Global } from './global.audios';

@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  public url: string;

  constructor( private _http: HttpClient ) {
    this.url = Global.url;
  }

  ejemplo() {
    return 'Hola desde el servicion Cancion';
  }

  // Extraemos todas las canciones
  getCancions(): Observable<any> {
    return this._http.get(this.url + 'canciones');
  }




}
