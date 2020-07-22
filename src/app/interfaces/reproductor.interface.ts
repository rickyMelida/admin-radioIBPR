export interface Reproductor {
    fecha: String,
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