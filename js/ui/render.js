const lista = document.getElementById('eventos-container');

export function renderizarEventos(eventos) {
  lista.innerHTML = '';

  if (eventos.length === 0) {
    lista.innerHTML = `<p>No hay eventos registrados</p>`;
    return;
  }

  let htmlContenido = '';
  
  eventos.forEach(evento => {
    htmlContenido += `
      <div class="card">
        <h3>${evento.nombre}</h3>
        <p>Categoría: ${evento.categoria}</p>
        <p>Fecha: ${evento.fecha}</p>
        <p>Hora: ${evento.hora}</p>
        <p>Modalidad: ${evento.modalidad}</p>
        <p>Cupos: ${evento.cupos}</p>
        <p>Estado: ${evento.estado}</p>
      </div>
    `;
  });

  lista.innerHTML = htmlContenido;
}

export function actualizarContador(total) {
  document.getElementById('contador').textContent = `Total: ${total}`;
}

export function mostrarMensaje(mensaje) {
  alert(mensaje);
}