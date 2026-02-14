
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoPlayerProps {
    src?: string;
    poster?: string;
    className?: string;
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
    if (!src) {
        return (
            <div className={`bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center p-8 ${className}`}>
                <div className="text-center">
                    <p className="text-slate-500 font-mono text-sm">No video source provided</p>
                </div>
            </div>
        );
    }

    // Check if it's a "Short" (vertical) or normal video? 
    // For now, standard 16:9 player
    return (
        <div className={`rounded-lg overflow-hidden border border-slate-800 bg-black ${className}`}>
            <AspectRatio ratio={16 / 9}>
                <video
                    key={src}
                    controls
                    className="w-full h-full object-cover"
                    poster={poster}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </AspectRatio>
        </div>
    );
}
