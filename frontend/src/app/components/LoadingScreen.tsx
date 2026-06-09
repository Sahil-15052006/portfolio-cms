import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated Logo Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="w-20 h-20 rounded-full border-4 border-zinc-700 border-t-blue-500"
        />

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-2xl md:text-3xl font-bold text-white tracking-wide"
        >
          Sahil Sawant
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="text-zinc-400 text-sm tracking-[0.3em] uppercase"
        >
          Loading Dashboard...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;
