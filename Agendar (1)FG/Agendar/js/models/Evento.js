/**
 * @file Evento.js
 * @description Modelo de entidad principal del módulo.
 * Define la estructura de un evento académico y sus métodos básicos.
 *
 * Reglas de negocio aplicadas en el constructor:
 *  - El estado inicial siempre es 'Pendiente' (no lo define el usuario).
 *  - Los cupos se almacenan como número entero.
 *  - La fecha de registro se genera automáticamente al crear el objeto.
 */

export class Evento {
  /**
   * Crea una instancia de Evento.
   * @param {string} nombre       - Nombre del evento.
   * @param {string} categoria    - Categoría académica (Conferencia, Taller, etc.).
   * @param {string} fecha        - Fecha en formato YYYY-MM-DD.
   * @param {string} hora         - Hora en formato HH:MM.
   * @param {string} modalidad    - Modalidad (Presencial, Virtual, Híbrido).
   * @param {string} ubicacion    - Lugar o plataforma del evento.
   * @param {string} descripcion  - Descripción opcional del evento.
   * @param {number|string} cupos - Número máximo de asistentes (mín. 10).
   */
  constructor(nombre, categoria, fecha, hora, modalidad, ubicacion, descripcion, cupos) {
    this.id            = Date.now();
    this.fechaRegistro = new Date().toLocaleDateString('es-ES');
    this.nombre        = nombre;
    this.categoria     = categoria;
    this.fecha         = fecha;
    this.hora          = hora;
    this.modalidad     = modalidad;
    this.ubicacion     = ubicacion;
    this.descripcion   = descripcion;
    this.cupos         = Number(cupos);
    // Regla de negocio 1: el estado inicial siempre es 'Pendiente'
    this.estado        = 'Pendiente';
  }

  /**
   * Indica si el evento tiene cupos disponibles.
   * @returns {boolean}
   */
  hayCupos() {
    return this.cupos > 0;
  }

  /**
   * Devuelve un resumen corto del evento para listas o logs.
   * @returns {string}
   */
  obtenerResumen() {
    return `${this.nombre} — ${this.fecha} ${this.hora}`;
  }
}
