import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Outlet, Link, Navigate } from "react-router-dom";

// 1. Import the logo from your assets folder
import logo from "../assets/logo2.png";

// Simple SVG components for social media icons
const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-500 hover:text-indigo-600 transition-colors">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-500 hover:text-indigo-600 transition-colors">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919 4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
    </svg>
);

const MailIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-500 hover:text-indigo-600 transition-colors">
        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
    </svg>
);


export function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-100">
            {/* ✅ FIX: Add a global style tag to ensure long code lines wrap correctly */}
            <style>{`
                pre, code {
                    white-space: pre-wrap !important;
                    word-break: break-word !important;
                }
            `}</style>

            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-x-2">
                            <img
                                src={logo}
                                alt="Code Challenge Generator Logo"
                                className="h-14 w-auto"
                            />
                            <span className="text-xl font-bold text-slate-800">
                                Code Challenges
                            </span>
                        </Link>

                        <nav className="flex items-center gap-x-6">
                            <SignedIn>
                                <Link
                                    to="/"
                                    className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                                >
                                    Generate Challenge
                                </Link>
                                <Link
                                    to="/history"
                                    className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                                >
                                    History
                                </Link>
                                <UserButton afterSignOutUrl="/sign-in" />
                            </SignedIn>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SignedOut>
                    <Navigate to="/sign-in" replace />
                </SignedOut>
                <SignedIn>
                    <Outlet />
                </SignedIn>
            </main>

            <footer className="bg-white border-t border-slate-200 mt-auto">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-col sm:grid sm:grid-cols-3 items-center gap-4">
                        {/* Left Side: Logo and Name */}
                        <div className="flex justify-center sm:justify-start">
                             <Link to="/" className="flex items-center gap-x-2">
                                <img
                                    src={logo}
                                    alt="Code Challenge Generator Logo"
                                    className="h-10 w-auto"
                                />
                                <span className="text-base font-semibold text-slate-700">
                                    Code Challenges
                                </span>
                            </Link>
                        </div>

                        {/* Center: Made with love */}
                        <p className="text-sm text-slate-500 text-center order-last sm:order-none">
                            Made with 🩶 by YRK
                        </p>

                        {/* Right Side: Social Handles */}
                        <div className="flex items-center justify-center sm:justify-end gap-x-4">
                            <a href="https://www.linkedin.com/in/yashraj-kabre-a84906250" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <LinkedInIcon />
                            </a>
                             <a href="https://www.instagram.com/yashraj_kabre/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <InstagramIcon />
                            </a>
                             <a href="mailto:kabreyashraj221521@gmail.com" aria-label="Email">
                                <MailIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}





