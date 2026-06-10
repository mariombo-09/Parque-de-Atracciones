import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Map as MapIcon, FlaskConical, ChevronLeft } from "lucide-react";

interface Achievement {
  id: string;
  icon: string;
  label: string;
  unlocked: boolean;
}

interface Rank {
  icon: string;
  title: string;
  min: number;
  max: number;
}

const RANKS: Rank[] = [
  { icon: "🔧", title: "Aprendiz de Investigador", min: 0, max: 1000 },
  { icon: "🧪", title: "Científico Junior", min: 1001, max: 1800 },
  { icon: "🚀", title: "Científico Senior", min: 1801, max: 2500 },
  { icon: "🏆", title: "Experto en Física", min: 2501, max: 3200 },
  { icon: "👑", title: "Director Científico Joyfe", min: 3201, max: Infinity },
];

function getRank(points: number): Rank {
  return (
    RANKS.find((r) => points >= r.min && points <= r.max) ?? RANKS[0]
  );
}

export default function FiordosResult() {
  const points = parseInt(sessionStorage.getItem("gamePoints") ?? "0");
  const hypothesis = sessionStorage.getItem("gameHypothesis") ?? "";
  const hintsUsed = parseInt(sessionStorage.getItem("gameHintsUsed") ?? "0");
  const correctAnswers = parseInt(
    sessionStorage.getItem("gameCorrectAnswers") ?? "0"
  );
  const totalErrors = parseInt(
    sessionStorage.getItem("gameTotalErrors") ?? "0"
  );
  const noPistas = sessionStorage.getItem("gameNoPistas") === "true";
  const noErrors = sessionStorage.getItem("gameNoErrors") === "true";

  const TOTAL_QUESTIONS = 8;
  const accuracy =
    TOTAL_QUESTIONS > 0
      ? Math.round((correctAnswers / TOTAL_QUESTIONS) * 100)
      : 0;

  const rank = getRank(points);

  const achievements: Achievement[] = [
    {
      id: "sin_errores",
      icon: "🏅",
      label: "Sin errores",
      unlocked: noErrors,
    },
    {
      id: "sin_pistas",
      icon: "🏅",
      label: "Sin pistas",
      unlocked: noPistas,
    },
    {
      id: "velocista",
      icon: "🏅",
      label: "Velocista",
      unlocked: correctAnswers >= TOTAL_QUESTIONS,
    },
    {
      id: "cientifico_perfecto",
      icon: "🏅",
      label: "Científico Perfecto",
      unlocked: noErrors && noPistas,
    },
    {
      id: "maestro_fiordos",
      icon: "🏅",
      label: "Maestro de Fiordos",
      unlocked: points >= 2800,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col items-center justify-start p-6 pt-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,200,255,0.07),_transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
        }}
      />

      {/* Botón Salir al mapa — arriba a la derecha */}
      <div className="relative z-10 w-full max-w-2xl flex justify-end mb-2">
        <Link href="/mapa">
          <Button
            variant="outline"
            size="sm"
            className="bg-background/50 backdrop-blur-md border-primary/30 text-primary hover:text-primary hover:bg-primary/20 font-serif tracking-widest text-xs uppercase"
          >
            <ChevronLeft className="mr-1.5 h-3.5 w-3.5" /> SALIR AL MAPA
          </Button>
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-2xl space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="border border-primary/30 bg-primary/5 px-6 py-2 flex items-center space-x-2 rounded-sm">
              <FlaskConical className="w-5 h-5 text-primary" />
              <span className="font-serif text-sm tracking-widest text-primary uppercase">
                Joyfe Science Investigations
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-widest uppercase">
            Investigación Completada
          </h1>
          <p className="text-base font-sans text-muted-foreground max-w-md mx-auto">
            Ya estás preparado para realizar el experimento real en los Fiordos.
          </p>
        </motion.div>

        {/* Rank card */}
        <motion.div
          variants={item}
          className="p-6 bg-card border border-primary/30 rounded-sm shadow-[0_0_40px_rgba(0,255,255,0.06)] text-center space-y-2"
        >
          <div className="text-6xl mb-2">{rank.icon}</div>
          <div className="text-xs font-serif tracking-[0.3em] text-muted-foreground uppercase">
            Tu rango científico
          </div>
          <div className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-wide">
            {rank.title}
          </div>
          <div className="text-4xl font-mono font-bold text-foreground pt-2">
            🧪 {points.toLocaleString("es-ES")} pts
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Aciertos", value: `${correctAnswers}/${TOTAL_QUESTIONS}`, highlight: correctAnswers === TOTAL_QUESTIONS },
            { label: "Precisión", value: `${accuracy}%`, highlight: accuracy >= 80 },
            { label: "Pistas usadas", value: hintsUsed, highlight: hintsUsed === 0 },
            { label: "Errores", value: totalErrors, highlight: totalErrors === 0 },
          ].map((s) => (
            <div
              key={s.label}
              className={`p-4 border rounded-sm text-center ${
                s.highlight
                  ? "border-primary/30 bg-primary/5"
                  : "border-border/40 bg-card/40"
              }`}
            >
              <div
                className={`text-2xl font-mono font-bold ${
                  s.highlight ? "text-primary" : "text-foreground/70"
                }`}
              >
                {s.value}
              </div>
              <div className="text-xs font-serif text-muted-foreground tracking-wider mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Hypothesis */}
        {hypothesis && (
          <motion.div
            variants={item}
            className="p-5 bg-card/40 border border-border/40 rounded-sm space-y-2"
          >
            <div className="text-xs font-serif tracking-widest text-muted-foreground uppercase">
              Tu hipótesis inicial
            </div>
            <p className="font-sans text-foreground/80 italic leading-relaxed text-sm">
              "{hypothesis}"
            </p>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div variants={item} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-serif tracking-[0.25em] text-muted-foreground uppercase">
              Logros desbloqueados
            </div>
            <div className="text-xs font-serif text-primary">
              {unlockedCount}/{achievements.length}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`p-3 border rounded-sm flex items-center space-x-2 transition-all ${
                  a.unlocked
                    ? "border-accent/40 bg-accent/5"
                    : "border-border/20 bg-card/20 opacity-40"
                }`}
              >
                <span className={`text-xl ${!a.unlocked && "grayscale"}`}>
                  {a.icon}
                </span>
                <span
                  className={`text-xs font-serif tracking-wide ${
                    a.unlocked ? "text-accent" : "text-muted-foreground/50"
                  }`}
                >
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rank scale */}
        <motion.div variants={item} className="space-y-2">
          <div className="text-xs font-serif tracking-[0.25em] text-muted-foreground uppercase">
            Escala de rangos
          </div>
          <div className="space-y-1">
            {RANKS.map((r) => {
              const isCurrentRank = rank.title === r.title;
              return (
                <div
                  key={r.title}
                  className={`flex items-center justify-between px-3 py-2 rounded-sm text-xs font-sans ${
                    isCurrentRank
                      ? "bg-primary/10 border border-primary/30 text-primary font-bold"
                      : "text-muted-foreground/60"
                  }`}
                >
                  <span>
                    {r.icon} {r.title}
                  </span>
                  <span className="font-mono">
                    {r.max === Infinity
                      ? `+${r.min.toLocaleString("es-ES")} pts`
                      : `${r.min.toLocaleString("es-ES")}–${r.max.toLocaleString("es-ES")} pts`}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3 pb-10">
          <Link href="/fiordos/mision">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 font-serif tracking-widest border-border/60 hover:border-primary/50"
              data-testid="btn-retry"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> REPETIR
            </Button>
          </Link>
          <Link href="/mapa">
            <Button
              size="lg"
              className="w-full h-12 font-serif tracking-widest bg-primary hover:bg-primary/80 text-primary-foreground"
              data-testid="btn-back-map"
            >
              <MapIcon className="mr-2 h-4 w-4" /> MAPA
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
