import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, View } from '@fullcalendar/core';
import { ActivatedRoute, Params } from '@angular/router';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import resurceTimelineDay from '@fullcalendar/resource-timeline';

import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

// Importamos nuestros servicios
import { CancionesService } from "../../services/canciones.service";
import { Canciones } from "../../interfaces/canciones.interface";
import { Reproductor } from "../../interfaces/reproductor.interface";

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css'],
  providers: [CancionesService]
})
export class ProgramacionComponent implements OnInit {


  @ViewChild('programacion') programandoComponent: FullCalendarComponent;
  calendarPlugins = [resurceTimelineDay, interactionPlugin];
  listaCanciones: EventInput[] = [];

  /*audios = [
    'Santiago Benavides - Aprovecha',
    'Funky - Sal y Luz',
    'Hillsong - Dios Eterno',
    'Alex Campos - El Sonido del Silencio',
    'Redimi2 - Trapstorno',
    'Juan Luis Guerra - Las avispas',
    'Santiago Benavides - Que facil es',
    'Rescate - Soy Jose'
  ];*/

  fecha;

  //Iniciamos todas las canciones que se van a guardar en la seccion de reproduccion en null o vacio
  datos: Array<Canciones> = [{
    _id: null,
    nombre: '',
    autor: '',
    tipo: '',
    duracion: null,
    _v: null
  }];

  //Iniciamos todas las canciones que se van a guardar en la seccion de reproduccion en null o vacio
  reproductor: Array<Reproductor> = [{
    fecha: '',
    pos: null,
    nombre: '',
    autor: '',
    tipo: '',
    duracion: null,
    horaInicio: null,
    horaFin: null
  }];

  audiosTodos: Array<Canciones>;

  constructor(private rutaActual: ActivatedRoute, private _audiosSevice: CancionesService) {

    this.fecha = this.rutaActual.snapshot.params.fecha;

  }

  ngOnInit(): void {
    this._audiosSevice.getCancions().subscribe(
      res => {
        console.log(res);
        this.audiosTodos = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      // Agregamos en el array de las canastas el elemento seleccionado si ya no esta vacio
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Eliminamos el cuadro e blanco una vez que tenga datos
      if (this.datos.length > 1 && this.datos[this.datos.length - 1].duracion === null) {
        this.datos.pop();
      }

      this.reproductor.push({
        fecha: this.fecha,
        pos: event.currentIndex + 1,
        nombre: this.datos[this.datos.length-1].nombre,
        autor: this.datos[this.datos.length-1].autor,
        tipo: this.datos[this.datos.length-1].tipo,
        duracion: this.datos[this.datos.length-1].duracion,
        horaInicio: 0,
        horaFin: this.datos[this.datos.length-1].duracion
      });
    }

    

    if (this.reproductor.length > 1 && this.reproductor[this.reproductor.length - 1].duracion === null) {
      this.datos.pop();
    }

    //console.log(event.currentIndex + 1);
  }


  tiempoReproduccion() {

  }

}
