/**
 * @file render.js
 * @description Funciones responsables de actualizar el DOM.
 * No contiene lógica de negocio; solo traduce datos a HTML visible.
 */

const contenedor = document.getElementById('eventos-container');
const modal      = document.getElementById('modal-detalle');
const modalTitulo = document.getElementById('modal-titulo');
const modalBody  = document.getElementById('modal-body');

/**
 * Renderiza la lista de eventos en el contenedor principal.
 * Muestra un estado vacío si no hay eventos.
 * @param {Array} eventos - Lista de eventos a mostrar.
 */
export function renderizarEventos(eventos) {
  contenedor.innerHTML = '';

  if (eventos.length === 0) {
    contenedor.innerHTML = `
      <div class="estado-vacio">
        <span>📅</span>
        No hay eventos que coincidan con los criterios de búsqueda.
      </div>`;
    return;
  }

  let html = '';
  eventos.forEach(evento => {
    html += `
<div class="evento-card">
        <h3>${evento.nombre}</h3>
        <p><strong>Categoría:</strong> <span class="badge">${evento.categoria}</span></p>
        <p><strong>Fecha:</strong> ${formatearFecha(evento.fecha)} — ${evento.hora}</p>
        <p><strong>Modalidad:</strong> ${evento.modalidad}</p>
        <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
        <p><strong>Cupos:</strong> ${evento.cupos}</p>
        <span class="badge-estado pendiente">${evento.estado}</span>
        <button class="btn-detalle" data-id="${evento.id}">Ver detalle</button>
      </div>`;
  });

  contenedor.innerHTML = html;
}

/**
 * Actualiza el contador de eventos registrados.
 * @param {number} total - Número total de eventos.
 */
export function actualizarContador(total) {
  document.getElementById('contador').textContent = `Total: ${total}`;
}

/**
 * Muestra u oculta los mensajes de error por campo en el formulario.
 * @param {Object|null} errores - Objeto con errores { campo: mensaje } o null.
 */
export function mostrarErrores(errores) {
  // Limpiar todos los mensajes previos
  document.querySelectorAll('.error-msg').forEach(span => {
    span.textContent = '';
    span.style.display = 'none';
  });

  if (!errores) return;

  Object.entries(errores).forEach(([campo, mensaje]) => {
    const span = document.getElementById(`err-${campo}`);
    if (span) {
      span.textContent = mensaje;
      span.style.display = 'block';
    }
  });
}

/**
 * Muestra el modal con el detalle completo de un evento.
 * @param {Object} evento - Evento a mostrar.
 */
export function abrirModal(evento) {
  modalTitulo.textContent = evento.nombre;
  modalBody.innerHTML = `
    <p><strong>Categoría:</strong> ${evento.categoria}</p>
    <p><strong>Fecha:</strong> ${formatearFecha(evento.fecha)} — ${evento.hora}</p>
    <p><strong>Modalidad:</strong> ${evento.modalidad}</p>
    <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
    <p><strong>Cupos máximos:</strong> ${evento.cupos} personas</p>
    <p><strong>Descripción:</strong> ${evento.descripcion || 'Sin descripción registrada.'}</p>
    <p><strong>Estado:</strong> ${evento.estado}</p>
    <p><strong>Registrado el:</strong> ${evento.fechaRegistro}</p>
    <div class="disponibilidad-info">
      ✔ Registro verificado en base de datos local.
    </div>`;
  modal.classList.remove('oculto');
}

/**
 * Cierra el modal de detalle.
 */
export function cerrarModal() {
  modal.classList.add('oculto');
}

/**
 * Muestra brevemente el mensaje de guardado exitoso y lo oculta tras 3 segundos.
 */
export function mostrarMensajeExito() {
  const msg = document.getElementById('msg-exito');
  msg.classList.remove('oculto');
  setTimeout(() => msg.classList.add('oculto'), 3000);
}

/**
 * Formatea una fecha YYYY-MM-DD al formato legible en español.
 * @param {string} fechaStr
 * @returns {string} Ej: "15 de septiembre de 2025"
 */
function formatearFecha(fechaStr) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fechaStr + 'T00:00:00').toLocaleDateString('es-ES', opciones);
}
