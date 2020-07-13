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

  // Iniciamos todas las canciones que se van a guardar en la seccion de reproduccion en null o vacio
  datos: Array<Canciones> = [{
    _id: null,
    nombre: '',
    autor: '',
    tipo: '',
    duracion: null,
    _v: null
  }];

  // Iniciamos todas las canciones que se van a guardar en la seccion de reproduccion en null o vacio
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
    //console.log(`Inicialmente hay ${this.reproductor.length}`)

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

      // Eliminamos el cuadro en blanco una vez que se tiran datos por encima de el
      if (this.datos.length > 1 && this.datos[this.datos.length - 1].duracion === null) {
        this.datos.pop();
      }

      // Eliminamos el cuadro en blanco una vez que se tiran datos por debajo de el
      if (this.datos.length > 1 && this.datos[this.datos.length - 2].duracion === null && event.currentIndex === 1) {
        this.datos.shift();
      }

      /*this.reproductor.push({
        fecha: this.fecha,
        pos: event.currentIndex + 1,
        nombre: this.datos[this.datos.length - 1].nombre,
        autor: this.datos[this.datos.length - 1].autor,
        tipo: this.datos[this.datos.length - 1].tipo,
        duracion: this.datos[this.datos.length - 1].duracion,
        horaInicio: 0,
        horaFin: this.datos[this.datos.length - 1].duracion
      });*/

    }
  }


  horaInicio(posicion: number, duracionAnterior: number) {
    let salida: number;
    salida = duracionAnterior + 1;

    if (posicion === 1) {
      salida = 0;
    }

    return salida;
  }

  horaFin(posicion: number, duracion: number, horaInicio: number) {
    let salida: number;

    salida = horaInicio + duracion;

    if (posicion === 1) {
      salida = duracion;
    }

    return salida;
  }

  guardar() {
    let indice: number;
    let duracionAnterior: number;
    let durAudio: number;

    for (const [index, dato] of this.datos.entries()) {
      indice = index + 1;
      durAudio = Math.round(dato.duracion);

      if (index === 0) {
        duracionAnterior = 0;
      } else {
        duracionAnterior = Math.round(this.datos[index - 1].duracion);

      }

      this.reproductor.push({
        fecha: this.fecha,
        pos: indice,
        nombre: dato.nombre,
        autor: dato.nombre,
        tipo: dato.tipo,
        duracion: durAudio,
        horaInicio: this.horaInicio(indice, duracionAnterior),
        horaFin: this.horaFin(indice, durAudio, this.horaInicio(indice, duracionAnterior))
      });
    }

    // Eliminamos el primer elemento que esta vacio
    this.reproductor.shift();


    // console.log(this.horaInicio(1, 200));
    console.log(this.reproductor);

  }

}
