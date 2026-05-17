import "./editor.js";

import "./resize.js";

import { analizarCodigo } from "./compiler/compiler.js";

import { escribirTerminal, limpiarTerminal } from "./runtime/terminal.js";

const btnAnalizar = document.getElementById("btnAnalizar");

btnAnalizar.addEventListener("click", ejecutarCompilador);

function ejecutarCompilador() {
  const codigo = document.getElementById("codigo").value;

  limpiarTerminal();

  const errores = analizarCodigo(codigo);

  if (errores.length > 0) {
    errores.forEach((error) => {
      escribirTerminal(error, "error");
    });
  } else {
    escribirTerminal("Código compilado correctamente", "correcto");
  }
}
