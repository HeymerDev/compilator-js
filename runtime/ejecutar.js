import {
  escribirTerminal,
  limpiarTerminal,
  esperarEntrada,
} from "./terminal.js";

export async function ejecutarCodigo(lineas, variables) {
  limpiarTerminal();

  for (const lineaOriginal of lineas) {
    const linea = lineaOriginal.trim();

    // =========================
    // MENSAJES
    // =========================

    if (linea.startsWith("Mensaje.Texto")) {
      const contenido = linea.match(/Mensaje\.Texto\((.*)\);/)[1];

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
          const valor = variables[parte].valor;

          if (valor === true) {
            salida += "verdadero";
          } else if (valor === false) {
            salida += "falso";
          } else {
            salida += valor;
          }
        }
      }

      escribirTerminal(salida);
    }

    // =========================
    // CAPTURA
    // =========================
    else if (linea.includes("Captura.")) {
      const match = linea.match(
        /^([a-zA-Z][a-zA-Z0-9]*)\s*=\s*Captura\.(Entero|Texto|Real|Logico)\(\);$/,
      );

      if (match) {
        const nombre = match[1];

        const tipo = match[2];

        const entrada = await esperarEntrada();

        let valor = entrada;

        // CONVERTIR TIPOS

        if (tipo === "Entero") {
          valor = parseInt(entrada);
        }

        if (tipo === "Real") {
          valor = parseFloat(entrada);
        }

        if (tipo === "Logico") {
          valor = entrada === "verdadero";
        }

        variables[nombre].valor = valor;
      }
    }

    // =========================
    // ASIGNACIONES
    // =========================
    else if (/^[a-zA-Z][a-zA-Z0-9]*\s*=/.test(linea)) {
      const match = linea.match(/^([a-zA-Z][a-zA-Z0-9]*)\s*=\s*(.+);$/);

      if (!match) continue;

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

      if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(expresion)) {
        variables[nombreVariable].valor = variables[expresion].valor;

        continue;
      }

      // =========================
      // OPERACIONES
      // =========================

      let operacion = expresion;

      const variablesExpresion = expresion.match(/[a-zA-Z][a-zA-Z0-9]*/g);

      if (variablesExpresion) {
        for (const variable of variablesExpresion) {
          operacion = operacion.replaceAll(variable, variables[variable].valor);
        }
      }

      try {
        const resultado = eval(operacion);

        variables[nombreVariable].valor = resultado;
      } catch {
        escribirTerminal(`Error ejecutando operación: ${expresion}`, "error");
      }
    }
  }
}
