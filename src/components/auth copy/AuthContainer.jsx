"use client";
import React, { useState, useRef, useEffect } from "react";
import { Wine, Eye, EyeOff, Mail, Lock, User, Calendar, ArrowLeft, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeToTerms: false,
    ageVerification: false,
    birthDate: ""
  });
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Floating elements effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const floatingElements = [
      { icon: "🍷", size: "text-xl", delay: 0 },
      { icon: "🥃", size: "text-lg", delay: 1000 },
      { icon: "🍾", size: "text-xl", delay: 2000 },
      { icon: "🍇", size: "text-lg", delay: 3000 },
      { icon: "🍸", size: "text-xl", delay: 4000 }
    ];
    
    floatingElements.forEach(element => {
      setTimeout(() => {
        const el = document.createElement('div');
        el.innerHTML = element.icon;
        el.className = `absolute ${element.size} text-[#8b5a2b] opacity-40 pointer-events-none`;
        
        const startPosition = Math.random() * 80 + 10;
        el.style.left = `${startPosition}%`;
        el.style.top = '-30px';
        
        containerRef.current.appendChild(el);
        
        // Animate element
        const animation = el.animate(
          [
            { top: '-30px', opacity: 0 },
            { top: `${Math.random() * 40 + 30}%`, opacity: 0.4 },
            { top: '100%', opacity: 0 }
          ],
          {
            duration: Math.random() * 8000 + 12000,
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)'
          }
        );
        
        animation.onfinish = () => {
          el.remove();
        };
      }, element.delay);
    });
    
    // Continue creating floating elements
    const interval = setInterval(() => {
      const element = floatingElements[Math.floor(Math.random() * floatingElements.length)];
      const el = document.createElement('div');
      el.innerHTML = element.icon;
      el.className = `absolute ${element.size} text-[#8b5a2b] opacity-40 pointer-events-none`;
      
      const startPosition = Math.random() * 80 + 10;
      el.style.left = `${startPosition}%`;
      el.style.top = '-30px';
      
      containerRef.current.appendChild(el);
      
      // Animate element
      const animation = el.animate(
        [
          { top: '-30px', opacity: 0 },
          { top: `${Math.random() * 40 + 30}%`, opacity: 0.4 },
          { top: '100%', opacity: 0 }
        ],
        {
          duration: Math.random() * 8000 + 12000,
          easing: 'cubic-bezier(0.33, 1, 0.68, 1)'
        }
      );
      
      animation.onfinish = () => {
        el.remove();
      };
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Login data" : "Signup data", formData);
  };

  // Color scheme from the provided code
  const baseBg = "bg-[#f8f7f4]";
  const baseText = "text-[#2c2c2c]";
  const accentText = "text-[#8b5a2b]";
  const highlight = "text-[#a63f3f]";
  const buttonStyle = "bg-[#2c2c2c] text-white rounded-full px-6 py-3 transition-all hover:opacity-90 font-medium hover:shadow-lg";
  const inputStyle = "bg-white border border-gray-200 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#8b5a2b] focus:border-transparent";

  return (
    <div className={`min-h-screen ${baseBg} ${baseText} font-sans overflow-hidden relative`} ref={containerRef}>
      {/* Ultra-minimal header */}
      <header className="sticky top-0 z-50 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate('/')}
            className="flex items-center text-sm font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors group"
          >
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back
          </motion.button>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xl font-bold flex items-center"
          >
            <Wine className="text-[#a63f3f] mr-1 h-5 w-5" />
            <span className="text-[#2c2c2c]">Vino</span>
            <span className="text-[#a63f3f]">Selecto</span>
          </motion.div>
          
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex border border-gray-100"
        >
          {/* Left side - Ultra-minimal brand experience */}
          <div className="md:w-2/5 bg-gradient-to-br from-[#f8f7f4] to-[#e8e2d8] p-8 text-[#2c2c2c] flex flex-col justify-center relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-[#8b5a2b] rounded-full"></div>
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-[#8b5a2b] rounded-full"></div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-white rounded-2xl mb-6 shadow-sm">
                <Wine className="h-6 w-6 text-[#8b5a2b]" />
              </div>
              <h2 className="text-2xl font-serif font-light mb-4 text-[#2c2c2c]">Refine Your Palate</h2>
              <p className="text-sm text-[#2c2c2c]/70">Curated selections for the discerning enthusiast</p>
            </motion.div>
            
            <motion.div 
              className="space-y-3 mt-8 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                "Personalized recommendations",
                "Exclusive member events",
                "Priority access to rare finds",
                "Complimentary tasting notes"
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center text-sm text-[#2c2c2c]/80"
                >
                  <div className="w-5 h-5 rounded-full bg-[#8b5a2b]/10 flex items-center justify-center mr-2">
                    <ChevronRight size={12} className="text-[#8b5a2b]" />
                  </div>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Minimal decorative element */}
            <motion.div 
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 120,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-6 right-6 opacity-10"
            >
              <Wine size={60} />
            </motion.div>
          </div>
          
          {/* Right side - Ultra-clean form */}
          <div className="md:w-3/5 p-8">
            {/* Minimal tab selector */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex border-b border-gray-100 mb-8 relative"
            >
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 text-center font-medium transition-colors relative ${isLogin ? "text-[#8b5a2b]" : "text-gray-500 hover:text-[#8b5a2b]"}`}
              >
                Sign In
                {isLogin && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5a2b]"
                    layoutId="authIndicator"
                  />
                )}
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 text-center font-medium transition-colors relative ${!isLogin ? "text-[#8b5a2b]" : "text-gray-500 hover:text-[#8b5a2b]"}`}
              >
                Create Account
                {!isLogin && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5a2b]"
                    layoutId="authIndicator"
                  />
                )}
              </button>
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {!isLogin && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                    >
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="pl-10 pr-10 appearance-none relative block w-full px-3 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            required
                            className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="flex items-start">
                        <input
                          id="ageVerification"
                          name="ageVerification"
                          type="checkbox"
                          required
                          className="h-4 w-4 mt-1 text-[#8b5a2b] focus:ring-[#8b5a2b] border-gray-300 rounded"
                          checked={formData.ageVerification}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="ageVerification" className="ml-2 block text-sm text-gray-700">
                          I verify that I am of legal drinking age in my location
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input
                          id="agreeToTerms"
                          name="agreeToTerms"
                          type="checkbox"
                          required
                          className="h-4 w-4 mt-1 text-[#8b5a2b] focus:ring-[#8b5a2b] border-gray-300 rounded"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                          I agree to the{" "}
                          <a href="#" className="text-[#8b5a2b] hover:text-[#a63f3f] font-medium">
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-[#8b5a2b] hover:text-[#a63f3f] font-medium">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </>
                  )}

                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="rememberMe"
                          name="rememberMe"
                          type="checkbox"
                          className="h-4 w-4 text-[#8b5a2b] focus:ring-[#8b5a2b] border-gray-300 rounded"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <a href="#" className="font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors">
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                  )}

                  <div>
                    <motion.button
                      type="submit"
                      className={`w-full ${buttonStyle} relative overflow-hidden`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {isLogin ? "Sign in" : "Create Account"}
                    </motion.button>
                  </div>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <svg className="h-4 w-4 text-[#DB4437]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 15h-2v-2h-2v2H7v-2h2v-2H7v-2h2V9h2v2h2V9h2v2h2v2h-2v2h2v2z"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <svg className="h-4 w-4 text-[#4267B2]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-6h2v6zm0-8h-2V6h2v4z"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <svg className="h-4 w-4 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-sm text-gray-600"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}