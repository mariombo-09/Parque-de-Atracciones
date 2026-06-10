export type ActivityType = "html" | "url" | "pdf";

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  // ──────────────────────────────────────────────────────────────────────────
  // src: ruta del archivo (html/pdf) o URL externa
  //   · html → ruta relativa en /public/actividades/ p.ej. "/actividades/tifon.html"
  //   · pdf  → ruta relativa en /public/actividades/ p.ej. "/actividades/actividad5.pdf"
  //   · url  → URL completa del recurso externo
  // ──────────────────────────────────────────────────────────────────────────
  src: string;
  // ──────────────────────────────────────────────────────────────────────────
  // position: coordenadas del marcador sobre el mapa (% relativo al contenedor)
  //   Cambia left/top aquí para reposicionar cada punto sin buscar por el proyecto
  // ──────────────────────────────────────────────────────────────────────────
  position: { left: string; top: string };
}

export const ACTIVITIES: Activity[] = [
  {
    // ACTIVIDAD 1 — Tifón (HTML local)
    // HTML en: artifacts/fisica-atracciones/public/actividades/tifon.html
    id: "tifon",
    title: "Tifón",
    type: "html",
    src: "/actividades/tifon.html",
    position: { left: "22%", top: "50%" },
  },
  {
    // ACTIVIDAD 2 — Lanzadera (Genially)
    // Cambia src para actualizar el enlace
    id: "lanzadera",
    title: "Lanzadera",
    type: "url",
    src: "https://view.genially.com/6a2012c873ae9c9ae709a222",
    position: { left: "42%", top: "18%" },
  },
  {
    // ACTIVIDAD 3 — Abismo (Genially)
    // Cambia src para actualizar el enlace
    id: "abismo",
    title: "Abismo",
    type: "url",
    src: "https://view.genially.com/6a2279a39d09f2c86ee2e11b",
    position: { left: "55%", top: "30%" },
  },
  {
    // ACTIVIDAD 4 — La Máquina (Genially)
    // Cambia src para actualizar el enlace
    id: "la-maquina",
    title: "La Máquina",
    type: "url",
    src: "https://view.genially.com/6a211ed0f732793a218d25ec",
    position: { left: "63%", top: "58%" },
  },
  {
    // ACTIVIDAD 5 — PDF
    // Coloca el PDF en: artifacts/fisica-atracciones/public/actividades/actividad5.pdf
    // y cambia src a "/actividades/actividad5.pdf"
    id: "actividad-5",
    title: "Actividad 5",
    type: "pdf",
    src: "/actividades/actividad5.pdf",
    position: { left: "48%", top: "62%" },
  },
  {
    // ACTIVIDAD 6 — Enlace web (temporal: google.com)
    // Cambia src para actualizar el enlace
    id: "actividad-6",
    title: "Actividad 6",
    type: "url",
    src: "https://google.com",
    position: { left: "33%", top: "68%" },
  },
  {
    // ACTIVIDAD 7 — Enlace web (temporal: google.com)
    // Cambia src para actualizar el enlace
    id: "actividad-7",
    title: "Actividad 7",
    type: "url",
    src: "https://google.com",
    position: { left: "22%", top: "50%" },
  },
  {
    // ACTIVIDAD 8 — Enlace web (temporal: google.com)
    // Cambia src para actualizar el enlace
    id: "actividad-8",
    title: "Actividad 8",
    type: "url",
    src: "https://google.com",
    position: { left: "18%", top: "72%" },
  },
];
