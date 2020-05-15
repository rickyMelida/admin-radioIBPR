import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Canciones } from '../interfaces/canciones.interface';


@Injectable({
  providedIn: 'root'
})
export class CancionesService {
  canciones: Array<Canciones>;
  reproductor: Array<Canciones>;

  constructor( private http: HttpClient) {
     this.getCanciones();
     this.getReproductor();
  }

   getCanciones() {
    this.http.get('https://radio-ibpr.firebaseio.com/canciones.json')
    .subscribe( (res: Array<Canciones>) => {
      this.canciones = res;
      // console.log(this.canciones);
    });

    return this.canciones;
  }

   getReproductor() {
    this.http.get('https://radio-ibpr.firebaseio.com/reproductor.json')
    .subscribe( (res: Array<Canciones>) => {
      this.reproductor = res;
      // console.log(this.canciones);
    });

    return this.reproductor;
  }
}
