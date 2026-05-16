import { regexDeclaracion } from "./regex.js";

export function validarDeclaracion(linea, numeroLinea, variables, errores) {
  if (!regexDeclaracion.test(linea)) {
    return false;
  }

  const match = linea.match(regexDeclaracion);

  const nombreVariable = match[1];

  const tipoDato = match[2];

  if (variables[nombreVariable]) {
    errores.push(
      `Error en línea ${numeroLinea}: La variable '${nombreVariable}' ya fue declarada`,
    );

    return true;
  }

  variables[nombreVariable] = tipoDato;

  return true;
}
