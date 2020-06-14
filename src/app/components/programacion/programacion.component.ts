import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput, View } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resurceTimelineDay from '@fullcalendar/resource-timeline';

import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})
export class ProgramacionComponent implements OnInit {

  @ViewChild('programacion') programandoComponent: FullCalendarComponent;
  calendarPlugins = [resurceTimelineDay, interactionPlugin];
  listaCanciones: EventInput[] = [];

  audios = [
    'Santiago Benavides - Aprovecha',
    'Funky - Sal y Luz',
    'Hillsong - Dios Eterno',
    'Alex Campos - El Sonido del Silencio',
    'Redimi2 - Trapstorno',
    'Juan Luis Guerra - Las avispas',
    'Santiago Benavides - Que facil es',
    'Rescate - Soy Jose'
  ];
  /*'Naranjas',
    'Bananas',
    'Pepinos'
    cdkDropListDisabled
  */

  reproductor = [''];

  drop(event: CdkDragDrop<string[]>) {
    //let elemento = this.items[event.previousIndex];
    
    if (event.previousContainer === event.container) {  
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //Agregamos en el array de las canastas el elemento seleccionado si ya no esta vacio
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      //Eliminamos el cuadro e blanco una vez que tenga datos
      if(this.reproductor.length > 1 && this.reproductor[this.reproductor.length-1] == "" ) {
        this.reproductor.pop();
      }
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
