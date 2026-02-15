import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Universitas | The Atomic Academy",
    description: "Procedural Knowledge Generator powered by the Atomic Tetrahedron.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-void">{children}</body>
        </html>
    );
}
