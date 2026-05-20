export const regexDeclaracion =
  /^([a-zA-ZñÑ][a-zA-Z0-9]*)\s(Entero|Texto|Real|Logico);$/;

export const regexCaptura =
  /^([a-zA-Z][a-zA-Z0-9]*)\s*=\s*Captura\.(Entero|Texto|Real|Logico)\(\);$/;

export const regexAsignacion = /^([a-zA-Z][a-zA-Z0-9]*)\s*=\s*(.+);$/;

export const regexMensaje = /^Mensaje\.Texto\((.+)\);$/;
