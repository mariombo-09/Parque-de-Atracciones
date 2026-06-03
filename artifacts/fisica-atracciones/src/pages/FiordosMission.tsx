import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, ChevronRight, Activity, Thermometer, Wind } from "lucide-react";

import React from "react";

type Phase = 1 | 2 | 3 | 4;

export default function FiordosMission() {
  const [, setLocation] = useLocation();
  const [phase, setPhase] = React.useState<Phase>(1);
  const [errors, setErrors] = React.useState(0);
  const [phaseComplete, setPhaseComplete] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{type: 'error' | 'success', msg: string} | null>(null);

  // Phase 2 state
  const [p2Inc, setP2Inc] = React.useState<string | null>(null);
  const [p2Carga, setP2Carga] = React.useState<string | null>(null);
  const [p2Roz, setP2Roz] = React.useState<string | null>(null);

  // Phase 3 state
  const [p3Sensors, setP3Sensors] = React.useState<Record<string, boolean>>({
    peso: false, rozamiento: false, motor: false, viento: false
  });

  React.useEffect(() => {
    // Reset state on mount just in case
    sessionStorage.setItem("gameErrors", "0");
    sessionStorage.removeItem("gameSuccess");
  }, []);

  const handleNextPhase = () => {
    if (phase < 4) {
      setPhase((p) => (p + 1) as Phase);
      setPhaseComplete(false);
      setFeedback(null);
    } else {
      sessionStorage.setItem("gameErrors", errors.toString());
      sessionStorage.setItem("gameSuccess", "true");
      setLocation("/fiordos/resultado");
    }
  };

  const triggerError = (msg: string) => {
    setErrors(e => e + 1);
    setFeedback({ type: 'error', msg });
  };

  const triggerSuccess = (msg: string) => {
    setPhaseComplete(true);
    setFeedback({ type: 'success', msg });
  };

  // Renderers for phases
  const renderPhase1 = () => (
    <div className="space-y-8 w-full max-w-2xl mx-auto">
      <div className="p-6 bg-card border border-primary/20 rounded-sm">
        <p className="text-lg font-sans leading-relaxed">
          "El barco necesita energía para comenzar el recorrido. Si no es suficiente, se detendrá. Si es demasiada… el impacto será peligroso."
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[10, 20, 30, 50].map((val) => (
          <Button
            key={val}
            variant="outline"
            disabled={phaseComplete}
            onClick={() => {
              if (val === 10 || val === 20) triggerError("El barco no tiene suficiente energía para moverse.");
              else if (val === 50) triggerError("Demasiada energía. Riesgo de accidente.");
              else triggerSuccess("Energía óptima. Sistema activado.");
            }}
            className="h-32 flex flex-col items-center justify-center font-serif text-2xl font-bold bg-background/50 border-primary/30 hover:border-primary hover:bg-primary/10 transition-colors"
            data-testid={`btn-p1-${val}`}
          >
            <span>{val} m</span>
          </Button>
        ))}
      </div>
    </div>
  );

  const renderPhase2 = () => {
    const checkPhase2 = () => {
      if (!p2Inc || !p2Carga || !p2Roz) {
        triggerError("Selecciona todos los parámetros.");
        return;
      }
      if (p2Inc === "media" && p2Carga === "media" && p2Roz === "normal") {
        triggerSuccess("Velocidad estabilizada.");
      } else {
        triggerError(
          p2Inc === "alta" ? "Velocidad excesiva por alta inclinación." :
          p2Inc === "baja" ? "No llega al final. Inclinación insuficiente." :
          p2Carga !== "media" ? "La carga desestabiliza el sistema." :
          "Fricción incorrecta. Ajusta el rozamiento."
        );
      }
    };

    return (
      <div className="space-y-8 w-full max-w-2xl mx-auto">
        <div className="p-6 bg-card border border-accent/20 rounded-sm">
          <p className="text-lg font-sans leading-relaxed">
            "Estás controlando la bajada manualmente. La velocidad no puede ser ni demasiado alta ni demasiado baja."
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-serif text-sm tracking-widest text-muted-foreground uppercase">Inclinación</label>
            <div className="grid grid-cols-3 gap-2">
              {['baja', 'media', 'alta'].map(val => (
                <Button key={val} disabled={phaseComplete} variant={p2Inc === val ? 'default' : 'outline'} onClick={() => setP2Inc(val)} className="uppercase font-serif">{val}</Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-serif text-sm tracking-widest text-muted-foreground uppercase">Carga del barco</label>
            <div className="grid grid-cols-3 gap-2">
              {['vacío', 'media', 'completo'].map(val => (
                <Button key={val} disabled={phaseComplete} variant={p2Carga === val ? 'default' : 'outline'} onClick={() => setP2Carga(val)} className="uppercase font-serif">{val}</Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-serif text-sm tracking-widest text-muted-foreground uppercase">Rozamiento</label>
            <div className="grid grid-cols-3 gap-2">
              {['bajo', 'normal', 'alto'].map(val => (
                <Button key={val} disabled={phaseComplete} variant={p2Roz === val ? 'default' : 'outline'} onClick={() => setP2Roz(val)} className="uppercase font-serif">{val}</Button>
              ))}
            </div>
          </div>
        </div>

        {!phaseComplete && (
          <Button onClick={checkPhase2} className="w-full h-14 font-serif font-bold tracking-widest bg-accent hover:bg-accent/80 text-accent-foreground" data-testid="btn-verify-p2">
            VERIFICAR SISTEMA
          </Button>
        )}
      </div>
    );
  };

  const renderPhase3 = () => {
    const toggleSensor = (k: string) => {
      if(phaseComplete) return;
      setP3Sensors(s => ({...s, [k]: !s[k]}));
    };

    const checkPhase3 = () => {
      if (p3Sensors.peso && p3Sensors.rozamiento && !p3Sensors.motor && !p3Sensors.viento) {
        triggerSuccess("Has identificado las fuerzas reales del movimiento.");
      } else {
        triggerError("Sensores incorrectos. Revisa la selección.");
      }
    };

    const sensors = [
      { id: 'peso', label: 'PESO (GRAVEDAD)' },
      { id: 'rozamiento', label: 'ROZAMIENTO' },
      { id: 'motor', label: 'MOTOR DE IMPULSO' },
      { id: 'viento', label: 'RESISTENCIA DEL VIENTO' }
    ];

    return (
      <div className="space-y-8 w-full max-w-2xl mx-auto">
        <div className="p-6 bg-card border border-primary/20 rounded-sm">
          <p className="text-lg font-sans leading-relaxed">
            "Los sensores del sistema están dañados. Necesitas activar los sensores correctos para entender qué fuerzas actúan en la caída libre."
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {sensors.map(s => (
            <Button
              key={s.id}
              disabled={phaseComplete}
              variant={p3Sensors[s.id] ? 'default' : 'outline'}
              onClick={() => toggleSensor(s.id)}
              className={`h-24 font-serif font-bold tracking-wider ${p3Sensors[s.id] ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'bg-background'}`}
              data-testid={`sensor-${s.id}`}
            >
              {s.label}
            </Button>
          ))}
        </div>

        {!phaseComplete && (
          <Button onClick={checkPhase3} className="w-full h-14 font-serif font-bold tracking-widest" data-testid="btn-confirm-p3">
            CONFIRMAR SENSORES
          </Button>
        )}
      </div>
    );
  };

  const renderPhase4 = () => (
    <div className="space-y-8 w-full max-w-2xl mx-auto">
      <div className="p-6 bg-card border border-destructive/30 rounded-sm shadow-[0_0_20px_rgba(255,0,0,0.1)]">
        <p className="text-lg font-sans leading-relaxed text-destructive-foreground">
          "El barco se aproxima al agua a gran velocidad. Si no tomas la decisión correcta, el impacto será destructivo."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Reducir altura', correct: false },
          { label: 'Añadir volumen de agua', correct: true },
          { label: 'Frenar en seco', correct: false },
          { label: 'Quitar peso', correct: false }
        ].map(opt => (
          <Button
            key={opt.label}
            disabled={phaseComplete}
            variant="outline"
            onClick={() => {
              if (opt.correct) triggerSuccess("El agua absorbe la energía y reduce la velocidad de forma segura.");
              else {
                triggerError("Impacto violento. Sistema dañado.");
                sessionStorage.setItem("gameErrors", (errors + 1).toString());
                sessionStorage.setItem("gameSuccess", "false");
                setLocation("/fiordos/resultado");
              }
            }}
            className="h-20 font-serif font-bold tracking-widest bg-background/50 border-destructive/30 hover:bg-destructive/10 hover:border-destructive uppercase"
            data-testid={`btn-p4-${opt.label}`}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );

  const phaseNames = ["ENERGÍA INICIAL", "CONTROL DE VELOCIDAD", "FUERZAS OCULTAS", "EL IMPACTO FINAL"];

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans">
      {/* Header / HUD */}
      <header className="border-b border-border bg-card/50 p-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-serif tracking-widest uppercase">Misión Activa</span>
            <span className="font-serif font-bold text-primary tracking-widest">FIORDOS</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-xs text-muted-foreground font-serif tracking-widest uppercase block">Errores</span>
              <span className={`font-mono font-bold ${errors > 0 ? 'text-destructive' : 'text-primary'}`}>
                {errors.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-4">
          <div className="flex justify-between mb-2 text-xs font-serif text-muted-foreground tracking-widest">
            <span>FASE {phase}/4</span>
            <span className="text-primary">{phaseNames[phase-1]}</span>
          </div>
          <Progress value={(phase / 4) * 100} className="h-1 bg-muted" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col justify-center"
          >
            {phase === 1 && renderPhase1()}
            {phase === 2 && renderPhase2()}
            {phase === 3 && renderPhase3()}
            {phase === 4 && renderPhase4()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Feedback Footer */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className={`fixed bottom-0 left-0 w-full p-6 border-t ${feedback.type === 'error' ? 'bg-destructive/90 border-destructive' : 'bg-primary/90 border-primary'} backdrop-blur-md z-50`}
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4 text-black">
                {feedback.type === 'error' ? <AlertCircle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                <p className="font-serif font-bold text-lg">{feedback.msg}</p>
              </div>
              {feedback.type === 'success' && (
                <Button variant="secondary" onClick={handleNextPhase} className="font-serif tracking-widest" data-testid="btn-next-phase">
                  {phase === 4 ? 'FINALIZAR MISIÓN' : 'SIGUIENTE FASE'} <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
