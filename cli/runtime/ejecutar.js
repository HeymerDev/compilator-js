import { escribirTerminal, esperarEntrada } from "./terminal.js";

import {
  regexCaptura,
  regexAsignacion,
  regexMensaje,
} from "../../compiler/regex.js";

export async function ejecutarCodigo(lineas, variables) {
  for (const lineaOriginal of lineas) {
    const linea = lineaOriginal.trim();

    // =========================
    // MENSAJES
    // =========================

    if (regexMensaje.test(linea)) {
      const contenido = linea.match(regexMensaje)[1];

      const partes = contenido.split(",");

      let salida = "";

      for (let parte of partes) {
        parte = parte.trim();

        // STRING
        if (parte.startsWith('"')) {
          salida += parte.slice(1, -1);
        }

        // VARIABLE
        else {
          let valor = variables[parte].valor;

          if (valor === true) {
            valor = "verdadero";
          }

          if (valor === false) {
            valor = "falso";
          }

          salida += valor;
        }
      }

      escribirTerminal(salida);

      continue;
    }

    // =========================
    // CAPTURA
    // =========================

    if (regexCaptura.test(linea)) {
      const match = linea.match(regexCaptura);

      const nombre = match[1];

      const tipo = match[2];

      const entrada = esperarEntrada();

      let valor = entrada;

      // ENTERO

      if (tipo === "Entero") {
        valor = parseInt(entrada);
      }

      // REAL

      if (tipo === "Real") {
        valor = parseFloat(entrada);
      }

      // LOGICO

      if (tipo === "Logico") {
        valor = entrada === "verdadero";
      }

      variables[nombre].valor = valor;

      continue;
    }

    // =========================
    // ASIGNACIONES
    // =========================

    if (regexAsignacion.test(linea)) {
      const match = linea.match(regexAsignacion);

      const nombreVariable = match[1];

      const expresion = match[2].trim();

      // =========================
      // STRING
      // =========================

      if (/^".*"$/.test(expresion)) {
        variables[nombreVariable].valor = expresion.slice(1, -1);

        continue;
      }

      // =========================
      // ENTERO
      // =========================

      if (/^\d+$/.test(expresion)) {
        variables[nombreVariable].valor = parseInt(expresion);

        continue;
      }

      // =========================
      // REAL
      // =========================

      if (/^\d+\.\d+$/.test(expresion)) {
        variables[nombreVariable].valor = parseFloat(expresion);

        continue;
      }

      // =========================
      // BOOLEANOS
      // =========================

      if (expresion === "verdadero") {
        variables[nombreVariable].valor = true;

        continue;
      }

      if (expresion === "falso") {
        variables[nombreVariable].valor = false;

        continue;
      }

      // =========================
      // VARIABLE A VARIABLE
      // =========================

      if (/^[a-zA-ZñÑ][a-zA-Z0-9]*$/.test(expresion)) {
        variables[nombreVariable].valor = variables[expresion].valor;

        continue;
      }

      // =========================
      // OPERACIONES
      // =========================

      let operacion = expresion;

      const variablesExpresion = expresion.match(/[a-zA-ZñÑ][a-zA-Z0-9]*/g);

      if (variablesExpresion) {
        for (const variable of variablesExpresion) {
          operacion = operacion.replaceAll(variable, variables[variable].valor);
        }
      }

      const resultado = eval(operacion);

      variables[nombreVariable].valor = resultado;
    }
  }
}
