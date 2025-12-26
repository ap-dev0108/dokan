import Link from "next/link";

export default function ProfileNotFound(props: any) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <p className="font-manrope font-bold text-9xl text-dokan-dark mb-4">404</p>
                <h1 className="font-manrope font-bold text-4xl text-dokan-dark mb-4">Profile Not Found</h1>
                <p className="font-quicksand text-lg text-gray-600 mb-8 max-w-md">
                    Please login to see your profile.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-dokan-dark text-dokan-light rounded-full font-quicksand font-medium hover:bg-gray-800 transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/login"
                        className="px-6 py-3 border-2 border-dokan-dark text-dokan-dark rounded-full font-quicksand font-medium hover:bg-dokan-dark hover:text-dokan-light transition-all"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}