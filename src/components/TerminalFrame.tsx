import React from 'react';

const TerminalFrame = ({
  title = '',
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-[#0E1014] border border-white/10 rounded-xl shadow-xl backdrop-blur-md overflow-hidden mb-16">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-2 bg-[#1A1C22] border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        {title && (
          <span className="ml-4 text-xs text-slate-400 font-mono select-none">
            {title}
          </span>
        )}
      </div>

      {/* CLI-Style Content */}
      <div className="p-6 font-mono text-sm text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default TerminalFrame;