import { useEffect } from "react";
import { X } from "lucide-react";
import { Activity } from "@/data/activities";

interface ActivityModalProps {
  activity: Activity;
  onClose: () => void;
}

export default function ActivityModal({ activity, onClose }: ActivityModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal container */}
      <div className="flex flex-col w-full h-full md:m-4 md:rounded-sm md:w-[calc(100%-2rem)] md:h-[calc(100%-2rem)] bg-background border border-primary/30 shadow-[0_0_40px_rgba(0,255,255,0.15)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card/60 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-serif font-bold tracking-widest text-primary uppercase text-sm md:text-base">
              {activity.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors font-serif text-xs tracking-widest uppercase border border-border/60 hover:border-primary/50 px-3 py-1.5 rounded-sm"
            aria-label="Cerrar actividad"
          >
            <X className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cerrar</span>
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 relative overflow-hidden">
          {activity.type === "pdf" ? (
            <iframe
              src={`${activity.src}#toolbar=1&navpanes=0`}
              title={activity.title}
              className="w-full h-full border-0"
              allow="fullscreen"
            />
          ) : (
            <iframe
              src={activity.src}
              title={activity.title}
              className="w-full h-full border-0"
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}
