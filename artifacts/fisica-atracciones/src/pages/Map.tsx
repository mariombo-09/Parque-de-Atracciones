import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Map() {
  return (
    <div className="min-h-[100dvh] w-full bg-background relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center pointer-events-none">
        <Link href="/">
          <Button variant="outline" className="pointer-events-auto bg-background/50 backdrop-blur-md border-primary/30 text-primary hover:text-primary hover:bg-primary/20 font-serif" data-testid="link-home">
            <ChevronLeft className="mr-2 h-4 w-4" /> ABORTAR MISIÓN
          </Button>
        </Link>
        <div className="pointer-events-auto bg-background/80 border border-primary/50 text-primary px-6 py-2 rounded-sm font-serif font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(0,255,255,0.2)]">
          MAPA TÁCTICO
        </div>
      </div>

      <div className="flex-1 relative w-full h-full">
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 pointer-events-none" />
        <img 
          src="/plano-parque.png" 
          alt="Mapa del Parque de Atracciones" 
          className="w-full h-full object-cover md:object-contain opacity-70 grayscale sepia brightness-75 contrast-125"
        />

        {/* Fiordos Active Marker */}
        <Link href="/fiordos">
          <motion.button 
            className="absolute z-20 flex flex-col items-center justify-center group"
            style={{ left: "77%", top: "45%" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            data-testid="link-fiordos"
          >
            <span className="bg-primary/20 border border-primary text-primary px-3 py-1 mb-2 text-sm font-serif font-bold tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.5)] group-hover:bg-primary group-hover:text-primary-foreground transition-colors uppercase">
              FIORDOS
            </span>
            <div className="relative flex h-8 w-8 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-primary shadow-[0_0_10px_#0ff]"></span>
            </div>
          </motion.button>
        </Link>

        {/* Locked Markers */}
        <LockedMarker left="60%" top="30%" />
        <LockedMarker left="40%" top="70%" />
        <LockedMarker left="75%" top="60%" />
      </div>
    </div>
  );
}

function LockedMarker({ left, top }: { left: string, top: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className="absolute z-10 flex flex-col items-center justify-center cursor-not-allowed opacity-50"
          style={{ left, top }}
          data-testid={`locked-marker-${left}-${top}`}
        >
          <span className="bg-muted/80 border border-muted-foreground text-muted-foreground px-2 py-1 mb-2 text-xs font-serif font-bold tracking-widest backdrop-blur-md uppercase">
            PRÓXIMAMENTE
          </span>
          <div className="h-6 w-6 rounded-full bg-muted border border-muted-foreground flex items-center justify-center">
            <Lock className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-card border-border font-sans">
        <p>Atracción bloqueada</p>
      </TooltipContent>
    </Tooltip>
  );
}
