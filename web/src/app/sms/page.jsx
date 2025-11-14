import React, { useState, useEffect } from "react";
import {
  Shield,
  MessageSquare,
  Menu,
  X,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";

export default function SMSAnalyzerPage() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    smsText: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("goPhishingUser");
    if (!userData) {
      window.location.href = "/login";
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const analyzeSMS = () => {
    const text = formData.smsText.toLowerCase();
    let score = 0;
    const flags = [];

    // Check for suspicious keywords
    const suspiciousWords = [
      "urgent",
      "verify",
      "suspend",
      "click here",
      "act now",
      "limited time",
      "congratulations",
      "winner",
      "free",
      "prize",
      "claim now",
    ];
    suspiciousWords.forEach((word) => {
      if (text.includes(word)) {
        score += 20;
        flags.push(`Contains suspicious keyword: "${word}"`);
      }
    });

    // Check for financial/personal info requests
    if (
      text.includes("bank") ||
      text.includes("account") ||
      text.includes("ssn") ||
      text.includes("social security")
    ) {
      score += 25;
      flags.push("Requests sensitive financial or personal information");
    }

    // Check for shortened URLs
    if (
      text.includes("bit.ly") ||
      text.includes("tinyurl") ||
      text.includes("t.co") ||
      text.includes("goo.gl")
    ) {
      score += 30;
      flags.push("Contains shortened URLs that may hide destination");
    }

    // Check for urgency tactics
    if (
      text.includes("24 hours") ||
      text.includes("expires today") ||
      text.includes("immediate") ||
      text.includes("expires soon")
    ) {
      score += 25;
      flags.push("Uses urgency tactics to pressure quick action");
    }

    // Check for common SMS phishing patterns
    if (
      text.includes("text back") ||
      text.includes("reply stop") ||
      text.includes("call now")
    ) {
      score += 15;
      flags.push("Contains common phishing response requests");
    }

    // Check for suspicious sender patterns
    if (text.includes("delivery") && text.includes("failed")) {
      score += 20;
      flags.push("Claims failed delivery - common phishing tactic");
    }

    return {
      riskScore: Math.min(score, 100),
      flags:
        flags.length > 0 ? flags : ["No obvious phishing indicators detected"],
    };
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResult(null);

    // Simulate analysis delay
    setTimeout(() => {
      const analysisResult = analyzeSMS();
      setResult(analysisResult);
      setIsAnalyzing(false);

      // Save to history
      const scanData = {
        type: "sms",
        content: formData.smsText,
        riskScore: analysisResult.riskScore,
        flags: analysisResult.flags,
        timestamp: new Date().toISOString(),
      };

      const history = JSON.parse(
        localStorage.getItem("goPhishingScanHistory") || "[]",
      );
      history.unshift(scanData);
      localStorage.setItem(
        "goPhishingScanHistory",
        JSON.stringify(history.slice(0, 50)),
      );
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("goPhishingUser");
    localStorage.removeItem("goPhishingPlan");
    window.location.href = "/";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
              <a
                href="/dashboard"
                className="text-gray-700 hover:text-[#1a73e8] font-medium transition-colors"
              >
                Dashboard
              </a>
              <div className="relative group">
                <button className="text-[#1a73e8] font-medium">Scanners</button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a
                    href="/email"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#1a73e8]"
                  >
                    Email Analyzer
                  </a>
                  <a
                    href="/sms"
                    className="block px-4 py-2 text-[#1a73e8] bg-blue-50"
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="/dashboard"
              className="text-gray-600 hover:text-[#1a73e8] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </a>
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-[#1a73e8]" />
              <h1 className="font-playfair text-3xl font-semibold text-[#0f172a]">
                SMS Analyzer
              </h1>
            </div>
          </div>
          <p className="text-gray-600">
            Analyze suspicious text messages for phishing attempts and security
            threats
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-xl text-[#0f172a] mb-6">
              SMS Message
            </h2>

            <form onSubmit={handleAnalyze} className="space-y-6">
              <div>
                <label
                  htmlFor="smsText"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  SMS Message Content
                </label>
                <textarea
                  id="smsText"
                  name="smsText"
                  value={formData.smsText}
                  onChange={handleInputChange}
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent outline-none resize-none"
                  placeholder="Paste the full SMS message here..."
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Copy and paste the entire text message you received, including
                  any links or special characters.
                </p>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  isAnalyzing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1a73e8] hover:bg-blue-700 text-white"
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Analyzing SMS...</span>
                  </div>
                ) : (
                  "Analyze SMS"
                )}
              </button>
            </form>

            {/* Tips */}
            <div className="mt-8 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Common SMS Phishing Signs
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Urgent language ("Act now!", "Limited time")</li>
                <li>• Requests for personal information</li>
                <li>• Shortened or suspicious links</li>
                <li>• Claims of failed deliveries or account issues</li>
                <li>• Offers that seem too good to be true</li>
              </ul>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-xl text-[#0f172a] mb-6">
              Analysis Results
            </h2>

            {!result && !isAnalyzing && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Paste your SMS message and click "Analyze SMS" to see results
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <Loader className="w-16 h-16 text-[#1a73e8] mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">
                  Analyzing SMS for phishing indicators...
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Risk Score */}
                <div className="text-center">
                  <div className="inline-flex items-center space-x-3 mb-4">
                    {result.riskScore >= 70 ? (
                      <XCircle className="w-12 h-12 text-red-600" />
                    ) : result.riskScore >= 40 ? (
                      <AlertTriangle className="w-12 h-12 text-yellow-600" />
                    ) : (
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    )}
                    <div>
                      <div
                        className={`text-4xl font-bold ${
                          result.riskScore >= 70
                            ? "text-red-600"
                            : result.riskScore >= 40
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {result.riskScore}%
                      </div>
                      <div className="text-sm text-gray-600">Risk Score</div>
                    </div>
                  </div>

                  <div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      result.riskScore >= 70
                        ? "bg-red-100 text-red-800"
                        : result.riskScore >= 40
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {result.riskScore >= 70
                      ? "High Risk - Likely Phishing"
                      : result.riskScore >= 40
                        ? "Medium Risk - Be Cautious"
                        : "Low Risk - Appears Safe"}
                  </div>
                </div>

                {/* Red Flags */}
                <div>
                  <h3 className="font-semibold text-lg text-[#0f172a] mb-4">
                    {result.riskScore > 0
                      ? "Detected Issues"
                      : "Analysis Summary"}
                  </h3>
                  <ul className="space-y-3">
                    {result.flags.map((flag, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        {result.riskScore > 0 ? (
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-gray-700">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Recommendations
                  </h4>
                  {result.riskScore >= 70 ? (
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Do not click any links in the message</li>
                      <li>• Do not reply or provide any information</li>
                      <li>• Block the sender number</li>
                      <li>• Report as spam to your carrier</li>
                      <li>• Delete the message immediately</li>
                    </ul>
                  ) : result.riskScore >= 40 ? (
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Verify sender through official channels</li>
                      <li>• Be cautious with any links or requests</li>
                      <li>• Don't provide personal information via SMS</li>
                      <li>• Contact the organization directly if needed</li>
                    </ul>
                  ) : (
                    <p className="text-blue-800 text-sm">
                      This SMS appears safe, but always be cautious with
                      unsolicited messages and verify sender identity when in
                      doubt.
                    </p>
                  )}
                </div>
              </div>
            )}
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
