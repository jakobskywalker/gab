import React, { useState, useEffect, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle, TweakSelect } from './tweaks-panel.jsx'

/* ───────────────────────────── Icons (lucide-style inline SVG) ─────────────────────── */
const Icon = ({ d, w = 22, h = 22, sw = 1.5, paths, fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24"
       fill={fill} stroke="currentColor" strokeWidth={sw}
       strokeLinecap="round" strokeLinejoin="round">
    {paths ? paths : <path d={d} />}
  </svg>
);

const Icons = {
  Heart: (p) => (
    <Icon {...p} d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
  Wine: (p) => (
    <Icon {...p} paths={<>
      <path d="M8 22h8" />
      <path d="M12 15v7" />
      <path d="M7 2h10l-1 9a4 4 0 0 1-8 0L7 2Z" />
      <path d="M7.5 6h9" />
    </>} />
  ),
  Utensils: (p) => (
    <Icon {...p} paths={<>
      <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
      <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Z" />
      <path d="m2.1 21.8 6.4-6.3" />
      <path d="m19 5-7 7" />
    </>} />
  ),
  Music: (p) => (
    <Icon {...p} paths={<>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>} />
  ),
  Sparkles: (p) => (
    <Icon {...p} paths={<>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </>} />
  ),
  MapPin: (p) => (
    <Icon {...p} paths={<>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </>} />
  ),
  Hotel: (p) => (
    <Icon {...p} paths={<>
      <path d="M10 22v-6.57"/>
      <path d="M12 11h.01"/>
      <path d="M12 7h.01"/>
      <path d="M14 15.43V22"/>
      <path d="M15 16a5 5 0 0 0-6 0"/>
      <path d="M16 11h.01"/>
      <path d="M16 7h.01"/>
      <path d="M8 11h.01"/>
      <path d="M8 7h.01"/>
      <rect x="4" y="2" width="16" height="20" rx="2"/>
    </>} />
  ),
  Car: (p) => (
    <Icon {...p} paths={<>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <path d="M9 17h6"/>
      <circle cx="17" cy="17" r="2"/>
    </>} />
  ),
  CarOff: (p) => (
    <Icon {...p} paths={<>
      <path d="M2 2l20 20"/>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3"/>
      <path d="M3 9 1.6 11.9A3.7 3.7 0 0 0 1 13v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <path d="M9 17h6"/>
      <circle cx="17" cy="17" r="2"/>
    </>} />
  ),
  User: (p) => (
    <Icon {...p} paths={<>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </>} />
  ),
  Users: (p) => (
    <Icon {...p} paths={<>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </>} />
  ),
  Bed: (p) => (
    <Icon {...p} paths={<>
      <path d="M2 4v16"/>
      <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
      <path d="M2 17h20"/>
      <path d="M6 8v9"/>
    </>} />
  ),
  Check: (p) => (
    <Icon {...p} paths={<><path d="M20 6 9 17l-5-5"/></>} />
  ),
  X: (p) => (
    <Icon {...p} paths={<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>} />
  ),
  ChevronDown: (p) => (
    <Icon {...p} paths={<><path d="m6 9 6 6 6-6"/></>} />
  ),
  ArrowRight: (p) => (
    <Icon {...p} paths={<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>} />
  ),
  Calendar: (p) => (
    <Icon {...p} paths={<>
      <path d="M8 2v4"/><path d="M16 2v4"/>
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M3 10h18"/>
    </>} />
  ),
};

/* ───────────────────────────── Reveal-on-scroll hook ─────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;

    // 1) If already on-screen at mount, reveal immediately (covers iframes
    //    where IntersectionObserver doesn't fire reliably for above-the-fold).
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh && r.bottom > 0) {
      el.classList.add("is-in");
      return;
    }

    let revealed = false;
    const reveal = () => { if (!revealed) { revealed = true; el.classList.add("is-in"); } };

    // 2) IntersectionObserver for the rest
    let io;
    try {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.unobserve(el); } });
      }, { threshold: 0.12 });
      io.observe(el);
    } catch (e) { /* ignore */ }

    // 3) Safety net: fallback to scroll listener + a generous timeout so nothing
    //    stays hidden if the observer never fires.
    const onScroll = () => {
      const rr = el.getBoundingClientRect();
      const h = window.innerHeight || document.documentElement.clientHeight;
      if (rr.top < h * 0.9 && rr.bottom > 0) { reveal(); cleanup(); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(reveal, 1200);

    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      if (io) io.disconnect();
    }
    return cleanup;
  }, []);
  return ref;
}
const Reveal = ({ children, className = "", delay = 0, as: Tag = "div" }) => {
  const ref = useReveal();
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
};

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height + viewport;
      const current = viewport - rect.top;
      setProgress(Math.min(1, Math.max(0, current / total)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}

/* ───────────────────────────── Tweak defaults ────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#FAF7F1", "#8B6F4E", "#3E2C20"],
  "headingFont": "Playfair Display",
  "showCountdown": true,
  "showGallery": true,
  "showTimeline": true,
  "showHotels": true,
  "heroLayout": "centered"
}/*EDITMODE-END*/;

const PALETTES = [
  ["#FAF7F1", "#8B6F4E", "#3E2C20"], // Mocha & Espresso (default)
  ["#F5EFE3", "#A78A5F", "#2B1F16"], // Warm sand
  ["#F2EBDA", "#B89B7A", "#4A3826"], // Champagne
  ["#EFE7D6", "#7C5F44", "#1F140C"], // Cocoa
];

const NAV_LINKS = [
  { id: "timeline", label: "Ablauf" },
  { id: "locations", label: "Anfahrt" },
  { id: "hotels", label: "Unterkunft" },
  { id: "info", label: "Infos" },
  { id: "rsvp", label: "RSVP" },
];

function FloatingNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible((window.scrollY || 0) > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`floating-nav ${visible ? "is-visible" : ""}`} aria-label="Seitennavigation">
      {NAV_LINKS.map((link) => (
        <button key={link.id} type="button" onClick={() => scrollTo(link.id)}>
          {link.label}
        </button>
      ))}
    </nav>
  );
}

/* ───────────────────────────── Hero ──────────────────────────────────────────────── */
const HERO_IMAGE = "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=1800&q=85&auto=format&fit=crop";

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(Math.min(window.scrollY || 0, 420));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center px-6 py-24 md:py-28">
      {/* full-bleed hero image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Izla & Gabriel"
          className="h-full w-full object-cover transition-transform duration-200 ease-out"
          style={{ transform: `translateY(${scrollY * 0.16}px) scale(1.08)` }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/35 to-espresso/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(62,44,32,.18)_55%,rgba(62,44,32,.55)_100%)]" />
      </div>

      {/* top thin bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-12 py-6 text-cream/85">
        <span className="font-script italic tracking-wide text-sm md:text-base">Piro <span className="ampersand">&amp;</span> Malki</span>
        <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase">07 · 11 · 2026</span>
      </div>

      {/* centerpiece */}
      <div className="relative z-10 flex w-full flex-col items-center text-center text-cream drop-shadow-[0_2px_18px_rgba(0,0,0,.28)]">
        <Reveal delay={120}>
          <p className="font-script italic text-cream/90 text-base md:text-lg tracking-[0.22em]">— Wir heiraten —</p>
        </Reveal>

        <Reveal delay={320} className="mt-8 md:mt-10">
          <h1 className="font-display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.95] font-medium tracking-tight">
            <span className="block">Izla</span>
            <span className="block ampersand text-[0.85em] my-1 md:my-2 text-sand">&amp;</span>
            <span className="block">Gabriel</span>
          </h1>
        </Reveal>

        <Reveal delay={520} className="mt-8 md:mt-10 flex items-center gap-5">
          <span className="hairline w-16 md:w-24"></span>
          <span className="font-display text-base md:text-lg tracking-[0.35em] uppercase">7. November 2026</span>
          <span className="hairline w-16 md:w-24"></span>
        </Reveal>

        <Reveal delay={680} className="mt-3 text-cream/90 text-sm md:text-base font-script italic tracking-[0.22em] uppercase">
          Augsburg <span className="mx-2 opacity-60">·</span> Elchingen
        </Reveal>

        <Reveal delay={850} className="mt-12 md:mt-14 flex items-center gap-4 md:gap-5 text-cream/85">
          <span className="hairline w-10 md:w-14"></span>
          <span className="font-script italic text-sm md:text-base">Familie Piro</span>
          <span className="ampersand text-base md:text-lg text-sand">&amp;</span>
          <span className="font-script italic text-sm md:text-base">Familie Malki</span>
          <span className="hairline w-10 md:w-14"></span>
        </Reveal>

        <Reveal delay={1050} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => scrollTo("rsvp")}
            className="hero-cta hero-cta-primary">
            <span>RSVP öffnen</span>
            <Icons.ArrowRight w={15} h={15} sw={2}/>
          </button>
          <button onClick={() => scrollTo("timeline")}
            className="hero-cta hero-cta-secondary">
            <span>Tagesablauf ansehen</span>
          </button>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/75">
        <span className="text-[10px] tracking-[0.4em] uppercase">scroll</span>
        <div className="w-px h-10 bg-cream/45 animate-pulse"></div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Countdown ─────────────────────────────────────────── */
const TARGET = new Date("2026-11-07T13:00:00+01:00").getTime();

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000); diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds };
}

function CountdownCell({ value, label }) {
  // re-mount key on value change so animation triggers
  return (
    <div className="flex-1 min-w-[78px] md:min-w-[120px]">
      <div className="relative card !bg-cream/60 backdrop-blur-sm flex items-center justify-center
                      h-24 md:h-32 px-2 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{background:"linear-gradient(90deg,transparent,#D8C9AE,transparent)"}}/>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{background:"linear-gradient(90deg,transparent,#D8C9AE,transparent)"}}/>
        <span key={value} className="tick font-display text-espresso text-4xl md:text-6xl font-medium tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-3 text-center font-script italic tracking-[0.25em] text-coffee text-xs md:text-sm uppercase">
        {label}
      </div>
    </div>
  );
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET);
  return (
    <section id="countdown" className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="font-script italic text-coffee text-base md:text-lg tracking-[0.18em]">— gemeinsam —</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-espresso">Bis zum großen Tag</h2>
          <div className="mx-auto mt-5 hairline w-40"></div>
          <p className="mt-6 max-w-xl mx-auto text-coffee/90 leading-relaxed">
            Wir können es kaum erwarten, diesen Moment mit euch zu teilen.
            Nur noch ein wenig Geduld &mdash;
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-12 md:mt-14">
          <div className="flex items-stretch justify-center gap-3 md:gap-5">
            <CountdownCell value={days} label="Tage" />
            <CountdownCell value={hours} label="Stunden" />
            <CountdownCell value={minutes} label="Minuten" />
            <CountdownCell value={seconds} label="Sekunden" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── Gallery (Masonry) ─────────────────────────────────── */
const GALLERY = [
  { src: "/images/paar-blumenbogen.png", h: 620, alt: "Izla und Gabriel beim Fest" },
  { src: "/images/paar-selfie.png", h: 520, alt: "Selfie von Izla und Gabriel" },
  { src: "/images/antrag-kniefall.png", h: 620, alt: "Der Antrag im Kniefall" },
  { src: "/images/antrag-picknick.png", h: 430, alt: "Der gedeckte Picknicktisch beim Antrag" },
  { src: "/images/paar-nahaufnahme.png", h: 620, alt: "Izla und Gabriel zusammen" },
  { src: "/images/antrag-umarmung.png", h: 620, alt: "Umarmung nach dem Antrag" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80&auto=format&fit=crop", h: 420, alt: "Eheringe" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop", h: 520, alt: "Hochzeitsmoment" },
];

function ProposalStory() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-ivory/50">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="ph aspect-[4/5]">
                <img src="/images/antrag-umarmung.png" alt="Izla und Gabriel nach dem Antrag" loading="lazy" />
              </div>
              <div className="hidden sm:block absolute -right-8 -bottom-8 w-44 md:w-56 card p-2 rotate-3 shadow-xl">
                <div className="ph !shadow-none aspect-[4/5]">
                  <img src="/images/antrag-picknick.png" alt="Picknicktisch beim Antrag" loading="lazy" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="font-script italic text-coffee text-base md:text-lg tracking-[0.18em]">— unser antrag —</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl text-espresso">Der Moment, in dem alles begann</h2>
            <div className="mt-5 hairline w-40"></div>
            <p className="mt-7 text-ink/75 leading-relaxed">
              Ein kleiner Tisch, zwei Stühle, ein paar liebevolle Details und dieser eine Moment, der für immer bleibt.
              Zwischen Steinmauer, Rosen und Herzklopfen wurde aus einem schönen Tag unser gemeinsames Versprechen.
            </p>
            <p className="mt-6 font-script italic text-coffee text-xl md:text-2xl leading-relaxed">
              Aus einem Ja beim Antrag wird am 7. November unser Ja vor Gott und unseren Familien.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => (current + 1) % GALLERY.length);
      if (event.key === "ArrowLeft") setActive((current) => (current - 1 + GALLERY.length) % GALLERY.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  const showPrev = () => setActive((current) => (current - 1 + GALLERY.length) % GALLERY.length);
  const showNext = () => setActive((current) => (current + 1) % GALLERY.length);
  const activeImage = active === null ? null : GALLERY[active];

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14 md:mb-20">
          <p className="font-script italic text-coffee text-base md:text-lg tracking-[0.18em]">— erinnerungen —</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-espresso">Fotogalerie</h2>
          <div className="mx-auto mt-5 hairline w-40"></div>
        </Reveal>

        {/* CSS columns masonry */}
        <Reveal delay={100}>
          <div className="columns-2 md:columns-4 gap-5 [column-fill:balance]">
            {GALLERY.map((g, i) => (
              <button key={i} type="button" onClick={() => setActive(i)}
                   className="break-inside-avoid mb-5 ph block w-full cursor-zoom-in text-left"
                   style={{ height: g.h }}>
                <img src={g.src} alt={g.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={250} className="mt-14 text-center text-coffee/85 max-w-2xl mx-auto font-script italic text-lg md:text-xl leading-relaxed">
          „Kleine Augenblicke, große Gefühle &mdash; Erinnerungen, die uns bis zum Hochzeitstag begleiten.“
        </Reveal>
      </div>

      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.alt}>
          <button type="button" className="lightbox-close" onClick={() => setActive(null)} aria-label="Galerie schließen">
            <Icons.X w={22} h={22} sw={2}/>
          </button>
          <button type="button" className="lightbox-nav left-5 md:left-8" onClick={showPrev} aria-label="Vorheriges Bild">
            <span>&lsaquo;</span>
          </button>
          <img src={activeImage.src} alt={activeImage.alt} />
          <button type="button" className="lightbox-nav right-5 md:right-8" onClick={showNext} aria-label="Nächstes Bild">
            <span>&rsaquo;</span>
          </button>
          <p>{activeImage.alt}</p>
        </div>
      )}
    </section>
  );
}

/* ───────────────────────────── Timeline ──────────────────────────────────────────── */
const TIMELINE = [
  { time: "13:00", title: "Teqimo Bräutigam", sub: "Zur Aumühle 9, 86153 Augsburg", icon: "Sparkles", note: "" },
  { time: "13:45", title: "Teqimo Braut", sub: "Vienna House Easy, Am Technologiezentrum 1, 86159 Augsburg", icon: "Heart", note: "" },
  { time: "14:30", title: "Kirchliche Trauung", sub: "Syrisch-Orthodoxe Kirche von Antiochien, Zusamstraße 17, 86165 Augsburg", icon: "Heart", note: "Bitte pünktlich erscheinen." },
  { time: "17:00", title: "Hochzeitsfeier", sub: "MAVI Event & Location (Rüya Saal), Daimlerstraße 3, 89275 Elchingen", icon: "Music", note: "Ausreichend Parkplätze vorhanden." },
];

const LOCATIONS = [
  {
    title: "Teqimo Bräutigam",
    time: "13:00 Uhr",
    address: "Zur Aumühle 9, 86153 Augsburg",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Eleganter Bräutigam am Hochzeitstag",
  },
  {
    title: "Teqimo Braut",
    time: "13:45 Uhr",
    address: "Vienna House Easy, Am Technologiezentrum 1, 86159 Augsburg",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Brautmoment vor der Trauung",
  },
  {
    title: "Kirchliche Trauung",
    time: "14:30 Uhr",
    address: "Syrisch-Orthodoxe Kirche von Antiochien, Zusamstraße 17, 86165 Augsburg",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Festlich geschmückte Kirche für eine Trauung",
  },
  {
    title: "Hochzeitsfeier",
    time: "17:00 Uhr",
    address: "MAVI Event & Location (Rüya Saal), Daimlerstraße 3, 89275 Elchingen",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Elegante Hochzeitsfeier mit gedeckten Tischen",
  },
];

const mapLink = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

function Timeline() {
  const ref = useRef(null);
  const progress = useScrollProgress(ref);

  return (
    <section id="timeline" ref={ref} className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center mb-16">
          <p className="font-script italic text-coffee text-base md:text-lg tracking-[0.18em]">— ablauf des tages —</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-espresso">7. November 2026</h2>
          <div className="mx-auto mt-5 hairline w-40"></div>
        </Reveal>

        <ol className="relative">
          {/* vertical line */}
          <span className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px"
                style={{ background: "linear-gradient(180deg, transparent, #D8C9AE 12%, #D8C9AE 88%, transparent)" }} />
          <span className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-2 w-px bg-coffee transition-[height] duration-300 ease-out"
                style={{ height: `${progress * 100}%` }} />
          {TIMELINE.map((t, i) => {
            const IconComp = Icons[t.icon];
            const left = i % 2 === 0;
            return (
              <Reveal as="li" key={i} delay={i * 120}
                className={`relative pl-20 md:pl-0 md:grid md:grid-cols-2 md:gap-12 mb-12 last:mb-0`}>
                {/* dot */}
                <span className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-2 -translate-x-1/2
                                 h-4 w-4 rounded-full bg-coffee ring-4 ring-cream pulse-dot" />

                {/* card column */}
                <div className={`md:col-start-${left ? "1" : "2"} ${left ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                  <div className="card p-6 inline-block w-full md:w-auto md:max-w-sm">
                    <div className={`flex items-center gap-3 ${left ? "md:flex-row-reverse md:justify-start" : ""}`}>
                      <div className="grid place-items-center h-10 w-10 rounded-full bg-sand text-espresso shadow-sm">
                        <IconComp w={18} h={18} sw={1.6} />
                      </div>
                      <div>
                        <div className="font-display text-2xl text-espresso leading-none">{t.time}</div>
                        <div className="font-script italic text-coffee text-sm tracking-wide">Uhr</div>
                      </div>
                    </div>
                    <h3 className="mt-4 font-display text-xl md:text-2xl text-espresso">{t.title}</h3>
                    <p className="mt-1 text-sm text-coffee/85">{t.sub}</p>
                    {t.note && <p className="mt-3 text-[13.5px] leading-relaxed text-ink/75">{t.note}</p>}
                  </div>
                </div>

                {/* spacer column on the other side (desktop) */}
                <div className={`hidden md:block md:col-start-${left ? "2" : "1"}`}></div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function VenueMaps() {
  return (
    <section id="locations" className="relative py-24 md:py-32 px-6 bg-ivory/50">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="font-script italic text-coffee text-base md:text-lg tracking-[0.18em]">— alle orte —</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-espresso">Anfahrt &amp; Locations</h2>
          <div className="mx-auto mt-5 hairline w-40"></div>
          <p className="mt-6 max-w-xl mx-auto text-coffee/90">
            Öffnet die Adresse direkt in Google Maps und plant eure Route ohne langes Suchen.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {LOCATIONS.map((location, i) => (
            <Reveal key={location.title} delay={i * 90} className="card overflow-hidden">
              <div className="ph !rounded-none !shadow-none aspect-[16/10]">
                <img
                  src={location.image}
                  alt={location.imageAlt}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-coffee/80">{location.time}</p>
                    <h3 className="mt-2 font-display text-2xl text-espresso">{location.title}</h3>
                  </div>
                  <Icons.MapPin w={20} h={20} sw={1.6} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{location.address}</p>
                <a href={mapLink(location.address)} target="_blank" rel="noreferrer"
                  className="btn-ghost mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-sm text-xs uppercase tracking-[0.22em]">
                  Route öffnen <Icons.ArrowRight w={14} h={14} sw={2}/>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Hotels ────────────────────────────────────────────── */
const HOTELS = [
  {
    name: "Vienna House Easy by Wyndham Augsburg",
    sub: "Familie Piro",
    mapUrl: "https://maps.google.com/maps?q=Vienna%20House%20Easy%20by%20Wyndham%20Augsburg%2C%20Am%20Technologiezentrum%201%2C%2086159%20Augsburg&t=&z=16&ie=UTF8&iwloc=&output=embed",
    desc: "Am Technologiezentrum 1, 86159 Augsburg. Zimmer werden für die Gäste reserviert. Nähere Infos folgen.",
    price: "Infos folgen",
  },
  {
    name: "QU Hotel Augsburg",
    sub: "Familie Malki",
    mapUrl: "https://maps.google.com/maps?q=QU%20Hotel%20Augsburg%2C%20Kurt-Schumacher-Stra%C3%9Fe%206%2C%2086165%20Augsburg&t=&z=16&ie=UTF8&iwloc=&output=embed",
    desc: "Kurt-Schumacher-Straße 6, 86165 Augsburg. Zimmer werden für die Gäste reserviert. Nähere Infos folgen.",
    price: "Infos folgen",
  },
];

function Hotels() {
  return (
    <section id="hotels" className="relative py-24 md:py-32 px-6 bg-ivory/50">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="font-script italic text-coffee text-base md:text-lg tracking-[0.18em]">— bleibt bei uns —</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-espresso">Unterkünfte</h2>
          <div className="mx-auto mt-5 hairline w-40"></div>
          <p className="mt-6 max-w-xl mx-auto text-coffee/90">
            Für beide Familien werden Zimmer reserviert. Weitere Details teilen wir rechtzeitig mit euch.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {HOTELS.map((h, i) => (
            <Reveal key={i} delay={i * 100} className="card overflow-hidden flex flex-col">
              <div className="ph !rounded-none !shadow-none aspect-[4/3]">
                <iframe
                  title={`${h.name} auf Google Maps`}
                  src={h.mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl md:text-2xl text-espresso leading-tight">{h.name}</h3>
                  <Icons.Hotel w={18} h={18} sw={1.6}/>
                </div>
                <p className="mt-1 text-xs tracking-[0.18em] uppercase text-coffee/80">{h.sub}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-ink/75" dangerouslySetInnerHTML={{__html: h.desc}} />
                <div className="mt-6 flex items-center justify-between border-t border-sand/70 pt-5">
                  <span className="font-script italic text-coffee">{h.price}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-coffee/80">Reserviert</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const CALENDAR_LINK = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Hochzeit%20Izla%20%26%20Gabriel&dates=20261107T120000Z/20261107T225900Z&details=Wir%20feiern%20die%20Hochzeit%20von%20Izla%20%26%20Gabriel.%20Ablauf%3A%2013%3A00%20Teqimo%20Br%C3%A4utigam%2C%2013%3A45%20Teqimo%20Braut%2C%2014%3A30%20Kirchliche%20Trauung%2C%2017%3A00%20Hochzeitsfeier.&location=Augsburg%20%C2%B7%20Elchingen";

const FAQS = [
  {
    q: "Wann sollen wir bei der Kirche sein?",
    a: "Die kirchliche Trauung beginnt um 14:30 Uhr. Bitte plant etwas Puffer ein und seid pünktlich vor Ort.",
  },
  {
    q: "Gibt es Parkplätze bei der Feier?",
    a: "Ja, bei der MAVI Event & Location sind ausreichend Parkplätze vorhanden.",
  },
  {
    q: "Wie läuft das mit den Unterkünften?",
    a: "Für beide Familien werden Zimmer reserviert. Weitere Details und Kontingente folgen rechtzeitig.",
  },
  {
    q: "Bis wann sollen wir antworten?",
    a: "Gebt uns bitte so früh wie möglich über das RSVP-Formular Bescheid, ob ihr dabei seid.",
  },
];

function InfoSections() {
  return (
    <section id="info" className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="font-script italic text-coffee text-base md:text-lg tracking-[0.18em]">— gut zu wissen —</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-espresso">Infos für euch</h2>
          <div className="mx-auto mt-5 hairline w-40"></div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <Reveal className="card p-7 md:p-9">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-coffee/80">Dresscode</p>
                <h3 className="mt-3 font-display text-3xl text-espresso">Festlich elegant</h3>
              </div>
              <Icons.Sparkles w={24} h={24} sw={1.4}/>
            </div>
            <p className="mt-5 text-ink/75 leading-relaxed">
              Wir freuen uns über elegante, festliche Outfits. Helle Naturtöne, warme Farben, Navy, Schwarz oder klassische Abendmode passen wunderbar zum Stil des Tages.
            </p>
            <div className="mt-7 flex gap-3">
              {["#F7EFE3", "#B89B7A", "#1F2A44", "#2B1F16", "#7D4854"].map((color) => (
                <span key={color} className="h-10 w-10 rounded-full border border-sand shadow-sm" style={{ background: color }} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="card p-7 md:p-9">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-coffee/80">Kalender</p>
                <h3 className="mt-3 font-display text-3xl text-espresso">Save the Date</h3>
              </div>
              <Icons.Calendar w={24} h={24} sw={1.5}/>
            </div>
            <p className="mt-5 text-ink/75 leading-relaxed">
              Speichert euch den 7. November 2026 direkt im Kalender. So habt ihr Datum, Orte und Ablauf jederzeit griffbereit.
            </p>
            <a href={CALENDAR_LINK} target="_blank" rel="noreferrer"
              className="btn-primary mt-7 inline-flex items-center gap-3 px-7 py-4 rounded-sm uppercase text-xs tracking-[0.25em]">
              Zum Kalender hinzufügen <Icons.ArrowRight w={14} h={14} sw={2}/>
            </a>
          </Reveal>
        </div>

        <Reveal delay={220} className="mt-8 card p-7 md:p-9">
          <div className="flex items-start justify-between gap-5 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-coffee/80">FAQ</p>
              <h3 className="mt-3 font-display text-3xl text-espresso">Häufige Fragen</h3>
            </div>
            <Icons.Heart w={24} h={24} sw={1.4}/>
          </div>

          <div className="divide-y divide-sand/80">
            {FAQS.map((item) => (
              <details key={item.q} className="faq-item py-5">
                <summary className="cursor-pointer font-display text-xl text-espresso">{item.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── RSVP ──────────────────────────────────────────────── */
function FieldLabel({ children, n }) {
  return (
    <div className="flex items-baseline gap-3 mb-3">
      <span className="font-script italic text-coffee text-sm">{n}</span>
      <span className="font-display text-espresso text-base md:text-lg">{children}</span>
    </div>
  );
}

const EMPTY_RSVP = {
  firstName: "",
  lastName: "",
  attending: "",      // 'yes' | 'no'
  plusOnes: 0,
  needsHotel: "",     // 'yes' | 'no'
  hotelCount: 1,
  family: "",
  arrival: "",        // 'car' | 'noCar'
};

const CONFETTI = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 29) % 100}%`,
  delay: `${(i % 9) * 0.13}s`,
  duration: `${2.2 + (i % 5) * 0.18}s`,
  rotate: `${(i * 47) % 180}deg`,
}));

function Confetti() {
  return (
    <div className="confetti-layer" aria-hidden="true">
      {CONFETTI.map((piece, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            transform: `rotate(${piece.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

function RSVP() {
  const [state, setState] = useState(EMPTY_RSVP);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setState((s) => ({ ...s, [k]: v }));
  const fullName = `${state.firstName} ${state.lastName}`.trim();

  const validStep1 = state.firstName.trim().length > 1 && state.lastName.trim().length > 1 && state.attending;
  const validStep2 = state.attending === "yes" && state.arrival && state.needsHotel && (
    state.needsHotel === "no" || (state.hotelCount > 0 && state.family)
  );
  const valid = state.attending === "no" ? validStep1 : validStep1 && validStep2;

  const goToSummary = () => {
    if (!validStep1) return;
    setStep(state.attending === "yes" ? 2 : 3);
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setState(EMPTY_RSVP);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="relative py-24 md:py-32 px-6">
        {state.attending === "yes" && <Confetti />}
        <div className="mx-auto max-w-2xl">
          <Reveal className="card p-10 md:p-14 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-sand grid place-items-center text-espresso">
              <Icons.Check w={26} h={26} sw={2}/>
            </div>
            <h3 className="mt-6 font-display text-3xl md:text-4xl text-espresso">Vielen Dank, {state.firstName || "ihr Lieben"}!</h3>
            <p className="mt-4 font-script italic text-coffee text-lg">— eure Antwort ist bei uns angekommen —</p>
            <p className="mt-4 text-ink/75 leading-relaxed">
              {state.attending === "yes"
                ? "Vielen Dank! Wir freuen uns riesig, dass ihr dabei seid. Bis zum 7. November!"
                : "Schade! Wir werden euch vermissen. Danke für eure Rückmeldung."}
            </p>
            <button onClick={resetForm}
              className="btn-ghost mt-8 px-6 py-3 rounded-sm text-xs uppercase tracking-[0.25em]">
              Antwort ändern
            </button>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center mb-12">
          <p className="font-script italic text-coffee text-base md:text-lg tracking-[0.18em]">— u. a. w. g. —</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-espresso">Um Rückantwort wird gebeten</h2>
          <div className="mx-auto mt-5 hairline w-40"></div>
          <p className="mt-6 text-coffee/90">Bitte gebt uns Bescheid, ob ihr dabei seid.</p>
        </Reveal>

        <Reveal>
          <form className="card p-7 md:p-10" onSubmit={(e) => { e.preventDefault(); if (valid) setSubmitted(true); }}>
            <div className="mb-10 flex items-center gap-3">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <span className={`step-dot ${step === n ? "is-active" : step > n ? "is-done" : ""}`}>{n}</span>
                  {n < 3 && <span className="step-bar"><span style={{ transform: `scaleX(${step > n ? 1 : 0})` }} /></span>}
                </React.Fragment>
              ))}
            </div>

            {step === 1 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel n="01">Vorname</FieldLabel>
                    <input
                      value={state.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className="field w-full rounded-sm px-4 py-3.5 placeholder:text-coffee/45"
                      placeholder="Vorname"
                    />
                  </div>
                  <div>
                    <FieldLabel n="02">Nachname</FieldLabel>
                    <input
                      value={state.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className="field w-full rounded-sm px-4 py-3.5 placeholder:text-coffee/45"
                      placeholder="Nachname"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <FieldLabel n="03">Zusage</FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { v: "yes", label: "Ja, wir kommen!", icon: <Icons.Check w={16} h={16} sw={2}/> },
                      { v: "no",  label: "Leider nicht", icon: <Icons.X w={16} h={16} sw={2}/> },
                    ].map(o => (
                      <label key={o.v} className={`chip ${state.attending===o.v?"is-on":""} cursor-pointer rounded-sm px-5 py-4 flex items-center gap-3 text-sm`}>
                        <input type="radio" name="attending" value={o.v}
                          checked={state.attending===o.v}
                          onChange={() => setState((s) => ({ ...s, attending: o.v, plusOnes: 0, needsHotel: "", hotelCount: 1, family: "", arrival: "" }))}
                          className="visually-hidden" />
                        <span className={`grid place-items-center h-7 w-7 rounded-full ${state.attending===o.v?"bg-cream/15":"bg-sand"} ${state.attending===o.v?"text-cream":"text-espresso"}`}>
                          {o.icon}
                        </span>
                        <span className="font-display tracking-wide">{o.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <FieldLabel n="04">Begleitpersonen</FieldLabel>
                <div className="relative">
                  <select value={state.plusOnes}
                          onChange={(e)=>set("plusOnes", Number(e.target.value))}
                          className="field w-full rounded-sm px-4 py-3.5 pr-10 appearance-none">
                    {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? "Keine" : `${n} Person${n>1?"en":""}`}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-coffee">
                    <Icons.ChevronDown w={18} h={18}/>
                  </span>
                </div>

                <div className="mt-8">
                  <FieldLabel n="05">Unterkunft benötigt?</FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { v: "yes", label: "Ja", icon: <Icons.Bed w={16} h={16} sw={1.6}/> },
                      { v: "no", label: "Nein", icon: <Icons.X w={16} h={16} sw={2}/> },
                    ].map(o => (
                      <label key={o.v} className={`chip ${state.needsHotel===o.v?"is-on":""} cursor-pointer rounded-sm px-5 py-4 flex items-center gap-3 text-sm`}>
                        <input type="radio" name="needsHotel" value={o.v}
                          checked={state.needsHotel===o.v}
                          onChange={() => setState((s) => ({ ...s, needsHotel: o.v, hotelCount: 1, family: o.v === "yes" ? s.family : "" }))}
                          className="visually-hidden" />
                        <span className={`grid place-items-center h-7 w-7 rounded-full ${state.needsHotel===o.v?"bg-cream/15":"bg-sand"} ${state.needsHotel===o.v?"text-cream":"text-espresso"}`}>
                          {o.icon}
                        </span>
                        <span className="font-display tracking-wide">{o.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {state.needsHotel === "yes" && (
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel n="06">Anzahl Zimmer</FieldLabel>
                      <div className="relative">
                        <select value={state.hotelCount}
                                onChange={(e)=>set("hotelCount", Number(e.target.value))}
                                className="field w-full rounded-sm px-4 py-3.5 pr-10 appearance-none">
                          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-coffee">
                          <Icons.ChevronDown w={18} h={18}/>
                        </span>
                      </div>
                    </div>
                    <div>
                      <FieldLabel n="07">Familie</FieldLabel>
                      <div className="relative">
                        <select value={state.family}
                                onChange={(e)=>set("family", e.target.value)}
                                className="field w-full rounded-sm px-4 py-3.5 pr-10 appearance-none">
                          <option value="">Bitte wählen</option>
                          <option value="Piro">Familie Piro</option>
                          <option value="Malki">Familie Malki</option>
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-coffee">
                          <Icons.ChevronDown w={18} h={18}/>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <FieldLabel n="08">Eigenes Auto?</FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { v: "car",   label: "Ja",   icon: <Icons.Car w={16} h={16} sw={1.7}/> },
                      { v: "noCar", label: "Nein", icon: <Icons.CarOff w={16} h={16} sw={1.7}/> },
                    ].map(o => (
                      <label key={o.v} className={`chip ${state.arrival===o.v?"is-on":""} cursor-pointer rounded-sm px-5 py-4 flex items-center gap-3 text-sm`}>
                        <input type="radio" name="arrival" value={o.v}
                          checked={state.arrival===o.v}
                          onChange={() => set("arrival", o.v)}
                          className="visually-hidden" />
                        <span className={`grid place-items-center h-7 w-7 rounded-full ${state.arrival===o.v?"bg-cream/15":"bg-sand"} ${state.arrival===o.v?"text-cream":"text-espresso"}`}>
                          {o.icon}
                        </span>
                        <span className="font-display tracking-wide">{o.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <div>
                <FieldLabel n="09">Zusammenfassung</FieldLabel>
                {state.attending === "no" ? (
                  <p className="text-ink/75 leading-relaxed">Schade, dass ihr nicht dabei sein könnt.</p>
                ) : (
                  <div className="space-y-3 text-sm text-ink/75">
                    <p><strong className="text-espresso">Name:</strong> {fullName}</p>
                    <p><strong className="text-espresso">Zusage:</strong> Ja, wir kommen!</p>
                    <p><strong className="text-espresso">Begleitpersonen:</strong> {state.plusOnes}</p>
                    <p><strong className="text-espresso">Unterkunft:</strong> {state.needsHotel === "yes" ? `Ja, ${state.hotelCount} Zimmer · Familie ${state.family}` : "Nein"}</p>
                    <p><strong className="text-espresso">Eigenes Auto:</strong> {state.arrival === "car" ? "Ja" : "Nein"}</p>
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-coffee/70 font-script italic">Bei Fragen: hochzeit@izla-gabriel.de</p>
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(state.attending === "yes" && step === 3 ? 2 : 1)}
                    className="btn-ghost px-6 py-4 rounded-sm uppercase text-xs tracking-[0.25em]">
                    Zurück
                  </button>
                )}
                {step < 3 ? (
                  <button type="button"
                    disabled={step === 1 ? !validStep1 : !validStep2}
                    onClick={step === 1 ? goToSummary : () => setStep(3)}
                    className={`btn-primary px-8 py-4 rounded-sm uppercase text-xs tracking-[0.3em] flex items-center gap-3 ${(step === 1 ? !validStep1 : !validStep2) ? "opacity-40 cursor-not-allowed" : ""}`}>
                    Weiter <Icons.ArrowRight w={14} h={14} sw={2}/>
                  </button>
                ) : (
                  <button type="submit" disabled={!valid}
                    className={`btn-primary px-8 py-4 rounded-sm uppercase text-xs tracking-[0.3em] flex items-center gap-3 ${!valid ? "opacity-40 cursor-not-allowed" : ""}`}>
                    Antwort absenden <Icons.ArrowRight w={14} h={14} sw={2}/>
                  </button>
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── Footer ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="relative py-32 md:py-44 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="mx-auto mb-10 text-coffee/70 drift">
            <Icons.Sparkles w={28} h={28} sw={1.2}/>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <blockquote className="font-display italic text-espresso text-2xl md:text-4xl leading-[1.35] [text-wrap:balance]">
            „So sind sie nicht mehr zwei, sondern ein Fleisch.
            Was nun Gott zusammengefügt hat, das soll der Mensch nicht scheiden!“
          </blockquote>
        </Reveal>
        <Reveal delay={250}>
          <div className="mt-10 flex items-center justify-center gap-5 text-coffee">
            <span className="hairline w-16"></span>
            <span className="font-script italic text-base tracking-[0.2em]">Matthäus 19,6</span>
            <span className="hairline w-16"></span>
          </div>
        </Reveal>

        <Reveal delay={450}>
          <div className="mt-24 flex flex-col items-center gap-3 text-coffee/80">
            <div className="font-display text-2xl text-espresso">
              Izla <span className="ampersand text-coffee">&amp;</span> Gabriel
            </div>
            <div className="text-[11px] tracking-[0.4em] uppercase">Izla &amp; Gabriel · 7. November 2026</div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

/* ───────────────────────────── App ───────────────────────────────────────────────── */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply palette CSS vars at root
  useEffect(() => {
    const [bg, accent, ink] = t.palette || PALETTES[0];
    const root = document.documentElement;
    root.style.setProperty("--bg", bg);
    root.style.setProperty("--coffee", accent);
    // derive softer + darker shades
    root.style.setProperty("--mocha", accent);
    root.style.setProperty("--espresso", ink);
    root.style.setProperty("--ink", ink);
    document.body.style.background = bg;
  }, [t.palette]);

  // heading font swap
  useEffect(() => {
    const id = "twk-font-style";
    let el = document.getElementById(id);
    if (!el) { el = document.createElement("style"); el.id = id; document.head.appendChild(el); }
    el.textContent = `.font-display { font-family: '${t.headingFont}', serif !important; }`;
  }, [t.headingFont]);

  return (
    <div className="relative">
      <FloatingNav/>
      <Hero heroLayout={t.heroLayout}/>
      {t.showCountdown && <Countdown/>}
      <ProposalStory/>
      {t.showGallery && <Gallery/>}
      {t.showTimeline && <Timeline/>}
      {t.showTimeline && <VenueMaps/>}
      {t.showHotels && <Hotels/>}
      <InfoSections/>
      <RSVP/>
      <Footer/>

      <TweaksPanel>
        <TweakSection label="Atmosphäre"/>
        <TweakColor label="Palette" value={t.palette}
          options={PALETTES}
          onChange={(v) => setTweak("palette", v)}/>
        <TweakSelect label="Überschrift-Font" value={t.headingFont}
          options={["Playfair Display","Cormorant Garamond","Cormorant"]}
          onChange={(v) => setTweak("headingFont", v)}/>

        <TweakSection label="Sektionen"/>
        <TweakToggle label="Countdown" value={t.showCountdown} onChange={(v) => setTweak("showCountdown", v)}/>
        <TweakToggle label="Galerie"  value={t.showGallery}   onChange={(v) => setTweak("showGallery", v)}/>
        <TweakToggle label="Timeline" value={t.showTimeline}  onChange={(v) => setTweak("showTimeline", v)}/>
        <TweakToggle label="Hotels"   value={t.showHotels}    onChange={(v) => setTweak("showHotels", v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
