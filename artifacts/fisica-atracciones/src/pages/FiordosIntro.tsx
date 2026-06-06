import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FlaskConical, Search, Microscope } from "lucide-react";

export default function FiordosIntro() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.7 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(0,200,255,0.07),_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(255,140,0,0.05),_transparent_60%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
        }}
      />

      {/* Header */}
      <div className="p-6 relative z-10">
        <Link href="/mapa">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground font-serif tracking-wider"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> VOLVER
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full relative z-10">
        {/* Organization badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-10 flex flex-col items-center space-y-3"
        >
          <div className="flex items-center space-x-3 border border-primary/40 bg-primary/5 px-8 py-4 rounded-sm shadow-[0_0_30px_rgba(0,255,255,0.1)]">
            <FlaskConical className="w-7 h-7 text-primary" />
            <div className="text-center">
              <p className="text-xs font-serif tracking-[0.3em] text-primary uppercase">
                Departamento de Investigación Científica
              </p>
              <h1 className="text-xl md:text-2xl font-serif font-bold text-foreground tracking-widest uppercase">
                Joyfe Science Investigations
              </h1>
            </div>
            <Microscope className="w-7 h-7 text-primary" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-px w-12 bg-accent/40" />
            <span className="text-xs font-serif text-accent tracking-[0.2em] uppercase">
              Alerta Activa · Nivel 1
            </span>
            <div className="h-px w-12 bg-accent/40" />
          </div>
        </motion.div>

        {/* Narrative */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-5 text-lg md:text-xl font-sans border-l-4 border-primary/50 pl-6 py-2 w-full"
        >
          <motion.p variants={item} className="text-foreground font-bold text-primary font-serif tracking-wider">
            Se ha detectado una anomalía en la atracción Fiordos.
          </motion.p>
          <motion.p variants={item} className="text-foreground/80">
            Los visitantes afirman que algunas veces la atracción genera enormes salpicaduras y otras veces apenas levanta agua.
          </motion.p>
          <motion.p variants={item} className="text-foreground/80">
            Tu equipo ha sido enviado para investigar la causa.
          </motion.p>
          <motion.p variants={item} className="text-accent font-bold">
            Como científico deberás formular una hipótesis, recopilar datos y descubrir qué variable es responsable del fenómeno.
          </motion.p>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="mt-10 w-full grid grid-cols-3 gap-3 text-center"
        >
          {[
            { icon: "🧪", label: "Puntos de Investigación", val: "0 pts" },
            { icon: "🔍", label: "Pistas disponibles", val: "3 por misión" },
            { icon: "📊", label: "Misiones", val: "8 desafíos" },
          ].map((s) => (
            <div
              key={s.label}
              className="border border-border/50 bg-card/30 p-3 rounded-sm"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xs text-muted-foreground font-sans">{s.label}</div>
              <div className="text-sm font-serif text-primary mt-1">{s.val}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 0.8 }}
          className="mt-10 w-full text-center"
        >
          <Link href="/fiordos/mision">
            <Button
              size="lg"
              className="w-full md:w-auto h-16 px-16 text-xl font-serif font-bold tracking-widest bg-primary hover:bg-primary/80 text-primary-foreground uppercase rounded-none border border-primary/50 shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all duration-300"
              data-testid="button-start-mission"
            >
              <Search className="mr-3 h-5 w-5" />
              COMENZAR INVESTIGACIÓN
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
