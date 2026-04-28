import { MapPin, UtensilsCrossed, Globe, Bike, MessageCircle } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";
import onfireLogo from "@/assets/onfire-logo.webp";

const links = [
  {
    label: "Cardápio",
    href: "#",
    icon: <UtensilsCrossed />,
  },
  {
    label: "Nosso Site",
    href: "#",
    icon: <Globe />,
  },
  {
    label: "Delivery (iFood)",
    href: "#",
    icon: <Bike />,
  },
  {
    label: "Reservas (WhatsApp)",
    href: "#",
    icon: <MessageCircle />,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/65" />

      {/* Vignette */}
      <div className="absolute inset-0 z-0 vignette pointer-events-none" />

      {/* Subtle orange glow accents */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,26,0.22) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <main className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-8 py-10">
        {/* Logo */}
        <div
          className="flex justify-center animate-in fade-in zoom-in-95 duration-700"
          style={{ filter: "drop-shadow(0 12px 32px rgba(255,107,26,0.45))" }}
        >
          <img
            src={onfireLogo}
            alt="ON Fire American BBQ"
            className="w-40 sm:w-48 h-auto object-contain"
          />
        </div>

        {/* Handle + address */}
        <header className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            @onfire
          </h1>
          <div className="flex items-center justify-center gap-1.5 text-white/85 text-sm">
            <MapPin className="size-4 text-[#ff8a3d]" aria-hidden />
            <span>São Francisco, Niterói</span>
          </div>
          <p className="text-white/70 text-sm">Av. Quintino Bocaiúva, 291</p>
        </header>

        {/* Divider */}
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Links */}
        <nav className="w-full flex flex-col gap-3.5">
          {links.map((link, i) => (
            <div
              key={link.label}
              className="animate-in fade-in slide-in-from-bottom-3 duration-500"
              style={{ animationDelay: `${200 + i * 90}ms`, animationFillMode: "backwards" }}
            >
              <LinkButton {...link} />
            </div>
          ))}
        </nav>

        {/* Footer */}
        <footer className="pt-6 text-center text-[11px] uppercase tracking-[0.2em] text-white/50">
          On Fire · American BBQ
        </footer>
      </main>
    </div>
  );
};

export default Index;
