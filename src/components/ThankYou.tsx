import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CloudBackground from '../components/CloudBackground';

const ThankYou = () => {
  return (
    <div className="relative min-h-screen pt-28 pb-24 px-6 max-w-4xl mx-auto text-white text-center font-mono">
      <CloudBackground />

      {/* Ambient Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 w-[40vw] h-[40vw] bg-green-500/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 animate-pulse-slower" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-10 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl relative z-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-6 animate-pulse">
          ✅ Message Sent Successfully!
        </h1>

        <p className="text-slate-300 text-lg mb-8">
          Your message just deployed into the cloud ☁️ — I’ll get back to you as soon as possible.
        </p>

        {/* Terminal-style response */}
        <div className="text-sm text-green-300 bg-[#111216] p-4 rounded-xl border border-white/10 inline-block text-left shadow-inner">
          <pre className="whitespace-pre-wrap">
            {`~ $ echo "Thank you for reaching out!"`}
            {'\n'}
            {`> Connecting to RenaissanceCarr.dev ...`}
            {'\n'}
            {`> Success. See you soon :)`}
          </pre>
        </div>

        <Link
          to="/"
          className="inline-block mt-10 px-6 py-3 text-sm font-semibold rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition border border-white/20 text-white shadow-md"
        >
          Return Home ↩
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;