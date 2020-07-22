import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalAudios } from './global.audios';

@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GlobalAudios.url;
  }

  compruebaRuta(data): Observable<any> {
    return this._http.post(this.url + 'folder', data);
  }

  add(data): Observable<any> {
    return this._http.post(this.url + 'add', data);
  }

  // Extraemos todas las canciones
  getCancions(): Observable<any> {
    return this._http.get(this.url + 'canciones');
  }

  agregaAudio(data): Observable<any> {
    const datos = JSON.stringify(data);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'add', datos, { headers: header });
  }

  modificarAudio(id, data): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const datos = JSON.stringify(data);
    return this._http.put(this.url + 'modificar/' + id, data);
  }

  eliminarAudio(id): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'eliminar/' + id);
  }




}
