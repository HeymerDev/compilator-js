import { regexMensaje } from "./regex.js";

export function validarMensaje(linea, numeroLinea, variables, errores) {
  if (!regexMensaje.test(linea)) {
    return false;
  }

  const contenido = linea.match(regexMensaje)[1].trim();

  const cantidadComillas = (contenido.match(/"/g) || []).length;

  if (cantidadComillas % 2 !== 0) {
    errores.push(`Error sintáctico en línea ${numeroLinea}`);

    return true;
  }

  if (contenido.endsWith(",")) {
    errores.push(`Error sintáctico en línea ${numeroLinea}`);

    return true;
  }

  const partes = contenido.split(",");

  for (let parte of partes) {
    parte = parte.trim();

    if (parte === "") {
      errores.push(`Error sintáctico en línea ${numeroLinea}`);

      return true;
    }

    // STRING

    if (parte.startsWith('"')) {
      if (!parte.endsWith('"')) {
        errores.push(`Error sintáctico en línea ${numeroLinea}`);

        return true;
      }

      continue;
    }

    // VARIABLE

    if (!variables[parte]) {
      errores.push(
        `Error en línea ${numeroLinea}: Variable '${parte}' no definida`,
      );

      return true;
    }
  }

  return true;
}
