import "@/styles/globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
 import Providers from "@/components/provider/providers";

export const metadata: Metadata = {
    title: "Ecommerce Boilerplate | Next JS and Mongo DB",
    description: "Next JS and Mongo DB Boilerplate"
};

// fonts
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "w-full flex flex-col justify-center overflow-x-hidden scroll-smooth",
                    inter.className
                )}
            >
                <Providers>{children}</Providers>
                <Toaster richColors />
            </body>
        </html>
    );
}
