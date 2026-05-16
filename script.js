const btnAnalizar = document.getElementById("btnAnalizar");

btnAnalizar.addEventListener("click", analizarCodigo);

function analizarCodigo() {
  const codigo = document.getElementById("codigo").value;

  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "";

  const lineas = codigo.split("\n");

  // Tabla de símbolos
  const variables = {};

  const errores = [];

  // =========================
  // REGEX
  // =========================

  const regexDeclaracion =
    /^([a-zA-Z][a-zA-Z0-9]*)\s(Entero|Texto|Real|Logico);$/;

  const regexCaptura =
    /^([a-zA-Z][a-zA-Z0-9]*)\s*=\s*Captura\.(Entero|Texto|Real|Logico)\(\);$/;

  const regexAsignacion = /^([a-zA-Z][a-zA-Z0-9]*)\s*=\s*(.+);$/;

  const regexMensaje = /^Mensaje\.Texto\((.+)\);$/;

  // =========================
  // RECORRER LÍNEAS
  // =========================

  lineas.forEach((linea, index) => {
    const numeroLinea = index + 1;

    linea = linea.trim();

    if (linea === "") {
      return;
    }

    // =========================
    // DECLARACIÓN
    // =========================

    if (regexDeclaracion.test(linea)) {
      const match = linea.match(regexDeclaracion);

      const nombreVariable = match[1];
      const tipoDato = match[2];

      variables[nombreVariable] = tipoDato;

      return;
    }

    // =========================
    // CAPTURA
    // =========================

    if (regexCaptura.test(linea)) {
      const match = linea.match(regexCaptura);

      const nombreVariable = match[1];
      const tipoCaptura = match[2];

      if (!variables[nombreVariable]) {
        errores.push(
          `Error en línea ${numeroLinea}: Variable '${nombreVariable}' no definida`,
        );

        return;
      }

      const tipoVariable = variables[nombreVariable];

      if (tipoVariable !== tipoCaptura) {
        errores.push(
          `Error en línea ${numeroLinea}: La captura no corresponde al tipo '${tipoVariable}'`,
        );

        return;
      }

      return;
    }

    // =========================
    // MENSAJE.TEXTO()
    // =========================

    if (regexMensaje.test(linea)) {
      const contenido = linea.match(regexMensaje)[1];

      // Buscar variables concatenadas
      // Ejemplo:
      // "Hola", nombre

      const partes = contenido.split(",");

      for (let parte of partes) {
        parte = parte.trim();

        // Si NO es string
        if (!parte.startsWith('"')) {
          if (!variables[parte]) {
            errores.push(
              `Error en línea ${numeroLinea}: Variable '${parte}' no definida`,
            );
          }
        }
      }

      return;
    }

    // =========================
    // ASIGNACIONES
    // =========================

    if (regexAsignacion.test(linea)) {
      const match = linea.match(regexAsignacion);

      const variableDestino = match[1];
      const expresion = match[2].trim();

      // Variable existe
      if (!variables[variableDestino]) {
        errores.push(
          `Error en línea ${numeroLinea}: Variable '${variableDestino}' no definida`,
        );

        return;
      }

      const tipoVariable = variables[variableDestino];

      // =========================
      // TEXTO
      // =========================

      if (expresion.startsWith('"')) {
        if (tipoVariable !== "Texto") {
          errores.push(
            `Error en línea ${numeroLinea}: Se esperaba tipo '${tipoVariable}'`,
          );
        }

        return;
      }

      // =========================
      // REAL
      // =========================

      if (/^\d+\.\d+$/.test(expresion)) {
        if (tipoVariable !== "Real") {
          errores.push(
            `Error en línea ${numeroLinea}: Se esperaba tipo '${tipoVariable}'`,
          );
        }

        return;
      }

      // =========================
      // ENTERO
      // =========================

      if (/^\d+$/.test(expresion)) {
        if (tipoVariable !== "Entero") {
          errores.push(
            `Error en línea ${numeroLinea}: Se esperaba tipo '${tipoVariable}'`,
          );
        }

        return;
      }

      // =========================
      // LOGICO
      // =========================

      if (expresion === "true" || expresion === "false") {
        if (tipoVariable !== "Logico") {
          errores.push(
            `Error en línea ${numeroLinea}: Se esperaba tipo '${tipoVariable}'`,
          );
        }

        return;
      }

      // =========================
      // EXPRESIONES MATEMÁTICAS
      // =========================

      const variablesExpresion = expresion.match(/[a-zA-Z][a-zA-Z0-9]*/g);

      if (variablesExpresion) {
        for (let variable of variablesExpresion) {
          if (!variables[variable]) {
            errores.push(
              `Error en línea ${numeroLinea}: Variable '${variable}' no definida`,
            );
          }
        }
      }

      return;
    }

    // =========================
    // ERROR GENERAL
    // =========================

    errores.push(`Error sintáctico en línea ${numeroLinea}`);
  });

  // =========================
  // RESULTADOS
  // =========================

  if (errores.length > 0) {
    errores.forEach((error) => {
      resultado.innerHTML += `
        <div class="error">
          ${error}
        </div>
      `;
    });
  } else {
    resultado.innerHTML = `
      <div class="correcto">
        Código compilado correctamente
      </div>
    `;
  }
}
