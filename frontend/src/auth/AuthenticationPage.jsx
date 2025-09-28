import React from "react";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import logo from "../assets/logo2.png"; // Make sure this path is correct

export function AuthenticationPage() {
    // Custom theme for Clerk components to match the app's Tailwind design system
    const clerkTheme = {
        variables: {
            colorPrimary: '#4f46e5',    // Tailwind indigo-600
            colorText: '#1e293b',      // Tailwind slate-800
            borderRadius: '0.75rem',   // 12px
        },
        elements: {
            card: {
                // Use a subtle border instead of the default shadow for a cleaner look
                boxShadow: 'none',
                border: '1px solid #e2e8f0' // Tailwind slate-200
            },
            formButtonPrimary: {
                // Ensure the hover state matches our theme's darker primary color
                '&:hover': {
                    backgroundColor: '#4338ca' // Tailwind indigo-700
                }
            }
        }
    };

    return (
        // Main container with a modern split-screen layout
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

            {/* Left Panel: Branding and Welcome Message. Hidden on small screens. */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-slate-900 p-12 text-center">
                <img src={logo} alt="Code Challenge Generator Logo" className="h-32 w-auto" />
                <h1 className="mt-8 text-3xl font-bold tracking-tight text-white">
                    Sharpen Your Coding Skills
                </h1>
                <p className="mt-4 text-lg text-slate-300">
                    Generate unique challenges, track your progress, and prepare for your next technical interview.
                </p>
            </div>

            {/* Right Panel: Clerk Authentication Form */}
            <div className="flex items-center justify-center bg-slate-50 p-6 sm:p-12">
                <SignedOut>
                    {/* The container ensures the form doesn't get too wide on large screens */}
                    <div className="w-full max-w-md">
                        <SignIn
                            routing="path"
                            path="/sign-in"
                            appearance={clerkTheme}
                        />
                        <SignUp
                            routing="path"
                            path="/sign-up"
                            appearance={clerkTheme}
                        />
                    </div>
                </SignedOut>
                <SignedIn>
                    {/* For a seamless user experience, redirect if already logged in */}
                    <Navigate to="/" replace />
                </SignedIn>
            </div>
        </div>
    );
}

