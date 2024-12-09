"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formula, setFormula] = useState(""); // Current formula
  const formulas = ["cars_passed / time", "total_cars * 2", "avg_speed / cars"]; // Predefined formulas
  const router = useRouter(); // Initialize router

  // Handle authentication
  const handleAuth = () => {
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      alert("Authentication successful!");
      router.push("/Formulas"); //Redirect to Formulas page after sign up
    } else {
      alert("Invalid credentials!");
    }
  };

  // Handle formula changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
  };

  const handleFormulaSelect = (selectedFormula: string) => {
    setFormula(selectedFormula);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-gradient-to-br from-indigo-500 to-teal-500 text-white font-sans">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">📊 Mini-Metrics Dashboard</h1>
        <p className="text-lg">
          Empowering Light Traffic Monitoring with Real-Time Calculations. Use Mini-Metrics to analyze traffic data like the number of cars passing, calculate custom formulas, and monitor efficiently in Minikube!
        </p>
      </header>

      {/* Authentication Section */}
      {!isAuthenticated && (
        <div className="w-full max-w-md bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">🔒 User Authentication</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleAuth}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
          >
            Log In
          </button>
          <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/Signup")}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
        </div>
      )}

      {/* Main Content (visible after authentication) */}
      {isAuthenticated && (
        <div className="w-full max-w-lg bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">🛠️ Build Your Formula</h2>

          {/* Formula Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="formula-input">
              Write Your Formula:
            </label>
            <input
              id="formula-input"
              type="text"
              value={formula}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a formula (e.g., cars_passed / time)"
            />
          </div>

          {/* Predefined Formulas */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Choose a Formula:</label>
            <div className="flex gap-4 flex-wrap">
              {formulas.map((f) => (
                <button
                  key={f}
                  onClick={() => handleFormulaSelect(f)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => alert(`✅ Formula applied: ${formula}`)}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-400 hover:shadow-xl transition"
            >
              Apply Formula
            </button>
            <button
              onClick={() => setFormula("")}
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-400 hover:shadow-xl transition"
            >
              Clear Formula
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-sm mt-12 opacity-75">
        © 2024 Mini-Metrics • Built for Light Traffic Monitoring in Minikube
      </footer>
    </div>
  );
}
