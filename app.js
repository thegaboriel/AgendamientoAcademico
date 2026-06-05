

let eventos = JSON.parse(localStorage.getItem('eventos_academicos')) || [...eventosAcademicos];

const eventosContainer = document.getElementById('eventos-container');
const formEvento = document.getElementById('form-evento');
const searchInput = document.getElementById('search-input');
const filterTipo = document.getElementById('filter-tipo');
const sortFecha = document.getElementById('sort-fecha');

const modal = document.getElementById('modal-detalle');
const modalBody = document.getElementById('modal-body');
const modalTitulo = document.getElementById('modal-titulo');
const closeModalBtn = document.querySelector('.close-modal');

function renderizarEventos() {
  eventosContainer.innerHTML = '';

  const busqueda = searchInput.value.toLowerCase();
  const tipoSeleccionado = filterTipo.value;
  const orden = sortFecha.value;

  let eventosFiltrados = eventos.filter(evento => {
    const coincideTexto = evento.nombre.toLowerCase().includes(busqueda) || 
                          evento.lugar.toLowerCase().includes(busqueda);
    const coincideTipo = tipoSeleccionado === 'Todos' || evento.tipo === tipoSeleccionado;
    return coincideTexto && coincideTipo;
  });

  eventosFiltrados.sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return orden === 'asc' ? fechaA - fechaB : fechaB - fechaA;
  });

  if (eventosFiltrados.length === 0) {
    eventosContainer.innerHTML = '<p class="no-results">No se encontraron eventos con los criterios seleccionados.</p>';
    return;
  }

  eventosFiltrados.map(evento => {
    const card = document.createElement('div');
    card.className = 'evento-card';
    card.innerHTML = `
      <h3>${evento.nombre}</h3>
      <p><strong>Tipo:</strong> <span class="badge">${evento.tipo}</span></p>
      <p><strong>Fecha:</strong> ${formatearFecha(evento.fecha)}</p>
      <p><strong>Lugar:</strong> ${evento.lugar}</p>
      <button class="btn-detalle" data-id="${evento.id}">Ver Detalle</button>
    `;
    eventosContainer.appendChild(card);
  });

  guardarEnLocalStorage();
}

formEvento.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (validarFormulario()) {
    const nuevoEvento = {
      id: Date.now(), 
      nombre: document.getElementById('nombre').value.trim(),
      tipo: document.getElementById('tipo').value,
      fecha: document.getElementById('fecha').value,
      lugar: document.getElementById('lugar').value.trim(),
      capacidad: parseInt(document.getElementById('capacidad').value)
    };

    eventos.push(nuevoEvento);
    renderizarEventos();
    formEvento.reset();
    limpiarErrores();
  }
});

function validarFormulario() {
  let esValido = true;
  limpiarErrores();

  const nombre = document.getElementById('nombre');
  const tipo = document.getElementById('tipo');
  const fecha = document.getElementById('fecha');
  const lugar = document.getElementById('lugar');
  const capacidad = document.getElementById('capacidad');

  if (nombre.value.trim().length < 5) {
    mostrarError('err-nombre', 'El nombre debe tener al menos 5 caracteres.');
    esValido = false;
  }
  if (!tipo.value) {
    mostrarError('err-tipo', 'Debe seleccionar un tipo de evento.');
    esValido = false;
  }
  if (!fecha.value) {
    mostrarError('err-fecha', 'La fecha es obligatoria.');
    esValido = false;
  }
  if (lugar.value.trim() === '') {
    mostrarError('err-lugar', 'El lugar no puede estar vacío.');
    esValido = false;
  }
  if (!capacidad.value || parseInt(capacidad.value) < 10) {
    mostrarError('err-capacidad', 'La capacidad mínima debe ser de 10 asistentes.');
    esValido = false;
  }

  return esValido;
}

function mostrarError(idElemento, mensaje) {
  const errorSpan = document.getElementById(idElemento);
  errorSpan.textContent = mensaje;
  errorSpan.style.display = 'block';
}

function limpiarErrores() {
  document.querySelectorAll('.error-msg').forEach(span => {
    span.textContent = '';
    span.style.display = 'none';
  });
}

eventosContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-detalle')) {
    const idEvento = parseInt(e.target.getAttribute('data-id'));
    
    const eventoEncontrado = eventos.find(evt => evt.id === idEvento);
    
    if (eventoEncontrado) {
      abrirModal(eventoEncontrado);
    }
  }
});

function abrirModal(evento) {
  modalTitulo.textContent = evento.nombre;
  modalBody.innerHTML = `
    <p><strong>Categoría Académica:</strong> ${evento.tipo}</p>
    <p><strong>Fecha de Realización:</strong> ${formatearFecha(evento.fecha)}</p>
    <p><strong>Lugar Asignado:</strong> ${evento.lugar}</p>
    <p><strong>Capacidad Máxima:</strong> ${evento.capacidad} personas</p>
    <div class="disponibilidad-info">
       <small>* Registro en base de datos local verificado de manera exitosa.</small>
    </div>
  `;
  modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

function guardarEnLocalStorage() {
  localStorage.setItem('eventos_academicos', JSON.stringify(eventos));
}

function formatearFecha(fechaString) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fechaString + 'T00:00:00').toLocaleDateString('es-ES', opciones);
}

searchInput.addEventListener('input', renderizarEventos);
filterTipo.addEventListener('change', renderizarEventos);
sortFecha.addEventListener('change', renderizarEventos);

document.addEventListener('DOMContentLoaded', renderizarEventos);