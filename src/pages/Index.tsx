import { MapPin, UtensilsCrossed, Globe, Bike, MessageCircle } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";
import onfireLogo from "@/assets/onfire-logo.webp";

const links = [
  { label: "Cardápio", href: "https://onfireamericanbbq.com.br/cardapios/", icon: <UtensilsCrossed /> },
  { label: "Nosso Site", href: "https://onfireamericanbbq.com.br/", icon: <Globe /> },
  { label: "Delivery (iFood)", href: "https://www.ifood.com.br/delivery/niteroi-rj/on-fire-american-bbq-sao-francisco/67c1c200-d85a-4732-8d66-98cf21a0c427", icon: <Bike /> },
  { label: "Reservas (WhatsApp)", href: "https://api.whatsapp.com/send?phone=5521980689518", icon: <MessageCircle /> },
];

const Index = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-6 sm:p-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 110%, #ff6a1a 0%, #c2280a 25%, #5a0d05 55%, #1a0603 85%, #0a0200 100%)",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-25 sm:opacity-30"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Green tinted overlay for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,2,1,0.78) 0%, rgba(20,4,2,0.65) 45%, rgba(5,1,0,0.92) 100%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 z-0 vignette pointer-events-none" />

      {/* Fire glow accent */}
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,140,40,0.45) 0%, rgba(225,60,15,0.25) 40%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,90,30,0.28) 0%, transparent 60%)",
        }}
      />

      {/* Skip-to-content for keyboard users */}
      <a
        href="#links"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-white focus:text-black focus:font-medium"
      >
        Pular para os links
      </a>

      {/* Content */}
      <main className="relative z-10 w-full max-w-[22rem] sm:max-w-md flex flex-col items-center gap-6 sm:gap-8 py-6 sm:py-10">
        {/* Logo */}
        <div
          className="flex justify-center animate-in fade-in zoom-in-95 duration-700"
          style={{ filter: "drop-shadow(0 12px 32px rgba(225,29,42,0.45))" }}
        >
          <img
            src={onfireLogo}
            alt="ON Fire American BBQ"
            className="w-32 sm:w-44 md:w-48 h-auto object-contain"
          />
        </div>

        {/* Handle + address */}
        <header className="text-center space-y-1.5 sm:space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
          >
            @onfire
          </h1>
          <div
            className="flex items-center justify-center gap-1.5 text-white text-[13px] sm:text-sm"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
          >
            <MapPin className="size-4 text-[#ff7a5a]" aria-hidden />
            <span>São Francisco, Niterói</span>
          </div>
          <p
            className="text-white text-[13px] sm:text-sm"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
          >
            Av. Quintino Bocaiúva, 291
          </p>
        </header>

        {/* Divider */}
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Links */}
        <nav id="links" aria-label="Links principais" className="w-full flex flex-col gap-3">
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
        <footer
          className="pt-4 sm:pt-6 text-center text-[10px] sm:text-[11px] tracking-wide text-white/85"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
        >
          Copyright © 2024 OnFire | Todos os Direitos Reservados.
        </footer>
      </main>
    </div>
  );
};

export default Index;
