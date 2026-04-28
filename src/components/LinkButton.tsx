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
      className="group relative w-full overflow-hidden rounded-full h-14 flex items-center justify-center px-6
                 bg-gradient-to-r from-[#ff6b1a] to-[#e85d10]
                 ring-1 ring-white/15
                 shadow-[0_8px_24px_-8px_rgba(255,107,26,0.55)]
                 transition-all duration-300
                 hover:scale-[1.025] hover:shadow-[0_12px_36px_-6px_rgba(255,107,26,0.7)]
                 active:scale-[0.98]"
    >
      {/* Shimmer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3
                   bg-gradient-to-r from-transparent via-white/35 to-transparent
                   animate-shimmer-slide"
      />

      {/* Inner glass overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full
                   bg-gradient-to-b from-white/15 via-transparent to-black/20"
      />

      {/* Left icon */}
      <span className="absolute left-5 flex items-center justify-center text-white/95 [&_svg]:size-[18px]">
        {icon}
      </span>

      {/* Label */}
      <span className="relative z-10 font-semibold text-white tracking-wide text-[15px]">
        {label}
      </span>

      {/* Right arrow */}
      <ArrowUpRight
        aria-hidden
        className="absolute right-5 size-4 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
};
