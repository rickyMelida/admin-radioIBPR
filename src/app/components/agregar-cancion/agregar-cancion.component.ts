import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-cancion',
  templateUrl: './agregar-cancion.component.html',
  styleUrls: ['./agregar-cancion.component.css']
})
export class AgregarCancionComponent implements OnInit {
  cancion: any;
  constructor() {
    this.cancion = {
      nombre: '',
      autor: '',
      genero: '',
      duracion: '',
      audio: null
    };
  }

  ngOnInit(): void {
  }
  onSubmit() {
    alert('sale');
    console.log(this.cancion);

  }
}
