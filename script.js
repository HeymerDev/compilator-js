import "./editor.js";

import "./resize.js";

import { analizarCodigo } from "./compiler/compiler.js";

const btnAnalizar = document.getElementById("btnAnalizar");

btnAnalizar.addEventListener("click", ejecutarCompilador);

function ejecutarCompilador() {
  const codigo = document.getElementById("codigo").value;

  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "";

  const errores = analizarCodigo(codigo);

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
