/**
 * @file module-service.js
 * @description Servicio principal del módulo de Eventos Académicos.
 * Contiene las reglas de negocio, la creación de entidades y las
 * funciones de filtrado y ordenamiento.
 *
 * Reglas de negocio implementadas:
 *  1. La capacidad mínima de cualquier evento es 10 asistentes.
 *  2. La fecha del evento no puede ser anterior a la fecha actual.
 */

import { Evento } from '../models/Evento.js';

/**
 * Crea y devuelve una instancia de Evento a partir de los datos del formulario.
 * @param {Object} datos - Datos capturados del formulario.
 * @returns {Evento}
 */
export function crearEvento(datos) {
  return new Evento(
    datos.nombre,
    datos.categoria,
    datos.fecha,
    datos.hora,
    datos.modalidad,
    datos.ubicacion,
    datos.descripcion,
    datos.cupos
  );
}

/**
 * Regla de negocio 1: Valida que la capacidad sea de al menos 10 asistentes.
 * @param {number|string} cupos
 * @returns {boolean}
 */
export function cuposValidos(cupos) {
  return Number(cupos) >= 10;
}

/**
 * Regla de negocio 2: Valida que la fecha no sea anterior al día actual.
 * @param {string} fecha - Formato YYYY-MM-DD.
 * @returns {boolean}
 */
export function fechaValida(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return new Date(fecha + 'T00:00:00') >= hoy;
}

/**
 * Filtra eventos por texto de búsqueda (nombre o ubicación).
 * @param {Array}  eventos - Lista de eventos.
 * @param {string} texto   - Texto a buscar.
 * @returns {Array}
 */
export function buscarEventos(eventos, texto) {
  const termino = texto.toLowerCase().trim();
  if (!termino) return eventos;
  return eventos.filter(e =>
    e.nombre.toLowerCase().includes(termino) ||
    e.ubicacion.toLowerCase().includes(termino)
  );
}

/**
 * Filtra eventos por categoría.
 * @param {Array}  eventos   - Lista de eventos.
 * @param {string} categoria - Categoría seleccionada ('Todos' para no filtrar).
 * @returns {Array}
 */
export function filtrarPorCategoria(eventos, categoria) {
  if (categoria === 'Todos') return eventos;
  return eventos.filter(e => e.categoria === categoria);
}

/**
 * Ordena los eventos por fecha de forma ascendente o descendente.
 * @param {Array}  eventos - Lista de eventos.
 * @param {string} orden   - 'asc' (próximos primero) | 'desc' (más lejanos primero).
 * @returns {Array} Nueva lista ordenada (no muta el original).
 */
export function ordenarEventos(eventos, orden = 'asc') {
  return [...eventos].sort((a, b) => {
    const fA = new Date(a.fecha + 'T00:00:00');
    const fB = new Date(b.fecha + 'T00:00:00');
    return orden === 'asc' ? fA - fB : fB - fA;
  });
}
