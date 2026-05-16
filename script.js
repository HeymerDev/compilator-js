const btnAnalizar = document.getElementById("btnAnalizar");

btnAnalizar.addEventListener("click", analizarCodigo);

function analizarCodigo() {
  const codigo = document.getElementById("codigo").value;

  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "";

  const lineas = codigo.split("\n");

  // =========================
  // TABLA DE SÍMBOLOS
  // =========================

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

      // Variable repetida
      if (variables[nombreVariable]) {
        errores.push(
          `Error en línea ${numeroLinea}: La variable '${nombreVariable}' ya fue declarada`,
        );

        return;
      }

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

      // Variable existe
      if (!variables[nombreVariable]) {
        errores.push(
          `Error en línea ${numeroLinea}: Variable '${nombreVariable}' no definida`,
        );

        return;
      }

      const tipoVariable = variables[nombreVariable];

      // Validar tipo
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
      const contenido = linea.match(regexMensaje)[1].trim();

      // =========================
      // VALIDAR COMILLAS
      // =========================

      const cantidadComillas = (contenido.match(/"/g) || []).length;

      // Deben ser pares
      if (cantidadComillas % 2 !== 0) {
        errores.push(`Error sintáctico en línea ${numeroLinea}`);

        return;
      }

      // =========================
      // VALIDAR COMA FINAL
      // =========================

      if (contenido.endsWith(",")) {
        errores.push(`Error sintáctico en línea ${numeroLinea}`);

        return;
      }

      // =========================
      // DIVIDIR PARTES
      // =========================

      const partes = contenido.split(",");

      for (let parte of partes) {
        parte = parte.trim();

        // Vacío
        if (parte === "") {
          errores.push(`Error sintáctico en línea ${numeroLinea}`);

          return;
        }

        // =========================
        // STRING
        // =========================

        if (parte.startsWith('"')) {
          // Debe cerrar
          if (!parte.endsWith('"')) {
            errores.push(`Error sintáctico en línea ${numeroLinea}`);
          }

          continue;
        }

        // =========================
        // VARIABLE
        // =========================

        if (!variables[parte]) {
          errores.push(
            `Error en línea ${numeroLinea}: Variable '${parte}' no definida`,
          );
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

      // =========================
      // VARIABLE DESTINO EXISTE
      // =========================

      if (!variables[variableDestino]) {
        errores.push(
          `Error en línea ${numeroLinea}: Variable '${variableDestino}' no definida`,
        );

        return;
      }

      const tipoVariable = variables[variableDestino];

      // =========================
      // VALIDAR COMILLAS
      // =========================

      const cantidadComillas = (expresion.match(/"/g) || []).length;

      if (cantidadComillas % 2 !== 0) {
        errores.push(`Error sintáctico en línea ${numeroLinea}`);

        return;
      }

      // =========================
      // TEXTO
      // =========================

      if (/^".*"$/.test(expresion)) {
        if (tipoVariable !== "Texto") {
          errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
        }

        return;
      }

      // =========================
      // REAL
      // =========================

      if (/^\d+\.\d+$/.test(expresion)) {
        if (tipoVariable !== "Real") {
          errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
        }

        return;
      }

      // =========================
      // ENTERO
      // =========================

      if (/^\d+$/.test(expresion)) {
        if (tipoVariable !== "Entero") {
          errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
        }

        return;
      }

      // =========================
      // LOGICO
      // =========================

      if (expresion === "true" || expresion === "false") {
        if (tipoVariable !== "Logico") {
          errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
        }

        return;
      }

      // =========================
      // ASIGNACIÓN ENTRE VARIABLES
      // =========================

      if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(expresion)) {
        // Existe variable origen
        if (!variables[expresion]) {
          errores.push(
            `Error en línea ${numeroLinea}: Variable '${expresion}' no definida`,
          );

          return;
        }

        const tipoOrigen = variables[expresion];

        // Tipos compatibles
        if (tipoOrigen !== tipoVariable) {
          errores.push(`Error en línea ${numeroLinea}: Tipos incompatibles`);
        }

        return;
      }

      // =========================
      // EXPRESIONES MATEMÁTICAS
      // =========================

      // Detectar texto en operación
      if (/".*"/.test(expresion)) {
        errores.push(
          `Error en línea ${numeroLinea}: No se puede usar Texto en operaciones matemáticas`,
        );

        return;
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

          const tipoVar = variables[variable];

          // No permitir Texto o Logico
          if (tipoVar === "Texto" || tipoVar === "Logico") {
            errores.push(
              `Error en línea ${numeroLinea}: Variable '${variable}' incompatible en operación matemática`,
            );
          }
        }
      }

      // Variable destino debe ser numérica
      if (tipoVariable !== "Entero" && tipoVariable !== "Real") {
        errores.push(
          `Error en línea ${numeroLinea}: No se puede asignar operación matemática a '${tipoVariable}'`,
        );
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
