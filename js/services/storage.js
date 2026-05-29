const KEY = 'eventosAcademicos';

export function obtenerEventos() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function guardarEventos(eventos) {
  localStorage.setItem(KEY, JSON.stringify(eventos));
}

export function agregarEvento(evento) {
  const eventos = obtenerEventos();
  eventos.push(evento);
  guardarEventos(eventos);
}

export function actualizarEvento(id, datosActualizados) {
  const eventos = obtenerEventos();
  const nuevosEventos = eventos.map(evento =>
    evento.id === id ? { ...evento, ...datosActualizados } : evento
  );
  
  guardarEventos(nuevosEventos);
}

export function eliminarEvento(id) {
  const eventos = obtenerEventos();
  const nuevosEventos = eventos.filter(evento => evento.id !== id);
  
  guardarEventos(nuevosEventos);
}