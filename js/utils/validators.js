export function campoVacio(valor) {
  return valor.trim() === '';
}

export function validarTexto(texto, min = 3) {
  return texto.trim().length >= min;
}

export function validarCupos(cupos) {
  return Number(cupos) >= 10;
}

export function validarFecha(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return new Date(fecha) >= hoy;
}


export function validarFormulario(datos) {
  if (campoVacio(datos.nombre)) {
    return 'El nombre es obligatorio';
  }

  if (!validarTexto(datos.nombre)) {
    return 'El nombre debe tener mínimo 3 caracteres';
  }

  if (!validarFecha(datos.fecha)) {
    return 'La fecha no puede ser anterior al día actual';
  }

  if (!validarCupos(datos.cupos)) {
    return 'La capacidad mínima es de 10 asistentes';
  }

  return null;
}