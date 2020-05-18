import { Component, OnInit } from '@angular/core';
import { CancionesService } from '../../services/canciones.service';
import { Canciones } from '../../interfaces/canciones.interface';

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.css']
})
export class AudiosComponent implements OnInit {
  canciones: any[];

  constructor( private cancionService: CancionesService ) { }

  ngOnInit(): void {
    this.canciones = [];
    this.verDatos();
  }

  verDatos() {
    this.cancionService.getCanciones().snapshotChanges()
    .subscribe( cancion => {
      cancion.forEach( element => {
        let data = element.payload.toJSON();
        data['$key'] = element.key;
        this.canciones.push(data);
      });
    });

    console.log(this.canciones);
  }

}
