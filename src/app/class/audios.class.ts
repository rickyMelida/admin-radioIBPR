import { Canciones } from '../interfaces/canciones.interface';

export class Songs {
  datos: Canciones = {
    _id: null,
    nombre: '',
    autor: '',
    tipo: '',
    duracion: null,
    _v: null
  };

  getNombre() {
    return this.datos.nombre;
  }

  getAutor() {
    return this.datos.autor;
  }

  getTipo() {
    return this.datos.tipo;
  }

  getDuracion() {
    return this.datos.duracion;
  }
}
