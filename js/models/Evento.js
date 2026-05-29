export class Evento {

  constructor(nombre, categoria, fecha, hora, modalidad, cupos, ubicacion, descripcion) {
    this.id = Date.now();
    this.fechaRegistro = new Date().toLocaleDateString();
    this.nombre = nombre;
    this.categoria = categoria;
    this.fecha = fecha;
    this.hora = hora;
    this.modalidad = modalidad;
    this.ubicacion = ubicacion;
    this.descripcion = descripcion;
    this.cupos = Number(cupos);
    this.estado = 'Pendiente';
  }

  hayCupos() {
    return this.cupos > 0;
  }

  obtenerResumen() {
    return `${this.nombre} - ${this.fecha}`;
  }
}