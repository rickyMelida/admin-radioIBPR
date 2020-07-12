import { Component, OnInit } from '@angular/core';

import { CancionesService } from "../../services/canciones.service";
import { AgregarCanciones } from "../../interfaces/audio-a-agregar.interface";
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-agregar-cancion',
  templateUrl: './agregar-cancion.component.html',
  styleUrls: ['./agregar-cancion.component.css'],
  providers: [CancionesService]
})
export class AgregarCancionComponent implements OnInit {
  audios: any;
  constructor( private _addAudios: CancionesService ) {
    this.audios = {
      nombre: '',
      autor: '',
      tipo: '',
      audio: null
    };
  }

  ngOnInit(): void {
  }
  onSubmit() {
    alert('sale');
    // console.log(this.audios);

    this._addAudios.agregaAudio(this.audios).subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse ) => {
        console.log(err.status);
      }
    );

  }
}
