import { Component, OnInit } from '@angular/core';
import { CancionesService } from "../../services/canciones.service";
import { Cancion } from "../../interfaces/cancion.interface";

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
    if (this.song != null) {

      for (let i = 0; i < this.song.length; i++) {
        datos.append('audio', this.song[i], this.song[i].name);
        datos.append('datos', JSON.stringify(this.cancion));
      }

      this._cancionService.compruebaRuta(this.cancion).subscribe(
        data => {
          if (data.status === 'success') {
            this._cancionService.add(datos).subscribe(
              res => {
                console.log(res)
              },
              err => {
                //console.log('Nooooo')
              }
            )
          }
        },
        err => {
          console.log('Ha ocurrido un error');
        }
      )
    } else {
      console.log('Falta el audio');
    }

    this.reset(event.srcElement);

  }


  reset(datos) {

    datos[0].value = '';
    datos[1].value = '';

    datos[0].placeholder = 'Nombre';
    datos[1].placeholder = 'Autor';
    datos[3].value = null;

  }
}
