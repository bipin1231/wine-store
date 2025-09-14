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
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute border border-[#ffffff08] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              animation: `pulse ${Math.random() * 20 + 15}s infinite alternate`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 relative z-10">
        {/* Text Content - Minimalist Luxury */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-[#c0a062] to-transparent" />
          
          <motion.h1 
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight"
          >
            <span className="block text-[#f0f0f0] font-normal">Crafted</span>
            <span className="block mt-2 text-[#f0f0f0]">Spirits Collection</span>
            <span className="block mt-1 text-[#c0a062] font-medium">Curated Excellence</span>
          </motion.h1>
          
          <motion.div 
            variants={textVariants}
            className="border-l border-[#c0a06230] pl-6 ml-1 my-8"
          >
            <p className="text-lg text-[#aaaaaa] max-w-xl">
              Discover exceptional whiskeys, vodkas, gins, and rums from the world's 
              finest distilleries. Each selection embodies craftsmanship and heritage.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l from-[#c0a062] to-transparent" />
        </motion.div>

        {/* Stats Section - Sleek Presentation */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                
                <div className="relative z-10 p-8 flex flex-col items-center">
                  <motion.div 
                    className="text-4xl font-serif font-light mb-3"
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
                  
                  <div className="text-sm uppercase tracking-widest text-[#aaaaaa]">
                    {stat.label}
                  </div>
                  
                  <div className="mt-4 w-8 h-px bg-gradient-to-r from-transparent via-[#c0a062] to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#c0a062] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
          
          {/* Animated floating bottle */}
          <motion.div 
            className="absolute -top-24 -right-16 hidden lg:block"
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
              <div className="relative w-24 h-64 flex items-center justify-center">
                <div className="w-4 h-48 bg-gradient-to-b from-[#8b5a2b] to-[#5a3a1c] rounded-sm" />
                <div className="absolute top-0 w-10 h-6 bg-[#8b5a2b] rounded-full" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#c0a062] rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20],
            x: [0, Math.random() * 40 - 20],
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