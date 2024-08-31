import Link from "next/link"

import { Shell } from "@/components/utils/shell"
import { siteConfig } from "@/config/site"
import { ComponentBooleanIcon } from "@radix-ui/react-icons"

export function SiteFooter() {
    return (
        <footer className="w-full py-6 border-t bg-background">
            <Shell>
                <section className="flex gap-10 lg:flex-row lg:gap-20">
                    <section>
                        <Link href="/" className="flex w-fit items-center space-x-2">
                            <ComponentBooleanIcon className="size-6" aria-hidden="true" />
                            <span className="font-bold">{siteConfig.name}</span>
                            <span className="sr-only">Home</span>
                        </Link>
                    </section>
                    <section className="grid flex-1 grid-cols-1 gap-10 xxs:grid-cols-2 sm:grid-cols-4">

                    </section>
                    <section className="space-y-3">
                        <div className="flex gap-4">
                            <div>Contact: </div>
                            <strong>{siteConfig.mobile.slice(4)}</strong>
                        </div>
                    </section>
                </section>
            </Shell>
        </footer>
    )
}
