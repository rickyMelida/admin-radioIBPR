class Songs {
  id;
  nombre;
  autor;
  tipo;
  duracion;

  asignacion() {
    this.id = 1.0;

  }
}

class AudiosPlaylist extends Songs{
  posicion;
  horaInicio;
  horaFin;

  mostrar() {
    this.autor = 'Santiago Benavides';
  }
}

class Playlist extends AudiosPlaylist{
  fecha;
  duracionTotal;

}


