/**
 * @file validators.js
 * @description Funciones de validación reutilizables para campos de formulario.
 * Son independientes del módulo; pueden usarse en cualquier formulario del proyecto.
 */

/**
 * Verifica si un campo de texto está vacío.
 * @param {string} valor
 * @returns {boolean} true si está vacío.
 */
export function campoVacio(valor) {
  return valor.trim() === '';
}

/**
 * Verifica que un texto tenga al menos 'min' caracteres.
 * @param {string} texto
 * @param {number} [min=3]
 * @returns {boolean}
 */
export function longitudMinima(texto, min = 3) {
  return texto.trim().length >= min;
}

/**
 * Verifica que un número sea mayor o igual que un mínimo dado.
 * @param {number|string} valor
 * @param {number} [min=10]
 * @returns {boolean}
 */
export function numeroMinimo(valor, min = 10) {
  return Number(valor) >= min;
}

/**
 * Verifica que una fecha (YYYY-MM-DD) no sea anterior al día de hoy.
 * @param {string} fecha
 * @returns {boolean}
 */
export function fechaNoAnterior(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return new Date(fecha + 'T00:00:00') >= hoy;
}

/**
 * Valida todos los campos del formulario de eventos.
 * Devuelve un objeto con mensajes de error por campo, o null si todo es válido.
 * @param {Object} datos - Datos capturados del formulario.
 * @returns {Object|null} Objeto con errores o null si no hay errores.
 */
export function validarFormulario(datos) {
  const errores = {};

  if (campoVacio(datos.nombre)) {
    errores.nombre = 'El nombre del evento es obligatorio.';
  } else if (!longitudMinima(datos.nombre, 5)) {
    errores.nombre = 'El nombre debe tener al menos 5 caracteres.';
  }

  if (campoVacio(datos.categoria)) {
    errores.categoria = 'Debe seleccionar una categoría.';
  }

  if (campoVacio(datos.fecha)) {
    errores.fecha = 'La fecha es obligatoria.';
  } else if (!fechaNoAnterior(datos.fecha)) {
    errores.fecha = 'La fecha no puede ser anterior al día actual.';
  }

  if (campoVacio(datos.hora)) {
    errores.hora = 'La hora es obligatoria.';
  }

  if (campoVacio(datos.modalidad)) {
    errores.modalidad = 'Debe seleccionar una modalidad.';
  }

  if (campoVacio(datos.ubicacion)) {
    errores.ubicacion = 'El lugar o ubicación es obligatorio.';
  }

  if (campoVacio(String(datos.cupos))) {
    errores.cupos = 'La capacidad es obligatoria.';
  } else if (!numeroMinimo(datos.cupos, 10)) {
    errores.cupos = 'La capacidad mínima debe ser de 10 asistentes.';
  }

  return Object.keys(errores).length > 0 ? errores : null;
}
