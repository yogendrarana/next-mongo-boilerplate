import Link from "next/link";
import { siteConfig } from "@/config/site";
import Facebook from "@/assets/svg/facebook";
import Instagram from "@/assets/svg/instagram";

export default function SiteFooter() {
    return (
        <footer className="w-full py-6 flex flex-col border-t">
            <div className="w-full flex flex-col  justify-between items-start md:flex-row md:items-baseline">
                <div className="mr:auto mb-8 md:mb-0">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold">{siteConfig.name}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Copyright © 2024 Fashion House</p>
                    <p className="text-sm text-gray-500">All rights reserved</p>
                </div>

                <div>
                    <ul className="flex gap-10">
                        <li className="flex gap-2 items-center">
                            <Facebook />
                            <Link href="https://facebook.com" className="text-sm">
                                Facebook
                            </Link>
                        </li>
                        <li className="flex gap-2 items-center">
                            <Instagram />
                            <Link href="https://instagram.com" className="text-sm">
                                Instagram
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
