import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface LinkButtonProps {
  label: string;
  href: string;
  icon: ReactNode;
}

export const LinkButton = ({ label, href, icon }: LinkButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative w-full overflow-hidden rounded-full h-[54px] sm:h-14 flex items-center justify-center px-5 sm:px-6
                 bg-gradient-to-r from-[#f43f3f] via-[#e11d2a] to-[#9b0a14]
                 ring-1 ring-white/30
                 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)_inset]
                 transition-all duration-300
                 hover:scale-[1.025] hover:shadow-[0_14px_36px_-6px_rgba(225,29,42,0.85)]
                 active:scale-[0.98]
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      {/* Shimmer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3
                   bg-gradient-to-r from-transparent via-white/30 to-transparent
                   animate-shimmer-slide"
      />

      {/* Inner glass overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full
                   bg-gradient-to-b from-white/20 via-transparent to-black/35"
      />

      {/* Left icon */}
      <span className="absolute left-4 sm:left-5 flex items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] [&_svg]:size-[18px]">
        {icon}
      </span>

      {/* Label */}
      <span
        className="relative z-10 font-bold text-white tracking-wide text-[15px] sm:text-base"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.55)" }}
      >
        {label}
      </span>

      {/* Right arrow */}
      <ArrowUpRight
        aria-hidden
        className="absolute right-4 sm:right-5 size-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
};
