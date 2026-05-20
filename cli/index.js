#!/usr/bin/env node

import fs from "fs";

import { analizarCodigo } from "../compiler/compiler.js";

import { ejecutarCodigo } from "./runtime/ejecutar.js";

import { escribirTerminal } from "./runtime/terminal.js";

const archivo = process.argv[2];

// =========================
// VALIDAR ARCHIVO
// =========================

if (!archivo) {
  escribirTerminal("Debes enviar un archivo .pqek");

  process.exit(1);
}

// =========================
// LEER ARCHIVO
// =========================

const codigo = fs.readFileSync(archivo, "utf-8");

// =========================
// COMPILAR
// =========================

const resultado = analizarCodigo(codigo);

const errores = resultado.errores;

// =========================
// ERRORES
// =========================

if (errores.length > 0) {
  errores.forEach((error) => {
    escribirTerminal(error);
  });

  process.exit(1);
}

// =========================
// EJECUTAR
// =========================

await ejecutarCodigo(resultado.lineas, resultado.variables);
