import { AppLayout } from "@/components/layout/AppLayout";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Construction } from "lucide-react";

const trackNames: Record<string, string> = {
  foundations: "Track 1: Foundations",
  core: "Track 2: Core Computing",
  systems: "Track 3: Systems",
  networks: "Track 4: Networks & Cloud",
  software: "Track 5: Software & Data",
  intelligence: "Track 6: Intelligence",
  visual: "Track 7: Visual & Expert",
  security: "Track 8: Security",
};

export default function TrackPlaceholder() {
  const { track, subject } = useParams();
  const trackLabel = trackNames[track || ""] || track;
  const subjectLabel = subject?.replace(/-/g, " ") || "";

  return (
    <AppLayout>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <Construction className="w-16 h-16 text-muted-foreground mx-auto" />
          <div>
            <Badge variant="outline" className="mb-3 font-mono text-xs">
              {trackLabel}
            </Badge>
            <h1 className="text-3xl font-bold capitalize">{subjectLabel}</h1>
            <p className="text-muted-foreground mt-3">
              Este módulo está en desarrollo. Pronto tendrás acceso a visualizaciones interactivas, 
              talleres prácticos y retos de maestría.
            </p>
          </div>
          <div className="flex gap-2 justify-center text-xs font-mono text-muted-foreground">
            <span>🔥 Ignition</span>
            <span>📚 Wiki</span>
            <span>🛠️ Workshop</span>
            <span>🏆 Arena</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
