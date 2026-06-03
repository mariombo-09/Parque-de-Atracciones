import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-primary font-serif tracking-widest uppercase text-sm md:text-lg mb-4 font-bold drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            Aprende jugando en el Parque de Atracciones
          </h2>
          <h1 className="text-5xl md:text-8xl font-serif font-black text-foreground mb-6 leading-tight tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            LA FÍSICA DE LAS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-pulse">
              ATRACCIONES
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="border border-primary/30 bg-primary/5 px-8 py-4 rounded-sm backdrop-blur-sm"
        >
          <p className="text-xl md:text-3xl font-serif text-accent uppercase tracking-widest font-bold">
            "A toda acción hay una reacción"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="pt-8"
        >
          <Link href="/mapa">
            <Button size="lg" className="h-16 px-12 text-xl font-serif font-bold tracking-widest bg-primary hover:bg-primary/80 text-primary-foreground uppercase rounded-none border border-primary/50 shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all duration-300" data-testid="button-iniciar">
              INICIAR EXPERIENCIA
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
