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
      className="group relative w-full overflow-hidden rounded-full h-[52px] sm:h-14 flex items-center justify-center px-5 sm:px-6
                 bg-gradient-to-r from-[#e11d2a] to-[#a30f1a]
                 ring-1 ring-white/20
                 shadow-[0_8px_24px_-8px_rgba(225,29,42,0.6)]
                 transition-all duration-300
                 hover:scale-[1.025] hover:shadow-[0_12px_36px_-6px_rgba(225,29,42,0.75)]
                 active:scale-[0.98]
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1f17]"
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
                   bg-gradient-to-b from-white/15 via-transparent to-black/25"
      />

      {/* Left icon */}
      <span className="absolute left-4 sm:left-5 flex items-center justify-center text-white [&_svg]:size-[18px]">
        {icon}
      </span>

      {/* Label */}
      <span className="relative z-10 font-semibold text-white tracking-wide text-[15px] sm:text-base">
        {label}
      </span>

      {/* Right arrow */}
      <ArrowUpRight
        aria-hidden
        className="absolute right-4 sm:right-5 size-4 text-white/85 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
};
