import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, AlertTriangle } from "lucide-react";

export default function FiordosIntro() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,0,0.1),_transparent_70%)] pointer-events-none animate-pulse duration-[3000ms]" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

      {/* Header */}
      <div className="p-6 relative z-10">
        <Link href="/mapa">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-serif tracking-wider" data-testid="link-back-map">
            <ChevronLeft className="mr-2 h-4 w-4" /> VOLVER
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 flex items-center space-x-4 border border-destructive/50 bg-destructive/10 px-8 py-4 rounded-sm"
        >
          <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-destructive tracking-widest">
            SISTEMA CRÍTICO
          </h1>
          <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 text-xl md:text-2xl font-sans text-center md:text-left border-l-4 border-destructive pl-6 py-2"
        >
          <motion.p variants={item} className="text-foreground">
            Alerta en la atracción <span className="font-bold text-primary font-serif">FIORDOS</span>.
          </motion.p>
          <motion.p variants={item} className="text-foreground/80">
            El sistema automático ha fallado.
          </motion.p>
          <motion.p variants={item} className="text-foreground/80">
            El barco se encuentra en modo manual y está fuera de control.
          </motion.p>
          <motion.p variants={item} className="text-accent font-bold">
            Si no configuras correctamente la energía, la velocidad y el impacto... el barco podría estrellarse.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="mt-16 w-full text-center"
        >
          <p className="text-sm font-serif text-muted-foreground tracking-widest uppercase mb-6">
            Eres el ingeniero encargado de salvar la atracción.
          </p>
          <Link href="/fiordos/mision">
            <Button size="lg" className="w-full md:w-auto h-16 px-16 text-xl font-serif font-bold tracking-widest bg-destructive hover:bg-destructive/80 text-destructive-foreground uppercase rounded-none border border-destructive/50 shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all duration-300" data-testid="button-start-mission">
              COMENZAR MISIÓN
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
