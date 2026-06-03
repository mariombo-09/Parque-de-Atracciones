import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldAlert, RotateCcw, Map as MapIcon } from "lucide-react";

export default function FiordosResult() {
  const isSuccess = sessionStorage.getItem("gameSuccess") === "true";
  const errors = parseInt(sessionStorage.getItem("gameErrors") || "0");

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background FX */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 ${isSuccess ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background' : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive via-background to-background'}`} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl bg-card border border-border p-8 md:p-12 shadow-2xl rounded-sm"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          {isSuccess ? (
            <>
              <ShieldCheck className="w-24 h-24 text-primary animate-pulse shadow-[0_0_30px_rgba(0,255,255,0.4)] rounded-full" />
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-widest uppercase">
                MISIÓN COMPLETADA
              </h1>
              <p className="text-xl font-sans text-muted-foreground">
                Has logrado controlar la energía, la velocidad y las fuerzas. El barco ha aterrizado de forma segura.
              </p>
              
              <div className="w-full text-left bg-background p-6 border border-border mt-8">
                <h3 className="font-serif text-accent tracking-widest uppercase mb-4 text-sm font-bold border-b border-border pb-2">Reporte del Ingeniero</h3>
                <ul className="space-y-2 font-sans text-sm md:text-base text-foreground/80 list-disc list-inside">
                  <li><strong>Energía Potencial:</strong> Calculada correctamente para iniciar la caída (30m).</li>
                  <li><strong>Velocidad y Rozamiento:</strong> Parámetros estabilizados en modo manual.</li>
                  <li><strong>Fuerzas Físicas:</strong> Identificación precisa de Peso y Rozamiento.</li>
                  <li><strong>Interacción con fluidos:</strong> Uso del agua para disipar energía cinética.</li>
                </ul>
                <div className="mt-6 pt-4 border-t border-border flex justify-between font-mono text-sm text-muted-foreground">
                  <span>ERRORES REGISTRADOS: {errors}</span>
                  <span>ESTADO: ÓPTIMO</span>
                </div>
              </div>

              <Link href="/mapa">
                <Button size="lg" className="mt-8 w-full md:w-auto font-serif tracking-widest text-lg bg-primary hover:bg-primary/80 text-primary-foreground h-14 px-12" data-testid="btn-back-map">
                  <MapIcon className="mr-2 h-5 w-5" /> VOLVER AL MAPA
                </Button>
              </Link>
            </>
          ) : (
            <>
              <ShieldAlert className="w-24 h-24 text-destructive animate-pulse shadow-[0_0_30px_rgba(255,0,0,0.4)] rounded-full" />
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-destructive tracking-widest uppercase">
                EL SISTEMA HA FALLADO
              </h1>
              <p className="text-xl font-sans text-muted-foreground">
                Intenta optimizar tus decisiones como ingeniero. El impacto no fue controlado.
              </p>

              <div className="w-full text-center bg-destructive/10 p-6 border border-destructive/30 mt-8">
                <p className="font-mono text-destructive mb-2">ERRORES COMETIDOS: {errors}</p>
                <p className="text-sm font-sans text-destructive/80">Revisa los principios de conservación de la energía y fuerzas de rozamiento.</p>
              </div>

              <Link href="/fiordos/mision">
                <Button size="lg" variant="outline" className="mt-8 w-full md:w-auto font-serif tracking-widest text-lg border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground h-14 px-12" data-testid="btn-retry">
                  <RotateCcw className="mr-2 h-5 w-5" /> REINTENTAR
                </Button>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
