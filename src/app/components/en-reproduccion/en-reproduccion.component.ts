import { Component, OnInit } from '@angular/core';
import { ReproductorService } from 'src/app/services/reproductor.service';
import * as moment from 'moment';
import { Reproductor } from 'src/app/interfaces/reproductor.interface';


@Component({
  selector: 'app-en-reproduccion',
  templateUrl: './en-reproduccion.component.html',
  styleUrls: ['./en-reproduccion.component.css'],
  providers: [ReproductorService]
})
export class EnReproduccionComponent implements OnInit {
  fecha: string;

  listaReproduccion: Reproductor;

  constructor( private _playList: ReproductorService ) { }
  
  ngOnInit(): void {
    moment.locale('es');
    this.fecha = moment().format('DD-MM-YYYY');
    this._playList.getPlayList(this.fecha).subscribe(
      data => {
        this.listaReproduccion = data.canciones[0].audios;
        console.log(this.listaReproduccion);
      },
      err => {
        this.listaReproduccion = null;

      }
    )
  }

  duracionMinutos(duracion: number): string {
    let salida: string;
    let min: number;
    let seg: number;

    min = Math.floor(duracion / 60);
    seg = duracion % 60;

    salida = `${min}:${seg}`;

    return salida;
  }



}
