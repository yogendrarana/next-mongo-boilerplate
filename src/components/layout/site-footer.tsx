import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell"
import { siteConfig } from "@/config/site"
import { ModeToggle } from "@/components/toggle-mode"
import { buttonVariants } from "@/components/ui/button"
import { JoinNewsletterForm } from "@/components/join-newsletter-form"

export function SiteFooter() {
    return (
        <footer className="w-full border-t bg-background">
            <Shell>
                <section className="flex flex-col gap-10 lg:flex-row lg:gap-20">
                    <section>
                        <Link href="/" className="flex w-fit items-center space-x-2">
                            <Icons.logo className="size-6" aria-hidden="true" />
                            <span className="font-bold">{siteConfig.name}</span>
                            <span className="sr-only">Home</span>
                        </Link>
                    </section>
                    <section className="grid flex-1 grid-cols-1 gap-10 xxs:grid-cols-2 sm:grid-cols-4">
                        {siteConfig.footerNav.map((item) => (
                            <div key={item.title} className="space-y-3">
                                <h4 className="text-base font-medium">{item.title}</h4>
                                <ul className="space-y-2.5">
                                    {item.items.map((link) => (
                                        <li key={link.title}>
                                            <Link
                                                href={link.href}
                                                target={link?.external ? "_blank" : undefined}
                                                rel={link?.external ? "noreferrer" : undefined}
                                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {link.title}
                                                <span className="sr-only">{link.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                    <section className="space-y-3">
                        <h4 className="text-base font-medium">
                            Subscribe to our newsletter
                        </h4>
                        <JoinNewsletterForm />
                    </section>
                </section>
            </Shell>
        </footer>
    )
}
