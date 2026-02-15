"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function MBHBPage() {
    const [unlocked, setUnlocked] = useState(false);

    // Simulate unlocking process (Crypto-Mining effect)
    useEffect(() => {
        const timer = setTimeout(() => setUnlocked(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="w-full h-screen bg-black text-red-600 font-mono overflow-hidden relative">
            {/* BACKGROUND GRID */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div className="relative z-10 p-10 h-full flex flex-col items-center justify-center">

                {/* LOCK SEQUENCE */}
                {!unlocked && (
                    <div className="text-center animate-pulse">
                        <h1 className="text-6xl font-black mb-4">ACCESS DENIED</h1>
                        <p className="tracking-widest">VERIFYING BIOMETRICS...</p>
                        <p className="text-xs mt-4 text-red-900">
                            PREREQUISITES: [PHYSIOLOGY: OK] [BIOMECHANICS: OK] [PROPRIOCEPTION: OK]
                        </p>
                    </div>
                )}

                {/* UNLOCKED CONTENT (THE REVEAL) */}
                {unlocked && (
                    <div className="max-w-4xl w-full border-2 border-red-600 p-8 shadow-[0_0_50px_rgba(255,0,0,0.3)] bg-black/80 backdrop-blur-md">
                        {/* HEADER */}
                        <div className="flex justify-between items-start border-b border-red-900 pb-4 mb-8">
                            <div>
                                <h1 className="text-5xl font-black text-white">MBHB</h1>
                                <p className="text-red-500 tracking-[0.5em] text-sm mt-1">MASTER BIOLOGICAL HUMAN BODY</p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl text-yellow-500">APEX NODE</div>
                                <div className="text-xs text-red-400">CLASS: LEGENDARY</div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="grid grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-white text-xl mb-4 border-l-4 border-yellow-500 pl-4">DIRECTIVE 01: Toposynthesis</h3>
                                <p className="text-red-300 leading-relaxed mb-6">
                                    Has estudiado la máquina por partes. Anatomía te dio el mapa, Fisiología el combustible.
                                    En este nodo, reconstruimos el cuerpo no como un objeto médico, sino como una
                                    <span className="text-white font-bold"> Herramienta de Poder</span>.
                                </p>
                                <div className="p-4 bg-red-900/10 border border-red-800 rounded text-sm text-red-400">
                  > SYSTEM: Integrating Somatic Data...<br />
                  > SYSTEM: Optimizing Kinetic Chains...<br />
                  > SYSTEM: Ready.
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-white mb-2">MODULES [CLASSIFIED]</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex justify-between border-b border-red-900/50 pb-1">
                                            <span>01. Hypertrophy Algorithms</span>
                                            <span className="text-yellow-500">UNLOCKED</span>
                                        </li>
                                        <li className="flex justify-between border-b border-red-900/50 pb-1">
                                            <span>02. Neuro-Priming</span>
                                            <span className="text-yellow-500">UNLOCKED</span>
                                        </li>
                                        <li className="flex justify-between border-b border-red-900/50 pb-1">
                                            <span>03. The Flow State (Bio-Hack)</span>
                                            <span className="text-yellow-500">UNLOCKED</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-4">
                                    <Link href="/" className="inline-block px-8 py-3 bg-red-600 text-black font-bold hover:bg-white transition-colors">
                                        RETURN TO GRAPH
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
