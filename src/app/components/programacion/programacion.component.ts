import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, View } from '@fullcalendar/core';
import { ActivatedRoute, Router } from '@angular/router';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import resurceTimelineDay from '@fullcalendar/resource-timeline';

import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

// Importamos nuestros servicios
import { CancionesService } from "../../services/canciones.service";
import { Canciones } from "../../interfaces/canciones.interface";
import { Reproductor } from "../../interfaces/reproductor.interface";
import { ReproductorService } from 'src/app/services/reproductor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css'],
  providers: [
    CancionesService,
    ReproductorService
  ]
})
export class ProgramacionComponent implements OnInit {


  @ViewChild('programacion') programandoComponent: FullCalendarComponent;
  calendarPlugins = [resurceTimelineDay, interactionPlugin];
  listaCanciones: EventInput[] = [];

  public fecha: string;
  duracionTotal: number = 0;

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
  reproductor: Reproductor = {
    fecha: '',
    audios:
      [
        {
          pos: null,
          nombre: '',
          autor: '',
          tipo: '',
          duracion: null,
          horaInicio: null,
          horaFin: null
        }
      ]
  };

  audiosTodos: Array<Canciones>;


  constructor(
    private rutaActual: ActivatedRoute,
    private router: Router,
    private _audiosSevice: CancionesService,
    private _reproductorService: ReproductorService
  ) {

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

      // Eliminamos el cuadro en blanco una vez que se tiran datos por encima de el
      if (this.datos.length > 1 && this.datos[this.datos.length - 1].duracion === null) {
        this.datos.pop();
      }

      // Eliminamos el cuadro en blanco una vez que se tiran datos por debajo de el
      if (this.datos.length > 1 && this.datos[this.datos.length - 2].duracion === null && event.currentIndex === 1) {
        this.datos.shift();
      }
      if (this.datos.length > 1) {
        let posRelativo = event.currentIndex;
        this.duracionTotal = this.duracionTotal + Number(this.datos[posRelativo].duracion);
      } else {
        this.duracionTotal = Number(this.datos[this.datos.length - 1].duracion);
      }
    }
    console.log(this.datos[0].duracion);
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

  duracionMinutos(duracion: number): string {
    let salida: string;
    let horas: number = 0;
    let min: number;
    let seg: number;

    min = Math.floor(duracion / 60);
    seg = duracion % 60;

    salida = `0${horas}:${min}:${seg}`;

    if (min > 59 ) {
      horas = horas + 1;
      min = 0;
      salida = `${horas}:${min}0:${seg}`;
      console.log('Aqui entro!')

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

      this.reproductor.fecha = this.fecha;

      this.reproductor.audios.push({
        pos: indice,
        nombre: dato.nombre,
        autor: dato.autor,
        tipo: dato.tipo,
        duracion: durAudio,
        horaInicio: this.horaInicio(indice, duracionAnterior),
        horaFin: this.horaFin(indice, durAudio, this.horaInicio(indice, duracionAnterior))
      });

    }

    // Eliminamos el primer elemento que esta vacio
    this.reproductor.audios.shift();


    // console.log(this.horaInicio(1, 200));
    console.log(this.reproductor);

    this._reproductorService.add(this.reproductor).subscribe(
      res => {
        Swal.fire({
          icon: res.status,
          title: 'Excelente!',
          text: res.mensaje
        }).then((res) => {
          if (res.value) {
            this.router.navigate(['/calendar']);
          }
        });
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!!',
          text: 'Se produjo un pequeño error al intentar guardar la lista de reproduccion, favor vuelva a intentar'
        })

      }
    );

  }

}
