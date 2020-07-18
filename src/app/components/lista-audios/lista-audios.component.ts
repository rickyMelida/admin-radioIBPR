import { Component, OnInit, Input } from '@angular/core';
import { CancionesService } from '../../services/canciones.service';
import { Canciones } from '../../interfaces/canciones.interface';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModificarComponent } from "../modificar/modificar.component";
import { Cancion } from 'src/app/interfaces/cancion.interface';
import { AudioModificado } from 'src/app/interfaces/modificaciones.interface';


@Component({
  selector: 'app-lista-audios',
  templateUrl: './lista-audios.component.html',
  styleUrls: ['./lista-audios.component.css'],
  providers: [CancionesService]
})
export class ListaAudiosComponent implements OnInit {
  audios: Array<Canciones>;
  cancion: Cancion;
  song: Array<File> = null;
  datos: AudioModificado;
  modalRef: any;

  constructor(private _audiosService: CancionesService, private modalService: NgbModal) {
    this.cancion = {
      nombre: '',
      autor: '',
      tipo: '',
      id: ''
    }
  }

  ngOnInit(): void {
    this._audiosService.getCancions().subscribe(
      songs => {
        this.audios = songs.data;
      },
      err => {
        console.log('Ha ocurrido un error');
      }
    );
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

  eliminar(id) {
    // console.log(`Se va a eliminar ${id}`);
    Swal.fire({
      title: 'Eliminar audio',
      text: "¿Esta seguro de que quiere eliminar este audio?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {
        this._audiosService.eliminarAudio(id).subscribe(
          data => {
            this._audiosService.getCancions().subscribe(
              songs => {
                this.audios = songs.data;
              },
              err => {
                console.log('Ha ocurrido un error');
              }
            );
          },
          err => {
            console.log('No se pudo eliminar');
          }
        );
        Swal.fire(
          'Eliminado!',
          'El audio seleccionado se ha eliminado correctamente.',
          'success'
        );
      }
    });
  }

  modificar(data, content) {
    this.modalRef = this.modalService.open(content);
    //console.log(data);
    this.cancion.nombre = data.nombre;
    this.cancion.autor = data.autor;
    this.cancion.tipo = data.tipo;
    this.cancion.id = data._id;

  }

  guardar() {
    this._audiosService.modificarAudio(this.cancion.id, this.cancion).subscribe(
      res => {
        Swal.fire({
          icon: res.status,
          title: 'Excelente!',
          text: res.mensaje
        });
        this._audiosService.getCancions().subscribe(
          songs => {
            this.audios = songs.data;
          },
          err => {
            console.log('Ha ocurrido un error');
          }
        );
      },
      err => {
        console.log('Error al Actualizar')
      }
    );
    this.modalRef.close();


  }


  close() {
    this.modalRef.close();
  }

}
