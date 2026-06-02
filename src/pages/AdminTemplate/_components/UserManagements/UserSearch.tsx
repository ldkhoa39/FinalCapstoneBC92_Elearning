import React, { useState, useEffect } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Tìm kiếm...",
  className,
}) => {
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
    <div className="relative w-full sm:w-80">
      {/* Search Icon */}
      <i
        className="
        fa fa-search
        absolute
        left-4
        top-1/2
        -translate-y-1/2

        text-slate-400
        dark:text-slate-500

        text-sm
        pointer-events-none
      "
      />

      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`
        w-full

        pl-11
        pr-20
        py-2.5

        rounded-xl

        bg-white
        dark:bg-slate-950

        border
        border-slate-300
        dark:border-slate-800

        text-slate-900
        dark:text-slate-100

        placeholder:text-slate-400
        dark:placeholder:text-slate-500

        shadow-sm
        dark:shadow-none

        transition-all duration-200

        focus:outline-none
        focus:border-cyan-500
        focus:ring-4
        focus:ring-cyan-500/10

        ${className}
      `}
      />

      {isTyping && (
        <span
          className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2

          text-[10px]
          font-semibold

          text-cyan-600
          dark:text-cyan-400

          bg-cyan-500/10

          px-2
          py-1

          rounded-full

          animate-pulse
        "
        >
          typing...
        </span>
      )}
    </div>
  );
};

export default SearchInput;
