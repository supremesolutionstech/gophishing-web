import React, { useState, useEffect } from "react";
import { Shield, Check, X, Menu } from "lucide-react";

export default function PricingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("free");

  useEffect(() => {
    const user = localStorage.getItem("goPhishingUser");
    setIsLoggedIn(!!user);

    const plan = localStorage.getItem("goPhishingPlan") || "free";
    setCurrentPlan(plan);
  }, []);

  const handlePlanSelect = (plan) => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }

    localStorage.setItem("goPhishingPlan", plan);
    setCurrentPlan(plan);

    // Simulate plan change success
    alert(`Successfully upgraded to ${plan} plan!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("goPhishingUser");
    localStorage.removeItem("goPhishingPlan");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-[#1a73e8]" />
              <span className="font-playfair font-semibold text-xl text-[#0f172a]">
                GoPhishing
              </span>
            </div>

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
              <a href="/pricing" className="text-[#1a73e8] font-medium">
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
                <a
                  href="/login"
                  className="bg-[#1a73e8] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </a>
              )}
            </div>

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
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-[#0f172a] mb-4">
            Choose Your Protection Level
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your security needs and protect
            yourself from phishing attacks
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 relative">
            {currentPlan === "free" && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Current Plan
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="font-semibold text-2xl text-[#0f172a] mb-2">
                Free Plan
              </h3>
              <div className="text-4xl font-bold text-[#1a73e8] mb-4">
                $0
                <span className="text-lg font-normal text-gray-600">
                  /month
                </span>
              </div>
              <p className="text-gray-600">
                Perfect for trying out our service
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">10 scans per month</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Email and SMS scanning only
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Basic threat detection</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Scan history (last 10)</span>
              </li>
              <li className="flex items-center space-x-3 opacity-50">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-500">Includes ads</span>
              </li>
            </ul>

            <button
              onClick={() => handlePlanSelect("free")}
              disabled={currentPlan === "free"}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                currentPlan === "free"
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {currentPlan === "free" ? "Current Plan" : "Select Free"}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-xl border-2 border-[#1a73e8] p-8 relative transform scale-105 shadow-lg">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-[#1a73e8] text-white px-6 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>

            {currentPlan === "pro" && (
              <div className="absolute -top-4 right-4">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Current Plan
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="font-semibold text-2xl text-[#0f172a] mb-2">
                Pro Plan
              </h3>
              <div className="text-4xl font-bold text-[#1a73e8] mb-4">
                $7.99
                <span className="text-lg font-normal text-gray-600">
                  /month
                </span>
              </div>
              <p className="text-gray-600">
                For individuals who want full protection
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Unlimited scans</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Email, SMS, and call detection
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Advanced AI analysis</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Priority processing</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Complete scan history</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">No ads</span>
              </li>
            </ul>

            <button
              onClick={() => handlePlanSelect("pro")}
              disabled={currentPlan === "pro"}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                currentPlan === "pro"
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#1a73e8] text-white hover:bg-blue-700"
              }`}
            >
              {currentPlan === "pro" ? "Current Plan" : "Upgrade to Pro"}
            </button>
          </div>

          {/* Business Plan */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 relative">
            {currentPlan === "business" && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Current Plan
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="font-semibold text-2xl text-[#0f172a] mb-2">
                Business Plan
              </h3>
              <div className="text-4xl font-bold text-[#1a73e8] mb-4">
                $29.99
                <span className="text-lg font-normal text-gray-600">
                  /month
                </span>
              </div>
              <p className="text-gray-600">For teams and organizations</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Everything in Pro</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Team dashboard</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Advanced reporting</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">API access</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Priority support</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Custom integrations</span>
              </li>
            </ul>

            <button
              onClick={() => handlePlanSelect("business")}
              disabled={currentPlan === "business"}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                currentPlan === "business"
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {currentPlan === "business" ? "Current Plan" : "Contact Sales"}
            </button>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-16">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-xl text-[#0f172a]">
              Feature Comparison
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-medium text-gray-900">
                    Feature
                  </th>
                  <th className="text-center py-4 px-6 font-medium text-gray-900">
                    Free
                  </th>
                  <th className="text-center py-4 px-6 font-medium text-gray-900 bg-blue-50">
                    Pro
                  </th>
                  <th className="text-center py-4 px-6 font-medium text-gray-900">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-700">Monthly Scans</td>
                  <td className="py-4 px-6 text-center">10</td>
                  <td className="py-4 px-6 text-center bg-blue-50">
                    Unlimited
                  </td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Email Analysis</td>
                  <td className="py-4 px-6 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-50">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">SMS Analysis</td>
                  <td className="py-4 px-6 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-50">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Call Analysis</td>
                  <td className="py-4 px-6 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-50">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">
                    Priority Processing
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-50">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Team Dashboard</td>
                  <td className="py-4 px-6 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-50">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">API Access</td>
                  <td className="py-4 px-6 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-50">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="font-semibold text-2xl text-[#0f172a] mb-8 text-center">
            Frequently Asked Questions
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                Can I change plans anytime?
              </h4>
              <p className="text-gray-600 mb-6">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately, and we'll prorate any charges.
              </p>

              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                How accurate is the phishing detection?
              </h4>
              <p className="text-gray-600 mb-6">
                Our AI-powered system has a 95%+ accuracy rate in detecting
                phishing attempts. We continuously improve our algorithms based
                on the latest threat intelligence.
              </p>

              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                Is my data secure?
              </h4>
              <p className="text-gray-600">
                Absolutely. We use enterprise-grade encryption and never store
                your personal communications. All analysis is done in real-time
                and data is immediately discarded.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600 mb-6">
                We accept all major credit cards, PayPal, and bank transfers for
                Business plans. All payments are processed securely through
                Stripe.
              </p>

              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600 mb-6">
                Yes, we offer a 30-day money-back guarantee for all paid plans.
                If you're not satisfied, contact us for a full refund.
              </p>

              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                Need help choosing a plan?
              </h4>
              <p className="text-gray-600">
                Contact our support team at support@gophishing.com or schedule a
                call with our sales team for personalized recommendations.
              </p>
            </div>
          </div>
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
