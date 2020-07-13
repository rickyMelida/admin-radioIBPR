import { Component, OnInit } from '@angular/core';
import { CancionesService } from '../../services/canciones.service';
import { Canciones } from '../../interfaces/canciones.interface';

@Component({
  selector: 'app-lista-audios',
  templateUrl: './lista-audios.component.html',
  styleUrls: ['./lista-audios.component.css'],
  providers: [CancionesService]
})
export class ListaAudiosComponent implements OnInit {
  audios: Array<Canciones>;
  duracionReal: Array<any>;

  constructor(private _audiosService: CancionesService) {
    console.log(this.audios);

  }

  ngOnInit(): void {
    this._audiosService.getCancions().subscribe(
      songs => {
        this.audios = songs.data;
        // console.log(this.audios);
        this.duracion(582);
        console.log(this.duracionMinutos(582));
      },
      err => {
        console.log('Ha ocurrido un error');
      }
    );


  }

  duracion(duracion: number) {
    for (const [index, dato] of this.audios.entries()) {
      this.duracionReal[index] = dato;
    }
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
