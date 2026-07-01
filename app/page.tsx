"use client";

import React, { useState } from "react";

// Define the presets and their custom impact descriptions
const IMPACT_TEMPLATES: Record<number, string> = {
  25: "provides fundamental study materials for a student's classroom",
  50: "trains a Honduran teacher for a month",
  100: "covers an entire term of textbook fees for three elementary students",
  250: "finances a modern desk set and ergonomic seating arrangement",
  500: "sponsors school maintenance and construction materials",
};

export default function App() {
  // 1. STATE MANAGEMENT
  const [frequency, setFrequency] = useState<"MONTHLY" | "ONE-TIME">("MONTHLY");
  const [selectedAmount, setSelectedAmount] = useState<number | "OTHER">(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const schoolsBuilt = 67;
  const targetSchools = 1000;

  // 2. DYNAMIC DERIVED VARIABLES
  const activeAmount =
    selectedAmount === "OTHER" ? parseFloat(customAmount) || 0 : selectedAmount;

  // Generate impact sentence dynamically
  const getImpactDescription = () => {
    if (activeAmount <= 0) {
      return "Select or enter an amount to see your direct impact.";
    }
    // Match exact preset description
    if (
      typeof selectedAmount === "number" &&
      IMPACT_TEMPLATES[selectedAmount]
    ) {
      return IMPACT_TEMPLATES[selectedAmount];
    }
    // Dynamic description for other/custom inputs
    return "directly supports critical educational infrastructure and local Honduran communities";
  };

  // Determine GoFundMe custom tracking parameters (Example values, replace with your actual values)
  // For GoFundMe Pro widgets, clicking can trigger the SDK via specific data attributes
  const campaignId = process.env.NEXT_PUBLIC_CAMPAIGN_ID || ""; // This represents your "Copy campaign parameter" value

  const handleDonateClick = () => {

    if (typeof window !== "undefined") {
      // 1. Parse the current URL safely
      const currentUrl = new URL(window.location.href);

      // 2. Dynamically set all three parameters
      currentUrl.searchParams.set("campaign", campaignId);
      currentUrl.searchParams.set("frequency", frequency.toLowerCase()); // Converts "MONTHLY" to "monthly"
      currentUrl.searchParams.set("amount", activeAmount.toString()); // Converts number to string

      // 3. Redirect the browser to the newly constructed URL
      window.location.href = currentUrl.toString();
    }
  };

  return (
    <main className="min-h-screen bg-[#111827] flex items-center justify-center p-4 antialiased">
      {/* Changed max-w-110 to an exact arbitrary value max-w-[400px] to constrain widget size */}
      <div className="relative w-full max-w-[400px]">
        {/* Aesthetic 3D shadow effect (dark teal offset border) */}
        <div className="absolute inset-0 bg-[#0c5c75] rounded-3xl translate-x-3 translate-y-3 z-0" />

        {/* Removed md:p-8 to keep the padding tight and proportional like the screenshot */}
        <div className="relative bg-white text-gray-900 rounded-3xl p-6 shadow-2xl border-2 border-black z-10">
          {/* HEADER SECTION */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">
              Give monthly
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-[#10B981] uppercase">
                Secure
              </span>
            </div>
          </div>

          {/* FREQUENCY SELECTOR */}
          <div className="bg-[#E2E8F0] p-1.5 rounded-lg flex mb-6">
            <button
              onClick={() => setFrequency("MONTHLY")}
              className={`flex-1 py-3 text-sm font-bold rounded-sm transition-all duration-200 ${
                frequency === "MONTHLY"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setFrequency("ONE-TIME")}
              className={`flex-1 py-3 text-sm font-bold rounded-sm transition-all duration-200 ${
                frequency === "ONE-TIME"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              ONE-TIME
            </button>
          </div>

          {/* PRESET AMOUNT GRID */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[25, 50, 100, 250, 500].map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
                className={`py-4 px-2 rounded-sm text-lg font-bold border-2 transition-all duration-200 ${
                  selectedAmount === amount
                    ? "border-[#2BBF96] bg-[#e6f7f2] text-black scale-[1.02]"
                    : "border-gray-200 bg-white text-gray-800 hover:border-black"
                }`}
              >
                ${amount}
              </button>
            ))}

            <button
              onClick={() => setSelectedAmount("OTHER")}
              className={`py-4 px-2 rounded-sm text-md font-bold border-2 transition-all duration-200 ${
                selectedAmount === "OTHER"
                  ? "border-[#2BBF96] bg-[#e6f7f2] text-black scale-[1.02]"
                  : "border-gray-200 bg-white text-gray-800 hover:border-black"
              }`}
            >
              OTHER
            </button>
          </div>

          {/* OTHER AMOUNT TEXT FIELD INPUT */}
          {selectedAmount === "OTHER" && (
            <div className="relative mb-4 animate-fadeIn">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-[#10B981] outline-none text-gray-800 font-semibold text-lg bg-white"
                min="1"
              />
            </div>
          )}

          {/* DYNAMIC IMPACT DESCRIPTION */}
          <div className="min-h-12 flex items-center justify-center text-center mb-6 px-2">
            <p className="text-sm font-medium text-gray-600 leading-relaxed">
              <span className="font-extrabold text-gray-900">
                ${activeAmount}
              </span>{" "}
              {getImpactDescription()}
            </p>
          </div>

          {/* UPGRADED 3D ACTION BUTTON */}
          <button
            onClick={handleDonateClick}
            className="w-full bg-[#2BBF96] border border-[#2BBF96] text-white py-4 px-6 rounded-sm font-extrabold text-xl tracking-wide uppercase transition-all duration-200 ease-out transform
              shadow-[0_4px_0_color-mix(in_srgb,#10B981_62%,black)]
              hover:bg-[#2dc99d]/90 hover:border-[#2dc99d]/90 hover:-translate-y-1 hover:shadow-[0_7px_0_color-mix(in_srgb,#10B981_62%,black)]
              active:translate-y-0.5 active:shadow-[0_2px_0_color-mix(in_srgb,#10B981_62%,black)]"
          >
            Donate ${activeAmount} {frequency}
          </button>

          {/* PROGRESS STATS & VISUAL BAR */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            {/* Range Bar */}
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-[#0EA5E9] rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min((schoolsBuilt / targetSchools) * 100, 100)}%`,
                }}
              />
            </div>
            {/* Readouts */}
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
              <div>
                <span className="text-gray-800 text-sm font-extrabold mr-1">
                  {schoolsBuilt}
                </span>
                Schools Built
              </div>
              <div>
                Goal
                <span className="text-gray-800 text-sm font-extrabold ml-1">
                  {targetSchools.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* SUBTEXT / SIGN OFF */}
          <div className="mt-8 border-t-2 border-dashed border-gray-100 pt-5 text-center">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase leading-relaxed">
              STUDENTS HELPING HONDURAS
              <span className="mx-2 text-gray-300">•</span>
              GOFUNDME PRO EMBEDDED FORM
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
