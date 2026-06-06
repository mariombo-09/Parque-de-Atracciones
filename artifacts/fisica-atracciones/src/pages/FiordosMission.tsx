import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Search,
  FlaskConical,
} from "lucide-react";
import React from "react";

type GamePhase = "hypothesis" | "missions" | "variables" | "done";

interface Mission {
  id: number;
  title: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  hints: [string, string, string];
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "MISIÓN 1 — PESO DEL BARCO",
    question:
      "El barco que se desplaza por la rampa tiene una masa de 0,2 kg. ¿Qué peso tendría en la Tierra?",
    options: ["A)  0,196 N", "B)  1,96 N", "C)  2 N", "D)  0,2 N"],
    correct: 1,
    explanation:
      "Correcto. El peso depende de la gravedad terrestre. P = m × g = 0,2 × 9,8 = 1,96 N",
    hints: [
      "Recuerda la fórmula del peso: P = m × g",
      "g = 9,8 m/s². Multiplica la masa por la gravedad terrestre.",
      "0,2 kg × 9,8 m/s² = 1,96 N",
    ],
  },
  {
    id: 2,
    title: "MISIÓN 2 — ALTURA DE LANZAMIENTO",
    question:
      "Queremos que el barco logre una energía potencial de 1 J antes de la bajada. ¿A qué altura debemos colocarlo si la masa es de 0,2 kg?",
    options: ["A)  0,51 m", "B)  1 m", "C)  0,2 m", "D)  1,95 m"],
    correct: 0,
    explanation:
      "La energía potencial depende de la altura: Ep = m × g × h → h = Ep / (m × g) = 1 / (0,2 × 9,8) ≈ 0,51 m",
    hints: [
      "La energía potencial se calcula con: Ep = m × g × h",
      "Despeja h de la fórmula: h = Ep / (m × g)",
      "h = 1 / (0,2 × 9,8) ≈ 0,51 m",
    ],
  },
  {
    id: 3,
    title: "MISIÓN 3 — FUERZA EN LA CAÍDA",
    question:
      "¿Cuál es la fuerza principal que hace descender a los barcos en la gran caída de los Fiordos?",
    options: ["A)  El motor", "B)  El agua", "C)  La gravedad", "D)  El viento"],
    correct: 2,
    explanation:
      "La gravedad es la fuerza que atrae los objetos hacia la Tierra y hace descender los barcos.",
    hints: [
      "Piensa qué hace que los objetos caigan naturalmente sin necesidad de un motor.",
      "Sin motor ni viento, ¿qué fuerza actúa siempre hacia abajo sobre todos los objetos?",
      "Es la misma fuerza que hace caer una manzana desde un árbol.",
    ],
  },
  {
    id: 4,
    title: "MISIÓN 4 — VELOCIDAD Y ALTURA",
    question:
      "Si la caída de los Fiordos fuera más alta, los barcos llegarían al agua:",
    options: [
      "A)  Más despacio",
      "B)  Con la misma velocidad",
      "C)  No llegarían",
      "D)  Más rápido",
    ],
    correct: 3,
    explanation:
      "Mayor altura → mayor energía potencial → mayor energía cinética → mayor velocidad al llegar al agua.",
    hints: [
      "Piensa en la relación entre la energía potencial y la cinética.",
      "Más altura → más energía potencial. Esa energía se transforma en energía cinética.",
      "La energía cinética determina la velocidad: Ec = ½ × m × v². Mayor Ec = mayor v.",
    ],
  },
  {
    id: 5,
    title: "MISIÓN 5 — ENERGÍA POTENCIAL",
    question:
      "¿Qué parte del recorrido tiene mayor energía potencial gravitatoria?",
    options: [
      "A)  La estación de salida",
      "B)  La zona de frenado",
      "C)  La parte más alta de la subida",
      "D)  La zona de agua final",
    ],
    correct: 2,
    explanation:
      "La energía potencial gravitatoria es Ep = m × g × h. A mayor altura, mayor Ep. El punto más alto del recorrido tiene la mayor Ep.",
    hints: [
      "La energía potencial gravitatoria depende directamente de la altura.",
      "Ep = m × g × h: a mayor h, mayor energía potencial.",
      "El punto con mayor h en el recorrido tiene la mayor energía potencial gravitatoria.",
    ],
  },
  {
    id: 6,
    title: "MISIÓN 6 — VELOCIDAD MEDIA",
    question:
      "El barco recorre 10 metros en 5 segundos. ¿Cuál es su velocidad media?",
    options: ["A)  1 m/s", "B)  50 m/s", "C)  5 m/s", "D)  2 m/s"],
    correct: 3,
    explanation:
      "Velocidad media v = distancia / tiempo = 10 m / 5 s = 2 m/s",
    hints: [
      "La velocidad media se calcula como: v = distancia / tiempo",
      "Sustituye los valores: v = 10 m / 5 s",
      "Divide 10 entre 5 para obtener la velocidad en m/s.",
    ],
  },
  {
    id: 7,
    title: "MISIÓN 7 — PROYECTIL DE AGUA",
    question:
      "Al salir las gotas de agua, ¿qué velocidad vertical tienen en su punto más alto si inicialmente eran lanzadas a 20 m/s?",
    options: ["A)  0 m/s", "B)  20 m/s", "C)  40 m/s", "D)  2 m/s"],
    correct: 0,
    explanation:
      "En el punto más alto de una trayectoria, la componente vertical de la velocidad es siempre cero. La gota se detiene momentáneamente en vertical.",
    hints: [
      "En el punto más alto, ¿cuál es la componente vertical de la velocidad de la gota?",
      "La gravedad frena la gota continuamente hasta que, en el punto más alto, la velocidad vertical llega a cero.",
      "En el punto más alto de una trayectoria parabólica, la velocidad vertical es siempre 0 m/s.",
    ],
  },
  {
    id: 8,
    title: "MISIÓN 8 — PRIMERA LEY DE NEWTON",
    question:
      "Si la fuerza resultante total sobre el barco es cero, el barco:",
    options: [
      "A)  Acelera",
      "B)  Está en reposo",
      "C)  Mantiene velocidad constante o está en reposo",
      "D)  Mantiene únicamente velocidad constante",
    ],
    correct: 2,
    explanation:
      "Primera Ley de Newton: si la fuerza neta es cero, el objeto no cambia su estado. Puede estar en reposo o moverse a velocidad constante.",
    hints: [
      "Recuerda la Primera Ley de Newton (Ley de Inercia).",
      "Si la fuerza neta es cero, el objeto no cambia su estado de movimiento.",
      "Un objeto en reposo permanece en reposo; uno en movimiento mantiene su velocidad constante.",
    ],
  },
];

const VARIABLES = [
  { id: "masa", label: "Masa" },
  { id: "altura", label: "Altura" },
  { id: "velocidad", label: "Velocidad" },
  { id: "tiempo", label: "Tiempo" },
  { id: "rozamiento", label: "Rozamiento" },
  { id: "forma", label: "Forma del barco" },
];

const HINT_COSTS = [50, 100, 150];

function getProgressValue(phase: GamePhase, missionIdx: number): number {
  if (phase === "hypothesis") return 5;
  if (phase === "missions")
    return 25 + Math.round((missionIdx / MISSIONS.length) * 50);
  if (phase === "variables") return 80;
  return 100;
}

function getPhaseLabel(phase: GamePhase): string {
  if (phase === "hypothesis") return "1. Hipótesis";
  if (phase === "missions") return "2. Construcción de la rampa";
  if (phase === "variables") return "3. Conceptos físicos";
  return "4. Conclusión científica";
}

export default function FiordosMission() {
  const [, setLocation] = useLocation();

  const [gamePhase, setGamePhase] = React.useState<GamePhase>("hypothesis");
  const [hypothesis, setHypothesis] = React.useState("");
  const [hypothesisSubmitted, setHypothesisSubmitted] = React.useState(false);

  const [missionIdx, setMissionIdx] = React.useState(0);
  const [points, setPoints] = React.useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = React.useState(0);
  const [noHintsUsed, setNoHintsUsed] = React.useState(true);
  const [totalErrors, setTotalErrors] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);

  const [qHadError, setQHadError] = React.useState(false);
  const [qHintLevel, setQHintLevel] = React.useState(0);
  const [showHints, setShowHints] = React.useState(false);
  const [qAnswered, setQAnswered] = React.useState(false);
  const [showNextButton, setShowNextButton] = React.useState(false);

  const [feedback, setFeedback] = React.useState<{
    type: "correct" | "wrong";
    msg: string;
    pts?: number;
  } | null>(null);
  const [flash, setFlash] = React.useState<"correct" | "wrong" | null>(null);
  const [floatingPts, setFloatingPts] = React.useState<number | null>(null);

  const [selectedVars, setSelectedVars] = React.useState<string[]>([]);

  const mission = MISSIONS[missionIdx];

  const triggerFlash = (type: "correct" | "wrong") => {
    setFlash(type);
    setTimeout(() => setFlash(null), 600);
  };

  const showFloating = (pts: number) => {
    setFloatingPts(pts);
    setTimeout(() => setFloatingPts(null), 1500);
  };

  const handleAnswer = (optIdx: number) => {
    if (qAnswered) return;
    const isCorrect = optIdx === mission.correct;
    if (isCorrect) {
      const earned = qHadError ? 50 : 100;
      const sectionBonus = 200;
      const total = earned + sectionBonus;
      setPoints((p) => p + total);
      setCorrectAnswers((c) => c + 1);
      setQAnswered(true);
      triggerFlash("correct");
      showFloating(total);
      setFeedback({ type: "correct", msg: mission.explanation, pts: total });
      setTimeout(() => setShowNextButton(true), 2800);
    } else {
      setTotalErrors((e) => e + 1);
      setQHadError(true);
      triggerFlash("wrong");
      setFeedback({
        type: "wrong",
        msg: "Respuesta incorrecta. Inténtalo de nuevo.",
      });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const handleNextMission = () => {
    setFeedback(null);
    setQHadError(false);
    setQHintLevel(0);
    setShowHints(false);
    setQAnswered(false);
    setShowNextButton(false);
    if (missionIdx + 1 < MISSIONS.length) {
      setMissionIdx((i) => i + 1);
    } else {
      const sectionComplete = 200;
      setPoints((p) => p + sectionComplete);
      setGamePhase("variables");
    }
  };

  const handleRequestHint = () => {
    if (qHintLevel >= 3 || qAnswered) return;
    const cost = HINT_COSTS[qHintLevel];
    setPoints((p) => Math.max(0, p - cost));
    setQHintLevel((l) => l + 1);
    setTotalHintsUsed((h) => h + 1);
    setNoHintsUsed(false);
    setShowHints(true);
  };

  const handleFinish = () => {
    let finalPoints = points + 500;
    if (noHintsUsed) finalPoints += 300;
    const noErrors = totalErrors === 0;

    sessionStorage.setItem("gamePoints", finalPoints.toString());
    sessionStorage.setItem("gameHypothesis", hypothesis);
    sessionStorage.setItem("gameHintsUsed", totalHintsUsed.toString());
    sessionStorage.setItem("gameCorrectAnswers", correctAnswers.toString());
    sessionStorage.setItem("gameTotalErrors", totalErrors.toString());
    sessionStorage.setItem("gameNoPistas", noHintsUsed ? "true" : "false");
    sessionStorage.setItem("gameNoErrors", noErrors ? "true" : "false");
    sessionStorage.setItem("gameSelectedVars", selectedVars.join(","));

    setLocation("/fiordos/resultado");
  };

  const nextHintCost =
    qHintLevel < 3 ? HINT_COSTS[qHintLevel] : null;

  const progressValue = getProgressValue(gamePhase, missionIdx);
  const phaseLabel = getPhaseLabel(gamePhase);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans">
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key={flash}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed inset-0 z-[100] pointer-events-none ${
              flash === "correct"
                ? "bg-green-400/30"
                : "bg-red-500/30"
            }`}
          />
        )}
      </AnimatePresence>

      {/* Floating points */}
      <AnimatePresence>
        {floatingPts !== null && (
          <motion.div
            key={floatingPts + Math.random()}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -80, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="fixed top-24 right-8 z-[200] pointer-events-none"
          >
            <span className="font-serif font-bold text-3xl text-green-400 drop-shadow-lg">
              +{floatingPts}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Header */}
      <header className="border-b border-border bg-card/60 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FlaskConical className="w-5 h-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground font-serif tracking-widest uppercase">
                Joyfe Science Investigations
              </div>
              <div className="font-serif font-bold text-primary tracking-wider text-sm">
                FIORDOS
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-xs text-muted-foreground font-serif tracking-widest">
                🧪 PUNTOS
              </div>
              <div className="font-mono font-bold text-lg text-primary tabular-nums">
                {points}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground font-serif tracking-widest">
                ERRORES
              </div>
              <div
                className={`font-mono font-bold ${
                  totalErrors > 0 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {totalErrors.toString().padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto px-4 pb-3">
          <div className="flex justify-between mb-1.5 text-xs font-serif text-muted-foreground tracking-widest">
            <span>{phaseLabel}</span>
            <span className="text-primary">{progressValue}%</span>
          </div>
          <Progress value={progressValue} className="h-1.5 bg-muted" />
          <div className="flex justify-between mt-1.5">
            {["Hipótesis", "Rampa", "Conceptos", "Conclusión"].map(
              (label, i) => (
                <span
                  key={label}
                  className={`text-[10px] font-serif tracking-wider ${
                    (gamePhase === "hypothesis" && i === 0) ||
                    (gamePhase === "missions" && i === 1) ||
                    (gamePhase === "variables" && i === 2) ||
                    (gamePhase === "done" && i === 3)
                      ? "text-primary"
                      : "text-muted-foreground/40"
                  }`}
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* ── PHASE: HYPOTHESIS ── */}
          {gamePhase === "hypothesis" && (
            <motion.div
              key="hypothesis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-widest uppercase">
                  Fase 1 — Hipótesis
                </h2>
                <div className="h-px bg-primary/30 w-full" />
              </div>

              <div className="p-6 bg-primary/5 border border-primary/20 rounded-sm">
                <p className="text-lg font-sans leading-relaxed text-foreground">
                  ¿Por qué crees que unas veces los Fiordos salpican más que
                  otras?
                </p>
              </div>

              {!hypothesisSubmitted ? (
                <div className="space-y-4">
                  <Textarea
                    value={hypothesis}
                    onChange={(e) => setHypothesis(e.target.value)}
                    placeholder="Escribe aquí tu hipótesis inicial..."
                    className="min-h-[140px] font-sans text-base bg-card/50 border-border/60 resize-none focus:border-primary/60 transition-colors"
                  />
                  <Button
                    onClick={() => {
                      if (hypothesis.trim().length < 5) return;
                      setHypothesisSubmitted(true);
                    }}
                    disabled={hypothesis.trim().length < 5}
                    className="w-full h-12 font-serif font-bold tracking-widest bg-primary hover:bg-primary/80 text-primary-foreground"
                  >
                    REGISTRAR HIPÓTESIS
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="p-5 border border-green-500/30 bg-green-500/5 rounded-sm flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-serif font-bold text-green-400 tracking-wider mb-2">
                        Hipótesis registrada correctamente.
                      </p>
                      <p className="text-sm text-foreground/70 font-sans italic">
                        "{hypothesis}"
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setGamePhase("missions")}
                    className="w-full h-12 font-serif font-bold tracking-widest"
                  >
                    CONTINUAR <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── PHASE: MISSIONS ── */}
          {gamePhase === "missions" && (
            <motion.div
              key={`mission-${missionIdx}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif font-bold text-accent tracking-widest uppercase">
                    {mission.title}
                  </h2>
                  <span className="text-xs font-serif text-muted-foreground">
                    {missionIdx + 1} / {MISSIONS.length}
                  </span>
                </div>
                <div className="h-px bg-accent/30 w-full" />
              </div>

              <div className="p-5 bg-card/50 border border-border/60 rounded-sm">
                <p className="text-base md:text-lg font-sans leading-relaxed text-foreground">
                  {mission.question}
                </p>
              </div>

              {/* Answer options */}
              <div className="grid grid-cols-1 gap-3">
                {mission.options.map((opt, i) => {
                  const isCorrect = i === mission.correct;
                  const showResult = qAnswered;
                  return (
                    <Button
                      key={i}
                      variant="outline"
                      disabled={qAnswered}
                      onClick={() => handleAnswer(i)}
                      className={`h-auto py-4 px-5 text-left justify-start font-sans text-base transition-all duration-200
                        ${
                          showResult && isCorrect
                            ? "border-green-500 bg-green-500/10 text-green-400"
                            : "border-border/50 bg-background/50 hover:border-primary/60 hover:bg-primary/5"
                        }`}
                    >
                      {showResult && isCorrect && (
                        <CheckCircle2 className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" />
                      )}
                      {opt}
                    </Button>
                  );
                })}
              </div>

              {/* Hint system */}
              {!qAnswered && (
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    disabled={qHintLevel >= 3}
                    onClick={handleRequestHint}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground border border-dashed border-border/40 hover:border-border w-full h-10"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    🔍 PEDIR PISTA
                    {nextHintCost !== null && (
                      <span className="ml-2 text-destructive font-bold">
                        (−{nextHintCost} pts)
                      </span>
                    )}
                    {qHintLevel >= 3 && (
                      <span className="ml-2 text-muted-foreground/50">
                        (sin más pistas)
                      </span>
                    )}
                  </Button>

                  <AnimatePresence>
                    {showHints && qHintLevel > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 p-4 bg-card/30 border border-primary/10 rounded-sm">
                          {mission.hints.slice(0, qHintLevel).map((hint, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start space-x-2"
                            >
                              <span className="text-primary text-sm flex-shrink-0 font-serif">
                                Pista {i + 1}:
                              </span>
                              <span className="text-sm text-foreground/80 font-sans">
                                {hint}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Success feedback */}
              <AnimatePresence>
                {feedback && feedback.type === "correct" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="p-5 border border-green-500/40 bg-green-500/8 rounded-sm space-y-4"
                  >
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-serif font-bold text-green-400 tracking-wider">
                          ¡CORRECTO! +{feedback.pts} puntos
                        </p>
                        <p className="text-sm text-foreground/80 font-sans leading-relaxed">
                          {feedback.msg}
                        </p>
                      </div>
                    </div>
                    <AnimatePresence>
                      {showNextButton && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Button
                            onClick={handleNextMission}
                            className="w-full h-11 font-serif font-bold tracking-widest bg-green-600 hover:bg-green-600/80 text-white"
                          >
                            {missionIdx + 1 < MISSIONS.length
                              ? "SIGUIENTE MISIÓN"
                              : "CONTINUAR"}{" "}
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error feedback (auto-dismissing) */}
              <AnimatePresence>
                {feedback && feedback.type === "wrong" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="p-4 border border-destructive/40 bg-destructive/8 rounded-sm flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <p className="text-sm font-sans text-foreground/90">
                      {feedback.msg}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── PHASE: VARIABLES ── */}
          {gamePhase === "variables" && (
            <motion.div
              key="variables"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-widest uppercase">
                  Fase 3 — Conceptos Físicos
                </h2>
                <div className="h-px bg-primary/30 w-full" />
              </div>

              <div className="p-5 bg-card/50 border border-border/60 rounded-sm">
                <p className="text-base md:text-lg font-sans leading-relaxed text-foreground">
                  Selecciona qué variables crees que podrían influir en la
                  salpicadura de los Fiordos. Puedes elegir más de una.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {VARIABLES.map((v) => {
                  const selected = selectedVars.includes(v.id);
                  return (
                    <Button
                      key={v.id}
                      variant="outline"
                      onClick={() =>
                        setSelectedVars((prev) =>
                          selected
                            ? prev.filter((x) => x !== v.id)
                            : [...prev, v.id]
                        )
                      }
                      className={`h-20 font-serif font-bold tracking-wider transition-all ${
                        selected
                          ? "bg-primary/15 border-primary text-primary shadow-[0_0_12px_rgba(0,255,255,0.2)]"
                          : "bg-background/50 border-border/50 hover:border-primary/50"
                      }`}
                    >
                      {v.label}
                    </Button>
                  );
                })}
              </div>

              <div className="p-5 bg-accent/5 border border-accent/20 rounded-sm">
                <p className="text-sm font-sans text-foreground/80 leading-relaxed">
                  💡 Durante el experimento real comprobarás cuál de estas
                  variables es la responsable principal del fenómeno.
                </p>
              </div>

              <Button
                onClick={handleFinish}
                disabled={selectedVars.length === 0}
                size="lg"
                className="w-full h-14 font-serif font-bold tracking-widest text-lg bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.25)]"
              >
                COMPLETAR INVESTIGACIÓN <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
