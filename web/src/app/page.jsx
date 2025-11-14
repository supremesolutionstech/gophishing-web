import React, { useState, useEffect } from "react";
import {
  Shield,
  ArrowRight,
  Mail,
  MessageSquare,
  Phone,
  Star,
  Check,
  Menu,
  X,
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("goPhishingUser");
    setIsLoggedIn(!!user);
  }, []);

  const handleStartScan = () => {
    if (isLoggedIn) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleLogout = () => {
    localStorage.removeItem("goPhishingUser");
    localStorage.removeItem("goPhishingPlan");
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-[#1a73e8]" />
              <span className="font-playfair font-semibold text-xl text-[#0f172a]">
                GoPhishing
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-[#1a73e8] font-medium transition-colors"
              >
                Home
              </a>
              {isLoggedIn && (
                <a
                  href="/dashboard"
                  className="text-gray-700 hover:text-[#1a73e8] font-medium transition-colors"
                >
                  Dashboard
                </a>
              )}
              <div className="relative group">
                <button className="text-gray-700 hover:text-[#1a73e8] font-medium transition-colors">
                  Scanners
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a
                    href="/email"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#1a73e8]"
                  >
                    Email Analyzer
                  </a>
                  <a
                    href="/sms"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#1a73e8]"
                  >
                    SMS Analyzer
                  </a>
                  <a
                    href="/call"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#1a73e8]"
                  >
                    Call Analyzer
                  </a>
                </div>
              </div>
              <a
                href="/pricing"
                className="text-gray-700 hover:text-[#1a73e8] font-medium transition-colors"
              >
                Pricing
              </a>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-[#1a73e8] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-[#1a73e8] transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              <a
                href="/"
                className="block py-2 text-gray-700 hover:text-[#1a73e8] font-medium"
              >
                Home
              </a>
              {isLoggedIn && (
                <a
                  href="/dashboard"
                  className="block py-2 text-gray-700 hover:text-[#1a73e8] font-medium"
                >
                  Dashboard
                </a>
              )}
              <div className="py-2">
                <span className="text-gray-700 font-medium">Scanners</span>
                <div className="ml-4 mt-2 space-y-2">
                  <a
                    href="/email"
                    className="block py-1 text-gray-600 hover:text-[#1a73e8]"
                  >
                    Email Analyzer
                  </a>
                  <a
                    href="/sms"
                    className="block py-1 text-gray-600 hover:text-[#1a73e8]"
                  >
                    SMS Analyzer
                  </a>
                  <a
                    href="/call"
                    className="block py-1 text-gray-600 hover:text-[#1a73e8]"
                  >
                    Call Analyzer
                  </a>
                </div>
              </div>
              <a
                href="/pricing"
                className="block py-2 text-gray-700 hover:text-[#1a73e8] font-medium"
              >
                Pricing
              </a>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-gray-700 hover:text-[#1a73e8] font-medium"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full text-left py-2 text-gray-700 hover:text-[#1a73e8] font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1a73e8] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              GoPhishing
            </h1>
            <p className="text-xl md:text-2xl mb-2 opacity-90">
              AI-Powered Phishing Protection
            </p>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              Protect yourself from phishing attacks across email, SMS, and
              phone calls with our advanced AI detection system.
            </p>
            <button
              onClick={handleStartScan}
              className="bg-white text-[#1a73e8] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Scan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-[#0f172a] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered system analyzes potential phishing threats in three
              simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-[#1a73e8] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-xl text-[#0f172a] mb-4">
                Submit Content
              </h3>
              <p className="text-gray-600">
                Paste your suspicious email, SMS message, or describe the phone
                call you received
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#1a73e8] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-xl text-[#0f172a] mb-4">
                AI Analysis
              </h3>
              <p className="text-gray-600">
                Our advanced AI algorithms analyze patterns, keywords, and known
                phishing indicators
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#1a73e8] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-xl text-[#0f172a] mb-4">
                Get Results
              </h3>
              <p className="text-gray-600">
                Receive a detailed risk score and specific red flags to help you
                stay protected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-[#0f172a] mb-4">
              Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive protection across all communication channels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <Mail className="w-12 h-12 text-[#1a73e8] mb-6" />
              <h3 className="font-semibold text-xl text-[#0f172a] mb-4">
                Email Protection
              </h3>
              <p className="text-gray-600">
                Advanced email analysis detecting suspicious links, sender
                authenticity, and content patterns
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <MessageSquare className="w-12 h-12 text-[#1a73e8] mb-6" />
              <h3 className="font-semibold text-xl text-[#0f172a] mb-4">
                SMS Security
              </h3>
              <p className="text-gray-600">
                Real-time SMS threat detection identifying common phishing
                tactics and malicious links
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <Phone className="w-12 h-12 text-[#1a73e8] mb-6" />
              <h3 className="font-semibold text-xl text-[#0f172a] mb-4">
                Call Analysis
              </h3>
              <p className="text-gray-600">
                Phone call content analysis to identify social engineering
                tactics and scam patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-[#0f172a] mb-4">
              Choose Your Protection Level
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the plan that best fits your security needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-xl text-[#0f172a] mb-2">
                Free Plan
              </h3>
              <div className="text-3xl font-bold text-[#1a73e8] mb-6">
                $0
                <span className="text-base font-normal text-gray-600">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">10 scans/month</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Email/SMS scans only</span>
                </li>
                <li className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-gray-400">Ads included</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-xl border-2 border-[#1a73e8] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#1a73e8] text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="font-semibold text-xl text-[#0f172a] mb-2">
                Pro Plan
              </h3>
              <div className="text-3xl font-bold text-[#1a73e8] mb-6">
                $7.99
                <span className="text-base font-normal text-gray-600">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Unlimited scans</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Email + SMS + Call detection
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Priority AI processing</span>
                </li>
              </ul>
              <button className="w-full bg-[#1a73e8] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Upgrade to Pro
              </button>
            </div>

            {/* Business Plan */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-xl text-[#0f172a] mb-2">
                Business Plan
              </h3>
              <div className="text-3xl font-bold text-[#1a73e8] mb-6">
                $29.99
                <span className="text-base font-normal text-gray-600">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Unlimited scans</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Team dashboard</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Reporting features</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/pricing"
              className="inline-flex items-center space-x-2 text-[#1a73e8] font-semibold hover:underline"
            >
              <span>View detailed pricing</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-[#1a73e8]" />
                <span className="font-playfair font-semibold text-xl">
                  GoPhishing
                </span>
              </div>
              <p className="text-gray-400">
                AI-powered phishing protection for a safer digital world.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/email"
                    className="hover:text-white transition-colors"
                  >
                    Email Analyzer
                  </a>
                </li>
                <li>
                  <a href="/sms" className="hover:text-white transition-colors">
                    SMS Analyzer
                  </a>
                </li>
                <li>
                  <a
                    href="/call"
                    className="hover:text-white transition-colors"
                  >
                    Call Analyzer
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GoPhishing. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        .font-playfair {
          font-family: 'Playfair Display', Georgia, serif;
        }
      `}</style>
    </div>
  );
}
