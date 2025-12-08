import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-dokan-border bg-dokan-light mt-16">
            <div className="dokan-container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-manrope font-bold text-2xl text-dokan-dark mb-4">
                            Dokan
                        </h3>

                        <p className="font-quicksand text-dokan-dark text-sm">Premium ecommerce experience for discerning customers.</p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-manrope font-bold text-dokan-dark mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/shop" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/sale" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                    Sale
                                </Link>
                            </li>
                            <li>
                                <Link href="/featured" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                    Featured
                                </Link>
                            </li>
                            <li>
                                <Link href="/collections" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                    Collections
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="font-manrope font-bold text-dokan-dark mb-4">Info</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow */}
                    <div>
                        <h4 className="font-manrope font-bold text-dokan-dark mb-4">Follow</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="font-quicksand text-dokan-dark hover:text-gray-600 text-sm">
                                LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-dokan-border pt-8">
                    <p className="font-quicksand text-dokan-dark text-sm text-center">© 2025 Dokan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}