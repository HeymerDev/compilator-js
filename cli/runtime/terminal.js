import readlineSync from "readline-sync";

export function escribirTerminal(texto) {
  console.log(texto);
}

export function limpiarTerminal() {
  console.clear();
}

export function esperarEntrada() {
  return readlineSync.question("> ");
}
