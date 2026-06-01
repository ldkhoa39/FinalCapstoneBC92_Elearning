import React from "react";

interface Props {
  fullScreen?: boolean;
}

const Loading: React.FC<Props> = ({ fullScreen = false }) => {
  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 z-[9999] bg-[#020617]/80 backdrop-blur-sm" : "w-full py-10"
      } flex flex-col items-center justify-center`}
    >
      {/* Vòng xoay chính */}
      <div className="relative">
        {/* Vòng ngoài phát sáng */}
        <div className="w-12 h-12 rounded-full border-4 border-[#22D3EE]/20 border-t-[#22D3EE] animate-spin shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
        
        {/* Vòng trong xoay ngược lại*/}
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-b-[#2563EB] animate-spin-reverse opacity-70"></div>
      </div>

      <p className="mt-4 text-[#22D3EE] text-sm font-bold tracking-widest animate-pulse uppercase">
        Xin đợi một chút nhé...
      </p>
    </div>
  );
};

export default Loading;