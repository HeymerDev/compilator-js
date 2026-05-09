# Mini Compilador en JavaScript

Este proyecto es un mini compilador sencillo desarrollado con HTML, CSS y JavaScript.

El sistema permite:

- Validar declaraciones de variables.
- Verificar errores sintácticos básicos.
- Descomponer la declaración en tokens.

---

# Estructura del proyecto

```bash
📁 mini-compilador
│
├── view.html
├── style.css
├── script.js
└── README.md
```

---

# Cómo funciona

El usuario escribe una declaración de variable en el input.

## Ejemplo:

edad Entero;

# El compilador valida que:

## El nombre de la variable:

- Empiece con letra.
- Exista un espacio entre nombre y tipo.

## El tipo de dato sea válido:

- Entero
- Texto
- Real
- Logico
- La línea termine obligatoriamente con ;

## Ejemplos válidos

```ts
edad Entero;
nombre Texto;
precio Real;
activo Logico;
```

## Ejemplos inválidos

```ts
1edad Entero;
edad entero;
edad Entero
edadEntero;
Tokens generados
```

# Cuando la declaración es correcta, el sistema muestra:

| Token         | Lexema |
| ------------- | ------ |
| IDENTIFICADOR | edad   |
| TIPO_DATO     | Entero |
| FIN_SENTENCIA | ;      |

# Al abrir view.html en el navegador encontrarás:

- Un título llamado Mini Compilador.
- Un input donde escribir la declaración.
- Un botón Analizar.
- Un área de resultados:
- Mensaje en verde si es válido.
- Mensaje en rojo si hay error.
- Una tabla mostrando los tokens encontrados.

# Tecnologías usadas

- HTML5
- CSS3
- JavaScript Vanilla

# Cómo ejecutar el proyecto

Descarga o clona el repositorio.

Abre el archivo:
view.html

Escribe una declaración y presiona Analizar.

# Próximas mejoras

- Soporte para múltiples líneas.
- Asignación de variables.
- Análisis léxico manual.
- Análisis sintáctico.
- Mini lenguaje propio.
