# Memoria Técnica: Dashboard para la Gestión de Eventos Académicos

**Asignatura:** Desarrollo de Aplicaciones Moviles
**Componente:** Práctica de Laboratorio - JavaScript Intermedio


## 1. Descripción del Módulo

Este proyecto contiene el desarrollo de un prototipo funcional para la administración de un catálogo de eventos académicos (conferencias, talleres, congresos y seminarios). La aplicación permite el registro de nuevos elementos mediante un formulario validado en el lado del cliente, el almacenamiento persistente de los datos y un sistema de filtrado y ordenamiento cronológico en tiempo real.

El proyecto está desarrollado exclusivamente con tecnologías nativas del navegador (HTML5, CSS3 y Vanilla JavaScript ES6+), prescindiendo del uso de librerías o frameworks externos para garantizar el cumplimiento de los requerimientos de la cátedra.


## 2. Modelado de Datos y Estructura del Objeto

Los eventos académicos se manejan como objetos independientes dentro de un arreglo global. Cada objeto cuenta con la siguiente estructura de atributos:

* `id`: Valor numérico único generado dinámicamente mediante el timestamp del sistema (`Date.now()`).
* `nombre`: Cadena de texto que identifica el evento (con una restricción de longitud mínima de 5 caracteres).
* `tipo`: Categoría del evento (Conferencia, Taller, Congreso o Seminario).
* `fecha`: Fecha de realización en formato `YYYY-MM-DD`, utilizada como criterio de ordenamiento.
* `lugar`: Ubicación física o enlace a la plataforma virtual.
* `capacidad`: Valor numérico entero que limita el aforo (con un mínimo paramétrico de 10 asistentes).


## 3. Implementación de Requisitos Técnicos

### Métodos de Arreglos (Higher-Order Functions)
Para la manipulación del estado de los datos se evitaron los bucles iterativos tradicionales, utilizando en su lugar los métodos nativos de ES6:
* **`filter()`**: Se ejecuta de forma síncrona cada vez que el usuario escribe en el buscador o cambia el selector de tipo, devolviendo únicamente los registros que coinciden con ambos criterios.
* **`sort()`**: Organiza el listado de eventos transformando las cadenas de fecha en instancias del objeto `Date` para comparar sus valores de tiempo de forma ascendente o descendente.
* **`map()`**: Recorre el arreglo final ya filtrado y ordenado para construir la estructura HTML de las tarjetas e inyectarlas en el contenedor del DOM.
* **`find()`**: Se activa mediante la delegación de eventos al hacer clic en una tarjeta; busca el objeto exacto por su `id` para transferir sus propiedades al componente modal.

### Validaciones y Control del DOM
El formulario implementa la cancelación del envío por defecto mediante `e.preventDefault()`. La validación evalúa campo por campo antes de permitir la inserción del nuevo objeto en el arreglo. En caso de detectar inconsistencias (campos vacíos, longitud insuficiente o aforo menor al permitido), se habilitan bloques de texto ocultos (`.error-msg`) con mensajes específicos para el usuario.

### Persistencia en LocalStorage
Para simular el comportamiento de una base de datos local, el arreglo se serializa a formato de texto mediante `JSON.stringify()` antes de guardarse en el `localStorage`. Al cargar el documento (`DOMContentLoaded`), la aplicación evalúa si existen datos previos mediante una operación lógica de cortocircuito (`||`); si existen, los deserializa con `JSON.parse()`, y si no, carga el archivo de datos semilla (`data.js`).


## 4. Estructura del Repositorio

```text
├── .vscode/
│   └── launch.json         # Configuración del depurador para entornos locales
├── index.html              # Estructura de la interfaz y marcado semántico
├── styles.css              # Hoja de estilos basada en Flexbox, CSS Grid y variables globales
├── data.js                 # Datos semilla iniciales (8 registros base de ejemplo)
├── app.js                  # Lógica de la aplicación, manejo de eventos y validaciones
└── README.md               # Documentación técnica del proyecto (Este archivo)