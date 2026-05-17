const terminalOutput = document.getElementById("terminalOutput");

const terminalInput = document.getElementById("terminalInput");

export function escribirTerminal(texto, tipo = "normal") {
  terminalOutput.innerHTML += `
  <div class="terminal-line ${tipo}">
    ${texto}
  </div>
`;

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

export function limpiarTerminal() {
  terminalOutput.innerHTML = "";
}

export function esperarEntrada() {
  return new Promise((resolve) => {
    terminalInput.focus();

    function manejarEnter(e) {
      if (e.key === "Enter") {
        const valor = terminalInput.value;

        escribirTerminal(`> ${valor}`);

        terminalInput.value = "";

        terminalInput.removeEventListener("keydown", manejarEnter);

        resolve(valor);
      }
    }

    terminalInput.addEventListener("keydown", manejarEnter);
  });
}
