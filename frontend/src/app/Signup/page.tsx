"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Signing up with Email: ${email}`);
    //Add sign-up logic here (e.g., API call)
    router.push("/Login"); //Redirect to Login page after sign up
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold">Sign Up for Mini-Metrics</h1>
      <div className="w-full max-w-sm">
        <label className="block mb-2 text-sm font-medium">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm mb-4"
          placeholder="Enter your email"
        />
        <label className="block mb-2 text-sm font-medium">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm mb-4"
          placeholder="Enter your password"
        />
        <label className="block mb-2 text-sm font-medium">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm mb-4"
          placeholder="Confirm your password"
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 text-white py-2 rounded-md shadow-md hover:bg-green-500"
        >
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/Login")}
              className="text-blue-600 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
