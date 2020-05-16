import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput, View } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resurceTimelineDay from '@fullcalendar/resource-timeline';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})
export class ProgramacionComponent implements OnInit {

  @ViewChild('programacion') programandoComponent: FullCalendarComponent;
  calendarPlugins = [resurceTimelineDay, interactionPlugin];
  listaCanciones: EventInput[] = [];

  items = [
    'Zanahorias',
    'Tomates',
    'Cebollas',
    'Manzanas',
    'Aguacates'
  ];

  basket = [
    'Naranjas',
    'Bananas',
    'Pepinos'
  ];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
        );
    }
  }




  constructor() { }

  ngOnInit(): void {
  }

}
