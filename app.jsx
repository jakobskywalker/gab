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

function Monogram({ className = "", compact = false }) {
  return (
    <div className={`monogram-seal ${compact ? "h-16 w-16 text-2xl" : "h-28 w-28 text-5xl"} ${className}`}>
      I<span className="ampersand -mx-1">&amp;</span>G
    </div>
  );
}

function SectionIntro({ eyebrow, title, text, align = "center", className = "" }) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "text-center mx-auto" : ""} ${className}`}>
      <p className="editorial-kicker">{eyebrow}</p>
      <h2 className={`mt-5 font-display text-4xl md:text-6xl text-espresso leading-[.98] tracking-tight ${centered ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {text && (
        <p className={`mt-6 text-coffee/90 leading-relaxed ${centered ? "max-w-xl mx-auto" : "max-w-xl"}`}>
          {text}
        </p>
      )}
    </Reveal>
  );
}

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
  "heroLayout": "editorial"
}/*EDITMODE-END*/;

const PALETTES = [
  ["#FAF7F1", "#8B6F4E", "#3E2C20"], // Mocha & Espresso (default)
  ["#F5EFE3", "#A78A5F", "#2B1F16"], // Warm sand
  ["#F2EBDA", "#B89B7A", "#4A3826"], // Champagne
  ["#EFE7D6", "#7C5F44", "#1F140C"], // Cocoa
];

const NAV_LINKS = [
  { id: "gallery", label: "Detail" },
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
const HERO_IMAGE = "/images/paar-professionell-ganzkoerper.png";

function Hero({ heroLayout = "editorial" }) {
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

  if (heroLayout === "cinematic") {
    return (
      <section className="hero-cinematic relative min-h-[100svh] w-full overflow-hidden px-6 py-8 text-cream md:px-10">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Izla & Gabriel"
            className="h-full w-full object-cover transition-transform duration-200 ease-out"
            style={{ transform: `translateY(${scrollY * 0.12}px) scale(1.08)` }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140d08]/90 via-[#140d08]/46 to-[#140d08]/78" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_38%,transparent_0%,rgba(20,13,8,.24)_42%,rgba(20,13,8,.76)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col">
          <div className="flex items-center justify-between py-4 text-cream/82">
            <span className="font-script text-base italic tracking-[0.18em]">Piro <span className="ampersand">&amp;</span> Malki</span>
            <Monogram compact className="hidden text-cream/90 sm:grid" />
            <span className="font-micro text-right">Private Wedding<br className="hidden sm:block" /> 2026</span>
          </div>

          <div className="flex flex-1 items-center">
            <div className="max-w-5xl">
              <Reveal delay={120}>
                <p className="font-micro text-sand/90">7. November 2026 / Augsburg / Elchingen</p>
              </Reveal>
              <Reveal delay={280} className="mt-8">
                <h1 className="hero-cinematic-title font-display text-[clamp(5rem,15vw,14rem)] font-medium leading-[.74] tracking-[-.085em]">
                  Izla<br />
                  <span className="pl-[.18em] italic text-sand">&amp;</span><br />
                  Gabriel
                </h1>
              </Reveal>
              <Reveal delay={520} className="mt-8 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:items-center">
                <div className="hidden h-px w-36 bg-gradient-to-r from-cream/75 to-transparent md:block"></div>
                <p className="font-script text-2xl italic leading-snug text-cream/86 md:text-3xl">
                  Ein Abend voller Segen, Familie, Musik und Liebe.
                </p>
              </Reveal>
              <Reveal delay={700} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => scrollTo("rsvp")} className="hero-cta hero-cta-primary">
                  <span>RSVP öffnen</span>
                  <Icons.ArrowRight w={15} h={15} sw={2}/>
                </button>
                <button onClick={() => scrollTo("timeline")} className="hero-cta hero-cta-secondary">
                  <span>Ablauf ansehen</span>
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (heroLayout === "invitation") {
    return (
      <section className="hero-invitation relative min-h-[100svh] w-full overflow-hidden px-6 py-8 text-espresso md:px-10">
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col">
          <div className="flex items-center justify-between py-4 text-coffee">
            <span className="font-script text-base italic tracking-[0.18em]">Piro <span className="ampersand">&amp;</span> Malki</span>
            <span className="font-micro text-right">Augsburg / Elchingen</span>
          </div>

          <div className="grid flex-1 grid-cols-1 items-center gap-8 py-8 lg:grid-cols-[1fr_.72fr]">
            <Reveal delay={120}>
              <div className="hero-paper-card ornament-corners mx-auto max-w-2xl px-8 py-14 text-center md:px-14 md:py-20">
                <Monogram className="mx-auto text-coffee" />
                <p className="mt-10 font-micro text-coffee">Wir heiraten</p>
                <h1 className="mt-7 font-display text-[clamp(3.8rem,10vw,8.5rem)] font-medium leading-[.86] tracking-[-.06em]">
                  Izla <span className="ampersand block text-coffee">&amp;</span> Gabriel
                </h1>
                <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-coffee/55 to-transparent"></div>
                <p className="mt-8 font-display text-2xl text-espresso md:text-4xl">7. November 2026</p>
                <p className="mt-4 font-script text-xl italic leading-relaxed text-coffee md:text-2xl">
                  Kirchliche Trauung und Hochzeitsfeier mit unseren Familien.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                  <button onClick={() => scrollTo("rsvp")} className="btn-primary inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-xs uppercase tracking-[0.26em]">
                    RSVP öffnen <Icons.ArrowRight w={14} h={14} sw={2}/>
                  </button>
                  <button onClick={() => scrollTo("timeline")} className="btn-ghost inline-flex items-center justify-center rounded-full px-7 py-4 text-xs uppercase tracking-[0.24em]">
                    Ablauf ansehen
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220} className="hidden lg:block">
              <div className="ph mt-20 aspect-[3/4] rotate-[2deg]">
                <img src={HERO_IMAGE} alt="Izla und Gabriel" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-editorial relative min-h-[100svh] w-full overflow-hidden px-5 py-5 text-espresso md:px-10 md:py-8">
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2.5rem)] w-full max-w-7xl flex-col md:min-h-[calc(100svh-4rem)]">
        <div className="flex items-center justify-center gap-6 py-3 text-coffee md:justify-between md:py-4">
          <span className="font-script text-base italic tracking-[0.14em] md:tracking-[0.18em]">Piro <span className="ampersand">&amp;</span> Malki</span>
          <Monogram compact className="hidden text-coffee sm:grid" />
          <span className="hidden font-micro text-right md:block">Private Wedding<br /> 07.11.2026</span>
        </div>

        <div className="grid flex-1 grid-cols-1 items-center gap-8 py-8 md:gap-10 md:py-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
          <div className="relative z-20 order-2 lg:order-1">
            <Reveal delay={120}>
              <p className="font-micro text-coffee">7. November 2026 / Augsburg & Elchingen</p>
            </Reveal>

            <Reveal delay={260} className="mt-7">
              <h1 className="whitespace-nowrap font-display text-[clamp(3.2rem,16vw,4.8rem)] font-medium leading-[.86] tracking-[-.08em] md:whitespace-normal md:text-[clamp(4.4rem,12vw,11rem)] md:leading-[.76]">
                <span className="inline md:block">Izla</span>
                <span className="inline px-2 italic text-coffee md:block md:px-0 md:pl-[.28em]">&amp;</span>
                <span className="inline md:block md:pl-[.1em]">Gabriel</span>
              </h1>
            </Reveal>

            <Reveal delay={430} className="mt-8 max-w-xl">
              <p className="font-script text-2xl italic leading-snug text-coffee md:text-3xl">
                Zwei Familien, ein Versprechen und ein Abend, den wir mit euch für immer behalten möchten.
              </p>
            </Reveal>

            <Reveal delay={560} className="mt-9 flex flex-col gap-3 sm:flex-row md:mt-10">
              <button onClick={() => scrollTo("rsvp")} className="btn-primary inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-xs uppercase tracking-[0.26em]">
                RSVP öffnen <Icons.ArrowRight w={14} h={14} sw={2}/>
              </button>
              <button onClick={() => scrollTo("timeline")} className="btn-ghost inline-flex items-center justify-center rounded-full px-7 py-4 text-xs uppercase tracking-[0.24em]">
                Ablauf ansehen
              </button>
            </Reveal>
          </div>

          <Reveal delay={260} className="relative order-1 lg:order-2">
            <div className="absolute -left-5 top-10 z-20 hidden hero-invite-card px-6 py-5 text-espresso md:block">
              <p className="font-micro text-coffee">Save the date</p>
              <div className="mt-3 flex items-end gap-3">
                <span className="font-display text-6xl leading-none">07</span>
                <span className="pb-2 font-script text-2xl italic text-coffee">November 2026</span>
              </div>
            </div>

            <div className="hero-image-panel aspect-[4/5] min-h-[360px] md:aspect-[5/6] md:min-h-[420px] lg:min-h-[680px]">
              <img
                src={HERO_IMAGE}
                alt="Izla & Gabriel"
                className="h-full w-full object-cover transition-transform duration-200 ease-out"
                style={{ transform: `translateY(${scrollY * 0.08}px) scale(1.045)` }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-cream md:p-9">
                <p className="font-micro text-cream/75">Kirchliche Trauung und Hochzeitsfeier</p>
                <p className="mt-3 font-display text-3xl leading-none md:text-5xl">7. November 2026</p>
              </div>
            </div>

            <div className="absolute -right-4 bottom-10 z-20 hidden rounded-full bg-cream/90 p-3 shadow-[0_20px_50px_-32px_rgba(62,44,32,.8)] md:block">
              <Monogram compact className="text-coffee" />
            </div>
          </Reveal>
        </div>

        <div className="hidden items-end justify-between pb-4 text-coffee/75 md:flex">
          <span className="font-script text-base italic tracking-[0.18em]">Familie Piro <span className="ampersand">&amp;</span> Familie Malki</span>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em]">scroll</span>
            <div className="h-10 w-px bg-coffee/35 animate-pulse"></div>
          </div>
          <span className="font-micro text-right">Augsburg / Elchingen</span>
        </div>
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
    <section id="countdown" className="section-shell relative py-24 md:py-32 px-6">
      <span className="section-label">Countdown</span>
      <div className="mx-auto max-w-5xl text-center">
        <SectionIntro
          eyebrow="gemeinsam"
          title="Bis zum großen Tag"
          text="Wir können es kaum erwarten, diesen Moment mit euch zu teilen. Nur noch ein wenig Geduld."
        />

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
  { src: "/images/paar-professionell-blumen.png", alt: "Brautstrauß von Izla und Gabriel" },
];

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
  const hasMultipleImages = GALLERY.length > 1;

  return (
    <section id="gallery" className="gallery-album section-shell relative overflow-hidden py-20 md:py-32 px-6 bg-ivory/50">
      <span className="section-label">Detail</span>
      <span className="script-watermark left-[-4vw] top-20">Rosen</span>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[.76fr_1.24fr] lg:gap-16">
          <SectionIntro
            eyebrow="ein detail"
            title="Weiße Rosen, ein Versprechen"
            text="Ein stiller Blick auf den Tag: klar, festlich und voller Vorfreude auf den 7. November."
            align="left"
            className="max-w-xl"
          />

          <Reveal delay={140} className="contact-sheet p-3 md:p-5">
            <button
              type="button"
              onClick={() => setActive(0)}
              className="album-frame group block aspect-[5/4] w-full cursor-zoom-in text-left md:aspect-[16/10]"
            >
              <img src={GALLERY[0].src} alt={GALLERY[0].alt} loading="lazy" />
              <span className="absolute left-4 top-4 z-20 photo-number bg-cream/90">01</span>
            </button>
          </Reveal>
        </div>
      </div>

      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.alt}>
          <button type="button" className="lightbox-close" onClick={() => setActive(null)} aria-label="Galerie schließen">
            <Icons.X w={22} h={22} sw={2}/>
          </button>
          {hasMultipleImages && (
            <button type="button" className="lightbox-nav left-5 md:left-8" onClick={showPrev} aria-label="Vorheriges Bild">
              <span>&lsaquo;</span>
            </button>
          )}
          <img src={activeImage.src} alt={activeImage.alt} />
          {hasMultipleImages && (
            <button type="button" className="lightbox-nav right-5 md:right-8" onClick={showNext} aria-label="Nächstes Bild">
              <span>&rsaquo;</span>
            </button>
          )}
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
    <section id="timeline" ref={ref} className="section-shell relative overflow-hidden py-24 md:py-36 px-6">
      <span className="section-label">Ablauf</span>
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 grid grid-cols-1 items-end gap-8 md:grid-cols-[.9fr_1.1fr]">
          <SectionIntro
            eyebrow="ablauf des tages"
            title="7. November 2026"
            align="left"
          />
          <Reveal delay={120} className="max-w-xl text-coffee/90 leading-relaxed md:justify-self-end">
            <p>
              Ein klarer Überblick über den Tag: von den ersten Familienmomenten in Augsburg bis zur Feier in Elchingen.
            </p>
          </Reveal>
        </div>

        <ol className="relative border-l border-sand/90 md:ml-28">
          <span
            className="absolute left-[-1px] top-0 w-px bg-coffee transition-[height] duration-300 ease-out"
            style={{ height: `${progress * 100}%` }}
          />
          {TIMELINE.map((t, i) => {
            const IconComp = Icons[t.icon];
            return (
              <Reveal as="li" key={i} delay={i * 120}
                className="relative grid grid-cols-1 gap-5 pb-12 pl-8 last:pb-0 md:grid-cols-[180px_1fr] md:gap-10 md:pl-12">
                <span className="absolute -left-[9px] top-2 z-10 grid h-4 w-4 place-items-center rounded-full bg-coffee ring-8 ring-cream" />
                <div>
                  <p className="font-display text-5xl leading-none text-espresso md:text-6xl">{t.time}</p>
                  <p className="mt-1 font-script text-lg italic tracking-wide text-coffee">Uhr</p>
                </div>
                <article className="border-b border-sand/80 pb-10">
                  <div className="mb-4 flex items-center gap-3 text-coffee">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-sand/80 text-espresso">
                    <IconComp w={20} h={20} sw={1.6} />
                  </span>
                    <span className="font-micro">Station {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display text-3xl leading-tight text-espresso md:text-4xl">{t.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-coffee/85">{t.sub}</p>
                  {t.note && <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-ink/75">{t.note}</p>}
                </article>
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
    <section id="locations" className="section-shell relative py-24 md:py-36 px-6 bg-ivory/50">
      <span className="section-label">Orte</span>
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="alle orte"
          title="Anfahrt & Locations"
          text="Öffnet die Adresse direkt in Google Maps und plant eure Route ohne langes Suchen."
          className="mb-14 max-w-2xl"
        />

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
              <div className="p-6 md:p-7">
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
    <section id="hotels" className="section-shell relative py-24 md:py-36 px-6 bg-ivory/50">
      <span className="section-label">Stay</span>
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="bleibt bei uns"
          title="Unterkünfte"
          text="Für beide Familien werden Zimmer reserviert. Weitere Details teilen wir rechtzeitig mit euch."
          className="mb-14 max-w-2xl"
        />

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
    <section id="info" className="section-shell relative py-24 md:py-36 px-6">
      <span className="section-label">Details</span>
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="gut zu wissen"
          title="Infos für euch"
          className="mb-14 max-w-2xl"
        />

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
      <section id="rsvp" className="section-shell relative py-24 md:py-36 px-6">
        {state.attending === "yes" && <Confetti />}
        <div className="mx-auto max-w-2xl">
          <Reveal className="lux-panel ornament-corners p-10 md:p-14 text-center">
            <Monogram className="mx-auto mb-8 text-coffee" />
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
    <section id="rsvp" className="section-shell relative overflow-hidden py-24 md:py-36 px-6">
      <span className="section-label">RSVP</span>
      <span className="script-watermark right-[-5vw] top-20">RSVP</span>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-[.82fr_1.18fr]">
        <div className="lg:sticky lg:top-28">
          <SectionIntro
            eyebrow="u. a. w. g."
            title="Um Rückantwort wird gebeten"
            text="Bitte gebt uns Bescheid, ob ihr dabei seid. Das hilft uns bei Sitzplan, Unterkunft und Ablauf."
            align="left"
          />
          <Reveal delay={160} className="mt-10 hidden lg:block">
            <Monogram className="text-coffee/80" />
          </Reveal>
        </div>

        <Reveal>
          <form className="lux-panel ornament-corners p-7 md:p-10" onSubmit={(e) => { e.preventDefault(); if (valid) setSubmitted(true); }}>
            <div className="mb-10 flex items-center gap-3">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <span className={`step-dot ${step === n ? "is-active" : step > n ? "is-done" : ""}`}>{n}</span>
                  {n < 3 && <span className="step-bar"><span style={{ transform: `scaleX(${step > n ? 1 : 0})` }} /></span>}
                </React.Fragment>
              ))}
            </div>

            {step === 1 && (
              <div key="step-1" className="rsvp-step">
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
              </div>
            )}

            {step === 2 && (
              <div key="step-2" className="rsvp-step">
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
              </div>
            )}

            {step === 3 && (
              <div key="step-3" className="rsvp-step">
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
      {t.showGallery && <Gallery/>}
      {t.showCountdown && <Countdown/>}
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
        <TweakSelect label="Hero-Konzept" value={t.heroLayout}
          options={["editorial","cinematic","invitation"]}
          onChange={(v) => setTweak("heroLayout", v)}/>

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
