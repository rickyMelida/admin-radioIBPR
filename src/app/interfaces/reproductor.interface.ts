export interface Reproductor {
  // tslint:disable-next-line: ban-types
  nombre: String;
  // tslint:disable-next-line: ban-types
  durTotal: Number;
  audios:
    [
      {
        pos: Number,
        nombre: String,
        autor: String,
        tipo: String,
        duracion: Number,
        horaInicio: Number,
        horaFin: Number
      }
    ],
}
