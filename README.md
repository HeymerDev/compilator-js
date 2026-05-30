# Costeñol

Costeñol es un lenguaje de programación experimental inspirado en la cultura costeña colombiana, desarrollado completamente con JavaScript.

El proyecto incluye:

- Compilador semántico y sintáctico.
- Runtime propio.
- IDE web estilo VS Code.
- CLI ejecutable desde terminal.
- Sistema de resaltado de sintaxis.
- Captura de datos desde terminal.
- Validación de tipos.
- Ejecución de operaciones matemáticas.
- Manejo de errores en tiempo real.

---

# Instalación del CLI

Costeñol puede instalarse globalmente desde NPM.

```bash
npm install -g costenol-cli
```

Una vez instalado podrás ejecutar programas Costeñol desde cualquier ubicación de tu computadora.

---

## Ejecutar archivo

```bash
costenol archivo.pqek
```

Ejemplo:

```bash
costenol hola.pqek
```

---

# Cómo ejecutar la IDE Web

## 1. Clonar el repositorio

```bash
git clone https://github.com/HeymerDev/compilator-js.git
```

Entrar al proyecto:

```bash
cd compilator-js
```

---

## 2. Instalar la extensión Live Server

Abrir Visual Studio Code e instalar la extensión:

**Live Server**

Autor: Ritwick Dey

---

## 3. Abrir la IDE

Ubicar el archivo:

```bash
view.html
```

Hacer clic derecho sobre el archivo y seleccionar:

```text
Open with Live Server
```

---

## 4. Usar Costeñol

Al abrirse el navegador encontrarás:

- Editor de código.
- Resaltado de sintaxis.
- Numeración de líneas.
- Terminal integrada.
- Ejecución interactiva.
- Validación sintáctica y semántica.

Ahora podrás escribir programas `.pqek` y ejecutarlos directamente desde la IDE.

# Características actuales

## Declaración de variables

```pqek
edad Entero;
nombre Texto;
precio Real;
activo Logico;
```

---

## Asignaciones

```pqek
edad = 18;
nombre = "Heymer";
precio = 10.5;
activo = verdadero;
```

---

## Captura de datos

```pqek
edad = Captura.Entero();
nombre = Captura.Texto();
```

El lenguaje permite escribir datos directamente desde la terminal interactiva.

---

## Mostrar mensajes

```pqek
Mensaje.Texto("Hola mundo");
Mensaje.Texto("Tu edad es: ", edad);
```

---

## Operaciones matemáticas

```pqek
edad = edad + 1;
precio = precio * 2;
```

---

## Validación semántica

Costeñol actualmente valida:

- Variables no definidas.
- Variables duplicadas.
- Tipos incompatibles.
- Uso incorrecto de capturas.
- Operaciones inválidas.
- Strings mal cerrados.
- Errores sintácticos básicos.
- Uso inválido de tipos en operaciones matemáticas.

---

# Tipos de datos soportados

| Tipo   | Descripción       |
| ------ | ----------------- |
| Entero | Números enteros   |
| Real   | Números decimales |
| Texto  | Cadenas de texto  |
| Logico | verdadero o falso |

---

# Estructura actual del proyecto

```bash
📁 costenol
│
├── 📁 cli
│   ├── 📁 node_modules
│   │
│   ├── 📁 runtime
│   │   ├── ejecutar.js
│   │   └── terminal.js
│   │
│   ├── hola.pqek
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── 📁 compiler
│   ├── assignments.js
│   ├── captures.js
│   ├── compiler.js
│   ├── declaration.js
│   ├── messages.js
│   └── regex.js
│
├── 📁 runtime
│   ├── ejecutar.js
│   └── terminal.js
│
├── editor.js
├── resize.js
├── script.js
├── style.css
├── view.html
├── .gitignore
└── README.md
```

---

# IDE Web

El proyecto incluye una IDE web inspirada en VS Code con:

- Numeración de líneas.
- Terminal integrada.
- Resaltado de sintaxis.
- Panel redimensionable.
- Botón ▶ Run.
- Colores personalizados del lenguaje.
- Ejecución interactiva.

---

# Colores del lenguaje

## Variables

Color púrpura claro.

## Tipos de datos

Morado oscuro.

## Strings

Verde.

## Números

Amarillo.

## Booleanos

Salmón quemado.

## Palabras reservadas

Gris y azul.

---

# CLI

Costeñol incluye un CLI ejecutable desde terminal.

---

## Instalar desde NPM

```bash
npm install -g costenol-cli
```

---

## Ejecutar archivo

```bash
costenol archivo.pqek
```

---

# Extensión del lenguaje

Los archivos del lenguaje utilizan la extensión:

```bash
.pqek
```

---

# Ejemplo completo

```pqek
edad Entero;
nombre Texto;

Mensaje.Texto("¿Cuál es tu nombre?");
nombre = Captura.Texto();

Mensaje.Texto("¿Cuál es tu edad?");
edad = Captura.Entero();

edad = edad + 1;

Mensaje.Texto("Hola ", nombre);
Mensaje.Texto("El próximo año tendrás ", edad);
```

---

# Ejecutar ejemplo

```bash
costenol hola.pqek
```

---

# Cómo ejecutar el proyecto

## IDE Web

Abrir:

```bash
view.html
```

---

## CLI

Entrar a la carpeta:

```bash
cd cli
```

Instalar dependencias:

```bash
npm install
```

Ejecutar archivo:

```bash
node index.js hola.pqek
```

O si el paquete está instalado globalmente:

```bash
costenol hola.pqek
```

---

# Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- Node.js

---

# Arquitectura del proyecto

## Compiler

Se encarga de:

- Validación sintáctica.
- Validación semántica.
- Tabla de símbolos.
- Validación de tipos.
- Análisis de instrucciones.

---

## Runtime

Se encarga de:

- Ejecutar instrucciones.
- Capturar entradas.
- Mostrar mensajes.
- Resolver operaciones.
- Manejar variables en ejecución.

---

## IDE

Se encarga de:

- Edición visual.
- Syntax highlighting.
- Terminal visual.
- UX del lenguaje.

---

## CLI

Permite ejecutar programas `.pqek` desde cualquier terminal.

---

# Próximas mejoras

## Lenguaje

- Condicionales.
- Ciclos.
- Funciones.
- Arreglos.
- Objetos.
- Scope de variables.
- Operadores lógicos.
- Comparaciones.
- Múltiples archivos.

---

## Compilador

- Lexer completo.
- Parser real.
- AST (Abstract Syntax Tree).
- Tabla de símbolos avanzada.
- Optimización de código.
- Manejo avanzado de errores.

---

## Runtime

- Manejo de memoria.
- Librerías estándar.
- Sistema de módulos.
- Manejo de excepciones.

---

## IDE

- Autocompletado.
- Errores inline.
- Hover de variables.
- Debugger.
- Minimapa.
- Explorador de archivos.
- Temas personalizados.

---

## VS Code Extension

- Soporte oficial `.pqek`.
- Syntax highlighting.
- Botón Run.
- Diagnósticos en tiempo real.
- Integración con el CLI.
- Terminal integrada.

---

## Futuro

- Compilación a JavaScript.
- Compilación a WebAssembly.
- Ejecución en navegador.
- Compilador nativo.
- Máquina virtual propia.

---

# Autor

Heymer Meza

Proyecto experimental educativo enfocado en aprender:

- compiladores
- análisis léxico
- análisis sintáctico
- runtimes
- diseño de lenguajes
- tooling de desarrollo
