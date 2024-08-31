import Link from 'next/link'
import { Shell } from '../utils/shell'
import { siteConfig } from '@/config/site'

export default function SiteFooter() {
    return (
        <footer className="w-full py-6">
            <Shell className='flex flex-col'>
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mr:auto mb-8 md:mb-0">
                        <div className="flex items-center">
                            <span className="text-xl font-semibold">{siteConfig.name}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Copyright © 2024 Fashion House</p>
                        <p className="text-sm text-gray-500">All rights reserved</p>
                    </div>
                    <div className="grid grid-cols-3 gap-16">
                        <div>
                            <ul className="space-y-4">
                                <li><Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</Link></li>
                                <li><Link href="/refund-policy" className="text-sm text-gray-500 hover:text-gray-900">Refund Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-4">
                                <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">Pricing</Link></li>
                                <li><Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">Blog</Link></li>
                                <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-4">
                                <li><Link href="https://twitter.com" className="text-sm text-gray-500 hover:text-gray-900">Twitter</Link></li>
                                <li><Link href="https://linkedin.com" className="text-sm text-gray-500 hover:text-gray-900">LinkedIn</Link></li>
                                <li><Link href="https://github.com" className="text-sm text-gray-500 hover:text-gray-900">GitHub</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center text-5xl  md:text-9xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">
                    FASHION HOUSE
                </div>
            </Shell>
        </footer>
    )
}