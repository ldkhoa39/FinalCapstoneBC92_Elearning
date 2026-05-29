import React, { useState, useEffect } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void; 
  placeholder?: string;             
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = "Tìm kiếm..." }) => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (inputValue) {
      setIsTyping(true);
    }

    const timer = setTimeout(() => {
      onSearch(inputValue); 
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  return (
    <div className="relative flex-1 md:w-80">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 rounded-lg pl-9 pr-16 py-2.5 focus:border-cyan-500 outline-none transition-all placeholder-slate-500"
      />
      {isTyping && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-cyan-500 bg-cyan-500/10 px-1.5 py-0.5 rounded animate-pulse">
          typing...
        </span>
      )}
    </div>
  );
};

export default SearchInput;