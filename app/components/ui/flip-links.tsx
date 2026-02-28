import React from "react";
import Link from "next/link";

const FlipLink = ({ children, href, className }: { children: string; href: string; className?: string }) => {
  const defaultClassName = "group text-yellow-400 relative block overflow-hidden whitespace-nowrap text-2xl font-normal uppercase sm:text-3xl md:text-4xl lg:text-5xl hover:text-yellow-200 transition-colors duration-300";

  return (
    <Link
      href={href}
      className={className || defaultClassName}
      style={{
        lineHeight: 0.75,
      }}
    >
      {/* Glow effect background */}
      <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

      {/* Main text layer */}
      <div className="flex relative z-10">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-all duration-300 ease-out group-hover:text-yellow-100 group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Hidden layer that slides up on hover */}
      <div className="absolute inset-0 flex z-10">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-all duration-300 ease-out text-yellow-200 group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </Link>
  );
};

export { FlipLink };