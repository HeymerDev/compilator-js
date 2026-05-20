import "./editor.js";

import "./resize.js";

import { analizarCodigo } from "./compiler/compiler.js";

import { ejecutarCodigo } from "./runtime/ejecutar.js";

import { escribirTerminal, limpiarTerminal } from "./runtime/terminal.js";

const btnAnalizar = document.getElementById("btnAnalizar");

btnAnalizar.addEventListener("click", ejecutarCompilador);

async function ejecutarCompilador() {
  const codigo = document.getElementById("codigo").value;

  limpiarTerminal();

  const resultado = analizarCodigo(codigo);

  const errores = resultado.errores;

  if (errores.length > 0) {
    errores.forEach((error) => {
      escribirTerminal(error, "error");
    });

    return;
  }

  escribirTerminal("Código compilado correctamente", "correcto");

  await ejecutarCodigo(resultado.lineas, resultado.variables);
}
