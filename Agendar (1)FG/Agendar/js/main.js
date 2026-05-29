/**
 * @file main.js
 * @description Punto de entrada de la aplicación.
 * Orquesta la interacción entre los módulos de servicios, validación y UI.
 * No contiene lógica de negocio ni manipulación directa del DOM.
 */

import { crearEvento, buscarEventos, filtrarPorCategoria, ordenarEventos } from './services/module-service.js';
import { obtenerEventos, agregarEvento }                                   from './services/storage.js';
import { validarFormulario }                                               from './utils/validators.js';
import { renderizarEventos, actualizarContador, mostrarErrores,
         abrirModal, cerrarModal, mostrarMensajeExito }                    from './ui/render.js';

// ── Referencias al DOM ────────────────────────────────────────────────────────
const form          = document.getElementById('form-evento');
const searchInput   = document.getElementById('search-input');
const filterCategoria = document.getElementById('filter-categoria');
const sortFecha     = document.getElementById('sort-fecha');
const closeModalBtn = document.querySelector('.close-modal');
const modal         = document.getElementById('modal-detalle');
const contenedor    = document.getElementById('eventos-container');

// ── Carga inicial ─────────────────────────────────────────────────────────────
let eventos = obtenerEventos();
refrescarVista();

// ── Registro de nuevo evento ──────────────────────────────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const datos = {
    nombre:      document.getElementById('nombre').value,
    categoria:   document.getElementById('categoria').value,
    fecha:       document.getElementById('fecha').value,
    hora:        document.getElementById('hora').value,
    modalidad:   document.getElementById('modalidad').value,
    ubicacion:   document.getElementById('ubicacion').value,
    descripcion: document.getElementById('descripcion').value,
    cupos:       document.getElementById('cupos').value
  };

  const errores = validarFormulario(datos);

  if (errores) {
    mostrarErrores(errores);
    return;
  }

  mostrarErrores(null);
  const nuevoEvento = crearEvento(datos);
  agregarEvento(nuevoEvento);

  eventos = obtenerEventos();
  refrescarVista();
  form.reset();
  mostrarMensajeExito();
});

// ── Filtros y búsqueda ────────────────────────────────────────────────────────
searchInput.addEventListener('input', refrescarVista);
filterCategoria.addEventListener('change', refrescarVista);
sortFecha.addEventListener('change', refrescarVista);

// ── Modal: abrir al hacer clic en "Ver detalle" ───────────────────────────────
contenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-detalle')) {
    const id = Number(e.target.getAttribute('data-id'));
    const evento = eventos.find(ev => ev.id === id);
    if (evento) abrirModal(evento);
  }
});

// ── Modal: cerrar ─────────────────────────────────────────────────────────────
closeModalBtn.addEventListener('click', cerrarModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) cerrarModal();
});

// ── Función auxiliar: aplica filtros, ordena y renderiza ──────────────────────
function refrescarVista() {
  let resultado = obtenerEventos();
  resultado = buscarEventos(resultado, searchInput.value);
  resultado = filtrarPorCategoria(resultado, filterCategoria.value);
  resultado = ordenarEventos(resultado, sortFecha.value);
  renderizarEventos(resultado);
  actualizarContador(obtenerEventos().length);
}
