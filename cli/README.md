# costenol-cli

CLI oficial del lenguaje de programación experimental **Costeñol**.

Ejecuta archivos `.pqek` directamente desde la terminal.

---

# Instalación

Instalar globalmente desde NPM:

```bash
npm install -g costenol-cli
```

---

# Uso

```bash
costenol archivo.pqek
```

---

# Ejemplo

## archivo: hola.pqek

```pqek
nombre Texto;
edad Entero;

Mensaje.Texto("¿Cómo te llamas?");
nombre = Captura.Texto();

Mensaje.Texto("¿Qué edad tienes?");
edad = Captura.Entero();

edad = edad + 1;

Mensaje.Texto("Hola ", nombre);
Mensaje.Texto("El próximo año tendrás ", edad);
```

---

## Ejecutar

```bash
costenol hola.pqek
```

---

# Características

- Variables tipadas.
- Captura de datos desde terminal.
- Operaciones matemáticas.
- Validación de tipos.
- Mensajes por consola.
- Manejo de errores sintácticos.
- Manejo de errores semánticos.
- Runtime interactivo.

---

# Tipos soportados

| Tipo   | Descripción       |
| ------ | ----------------- |
| Entero | Números enteros   |
| Real   | Números decimales |
| Texto  | Cadenas de texto  |
| Logico | verdadero o falso |

---

# Sintaxis básica

## Declaración

```pqek
edad Entero;
```

---

## Asignación

```pqek
edad = 20;
nombre = "Heymer";
activo = verdadero;
```

---

## Captura

```pqek
edad = Captura.Entero();
nombre = Captura.Texto();
```

---

## Mensajes

```pqek
Mensaje.Texto("Hola mundo");
Mensaje.Texto("Edad: ", edad);
```

---

# Operaciones

```pqek
edad = edad + 1;
precio = precio * 2;
```

---

# Extensión oficial

```bash
.pqek
```

---

# Ejemplo de errores detectados

## Variable no definida

```pqek
edad = numero;
```

---

## Tipos incompatibles

```pqek
edad = "hola";
```

---

## Error sintáctico

```pqek
edad Entero
```

---

# Arquitectura

El proyecto está dividido en:

- Compiler
- Runtime
- CLI
- IDE Web

---

# Roadmap

- Condicionales.
- Ciclos.
- Funciones.
- AST real.
- Lexer.
- Parser.
- Extensión para VS Code.
- Language Server.
- Compilación a JavaScript.

---

# Autor

Heymer Meza

Proyecto educativo enfocado en aprender:

- compiladores
- runtimes
- diseño de lenguajes
- análisis léxico
- análisis sintáctico
- tooling
