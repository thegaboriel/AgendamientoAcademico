import { Evento } from '../models/Evento.js';

export function crearEvento(datos) {
  return new Evento(
    datos.nombre,
    datos.categoria,
    datos.fecha,
    datos.hora,
    datos.modalidad,
    datos.cupos,
    datos.ubicacion,
    datos.descripcion
  );
}

export function validarCupos(cupos) {
  return Number(cupos) >= 10;
}

export function fechaValida(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return new Date(fecha) >= hoy;
}

export function buscarEvento(eventos, texto) {
  return eventos.filter(evento => 
    evento.nombre.toLowerCase().includes(texto.toLowerCase())
  );
}

export function filtrarCategoria(eventos, categoria) {
  if (categoria === 'Todos') return eventos;

  return eventos.filter(evento => evento.categoria === categoria);
}

export function ordenarEventos(eventos, orden = 'asc') {
  return [...eventos].sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);

    return orden === 'asc' ? fechaA - fechaB : fechaB - fechaA;
  });
}