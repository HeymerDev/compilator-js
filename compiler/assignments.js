import { regexAsignacion } from "./regex.js";

export function validarAsignacion(linea, numeroLinea, variables, errores) {
  if (!regexAsignacion.test(linea)) {
    return false;
  }

  const match = linea.match(regexAsignacion);

  const variableDestino = match[1];

  const expresion = match[2].trim();

  // =========================
  // VARIABLE DESTINO
  // =========================

  if (!variables[variableDestino]) {
    errores.push(
      `Error en línea ${numeroLinea}: Variable '${variableDestino}' no definida`,
    );

    return true;
  }

  const tipoVariable = variables[variableDestino].tipo;

  // =========================
  // COMILLAS
  // =========================

  const cantidadComillas = (expresion.match(/"/g) || []).length;

  if (cantidadComillas % 2 !== 0) {
    errores.push(`Error sintáctico en línea ${numeroLinea}`);

    return true;
  }

  // =========================
  // PARÉNTESIS
  // =========================

  const abiertos = (expresion.match(/\(/g) || []).length;

  const cerrados = (expresion.match(/\)/g) || []).length;

  if (abiertos !== cerrados) {
    errores.push(`Error sintáctico en línea ${numeroLinea}`);

    return true;
  }

  // =========================
  // CAPTURA MAL ESCRITA
  // =========================

  if (
    expresion.includes("Captura") &&
    !/^Captura\.(Entero|Texto|Real|Logico)\(\)$/.test(expresion)
  ) {
    errores.push(`Error sintáctico en línea ${numeroLinea}`);

    return true;
  }

  // =========================
  // TEXTO
  // =========================

  if (/^".*"$/.test(expresion)) {
    if (tipoVariable !== "Texto") {
      errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
    }

    return true;
  }

  // =========================
  // REAL
  // =========================

  if (/^\d+\.\d+$/.test(expresion)) {
    if (tipoVariable !== "Real") {
      errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
    }

    return true;
  }

  // =========================
  // ENTERO
  // =========================

  if (/^\d+$/.test(expresion)) {
    if (tipoVariable !== "Entero") {
      errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
    }

    return true;
  }

  // =========================
  // LOGICO
  // =========================

  if (expresion === "verdadero" || expresion === "falso") {
    if (tipoVariable !== "Logico") {
      errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
    }

    return true;
  }

  // =========================
  // VARIABLE A VARIABLE
  // =========================

  if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(expresion)) {
    if (!variables[expresion]) {
      errores.push(
        `Error en línea ${numeroLinea}: Variable '${expresion}' no definida`,
      );

      return true;
    }

    const tipoOrigen = variables[expresion].tipo;

    if (tipoOrigen !== tipoVariable) {
      errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
    }

    return true;
  }

  // =========================
  // OPERACIONES MATEMÁTICAS
  // =========================

  if (/".*"/.test(expresion)) {
    errores.push(
      `Error en línea ${numeroLinea}: No se puede usar Texto en operaciones matemáticas`,
    );

    return true;
  }

  const variablesExpresion = expresion.match(/[a-zA-Z][a-zA-Z0-9]*/g);

  if (variablesExpresion) {
    for (let variable of variablesExpresion) {
      if (!variables[variable]) {
        errores.push(
          `Error en línea ${numeroLinea}: Variable '${variable}' no definida`,
        );

        continue;
      }

      const tipoVar = variables[variable].tipo;

      if (tipoVar === "Texto" || tipoVar === "Logico") {
        errores.push(
          `Error en línea ${numeroLinea}: Variable '${variable}' incompatible en operación matemática`,
        );
      }
    }
  }

  // =========================
  // DESTINO NUMÉRICO
  // =========================

  if (tipoVariable !== "Entero" && tipoVariable !== "Real") {
    errores.push(
      `Error en línea ${numeroLinea}: No se puede asignar operación matemática a '${tipoVariable}'`,
    );
  }

  return true;
}
