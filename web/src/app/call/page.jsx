import React, { useState, useEffect } from "react";
import {
  Shield,
  Phone,
  Menu,
  X,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";

export default function CallAnalyzerPage() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    callerNumber: "",
    callContent: "",
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

  const analyzeCall = () => {
    const content = formData.callContent.toLowerCase();
    const number = formData.callerNumber;
    let score = 0;
    const flags = [];

    // Check for suspicious phrases
    const suspiciousPhrases = [
      "irs",
      "tax refund",
      "social security",
      "suspend",
      "arrest warrant",
      "verify your identity",
      "confirm your information",
      "urgent matter",
      "technical support",
      "computer virus",
      "microsoft",
      "apple support",
      "credit card",
      "bank account",
      "wire transfer",
      "gift card",
      "congratulations",
      "you have won",
      "limited time offer",
    ];

    suspiciousPhrases.forEach((phrase) => {
      if (content.includes(phrase)) {
        score += 20;
        flags.push(`Contains suspicious phrase: "${phrase}"`);
      }
    });

    // Check for pressure tactics
    if (
      content.includes("act now") ||
      content.includes("immediate") ||
      content.includes("today only")
    ) {
      score += 25;
      flags.push("Uses high-pressure tactics to force immediate action");
    }

    // Check for requests for sensitive information
    if (
      content.includes("ssn") ||
      content.includes("social security number") ||
      content.includes("credit card") ||
      content.includes("bank account")
    ) {
      score += 30;
      flags.push("Requests sensitive financial or personal information");
    }

    // Check for impersonation
    if (
      content.includes("government") ||
      content.includes("police") ||
      content.includes("federal") ||
      content.includes("official")
    ) {
      score += 25;
      flags.push("Claims to be from government or official organization");
    }

    // Check for tech support scams
    if (
      content.includes("computer") ||
      content.includes("virus") ||
      content.includes("malware") ||
      content.includes("technical support")
    ) {
      score += 20;
      flags.push("Appears to be a tech support scam");
    }

    // Check for threats
    if (
      content.includes("arrest") ||
      content.includes("legal action") ||
      content.includes("lawsuit") ||
      content.includes("court")
    ) {
      score += 30;
      flags.push("Uses threats or intimidation tactics");
    }

    // Check caller number patterns
    if (number) {
      // Check for suspicious number patterns
      if (number.includes("000-000") || number.length < 10) {
        score += 15;
        flags.push("Suspicious or invalid phone number format");
      }

      if (number.startsWith("1-800") && content.includes("support")) {
        score += 10;
        flags.push(
          "Unsolicited call from toll-free number claiming to be support",
        );
      }
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
      const analysisResult = analyzeCall();
      setResult(analysisResult);
      setIsAnalyzing(false);

      // Save to history
      const scanData = {
        type: "call",
        content: formData.callContent,
        caller: formData.callerNumber,
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
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#1a73e8]"
                  >
                    SMS Analyzer
                  </a>
                  <a
                    href="/call"
                    className="block px-4 py-2 text-[#1a73e8] bg-blue-50"
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
              <Phone className="w-8 h-8 text-[#1a73e8]" />
              <h1 className="font-playfair text-3xl font-semibold text-[#0f172a]">
                Call Analyzer
              </h1>
            </div>
          </div>
          <p className="text-gray-600">
            Analyze suspicious phone calls for social engineering and scam
            tactics
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-xl text-[#0f172a] mb-6">
              Call Details
            </h2>

            <form onSubmit={handleAnalyze} className="space-y-6">
              <div>
                <label
                  htmlFor="callerNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Caller Phone Number
                </label>
                <input
                  type="tel"
                  id="callerNumber"
                  name="callerNumber"
                  value={formData.callerNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent outline-none"
                  placeholder="(555) 123-4567 or +1-555-123-4567"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Include area code and country code if available
                </p>
              </div>

              <div>
                <label
                  htmlFor="callContent"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  What Was Said During The Call
                </label>
                <textarea
                  id="callContent"
                  name="callContent"
                  value={formData.callContent}
                  onChange={handleInputChange}
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent outline-none resize-none"
                  placeholder="Describe what the caller said, what they were asking for, and any claims they made..."
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Include as much detail as possible about the conversation,
                  including what organization they claimed to represent.
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
                    <span>Analyzing Call...</span>
                  </div>
                ) : (
                  "Analyze Call"
                )}
              </button>
            </form>

            {/* Tips */}
            <div className="mt-8 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Common Phone Scam Red Flags
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Unsolicited calls asking for personal info</li>
                <li>• High-pressure tactics or threats</li>
                <li>• Claims to be from government agencies</li>
                <li>• Requests for immediate payment</li>
                <li>• Tech support scams about computer problems</li>
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
                <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Describe your call and click "Analyze Call" to see results
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <Loader className="w-16 h-16 text-[#1a73e8] mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">
                  Analyzing call for suspicious patterns...
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
                      ? "High Risk - Likely Scam"
                      : result.riskScore >= 40
                        ? "Medium Risk - Be Cautious"
                        : "Low Risk - Appears Legitimate"}
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
                      <li>• Hang up immediately if you haven't already</li>
                      <li>
                        • Do not provide any personal or financial information
                      </li>
                      <li>• Block the caller's number</li>
                      <li>• Report the scam to the FTC or local authorities</li>
                      <li>• Never call back or follow their instructions</li>
                    </ul>
                  ) : result.riskScore >= 40 ? (
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>
                        • Verify the caller's identity through official channels
                      </li>
                      <li>
                        • Never provide sensitive information over the phone
                      </li>
                      <li>
                        • Ask for callback number and verify it independently
                      </li>
                      <li>• Be suspicious of unsolicited calls</li>
                    </ul>
                  ) : (
                    <p className="text-blue-800 text-sm">
                      This call appears legitimate, but always verify the
                      identity of unsolicited callers and be cautious about
                      sharing personal information.
                    </p>
                  )}
                </div>

                {/* Additional Resources */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">
                    Need Help?
                  </h4>
                  <p className="text-yellow-800 text-sm mb-2">
                    If you believe you've been targeted by a phone scam:
                  </p>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Report to FTC: reportfraud.ftc.gov</li>
                    <li>• Report to FBI: ic3.gov</li>
                    <li>• Contact your phone carrier to block the number</li>
                  </ul>
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
