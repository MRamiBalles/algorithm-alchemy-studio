import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                atom: {
                    white: "#FFFFFF",
                    magenta: "#FF00DD",
                    gold: "#FFD700",
                    cyan: "#00FFCC",
                    legendary: "#FF0000",
                },
                void: "#050505", // Deep space background
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
