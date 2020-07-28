export interface Reproductor {
    fecha: String,
    duracionTotal: Number,
    audios:
    [
        {
            pos: Number;
            nombre: String;
            autor: String;
            tipo: String;
            duracion: Number;
            horaInicio: Number;
            horaFin: Number;
        }
    ]
}