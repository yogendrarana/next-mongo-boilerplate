import "@/styles/globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/provider/theme-provider";

export const metadata: Metadata = {
    title: "Ecommerce Boilerplate | Next JS and Mongo DB",
    description: "Next JS and Mongo DB Boilerplate"
};

// fonts
import localFont from "next/font/local";
import { Shell } from "@/components/utils/shell";

const interVariable = localFont({
    variable: "--font-sans",
    src: "../../assets/fonts/InterVariable.woff2",
    weight: "100 900",
    display: "swap",
    preload: true
});

const geistMonoVariable = localFont({
    variable: "--font-geist-mono",
    src: "../../assets/fonts/GeistMonoVF.woff2",
    weight: "100 900",
    display: "swap",
    preload: true
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    `font-sans ${interVariable.variable} ${geistMonoVariable.variable} antialiased`,
                    "bg-white dark:bg-neutral-900",
                    "selection:bg-neutral-200 dark:selection:bg-neutral-700"
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div>{children}</div>
                    <Toaster richColors />
                </ThemeProvider>
            </body>
            <Toaster />
        </html>
    );
}
