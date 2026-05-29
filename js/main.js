import { crearEvento } from './services/module-service.js';
import { agregarEvento, obtenerEventos } from './services/storage.js';
import { actualizarContador, renderizarEventos } from './ui/render.js';
import { validarFormulario } from './utils/validators.js';

const form = document.getElementById('form-evento');
let eventos = obtenerEventos();

renderizarEventos(eventos);
actualizarContador(eventos.length);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById('nombre').value,
    tipo: document.getElementById('tipo').value,
    fecha: document.getElementById('fecha').value,
    lugar: document.getElementById('lugar').value,
    cupos: document.getElementById('cupos').value
  };

  const error = validarFormulario(datos);
  if (error) {
    alert(error);
    return;
  }

  const nuevoEvento = crearEvento(datos);
  agregarEvento(nuevoEvento);

  eventos = obtenerEventos();
  renderizarEventos(eventos);
  actualizarContador(eventos.length);

  form.reset();
});