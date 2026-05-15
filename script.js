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

  // Expresiones regulares
  const regexDeclaracion =
    /^([a-zA-Z][a-zA-Z0-9]*)\s(Entero|Texto|Real|Logico);$/;

  const regexCaptura =
    /^([a-zA-Z][a-zA-Z0-9]*)\s*=\s*Captura\.(Entero|Texto|Real|Logico)\(\);$/;

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

      // Guardar en tabla de símbolos
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

      // Validar si existe
      if (!variables[nombreVariable]) {
        errores.push(
          `Error en línea ${numeroLinea}: Variable '${nombreVariable}' no definida`,
        );

        return;
      }

      // Validar tipo
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
    // ERROR GENERAL
    // =========================

    errores.push(`Error sintáctico en línea ${numeroLinea}`);
  });

  // =========================
  // MOSTRAR RESULTADOS
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
