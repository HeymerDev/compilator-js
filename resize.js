const resizeBar = document.getElementById("resizeBar");

const bottomPanel = document.querySelector(".bottom-panel");

let isResizing = false;

resizeBar.addEventListener("mousedown", () => {
  isResizing = true;
});

document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  const windowHeight = window.innerHeight;

  const newHeight = windowHeight - e.clientY;

  if (newHeight >= 100 && newHeight <= 500) {
    bottomPanel.style.height = `${newHeight}px`;
  }
});

document.addEventListener("mouseup", () => {
  isResizing = false;
});
