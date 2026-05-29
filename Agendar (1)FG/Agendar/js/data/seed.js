/**
 * @file seed.js
 * @description Datos semilla para poblar el módulo en su primera carga.
 * Permite visualizar el listado sin necesidad de registrar eventos manualmente.
 * Se cargan solo si localStorage está vacío (ver storage.js).
 */

export const eventosSemilla = [
  {
    id: 1700000000001,
    fechaRegistro: '01/09/2025',
    nombre: 'Congreso Internacional de Ingeniería de Sistemas',
    categoria: 'Congreso',
    fecha: '2025-09-15',
    hora: '09:00',
    modalidad: 'Presencial',
    ubicacion: 'Auditorio Central, Bloque A',
    descripcion: 'Evento anual que reúne investigadores y profesionales del área tecnológica.',
    cupos: 200,
    estado: 'Pendiente'
  },
  {
    id: 1700000000002,
    fechaRegistro: '01/09/2025',
    nombre: 'Taller de Desarrollo Web con React',
    categoria: 'Taller',
    fecha: '2025-09-20',
    hora: '14:00',
    modalidad: 'Virtual',
    ubicacion: 'Plataforma Teams',
    descripcion: 'Taller práctico introductorio sobre React y el ecosistema moderno de frontend.',
    cupos: 40,
    estado: 'Pendiente'
  },
  {
    id: 1700000000003,
    fechaRegistro: '01/09/2025',
    nombre: 'Seminario de Ética en Inteligencia Artificial',
    categoria: 'Seminario',
    fecha: '2025-10-05',
    hora: '10:30',
    modalidad: 'Híbrido',
    ubicacion: 'Sala de Conferencias, Bloque B',
    descripcion: 'Análisis crítico sobre el uso responsable de la IA en entornos académicos.',
    cupos: 80,
    estado: 'Pendiente'
  }
];
