/**
 * @file storage.js
 * @description Servicio de persistencia en localStorage.
 * Centraliza toda la interacción con el almacenamiento local del navegador,
 * evitando que otros módulos accedan directamente a localStorage.
 */

import { eventosSemilla } from '../data/seed.js';

const KEY = 'eventosAcademicos';

/**
 * Devuelve todos los eventos almacenados.
 * Si no existe ningún registro previo, carga los datos semilla.
 * @returns {Array} Lista de eventos.
 */
export function obtenerEventos() {
  const datos = localStorage.getItem(KEY);
  if (!datos) {
    guardarEventos(eventosSemilla);
    return eventosSemilla;
  }
  return JSON.parse(datos);
}

/**
 * Guarda la lista completa de eventos en localStorage.
 * @param {Array} eventos - Lista de eventos a persistir.
 */
export function guardarEventos(eventos) {
  localStorage.setItem(KEY, JSON.stringify(eventos));
}

/**
 * Agrega un nuevo evento a la lista existente y persiste el resultado.
 * @param {Object} evento - Instancia de Evento a agregar.
 */
export function agregarEvento(evento) {
  const eventos = obtenerEventos();
  eventos.push(evento);
  guardarEventos(eventos);
}

/**
 * Actualiza los datos de un evento existente por su id.
 * @param {number} id                - Identificador del evento.
 * @param {Object} datosActualizados - Campos a sobrescribir.
 */
export function actualizarEvento(id, datosActualizados) {
  const eventos = obtenerEventos();
  const actualizados = eventos.map(e =>
    e.id === id ? { ...e, ...datosActualizados } : e
  );
  guardarEventos(actualizados);
}

/**
 * Elimina un evento de la lista por su id.
 * @param {number} id - Identificador del evento a eliminar.
 */
export function eliminarEvento(id) {
  const eventos = obtenerEventos();
  guardarEventos(eventos.filter(e => e.id !== id));
}
