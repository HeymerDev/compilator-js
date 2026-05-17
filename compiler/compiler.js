import { ejecutarCodigo } from "../runtime/ejecutar.js";

import { validarDeclaracion } from "./declaration.js";

import { validarCaptura } from "./captures.js";

import { validarMensaje } from "./messages.js";

import { validarAsignacion } from "./assignments.js";

export function analizarCodigo(codigo) {
  const lineas = codigo.split("\n");

  const variables = {};

  const errores = [];

  lineas.forEach((linea, index) => {
    const numeroLinea = index + 1;

    linea = linea.trim();

    if (linea === "") {
      return;
    }

    if (validarDeclaracion(linea, numeroLinea, variables, errores)) return;

    if (validarCaptura(linea, numeroLinea, variables, errores)) return;

    if (validarMensaje(linea, numeroLinea, variables, errores)) return;

    if (validarAsignacion(linea, numeroLinea, variables, errores)) return;

    errores.push(`Error sintáctico en línea ${numeroLinea}`);
  });

  if (errores.length === 0) {
    ejecutarCodigo(lineas, variables);
  }

  return errores;
}
