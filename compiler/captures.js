import { regexCaptura } from "./regex.js";

export function validarCaptura(linea, numeroLinea, variables, errores) {
  if (!regexCaptura.test(linea)) {
    return false;
  }

  const match = linea.match(regexCaptura);

  const nombreVariable = match[1];

  const tipoCaptura = match[2];

  if (!variables[nombreVariable]) {
    errores.push(
      `Error en línea ${numeroLinea}: Variable '${nombreVariable}' no definida`,
    );

    return true;
  }

  const tipoVariable = variables[nombreVariable].tipo;

  if (tipoVariable !== tipoCaptura) {
    errores.push(
      `Error en línea ${numeroLinea}: La captura no corresponde al tipo '${tipoVariable}'`,
    );
  }

  return true;
}
