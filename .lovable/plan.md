## Visão geral

Transformar a `/` (Index.tsx) em uma página de links no formato do anexo (ON Fire American BBQ) — header com logo, @handle, endereço, e uma pilha de botões largos em formato de pílula. Versão **mais moderna** que a referência: vidro fosco sutil, micro-animações, gradiente de borda animado nos botões, e o vídeo enviado como fundo cinematográfico.

## Direção visual

- **Paleta** (substitui o verde/dourado atual da Rama):
  - Fundo: preto profundo `#0a0a0a` com overlay sobre o vídeo
  - Primária (ação/CTA): laranja vibrante do logo `#ff6b1a` → `#ff8a3d` (gradiente)
  - Texto: branco `#ffffff` / cinza claro `#d4d4d4`
  - Bordas/divisores: branco a 10% de opacidade
- **Tipografia**: Manter inter/system para corpo; adicionar um display sans bold (ex: "Anton" ou "Bebas Neue" via Google Fonts) para o `@handle` opcional. Modernizado com `tracking-tight`.
- **Estilo**: glassmorphism leve + bordas com gradiente animado nos botões em hover, sombra laranja difusa, escala sutil ao tocar.

## Assets

1. Copiar `user-uploads://model_logo.webp` → `src/assets/onfire-logo.webp`
2. Copiar `user-uploads://video_fundo.mp4` → `public/background-video.mp4` (sobrescreve o atual)

## Estrutura da página (Index.tsx — reescrever)

```text
[ video fundo loop muted + overlay preto 60% + vinheta radial ]
  └─ container central (max-w-md, mobile-first)
       ├─ Logo ON Fire (h-32, drop-shadow laranja)
       ├─ @onfire (texto branco, font-bold)
       ├─ 📍 São Francisco, Niterói
       │   Av. Quintino Bocaiúva, 291
       ├─ Botão: Cardápio
       ├─ Botão: Nosso Site
       ├─ Botão: Delivery (iFood)
       ├─ Botão: Reservas (WhatsApp)
       └─ rodapé minimalista
```

## Botões modernizados (substituir variant `glass` no uso desta página)

- Pílula `rounded-full`, altura `h-14`, largura total
- Fundo: gradiente `from-[#ff6b1a] to-[#e85d10]`
- Borda interna sutil branca 15%
- Hover: leve `scale-[1.02]`, sombra laranja `shadow-[0_8px_30px_rgba(255,107,26,0.4)]`, brilho deslizante (efeito shimmer via pseudo-elemento)
- Ícone à esquerda (lucide: `Menu`, `Globe`, `Bike`, `MessageCircle`)
- Texto centralizado, font-semibold, tracking-wide

## Detalhes técnicos

1. **`src/index.css`**: adicionar tokens `--brand-orange: 18 100% 55%` e `--brand-orange-glow`, keyframe `shimmer` para o brilho deslizante dos botões. Manter os tokens existentes intactos (outras páginas — Atendimento — usam o tema verde/dourado).
2. **`src/pages/Index.tsx`**: reescrever completo
   - Trocar import do logo para `@/assets/onfire-logo.webp`
   - Remover cards de serviços antigos (TrendingUp/Target/Brain/BarChart3) e o CTA "falar com especialista" (não cabe no formato linktree puro)
   - Definir array `links` com os 4 itens (Cardápio, Site, iFood, WhatsApp) — URLs como `#` por enquanto (pedirei ao usuário depois se quiser conectar destinos reais)
   - `<video>` de fundo já existe no padrão; reutilizar com novo overlay preto + vinheta
3. **Novo componente** `src/components/LinkButton.tsx`: botão pílula laranja com shimmer, ícone, label. Independente do `ServiceLink` antigo (que continua usado em outras telas se houver).
4. **Animações**: stagger de entrada (fade + translate-y) com `animate-in` do tailwindcss-animate (já no projeto), delays incrementais 80ms.
5. **Mobile-first**: container `max-w-sm sm:max-w-md`, paddings generosos, logo escala para `h-24` em telas pequenas.
6. **Rota `/atendimento`** e demais não são tocadas — o tema verde/dourado continua para elas.

## Pontos a confirmar (após aprovação do plano)

- URLs reais de Cardápio / Site / iFood / WhatsApp do ON Fire (posso deixar `#` placeholders se preferir)
- Manter o CTA "Quero falar com um especialista" em algum lugar? (no plano atual, removido por fidelidade ao formato linktree)

## Arquivos alterados

- `src/assets/onfire-logo.webp` (novo)
- `public/background-video.mp4` (sobrescrito)
- `src/index.css` (tokens + keyframe shimmer)
- `src/components/LinkButton.tsx` (novo)
- `src/pages/Index.tsx` (reescrita)
