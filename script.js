function analizar() {
  const entrada = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "";

  const regex = /^([a-zA-Z][a-zA-Z0-9]*)\s(Entero|Texto|Real|Logico);$/;

  const match = entrada.match(regex);

  if (match) {
    const nombreVariable = match[1];
    const tipoDato = match[2];

    resultado.innerHTML = `
          <div class="correcto">
            Declaración válida
          </div>

          <table>
            <tr>
              <th>Token</th>
              <th>Lexema</th>
            </tr>

            <tr>
              <td>IDENTIFICADOR</td>
              <td>${nombreVariable}</td>
            </tr>

            <tr>
              <td>TIPO_DATO</td>
              <td>${tipoDato}</td>
            </tr>

            <tr>
              <td>FIN_SENTENCIA</td>
              <td>;</td>
            </tr>
          </table>
        `;
  } else {
    resultado.innerHTML = `
          <div class="error">
            Error sintáctico en la declaración
          </div>
        `;
  }
}
