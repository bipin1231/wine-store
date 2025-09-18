import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LiquorHero = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Stats data
  const stats = [
    { value: "1K+", label: "Premium Spirits", color: "#a63f3f" },
    { value: "150+", label: "Global Brands", color: "#c0a062" },
    { value: "24h", label: "Delivery", color: "#8b5a2b" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4 }
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute border border-[#ffffff08] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              animation: `pulse ${Math.random() * 15 + 10}s infinite alternate`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-8 lg:gap-20 relative z-10">
        {/* Text Content - Minimalist Luxury */}
        <motion.div 
          className="relative order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="absolute top-0 left-0 w-12 md:w-16 h-px bg-gradient-to-r from-[#c0a062] to-transparent" />
          
          <motion.h1 
            variants={textVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 leading-tight"
          >
            <span className="block text-[#f0f0f0] font-normal">Crafted</span>
            <span className="block mt-1 md:mt-2 text-[#f0f0f0]">Spirits Collection</span>
            <span className="block mt-1 text-[#c0a062] font-medium">Curated Excellence</span>
          </motion.h1>
          
          <motion.div 
            variants={textVariants}
            className="border-l border-[#c0a06230] pl-4 md:pl-6 ml-1 my-6 md:my-8"
          >
            <p className="text-base sm:text-lg text-[#aaaaaa] max-w-xl">
              Discover exceptional whiskeys, vodkas, gins, and rums from the world's 
              finest distilleries. Each selection embodies craftsmanship and heritage.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="absolute bottom-0 right-0 w-12 md:w-16 h-px bg-gradient-to-l from-[#c0a062] to-transparent" />
        </motion.div>

        {/* Stats Section - Sleek Presentation */}
        <motion.div 
          className="relative order-1 lg:order-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8 lg:mb-0">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden group"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff05] to-[#00000010] backdrop-blur-sm border border-[#ffffff08] rounded-xl" />
                
                <div className="relative z-10 p-6 md:p-8 flex flex-col items-center">
                  <motion.div 
                    className="text-3xl md:text-4xl font-serif font-light mb-2 md:mb-3"
                    style={{ color: stat.color }}
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1.5 + index * 0.3
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-xs md:text-sm uppercase tracking-widest text-[#aaaaaa] text-center">
                    {stat.label}
                  </div>
                  
                  <div className="mt-3 md:mt-4 w-8 h-px bg-gradient-to-r from-transparent via-[#c0a062] to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#c0a062] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
          
          {/* Animated floating bottle - Hidden on mobile, visible on larger screens */}
          <motion.div 
            className="absolute -top-20 -right-10 lg:-top-24 lg:-right-16 hidden md:block"
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#c0a062] rounded-full opacity-10 blur-xl animate-pulse" />
              <div className="relative w-16 md:w-20 lg:w-24 h-40 md:h-52 lg:h-64 flex items-center justify-center">
                <div className="w-3 md:w-4 h-32 md:h-40 lg:h-48 bg-gradient-to-b from-[#8b5a2b] to-[#5a3a1c] rounded-sm" />
                <div className="absolute top-0 w-6 md:w-8 lg:w-10 h-4 md:h-5 lg:h-6 bg-[#8b5a2b] rounded-full" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating particles - Reduced on mobile */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#c0a062] rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.02; }
          100% { transform: scale(1.2); opacity: 0.05; }
        }
      `}</style>
    </section>
  );
};

export default LiquorHero;