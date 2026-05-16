const codigo = document.getElementById("codigo");

const lineNumbers = document.getElementById("lineNumbers");

codigo.addEventListener("input", actualizarLineas);

export function actualizarLineas() {
  const cantidadLineas = codigo.value.split("\n").length;

  lineNumbers.innerHTML = "";

  for (let i = 1; i <= cantidadLineas; i++) {
    lineNumbers.innerHTML += `${i}<br>`;
  }
}

actualizarLineas();
