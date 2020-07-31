import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, View } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';

import { CancionesService } from '../../services/canciones.service';
import { Canciones } from '../../interfaces/canciones.interface';
import { ReproductorService } from "../../services/reproductor.service";
import { Reproductor } from 'src/app/interfaces/reproductor.interface';

@Component({
  selector: 'app-caledario',
  templateUrl: './caledario.component.html',
  styleUrls: ['./caledario.component.css'],
  providers: [
    CancionesService,
    ReproductorService
  ]
})
export class CaledarioComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  fechaSelec;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { /*title: 'Nuevo Evento', start: new Date()*/ }
];

  public playList: Array<any>;

  constructor( private _audios: ReproductorService ) { }

  ngOnInit(): void {
    //moment.locale('es');
    //this.fechaSelec = moment().format('DD-MM-YYYY');

    this._audios.getFechas().subscribe(
      res => {
        console.log(res.fechas)
      },
      err => {

      }
    )
    /*this._audios.getPlayList(this.fechaSelec).subscribe(
      data => {
        this.playList = data.canciones[0].audios;
      },
      err => {

      }
    )*/


  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  /*
    colores para calendario:
      #00ff00 : verde
      #ffff00 : amarillo
      #ff0000 : rojo

  */
  handleDateClick(arg) {
    if (confirm('Desea agregar un nuevo evento ' + arg.dateStr + ' ?')) {
      const fecha = moment(arg.dateStr);
      this.fechaSelec = fecha.format('YYYY-MM-DD');

      this.calendarEvents = this.calendarEvents.concat({
        title: 'Cargado!',
        start: this.fechaSelec,
        allDay: arg.allDay,
        backgroundColor: '#00ff00',
        
      });

      this._audios.getPlayList(this.fechaSelec).subscribe(
        data => {
          this.playList = data.canciones[0].audios;
          //console.log(this.playList);
        },
        err => {
  
        }
      )
      console.log(arg.date);
      console.log(this.fechaSelec)

    }
  }

  /*

  obtenerFechas(fecha:Array<any>) {
    fechaSelect = moment(fecha);
      this.fechaSelec = fecha.format('YYYY-MM-DD');
    for(let i=0; i< fecha.length;i++) {

      this.calendarEvents = this.calendarEvents.concat({
        title: 'Cargado!',
        start: fech,
        allDay: arg.allDay,
        backgroundColor: '#00ff00',
        
      });
    }
  }

  */
}
