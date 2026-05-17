const codigo = document.getElementById("codigo");

const lineNumbers = document.getElementById("lineNumbers");

const highlighting = document.getElementById("highlighting");

codigo.addEventListener("input", actualizarEditor);

codigo.addEventListener("scroll", sincronizarScroll);

function actualizarEditor() {
  actualizarLineas();

  resaltarCodigo();
}

function actualizarLineas() {
  const cantidadLineas = codigo.value.split("\n").length;

  lineNumbers.innerHTML = "";

  for (let i = 1; i <= cantidadLineas; i++) {
    lineNumbers.innerHTML += `${i}<br>`;
  }
}

function sincronizarScroll() {
  highlighting.scrollTop = codigo.scrollTop;

  highlighting.scrollLeft = codigo.scrollLeft;
}

function escaparHTML(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function resaltarCodigo() {
  let texto = escaparHTML(codigo.value);

  const placeholders = [];

  function guardar(match, clase) {
    const id = `__TOKEN_${placeholders.length}__`;

    placeholders.push(`<span class="${clase}">${match}</span>`);

    return id;
  }

  // =========================
  // STRINGS
  // =========================

  texto = texto.replace(/"[^"]*"/g, (match) => guardar(match, "token-string"));

  // =========================
  // BOOLEANOS
  // =========================

  texto = texto.replace(/\b(verdadero|falso)\b/g, (match) =>
    guardar(match, "token-boolean"),
  );

  // =========================
  // TIPOS
  // =========================

  texto = texto.replace(/\b(Entero|Texto|Real|Logico)\b/g, (match) =>
    guardar(match, "token-type"),
  );

  // =========================
  // MENSAJE Y CAPTURA
  // =========================

  texto = texto.replace(/\b(Mensaje|Captura)\b/g, (match) =>
    guardar(match, "token-keyword"),
  );

  // =========================
  // MÉTODOS
  // =========================

  texto = texto.replace(/\.(Texto|Entero|Real|Logico)/g, (match) => {
    const metodo = match.substring(1);

    return "." + guardar(metodo, "token-method");
  });

  // =========================
  // NÚMEROS
  // =========================

  texto = texto.replace(/\b\d+(\.\d+)?\b/g, (match) =>
    guardar(match, "token-number"),
  );

  // =========================
  // VARIABLES
  // =========================

  texto = texto.replace(/\b[a-zA-Z][a-zA-Z0-9]*\b/g, (match) => {
    const reservadas = [
      "Entero",
      "Texto",
      "Real",
      "Logico",
      "Mensaje",
      "Captura",
      "verdadero",
      "falso",
    ];

    if (reservadas.includes(match)) {
      return match;
    }

    return guardar(match, "token-variable");
  });

  // =========================
  // RESTAURAR TOKENS
  // =========================

  placeholders.forEach((html, index) => {
    texto = texto.replace(`__TOKEN_${index}__`, html);
  });

  highlighting.innerHTML = texto;
}

actualizarEditor();
