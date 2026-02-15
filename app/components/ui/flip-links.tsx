import React from "react";
import Link from "next/link";

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <Link
      href={href}
      className="group text-yellow-400 relative block overflow-hidden whitespace-nowrap text-2xl font-black uppercase sm:text-3xl md:text-4xl lg:text-5xl hover:text-yellow-300 transition-colors"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div className="flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
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