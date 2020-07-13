import { Component, OnInit } from '@angular/core';
import { CancionesService } from "../../services/canciones.service";
import { Cancion } from "../../interfaces/cancion.interface";

import { AgregarCanciones } from "../../interfaces/audio-a-agregar.interface";
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-cancion',
  templateUrl: './agregar-cancion.component.html',
  styleUrls: ['./agregar-cancion.component.css'],
  providers: [CancionesService]
})
export class AgregarCancionComponent implements OnInit {
  cancion: Cancion;
  song: Array<File> = null;

  constructor(private _cancionService: CancionesService) {
    this.cancion = {
      nombre: '',
      autor: '',
      tipo: ''
    };
  }

  ngOnInit(): void {
  }

  onFileChange(event) {
    this.song = event.target.files;
  }

  onSubmit(event) {
    const datos = new FormData();
    if (this.song != null && this.cancion.nombre != '' && this.cancion.autor != '' && this.cancion.tipo != '') {

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.song.length; i++) {
        datos.append('audio', this.song[i], this.song[i].name);
        datos.append('datos', JSON.stringify(this.cancion));
      }

      this._cancionService.compruebaRuta(this.cancion).subscribe(
        data => {
          if (data.status === 'success') {
            this._cancionService.add(datos).subscribe(
              res => {
                console.log(res);
                Swal.fire({
                  icon: res.status,
                  title: 'Excelente!',
                  text: res.mensaje
                });
              },
              err => {
                Swal.fire({
                  icon: 'error',
                  title: 'Hubo un error!',
                  text: 'Por favor vuelva a intentar de vuelta.'
                });
              }
            );
          }
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error!',
            text: 'Por favor vuelva a intentar de vuelta.'
          });
        }
      );

      this.reset(event.srcElement);
      
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Faltan Datos!',
        text: 'Por favor inserte los datos correctamente.'
      });
    }
  }


  reset(datos) {

    datos[0].value = '';
    datos[1].value = '';

    datos[0].placeholder = 'Nombre';
    datos[1].placeholder = 'Autor';
    datos[3].value = null;

  }
}
