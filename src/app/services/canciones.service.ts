import { Injectable } from '@angular/core';
// import { HttpClient } from "@angular/common/http";
import { Canciones } from '../interfaces/canciones.interface';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class CancionesService {
  canciones: AngularFireList<Canciones>;
  reproductor: AngularFireList<Canciones>;

  constructor( private firebasedb: AngularFireDatabase) {
  }

   getCanciones() {
    this.canciones = this.firebasedb.list('canciones');

    return this.canciones;
  }

   getReproductor() {
    this.reproductor = this.firebasedb.list('reproductor');

    return this.reproductor;
  }
}
