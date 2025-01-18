import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "../container";

export default function SiteFooter() {
    return (
        <footer className="bg-white text-gray-600 py-8 border-t">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-1">
                        <ShoppingBag className="h-8 w-8 text-gray-800" />
                    </div>
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold text-gray-800 mb-4">Collections</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Professional
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Accessories
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Wallets
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Alternatives
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Leather
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Who we are
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Sustainability
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Privacy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold text-gray-800 mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Shipping
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Warranty
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    Secure Payments
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-800">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold text-gray-800 mb-4">
                            Sign up for our newsletter
                        </h3>
                        <form className="space-y-2">
                            <Input type="email" placeholder="Email" className="w-full" />
                            <Button
                                type="submit"
                                className="w-full bg-gray-800 text-white hover:bg-gray-700"
                            >
                                Sign up
                            </Button>
                        </form>
                        <p className="mt-2 text-sm">
                            The latest deals and savings, sent to your inbox weekly.
                        </p>
                    </div>
                </div>
            </Container>
            <div className="mt-8 pt-8 text-sm text-center border-t">
                © 2024 Commerce, Inc. All rights reserved.
            </div>
        </footer>
    );
}
