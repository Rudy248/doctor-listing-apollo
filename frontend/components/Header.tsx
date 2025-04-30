"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/add-doctor") {
      router.push("/");
    } else {
      router.push("/add-doctor");
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-red-600 font-bold text-xl">Apollo 247</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="#"
                className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium"
              >
                Doctors
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium"
              >
                Pharmacy
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium"
              >
                Lab Tests
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-red-600">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-red-600">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-red-600">
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={handleClick}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
            >
              <span>
                {pathname === "/add-doctor" ? "Go to Home" : "Add Doctor"}
              </span>
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
            >
              Doctors
            </Link>
            <Link
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
            >
              Pharmacy
            </Link>
            <Link
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
            >
              Lab Tests
            </Link>

            <div className="flex items-center space-x-4 px-3 py-2">
              <button className="text-gray-700 hover:text-red-600">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-red-600">
                <ShoppingCart className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-red-600">
                <User className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={handleClick}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
            >
              <span>
                {pathname === "/add-doctor" ? "Go to Home" : "Add Doctor"}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
