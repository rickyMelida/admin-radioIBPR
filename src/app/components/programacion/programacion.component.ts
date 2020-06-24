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
  /*'Naranjas',
  'Bananas',
  'Pepinos'
  cdkDropListDisabled
  */
 cancions;
 reproductor: Array<Canciones> = [{
   _id: '',
   nombre: '',
  autor: '',
  tipo: '',
  _v: null,
  duracion: null
 }];
 audiosTodos: Array<Canciones>;

  constructor(private rutaActual: ActivatedRoute, private _audiosSevice: CancionesService) {

    this.fecha = this.rutaActual.snapshot.params.fecha;

  }

  ngOnInit(): void {
    this._audiosSevice.getCancions().subscribe(
      res => {
        console.log(res);
        this.cancions = res;
        this.audiosTodos = this.cancions.data;
      },
      err => {
        console.log(err);
      }
      );
  }

  drop(event: CdkDragDrop<string[]>) {
      // let elemento = this.audiosTodos[event.previousIndex];
     // let elemento =event;


    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
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
      /*if (this.reproductor.length > 1 && this.reproductor[this.reproductor.length - 1] === '') {
        this.reproductor.pop();
      }*/
    }

     // console.log(event.container.data[0].nombre);
    // console.log(this.reproductor[0]._id);
    // console.log(this.rutaActual.snapshot.params);
  }

}
