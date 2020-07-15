import { Component, OnInit, Input } from '@angular/core';
import { CancionesService } from '../../services/canciones.service';
import { Canciones } from '../../interfaces/canciones.interface';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModificarComponent } from "../modificar/modificar.component";


@Component({
  selector: 'app-lista-audios',
  templateUrl: './lista-audios.component.html',
  styleUrls: ['./lista-audios.component.css'],
  providers: [CancionesService]
})
export class ListaAudiosComponent implements OnInit {
  audios: Array<Canciones>;

  constructor(private _audiosService: CancionesService, private modalService: NgbModal) { }

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

  modificar(id) {
    const modalRef = this.modalService.open(ModificarComponent);
    
  }

}
