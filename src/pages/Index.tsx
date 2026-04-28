import { useState, useEffect } from "react";
import { MapPin, UtensilsCrossed, Globe, Bike, MessageCircle, Users, Clock, Cake, Tv, Beer, Sandwich, CreditCard } from "lucide-react";
import { LinkButton } from "@/components/LinkButton";
import onfireLogo from "@/assets/onfire-logo.webp";

const DAYS = [
  { key: 0, short: "Dom", label: "Domingo", hours: "11:30 às 23h" },
  { key: 1, short: "Seg", label: "Segunda", hours: "Fechado" },
  { key: 2, short: "Ter", label: "Terça", hours: "11:30 às 23h" },
  { key: 3, short: "Qua", label: "Quarta", hours: "11:30 às 23h" },
  { key: 4, short: "Qui", label: "Quinta", hours: "11:30 às 23h" },
  { key: 5, short: "Sex", label: "Sexta", hours: "11:30 às 00h" },
  { key: 6, short: "Sáb", label: "Sábado", hours: "11:30 às 00h" },
];

const links = [
  { label: "Cardápio", href: "https://onfireamericanbbq.com.br/cardapios/", icon: <UtensilsCrossed /> },
  { label: "Nosso Site", href: "https://onfireamericanbbq.com.br/", icon: <Globe /> },
  { label: "Delivery (iFood)", href: "https://www.ifood.com.br/delivery/niteroi-rj/on-fire-american-bbq-sao-francisco/67c1c200-d85a-4732-8d66-98cf21a0c427", icon: <Bike /> },
  { label: "Reservas (WhatsApp)", href: "https://api.whatsapp.com/send?phone=5521980689518", icon: <MessageCircle /> },
];

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Section = ({ icon, title, subtitle, children }: SectionProps) => (
  <section className="w-full rounded-2xl bg-black/55 backdrop-blur-md ring-1 ring-white/10 px-5 py-5 sm:px-6 sm:py-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)]">
    <div className="flex items-center gap-2.5 mb-2">
      <span className="flex items-center justify-center size-8 rounded-full bg-gradient-to-br from-[#e11d2a] to-[#7a0a12] text-white ring-1 ring-white/20 [&_svg]:size-4">
        {icon}
      </span>
      <h2 className="text-[13px] sm:text-sm font-bold tracking-[0.18em] uppercase text-white">
        {title}
      </h2>
    </div>
    {subtitle && (
      <p className="text-white/80 text-[13px] sm:text-sm leading-relaxed mb-3">
        {subtitle}
      </p>
    )}
    <div className="text-white/90 text-[13.5px] sm:text-sm leading-relaxed space-y-1.5">
      {children}
    </div>
  </section>
);

const Index = () => {
  return (
    <div
      className="min-h-screen flex items-start justify-center px-4 py-6 sm:p-6 relative overflow-hidden bg-black"
    >
      {/* Background Video — full visibility */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Subtle bottom gradient only — keeps churrasqueira visible */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.65) 100%)",
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
          style={{ filter: "drop-shadow(0 12px 32px rgba(225,29,42,0.55))" }}
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
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
          >
            @onfire
          </h1>
          <div
            className="flex items-center justify-center gap-1.5 text-white text-[13px] sm:text-sm"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
          >
            <MapPin className="size-4 text-[#ff7a5a]" aria-hidden />
            <span>São Francisco, Niterói</span>
          </div>
          <p
            className="text-white text-[13px] sm:text-sm"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
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

        {/* Info sections */}
        <div className="w-full flex flex-col gap-4 sm:gap-5 mt-2">
          <Section
            icon={<Users />}
            title="Conheça nossa casa"
            subtitle="Conheça os espaços do On Fire e escolha o ambiente ideal para sua experiência."
          >
            <ul className="space-y-1.5">
              <li>• <strong className="font-semibold">Área Kids</strong> — até 70 pessoas</li>
              <li>• <strong className="font-semibold">Salão Central</strong> — até 30 pessoas</li>
              <li>• <strong className="font-semibold">Área Externa</strong> — até 60 pessoas</li>
              <li>• <strong className="font-semibold">Espaço Pet</strong> — mesas para máx. 4 pessoas (área descoberta)</li>
              <li>• <strong className="font-semibold">Segundo Andar</strong> — até 35 pessoas</li>
            </ul>
          </Section>

          <Section
            icon={<Clock />}
            title="Horários de funcionamento"
            subtitle="Confira nossos horários de atendimento."
          >
            <ul className="space-y-1">
              <li><span className="text-white/70">Segunda</span> — fechado</li>
              <li><span className="text-white/70">Terça a quinta</span> — 11:30 às 23h</li>
              <li><span className="text-white/70">Sexta e sábado</span> — 11:30 às 00h</li>
              <li><span className="text-white/70">Domingo</span> — 11:30 às 23h</li>
              <li><span className="text-white/70">Feriados</span> — 11:30 às 00h</li>
            </ul>
          </Section>

          <Section
            icon={<Cake />}
            title="Promoção aniversariante"
            subtitle="Comemore seu aniversário no On Fire."
          >
            <p className="font-semibold text-white">Segunda a sexta</p>
            <p className="text-white/85">Acima de 30 pessoas, o aniversariante ganha:</p>
            <ul className="space-y-1 pl-1">
              <li>• Bolo especial da casa</li>
              <li className="text-white/60 text-xs tracking-widest">OU</li>
              <li>• Drink da casa + panqueca de doce de leite</li>
            </ul>

            <p className="font-semibold text-white pt-2">Finais de semana</p>
            <p className="text-white/85">Até 30 pessoas:</p>
            <ul className="space-y-1 pl-1">
              <li>• 50% OFF no bolo</li>
              <li className="text-white/60 text-xs tracking-widest">OU</li>
              <li>• Drink da casa + panqueca de doce de leite</li>
            </ul>
            <p className="pt-2">👉 Faça sua reserva.</p>
          </Section>

          <Section
            icon={<Tv />}
            title="Fire Game"
            subtitle="Os principais jogos cariocas passam aqui."
          >
            <p><strong className="font-semibold">De segunda a sexta:</strong> Brahma em dose dupla durante os jogos.</p>
            <p className="text-white/75">⛔ Não válido em finais de semana e feriados.</p>
            <p>Confira a programação.</p>
          </Section>

          <Section
            icon={<Beer />}
            title="Fire Time"
            subtitle="Nosso happy hour oficial."
          >
            <ul className="space-y-1.5">
              <li>• 25% OFF em petiscos selecionados</li>
              <li>• 50% OFF na caneca de chopp Brahma</li>
              <li>• Drinks selecionados com desconto</li>
            </ul>
            <p className="font-semibold text-white pt-1">Terça a sexta — 16h às 20h</p>
            <p className="text-white/75">⛔ Não válido em feriados e datas comemorativas.</p>
          </Section>

          <Section
            icon={<Sandwich />}
            title="Fire Burger"
            subtitle="Domingo é dia de burger em dobro."
          >
            <p>Na compra de qualquer hambúrguer do cardápio, você ganha outro.</p>
            <p className="font-semibold text-white pt-1">🕒 Todos os domingos — 17h às 23h</p>
            <ul className="space-y-1 text-white/75 pt-1">
              <li>⛔ Não válido para delivery</li>
              <li>⛔ Não válido para take away</li>
              <li>⛔ A batata não dobra</li>
            </ul>
            <p className="pt-1">Válido apenas para consumo na loja.</p>
          </Section>

          <Section
            icon={<CreditCard />}
            title="Formas de pagamento"
          >
            <p className="text-white/85">Aceitamos:</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["Visa", "Master", "Elo", "Amex", "Alelo", "Ticket", "VR", "Sodexo", "iFood Benefícios", "Pix"].map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-[12px] text-white"
                >
                  {p}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* Footer */}
        <footer
          className="pt-4 sm:pt-6 text-center text-[10px] sm:text-[11px] tracking-wide text-white/85"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.85)" }}
        >
          Copyright © 2024 OnFire | Todos os Direitos Reservados.
        </footer>
      </main>
    </div>
  );
};

export default Index;
