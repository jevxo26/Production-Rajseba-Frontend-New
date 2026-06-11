"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    router.push("/dashbord");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Hero Section */}
        <div className="hidden md:flex flex-col justify-center space-y-8 pl-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              JOIN RAJSEBA
            </div>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
              Expert care for your{" "}
              <span className="text-teal-600">premium home.</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-md">
              Experience the pinnacle of hospitality and safety with our curated
              selection of professional home services in Bangladesh.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                🛡️
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">
                  Verified Professionals
                </h4>
                <p className="text-sm text-slate-600">
                  Every provider is strictly vetted for your safety.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                ⏱️
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">
                  Effortless Booking
                </h4>
                <p className="text-sm text-slate-600">
                  Schedule and track services in just a few taps.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1581578731548-5e8f3f2c0b3b?w=600"
              alt="Premium Home Care"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-white text-4xl font-bold">R</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                Create Account
              </h2>
              <p className="text-slate-600 mt-2">
                Welcome! Let's get your profile set up.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-500" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX XXXXXX"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 text-lg"
              >
                Create Account
                <span>→</span>
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center text-sm">
              <p className="text-slate-600">
                By signing up, you agree to our{" "}
                <Link href="#" className="text-teal-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-teal-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="mt-4 text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-red-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
