#!/usr/bin/env node

import fs from "fs";

import { ejecutarCodigo } from "./runtime/ejecutar.js";

import { regexDeclaracion } from "../compiler/regex.js";

const archivo = process.argv[2];

// =========================
// VALIDAR ARCHIVO
// =========================

if (!archivo) {
  console.log("Debes enviar un archivo .pqek");

  process.exit(1);
}

// =========================
// LEER CÓDIGO
// =========================

const codigo = fs.readFileSync(archivo, "utf-8");

const lineas = codigo.split("\n");

// =========================
// TABLA DE VARIABLES
// =========================

const variables = {};

// =========================
// DECLARACIONES
// =========================

for (const lineaOriginal of lineas) {
  const linea = lineaOriginal.trim();

  if (regexDeclaracion.test(linea)) {
    const match = linea.match(regexDeclaracion);

    const nombre = match[1];

    const tipo = match[2];

    variables[nombre] = {
      tipo,
      valor: null,
    };
  }
}

// =========================
// EJECUTAR
// =========================

await ejecutarCodigo(lineas, variables);
