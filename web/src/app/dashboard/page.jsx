import React, { useState, useEffect } from "react";
import {
  Shield,
  Mail,
  MessageSquare,
  Phone,
  Menu,
  X,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("goPhishingUser");
    if (!userData) {
      window.location.href = "/login";
      return;
    }

    setUser(JSON.parse(userData));

    // Load scan history
    const history = localStorage.getItem("goPhishingScanHistory");
    if (history) {
      setScanHistory(JSON.parse(history));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("goPhishingUser");
    localStorage.removeItem("goPhishingPlan");
    window.location.href = "/";
  };

  const getRiskScoreColor = (score) => {
    if (score >= 70) return "text-red-600";
    if (score >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getRiskScoreBg = (score) => {
    if (score >= 70) return "bg-red-100 border-red-200";
    if (score >= 40) return "bg-yellow-100 border-yellow-200";
    return "bg-green-100 border-green-200";
  };

  const getRiskIcon = (score) => {
    if (score >= 70) return <XCircle className="w-5 h-5 text-red-600" />;
    if (score >= 40)
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <CheckCircle className="w-5 h-5 text-green-600" />;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "email":
        return <Mail className="w-5 h-5" />;
      case "sms":
        return <MessageSquare className="w-5 h-5" />;
      case "call":
        return <Phone className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
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
              <a href="/dashboard" className="text-[#1a73e8] font-medium">
                Dashboard
              </a>
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
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Logout
              </button>
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
              <a
                href="/dashboard"
                className="block py-2 text-[#1a73e8] font-medium"
              >
                Dashboard
              </a>
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
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-gray-700 hover:text-[#1a73e8] font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-semibold text-[#0f172a] mb-2">
            Welcome back, {user.name || user.email.split("@")[0]}
          </h1>
          <p className="text-gray-600">
            Protect yourself from phishing threats with our AI-powered scanners
          </p>
        </div>

        {/* Scanner Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href="/email"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#1a73e8] hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-[#1a73e8] group-hover:text-white transition-colors">
                <Mail className="w-8 h-8 text-[#1a73e8] group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#0f172a]">
                  Email Scan
                </h3>
                <p className="text-gray-600 text-sm">
                  Analyze suspicious emails
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              Check email content, sender authenticity, and detect malicious
              links
            </p>
          </a>

          <a
            href="/sms"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#1a73e8] hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-[#1a73e8] group-hover:text-white transition-colors">
                <MessageSquare className="w-8 h-8 text-[#1a73e8] group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#0f172a]">
                  SMS Scan
                </h3>
                <p className="text-gray-600 text-sm">Analyze text messages</p>
              </div>
            </div>
            <p className="text-gray-600">
              Detect phishing attempts in SMS messages and suspicious links
            </p>
          </a>

          <a
            href="/call"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#1a73e8] hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-[#1a73e8] group-hover:text-white transition-colors">
                <Phone className="w-8 h-8 text-[#1a73e8] group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#0f172a]">
                  Call Scan
                </h3>
                <p className="text-gray-600 text-sm">Analyze phone calls</p>
              </div>
            </div>
            <p className="text-gray-600">
              Identify social engineering tactics and phone scam patterns
            </p>
          </a>
        </div>

        {/* Recent Scans */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-xl text-[#0f172a] mb-6">
            Recent Scans
          </h2>

          {scanHistory.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No scans yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start protecting yourself by running your first scan
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/email"
                  className="bg-[#1a73e8] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Scan Email
                </a>
                <a
                  href="/sms"
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Scan SMS
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {scanHistory.slice(0, 10).map((scan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(scan.type)}
                      <span className="font-medium capitalize text-[#0f172a]">
                        {scan.type}
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-gray-600 text-sm truncate max-w-md">
                        {scan.content
                          ? scan.content.substring(0, 100) + "..."
                          : "Scan completed"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(scan.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getRiskScoreBg(scan.riskScore)}`}
                    >
                      {getRiskIcon(scan.riskScore)}
                      <span
                        className={`text-sm font-medium ${getRiskScoreColor(scan.riskScore)}`}
                      >
                        {scan.riskScore}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {scanHistory.length > 10 && (
                <div className="text-center pt-4">
                  <button className="text-[#1a73e8] font-medium hover:underline">
                    View all scans
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

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
