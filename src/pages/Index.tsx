import { useState, useEffect, useCallback, useRef } from "react";
import { MapPin, UtensilsCrossed, Globe, Bike, MessageCircle, Users, Clock, Cake, Tv, Beer, Sandwich, CreditCard, ChevronLeft, ChevronRight, X } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { LinkButton } from "@/components/LinkButton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import onfireLogo from "@/assets/onfire-logo.webp";
import seloBbq from "@/assets/selo-bbq.svg";
import casa1 from "@/assets/casa/onfire-1.webp";
import casa2 from "@/assets/casa/onfire-2.webp";
import casa3 from "@/assets/casa/onfire-3.webp";
import casa4 from "@/assets/casa/onfire-4.webp";
import casa5 from "@/assets/casa/onfire-5.webp";
import casa6 from "@/assets/casa/onfire-6.webp";
import casa7 from "@/assets/casa/onfire-7.webp";
import casa8 from "@/assets/casa/onfire-8.webp";
import casa1Lg from "@/assets/casa/onfire-1-lg.webp";
import casa2Lg from "@/assets/casa/onfire-2-lg.webp";
import casa3Lg from "@/assets/casa/onfire-3-lg.webp";
import casa4Lg from "@/assets/casa/onfire-4-lg.webp";
import casa5Lg from "@/assets/casa/onfire-5-lg.webp";
import casa6Lg from "@/assets/casa/onfire-6-lg.webp";
import casa7Lg from "@/assets/casa/onfire-7-lg.webp";
import casa8Lg from "@/assets/casa/onfire-8-lg.webp";

const CASA_FOTOS = [
  { src: casa7, full: casa7Lg, alt: "Fachada do On Fire American BBQ" },
  { src: casa1, full: casa1Lg, alt: "Salão com vista para a praia" },
  { src: casa2, full: casa2Lg, alt: "Salão central com decoração rústica" },
  { src: casa3, full: casa3Lg, alt: "Ambiente interno com vista" },
  { src: casa4, full: casa4Lg, alt: "Área externa coberta" },
  { src: casa5, full: casa5Lg, alt: "Segundo andar com TVs e churrasqueira" },
  { src: casa6, full: casa6Lg, alt: "Área externa com mesas" },
  { src: casa8, full: casa8Lg, alt: "Área Kids com brinquedos e arcade" },
];

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
  const todayKey = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState<number>(todayKey);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const lightboxOpen = lightboxIndex !== null;
  const showPrev = () => setLightboxIndex((i) => (i === null ? i : (i - 1 + CASA_FOTOS.length) % CASA_FOTOS.length));
  const showNext = () => setLightboxIndex((i) => (i === null ? i : (i + 1) % CASA_FOTOS.length));

  // Cache of preloaded URLs to avoid duplicate fetches
  const preloadedRef = useRef<Set<string>>(new Set());
  const preload = useCallback((url?: string) => {
    if (!url || preloadedRef.current.has(url)) return;
    preloadedRef.current.add(url);
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }, []);

  // Track carousel slide changes and preload neighboring thumbs + their full versions
  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      const idx = carouselApi.selectedScrollSnap();
      setCurrentSlide(idx);
      const len = CASA_FOTOS.length;
      // Preload neighbors (thumb + full) so swiping/opening lightbox is instant
      [-1, 1, 2].forEach((offset) => {
        const target = CASA_FOTOS[(idx + offset + len) % len];
        preload(target.src);
        preload(target.full);
      });
    };
    onSelect();
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, preload]);

  // When lightbox opens, preload prev/next full images
  useEffect(() => {
    if (lightboxIndex === null) return;
    const len = CASA_FOTOS.length;
    preload(CASA_FOTOS[(lightboxIndex + 1) % len].full);
    preload(CASA_FOTOS[(lightboxIndex - 1 + len) % len].full);
  }, [lightboxIndex, preload]);


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

      {/* Stronger overlay for readability */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
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
        {/* Logo + selo */}
        <div
          className="relative flex justify-center w-full animate-in fade-in zoom-in-95 duration-700"
        >
          <img
            src={onfireLogo}
            alt="ON Fire American BBQ"
            className="w-32 sm:w-44 md:w-48 h-auto object-contain"
            style={{ filter: "drop-shadow(0 12px 32px rgba(225,29,42,0.55))" }}
          />
          <img
            src={seloBbq}
            alt="Selo Authentic American BBQ"
            aria-hidden
            className="absolute -right-2 sm:right-4 -bottom-3 sm:-bottom-4 w-16 sm:w-20 md:w-24 h-auto -rotate-12 animate-float-up"
            style={{ filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.55))" }}
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

          {/* Carrossel de fotos da casa */}
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
            setApi={setCarouselApi}
            className="w-full -mt-1"
            aria-label="Fotos do espaço On Fire"
          >
            <CarouselContent className="-ml-2">
              {CASA_FOTOS.map((foto, i) => (
                <CarouselItem key={i} className="pl-2 basis-4/5 sm:basis-3/4">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    onMouseEnter={() => preload(foto.full)}
                    onTouchStart={() => preload(foto.full)}
                    onFocus={() => preload(foto.full)}
                    className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] aspect-[4/3] bg-black/40 w-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a5a] cursor-zoom-in"
                    aria-label={`Ampliar foto: ${foto.alt}`}
                  >
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      loading={i < 2 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      decoding="async"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 hidden sm:flex bg-black/60 border-white/20 text-white hover:bg-black/80 hover:text-white" />
            <CarouselNext className="right-2 hidden sm:flex bg-black/60 border-white/20 text-white hover:bg-black/80 hover:text-white" />
          </Carousel>


          <Section
            icon={<Clock />}
            title="Horários de funcionamento"
            subtitle="Confira nossos horários de atendimento."
          >
            {/* Day selector */}
            <div
              role="tablist"
              aria-label="Selecionar dia da semana"
              className="grid grid-cols-7 gap-1 mb-3"
            >
              {DAYS.map((d) => {
                const active = selectedDay === d.key;
                const isToday = todayKey === d.key;
                return (
                  <button
                    key={d.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedDay(d.key)}
                    className={`relative py-1.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wide transition-all
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                      ${active
                        ? "bg-gradient-to-b from-[#e11d2a] to-[#9b0a14] text-white ring-1 ring-white/30 shadow-[0_4px_12px_-4px_rgba(225,29,42,0.7)]"
                        : "bg-white/10 text-white/80 hover:bg-white/15 ring-1 ring-white/10"}`}
                  >
                    {d.short}
                    {isToday && !active && (
                      <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-[#ff6a1a]" aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Highlighted hours */}
            <div className="rounded-xl bg-gradient-to-r from-[#e11d2a]/20 to-[#9b0a14]/10 ring-1 ring-[#e11d2a]/40 px-4 py-3 mb-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70 mb-0.5">
                {DAYS.find((d) => d.key === selectedDay)?.label}
                {todayKey === selectedDay && <span className="ml-2 text-[#ff8a5a] normal-case tracking-normal">· Hoje</span>}
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                {DAYS.find((d) => d.key === selectedDay)?.hours}
              </p>
            </div>

            {/* Full schedule */}
            <ul className="space-y-1">
              {DAYS.slice(1).concat(DAYS[0]).map((d) => {
                const active = selectedDay === d.key;
                return (
                  <li
                    key={d.key}
                    className={`flex items-center justify-between rounded-md px-2 py-1 transition-colors ${
                      active ? "bg-white/10 text-white" : "text-white/85"
                    }`}
                  >
                    <span className={active ? "font-semibold" : "text-white/70"}>{d.label}</span>
                    <span className={active ? "font-semibold" : ""}>{d.hours}</span>
                  </li>
                );
              })}
              <li className="flex items-center justify-between rounded-md px-2 py-1 text-white/85">
                <span className="text-white/70">Feriados</span>
                <span>11:30 às 00h</span>
              </li>
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

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={(o) => !o && setLightboxIndex(null)}>
        <DialogContent
          className="max-w-[96vw] sm:max-w-4xl w-full p-0 bg-black/95 border-white/10 [&>button]:hidden"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
          }}
        >
          <VisuallyHidden>
            <DialogTitle>Foto do espaço On Fire</DialogTitle>
            <DialogDescription>
              {lightboxIndex !== null ? CASA_FOTOS[lightboxIndex].alt : ""}
            </DialogDescription>
          </VisuallyHidden>

          {lightboxIndex !== null && (
            <div className="relative w-full">
              <img
                src={CASA_FOTOS[lightboxIndex].full}
                alt={CASA_FOTOS[lightboxIndex].alt}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Fechar"
                className="absolute top-2 right-2 size-9 rounded-full bg-black/70 hover:bg-black/90 ring-1 ring-white/20 flex items-center justify-center text-white transition"
              >
                <X className="size-5" />
              </button>

              <button
                type="button"
                onClick={showPrev}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/70 hover:bg-black/90 ring-1 ring-white/20 flex items-center justify-center text-white transition"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Próxima foto"
                className="absolute right-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/70 hover:bg-black/90 ring-1 ring-white/20 flex items-center justify-center text-white transition"
              >
                <ChevronRight className="size-5" />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 ring-1 ring-white/15 text-white text-xs">
                {lightboxIndex + 1} / {CASA_FOTOS.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
