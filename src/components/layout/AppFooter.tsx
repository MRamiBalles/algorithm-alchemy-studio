import { Heart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-6 mt-auto shrink-0">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">

                {/* Left: Copyright & License */}
                <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
                    <p className="font-mono font-medium text-foreground">
                        &copy; {currentYear} Manuel Ramírez Ballesteros.
                    </p>
                    <p>
                        Este material educativo es gratuito y de libre acceso.
                    </p>
                    <p className="text-[10px] opacity-70">
                        Licenciado bajo Creative Commons BY-NC-SA 4.0
                    </p>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col md:flex-row items-center gap-4">

                    {/* Donation */}
                    <a
                        href="https://www.paypal.com/paypalme/ramiballes96"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <Button variant="outline" size="sm" className="gap-2 border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400 transition-colors">
                            <Heart className="w-3.5 h-3.5 group-hover:fill-current" />
                            <span>Invítame a un café (PayPal)</span>
                        </Button>
                    </a>

                    {/* Contact */}
                    <a href="mailto:ramiballes96@gmail.com">
                        <Button variant="ghost" size="sm" className="gap-2 hover:text-cyan-400">
                            <Mail className="w-3.5 h-3.5" />
                            <span>ramiballes96@gmail.com</span>
                        </Button>
                    </a>

                </div>
            </div>
        </footer>
    );
}
