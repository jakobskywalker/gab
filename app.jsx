import React, { useState, useEffect, useRef, useMemo, useContext, useCallback, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle, TweakSelect } from './tweaks-panel.jsx'

/* ───────────────────────────── i18n ─────────────────────────────────────────────── */
const LANG_STORAGE_KEY = "izla-gabriel-lang";
const DEFAULT_LOCALE = "de";

const SITE_COPY = {
  de: {
    a11y: {
      floatingNav: "Seitennavigation",
      langSwitcher: "Sprache wählen",
      countdownSection: "Countdown bis zur Hochzeit",
    },
    nav: {
      timeline: "Ablauf",
      locations: "Anfahrt",
      hotels: "Unterkunft",
      deadline: "RSVP",
    },
    hero: {
      cinematicDate: "7. November 2026 / Augsburg / Elchingen",
      cinematicTagline: "Ein Abend voller Segen, Familie, Musik und Liebe.",
      privateWedding: "Private Hochzeit\n2026",
      invitationSubtitle: "Wir heiraten",
      invitationLead: "Vor Gott und unseren Liebsten sagen wir Ja!",
      invitationImgAlt: "Izla und Gabriel",
      editorialDate: "Samstag, 07. November 2026",
      editorialLead: "Vor Gott und unseren Liebsten sagen wir Ja!",
      places: "Augsburg & Elchingen",
      placesShort: "Augsburg / Elchingen",
      ctaRSVP: "RSVP öffnen",
      ctaTimeline: "Ablauf ansehen",
      scroll: "scroll",
    },
    countdown: {
      section: "Countdown",
      eyebrow: "gemeinsam",
      title: "Bis zum großen Tag",
      body: "Wir können es kaum erwarten, diesen Moment mit euch zu teilen. Nur noch ein wenig Geduld.",
      days: "Tage",
      hours: "Stunden",
      minutes: "Minuten",
    },
    timeline: [
      { time: "13:00", title: "Teqimo Bräutigam", sub: "Zur Aumühle 9, 86153 Augsburg", icon: "Sparkles", note: "" },
      { time: "13:45", title: "Teqimo Braut", sub: "Vienna House Easy, Am Technologiezentrum 1, 86159 Augsburg", icon: "Heart", note: "" },
      { time: "14:45", title: "Kirchliche Trauung", sub: "Syrisch-Orthodoxe Kirche von Antiochien, Zusamstraße 17, 86165 Augsburg", icon: "Heart", note: "Bitte pünktlich erscheinen." },
      { time: "17:00", title: "Hochzeitsfeier", sub: "MAVI Event & Location (Rüya Saal), Daimlerstraße 3, 89275 Elchingen", icon: "Music", note: "Ausreichend Parkplätze vorhanden." },
    ],
    timelineSection: {
      section: "Ablauf",
      eyebrow: "ablauf des tages",
      title: "7. November 2026",
      intro: "Ein klarer Überblick über den Tag: von den ersten Familienmomenten in Augsburg bis zur Feier in Elchingen.",
      oclock: "Uhr",
      stationPrefix: "Station",
    },
    locations: [
      {
        title: "Teqimo Bräutigam",
        time: "13:00 Uhr",
        address: "Zur Aumühle 9, 86153 Augsburg",
        image: "/images/location-kirche.png",
        imageAlt: "Teqimo Bräutigam",
      },
      {
        title: "Teqimo Braut",
        time: "13:45 Uhr",
        address: "Vienna House Easy, Am Technologiezentrum 1, 86159 Augsburg",
        image: "/images/location-teqimo-braut.png",
        imageAlt: "Teqimo Braut",
      },
      {
        title: "Kirchliche Trauung",
        time: "14:45 Uhr",
        address: "Syrisch-Orthodoxe Kirche von Antiochien, Zusamstraße 17, 86165 Augsburg",
        image: "/images/location-teqimo-braeutigam.png",
        imageAlt: "Kirche der Trauung",
      },
      {
        title: "Hochzeitsfeier",
        time: "17:00 Uhr",
        address: "MAVI Event & Location (Rüya Saal), Daimlerstraße 3, 89275 Elchingen",
        image: "/images/location-saal.png",
        imageAlt: "Saal der Hochzeitsfeier",
      },
    ],
    venueMaps: {
      section: "Orte",
      eyebrow: "alle orte",
      title: "Anfahrt & Locations",
      body: "Öffnet die Adresse direkt in Google Maps und plant eure Route ohne langes Suchen.",
      openRoute: "Route öffnen",
    },
    hotels: [
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
    ],
    hotelsSection: {
      section: "Stay",
      eyebrow: "bleibt bei uns",
      title: "Unterkünfte",
      intro: "Für beide Familien werden Zimmer reserviert. Weitere Details teilen wir rechtzeitig mit euch.",
      mapFrameTitleSuffix: " auf Google Maps",
      reservedBadge: "Reserviert",
    },
    deadline: {
      eyebrow: "wichtige information",
      titleLine1: "Rückmeldung bis",
      date: "01. August 2026",
      body: "Damit wir Plätze, Ablauf und Feier verlässlich planen können, bitten wir euch um eure Zusage oder Absage bis zu diesem Datum.",
      cta: "Jetzt anmelden",
    },
    verse: {
      quote:
        "„So sind sie nicht mehr zwei, sondern ein Fleisch. Was nun Gott zusammengefügt hat, das soll der Mensch nicht scheiden!“",
      ref: "Matthäus 19,6",
    },
    rsvp: {
      section: "RSVP",
      watermark: "RSVP",
      eyebrow: "rsvp",
      title: "Um Rückantwort wird gebeten",
      intro:
        "Wir bitten um Rückmeldung bis zum 01. August 2026, damit wir Sitzplan, Unterkunft und Ablauf gut vorbereiten können.",
      thanksTitle: (name) => `Vielen Dank, ${name}!`,
      thanksFallbackName: "ihr Lieben",
      thanksSub: "— eure Antwort ist bei uns angekommen —",
      thanksYes: "Vielen Dank! Wir freuen uns riesig, dass ihr dabei seid. Bis zum 7. November!",
      thanksNo: "Schade! Wir werden euch vermissen. Danke für eure Rückmeldung.",
      changeAnswer: "Antwort ändern",
      firstName: "Vorname",
      lastName: "Nachname",
      placeholderFirstName: "Vorname",
      placeholderLastName: "Nachname",
      attending: "Zusage",
      yesAttend: "Ja, wir kommen!",
      noAttend: "Leider nicht",
      companions: "Begleitpersonen",
      companionNone: "Keine",
      companionN: (n) => `${n} Person${n > 1 ? "en" : ""}`,
      otherGuestNames: "Namen der weiteren Personen",
      placeholderGuest: "Vor- und Nachname",
      guestHint:
        "Bitte tragt jede Person einzeln ein, damit wir Sitzplan und Einlass sauber vorbereiten können.",
      needsHotel: "Unterkunft benötigt?",
      yes: "Ja",
      no: "Nein",
      roomCount: "Anzahl Zimmer",
      family: "Familie",
      chooseFamily: "Bitte wählen",
      familyPiro: "Familie Piro",
      familyMalki: "Familie Malki",
      ownCar: "Eigenes Auto?",
      summary: "Zusammenfassung",
      summaryNoGuests: "Schade, dass ihr nicht dabei sein könnt.",
      labelName: "Name:",
      labelAttending: "Zusage:",
      labelCompanions: "Begleitpersonen:",
      labelOtherGuests: "Weitere Personen:",
      labelHotel: "Unterkunft:",
      labelCar: "Eigenes Auto:",
      summaryYesPhrase: "Ja, wir kommen!",
      summaryHotelYes: (n, fam) => `Ja, ${n} Zimmer · Familie ${fam}`,
      summaryHotelNo: "Nein",
      questionsFooter: "Bei Fragen: hochzeit@izla-gabriel.de",
      back: "Zurück",
      next: "Weiter",
      submit: "Antwort absenden",
    },
    footerTagline: "Izla &amp; Gabriel · 7. November 2026",
  },
  en: {
    a11y: {
      floatingNav: "Section navigation",
      langSwitcher: "Choose language",
      countdownSection: "Countdown to the wedding",
    },
    nav: {
      timeline: "Schedule",
      locations: "Getting there",
      hotels: "Stay",
      deadline: "RSVP",
    },
    hero: {
      cinematicDate: "November 7, 2026 / Augsburg / Elchingen",
      cinematicTagline: "An evening filled with blessings, family, music, and love.",
      privateWedding: "Private Wedding\n2026",
      invitationSubtitle: "We are getting married",
      invitationLead: "Before God and our loved ones, we say yes!",
      invitationImgAlt: "Izla and Gabriel",
      editorialDate: "Saturday, November 7, 2026",
      editorialLead: "Before God and our loved ones, we say yes!",
      places: "Augsburg & Elchingen",
      placesShort: "Augsburg / Elchingen",
      ctaRSVP: "Open RSVP",
      ctaTimeline: "View schedule",
      scroll: "scroll",
    },
    countdown: {
      section: "Countdown",
      eyebrow: "together",
      title: "Until the big day",
      body:
        "We can hardly wait to share this moment with you — just a little longer now.",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
    },
    timeline: [
      { time: "13:00", title: "Teqimo groom", sub: "Zur Aumühle 9, 86153 Augsburg", icon: "Sparkles", note: "" },
      { time: "13:45", title: "Teqimo bride", sub: "Vienna House Easy, Am Technologiezentrum 1, 86159 Augsburg", icon: "Heart", note: "" },
      {
        time: "14:45",
        title: "Church ceremony",
        sub: "Syriac Orthodox Church of Antioch, Zusamstraße 17, 86165 Augsburg",
        icon: "Heart",
        note: "Please arrive on time.",
      },
      { time: "17:00", title: "Wedding reception", sub: "MAVI Event & Location (Rüya Saal), Daimlerstraße 3, 89275 Elchingen", icon: "Music", note: "Plenty of parking available." },
    ],
    timelineSection: {
      section: "Schedule",
      eyebrow: "the day ahead",
      title: "November 7, 2026",
      intro: "From the first family moments in Augsburg to the celebration in Elchingen — here's the plan.",
      oclock: "o'clock",
      stationPrefix: "Stop",
    },
    locations: [
      {
        title: "Teqimo groom",
        time: "1:00 p.m.",
        address: "Zur Aumühle 9, 86153 Augsburg",
        image: "/images/location-kirche.png",
        imageAlt: "Teqimo groom",
      },
      {
        title: "Teqimo bride",
        time: "1:45 p.m.",
        address: "Vienna House Easy, Am Technologiezentrum 1, 86159 Augsburg",
        image: "/images/location-teqimo-braut.png",
        imageAlt: "Teqimo bride",
      },
      {
        title: "Church ceremony",
        time: "2:45 p.m.",
        address: "Syriac Orthodox Church of Antioch, Zusamstraße 17, 86165 Augsburg",
        image: "/images/location-teqimo-braeutigam.png",
        imageAlt: "Church ceremony",
      },
      {
        title: "Wedding reception",
        time: "5:00 p.m.",
        address: "MAVI Event & Location (Rüya Saal), Daimlerstraße 3, 89275 Elchingen",
        image: "/images/location-saal.png",
        imageAlt: "Reception venue",
      },
    ],
    venueMaps: {
      section: "Places",
      eyebrow: "all venues",
      title: "Directions & venues",
      body: "Open the address directly in Google Maps and plan your route without searching forever.",
      openRoute: "Open directions",
    },
    hotels: [
      {
        name: "Vienna House Easy by Wyndham Augsburg",
        sub: "Piro family",
        mapUrl: "https://maps.google.com/maps?q=Vienna%20House%20Easy%20by%20Wyndham%20Augsburg%2C%20Am%20Technologiezentrum%201%2C%2086159%20Augsburg&t=&z=16&ie=UTF8&iwloc=&output=embed",
        desc: "Am Technologiezentrum 1, 86159 Augsburg. Rooms reserved for guests. More details coming soon.",
        price: "TBA",
      },
      {
        name: "QU Hotel Augsburg",
        sub: "Malki family",
        mapUrl: "https://maps.google.com/maps?q=QU%20Hotel%20Augsburg%2C%20Kurt-Schumacher-Stra%C3%9Fe%206%2C%2086165%20Augsburg&t=&z=16&ie=UTF8&iwloc=&output=embed",
        desc: "Kurt-Schumacher-Straße 6, 86165 Augsburg. Rooms reserved for guests. More details coming soon.",
        price: "TBA",
      },
    ],
    hotelsSection: {
      section: "Stay",
      eyebrow: "stay with us",
      title: "Accommodation",
      intro: "Rooms are held for both families. We'll share more details in good time.",
      mapFrameTitleSuffix: " on Google Maps",
      reservedBadge: "Reserved",
    },
    deadline: {
      eyebrow: "important",
      titleLine1: "Please respond by",
      date: "August 1, 2026",
      body: "So we can plan seating, flow, and the celebration with confidence, please let us know if you're coming by this date.",
      cta: "RSVP now",
    },
    verse: {
      // NIV (2011) Matthew 19:6 — verbatim wording
      quote:
        "“So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.”",
      ref: "Matthew 19:6 (NIV)",
    },
    rsvp: {
      section: "RSVP",
      watermark: "RSVP",
      eyebrow: "rsvp",
      title: "Kindly respond",
      intro:
        "Please reply by August 1, 2026 so we can prepare seating, accommodation, and the flow of the day.",
      thanksTitle: (name) => `Thank you, ${name}!`,
      thanksFallbackName: "friends",
      thanksSub: "— we've received your reply —",
      thanksYes: "We're so glad you'll be there with us. See you on November 7!",
      thanksNo: "We'll miss you. Thank you for letting us know.",
      changeAnswer: "Change reply",
      firstName: "First name",
      lastName: "Last name",
      placeholderFirstName: "First name",
      placeholderLastName: "Last name",
      attending: "Will you attend?",
      yesAttend: "Yes, we'll be there!",
      noAttend: "Sadly not",
      companions: "Plus-ones",
      companionNone: "None",
      companionN: (n) => `${n} guest${n > 1 ? "s" : ""}`,
      otherGuestNames: "Names of additional guests",
      placeholderGuest: "First and last name",
      guestHint: "Please add each guest separately so we can plan seating and arrival smoothly.",
      needsHotel: "Need a hotel?",
      yes: "Yes",
      no: "No",
      roomCount: "Number of rooms",
      family: "Family",
      chooseFamily: "Please select",
      familyPiro: "Piro family",
      familyMalki: "Malki family",
      ownCar: "Driving?",
      summary: "Summary",
      summaryNoGuests: "We're sorry you can't join us.",
      labelName: "Name:",
      labelAttending: "Attendance:",
      labelCompanions: "Plus-ones:",
      labelOtherGuests: "Other guests:",
      labelHotel: "Hotel:",
      labelCar: "Driving:",
      summaryYesPhrase: "Yes, we'll be there!",
      summaryHotelYes: (n, fam) => `Yes — ${n} room${n > 1 ? "s" : ""} · ${fam}`,
      summaryHotelNo: "No",
      questionsFooter: "Questions: hochzeit@izla-gabriel.de",
      back: "Back",
      next: "Next",
      submit: "Send reply",
    },
    footerTagline: "Izla &amp; Gabriel · November 7, 2026",
  },
};

const I18nContext = createContext(null);

function useSiteCopy() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useSiteCopy must be used within I18nProvider");
  return ctx;
}

function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const s = localStorage.getItem(LANG_STORAGE_KEY);
      if (s === "en" || s === "de") return s;
    } catch (e) { /* ignore */ }
    return DEFAULT_LOCALE;
  });

  const setLocale = useCallback((next) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "de";
    document.title = locale === "en" ? "Izla & Gabriel · November 7, 2026" : "Izla & Gabriel · 7. November 2026";
  }, [locale]);

  const value = useMemo(() => {
    const copy = SITE_COPY[locale] || SITE_COPY[DEFAULT_LOCALE];
    return { locale, setLocale, copy };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function LanguageSwitcher() {
  const { locale, setLocale, copy } = useSiteCopy();
  return (
    <div
      className="pointer-events-auto fixed right-4 top-4 z-[120] flex items-center gap-0.5 rounded-full border border-white/55 bg-cream/85 px-1 py-1 shadow-[0_8px_30px_rgba(62,44,32,.12)] backdrop-blur-md md:right-6 md:top-6"
      role="group"
      aria-label={copy.a11y.langSwitcher}
    >
      {(["de", "en"]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`min-w-[2.5rem] rounded-full px-2.5 py-1.5 font-micro text-[10px] uppercase tracking-[0.22em] transition-colors ${
            locale === code ? "bg-espresso text-cream" : "text-coffee/75 hover:bg-sand/60 hover:text-espresso"
          }`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

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

function FloatingNav() {
  const { copy } = useSiteCopy();
  const [visible, setVisible] = useState(false);
  const links = [
    { id: "timeline", label: copy.nav.timeline },
    { id: "locations", label: copy.nav.locations },
    { id: "hotels", label: copy.nav.hotels },
    { id: "rsvp", label: copy.nav.deadline },
  ];

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
    <nav className={`floating-nav ${visible ? "is-visible" : ""}`} aria-label={copy.a11y.floatingNav}>
      {links.map((link) => (
        <button key={link.id} type="button" onClick={() => scrollTo(link.id)}>
          {link.label}
        </button>
      ))}
    </nav>
  );
}

/* ───────────────────────────── Hero ──────────────────────────────────────────────── */
const HERO_IMAGE = "/images/hero-paar-wand.png";

function Hero({ heroLayout = "editorial" }) {
  const { copy } = useSiteCopy();
  const hero = copy.hero;
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
            <span className="font-micro whitespace-pre-line text-right">{hero.privateWedding}</span>
          </div>

          <div className="flex flex-1 items-center">
            <div className="max-w-5xl">
              <Reveal delay={120}>
                <p className="font-micro text-sand/90">{hero.cinematicDate}</p>
              </Reveal>
              <Reveal delay={280} className="mt-8">
                <h1 className="hero-cinematic-title hero-script-title">
                  Izla<br />
                  <span className="pl-[.18em] italic text-sand">&amp;</span><br />
                  Gabriel
                </h1>
              </Reveal>
              <Reveal delay={520} className="mt-8 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:items-center">
                <div className="hidden h-px w-36 bg-gradient-to-r from-cream/75 to-transparent md:block"></div>
                <p className="font-script text-2xl italic leading-snug text-cream/86 md:text-3xl">
                  {hero.cinematicTagline}
                </p>
              </Reveal>
              <Reveal delay={700} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => scrollTo("rsvp")} className="hero-cta hero-cta-primary">
                  <span>{hero.ctaRSVP}</span>
                  <Icons.ArrowRight w={15} h={15} sw={2}/>
                </button>
                <button onClick={() => scrollTo("timeline")} className="hero-cta hero-cta-secondary">
                  <span>{hero.ctaTimeline}</span>
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
            <span className="font-micro text-right">{hero.placesShort}</span>
          </div>

          <div className="grid flex-1 grid-cols-1 items-center gap-8 py-8 lg:grid-cols-[1fr_.72fr]">
            <Reveal delay={120}>
              <div className="hero-paper-card ornament-corners mx-auto max-w-2xl px-8 py-14 text-center md:px-14 md:py-20">
                <Monogram className="mx-auto text-coffee" />
                <p className="mt-10 font-micro text-coffee">{hero.invitationSubtitle}</p>
                <h1 className="hero-script-title mt-7">
                  Izla <span className="ampersand block text-coffee">&amp;</span> Gabriel
                </h1>
                <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-coffee/55 to-transparent"></div>
                <p className="mt-8 font-display text-2xl text-espresso md:text-4xl">7. November 2026</p>
                <p className="mt-4 font-script text-xl italic leading-relaxed text-coffee md:text-2xl">
                  {hero.invitationLead}
                </p>
                <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                  <button onClick={() => scrollTo("rsvp")} className="btn-primary inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-xs uppercase tracking-[0.26em]">
                    {hero.ctaRSVP} <Icons.ArrowRight w={14} h={14} sw={2}/>
                  </button>
                  <button onClick={() => scrollTo("timeline")} className="btn-ghost inline-flex items-center justify-center rounded-full px-7 py-4 text-xs uppercase tracking-[0.24em]">
                    {hero.ctaTimeline}
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220} className="hidden lg:block">
              <div className="ph mt-20 aspect-[3/4] rotate-[2deg]">
                <img src={HERO_IMAGE} alt={hero.invitationImgAlt} loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-cover relative w-full overflow-hidden px-5 py-8 text-espresso md:min-h-[100svh] md:px-10 md:py-8">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col md:min-h-[calc(100svh-4rem)]">
        <div className="grid flex-1 grid-cols-1 items-center gap-7 py-4 md:gap-10 md:py-12 lg:grid-cols-[minmax(0,.86fr)_minmax(420px,1.14fr)] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-8 xl:gap-x-24">
          <Reveal delay={160} className="hero-cover-content mx-auto max-w-xl text-center lg:col-start-1 lg:row-start-1 lg:mx-0 lg:self-end lg:text-left">
            <p className="font-micro text-coffee">{hero.editorialDate}</p>
            <h1 className="hero-cover-title mt-8 text-espresso md:mt-12">
              Izla <span className="ampersand">&amp;</span> Gabriel
            </h1>
            <div className="hero-cover-rule mx-auto mt-5 hidden w-full max-w-sm md:mt-8 md:block md:max-w-md lg:mx-0" />
          </Reveal>

          <Reveal delay={260} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="hero-portrait-card mx-auto aspect-[3/4] w-[88%] max-w-[22rem] md:aspect-[4/5] md:w-full md:max-w-[36rem] lg:min-h-[670px] lg:max-w-none">
              <img
                src={HERO_IMAGE}
                alt="Izla & Gabriel"
                className="hero-cover-image h-full w-full object-cover object-[50%_42%] transition-transform duration-200 ease-out"
                style={{ transform: `translateY(${scrollY * 0.025}px) scale(1.008)` }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          </Reveal>

          <Reveal delay={360} className="mx-auto max-w-xl text-center lg:col-start-1 lg:row-start-2 lg:mx-0 lg:self-start lg:text-left">
            <p className="font-script text-[1.55rem] italic leading-snug text-coffee md:text-4xl">
              {hero.editorialLead}
            </p>
            <p className="mt-4 font-micro text-coffee/78 md:mt-5">{hero.places}</p>
            <div className="mx-auto mt-7 flex w-full max-w-[19.5rem] flex-col justify-center gap-2.5 px-2 sm:max-w-[22rem] sm:flex-row sm:px-0 md:mt-9 md:max-w-none lg:mx-0 lg:justify-start">
              <button onClick={() => scrollTo("rsvp")} className="btn-primary inline-flex w-full items-center justify-center gap-3 rounded-full px-5 py-3.5 text-[11px] uppercase tracking-[0.22em] sm:w-auto md:px-7 md:py-4 md:text-xs md:tracking-[0.26em]">
                {hero.ctaRSVP} <Icons.ArrowRight w={14} h={14} sw={2}/>
              </button>
              <button onClick={() => scrollTo("timeline")} className="btn-ghost inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-[11px] uppercase tracking-[0.2em] sm:w-auto md:px-7 md:py-4 md:text-xs md:tracking-[0.24em]">
                {hero.ctaTimeline}
              </button>
            </div>
          </Reveal>
        </div>

        <div className="hidden items-end justify-center pb-4 text-coffee/62 md:flex">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em]">{hero.scroll}</span>
            <div className="h-10 w-px bg-coffee/35 animate-pulse"></div>
          </div>
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
  return { days, hours, minutes };
}

function CountdownCell({ value, label, animateTick = true }) {
  // re-mount key on value change so animation triggers
  return (
    <div className="flex-1 min-w-[78px] md:min-w-[120px]">
      <div className="relative card !bg-cream/60 backdrop-blur-sm flex items-center justify-center
                      h-24 md:h-32 px-2 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{background:"linear-gradient(90deg,transparent,#D8C9AE,transparent)"}}/>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{background:"linear-gradient(90deg,transparent,#D8C9AE,transparent)"}}/>
        <span key={animateTick ? value : label} className={`${animateTick ? "tick " : ""}font-display text-espresso text-4xl md:text-6xl font-medium tabular-nums`}>
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-3 text-center font-script italic tracking-[0.25em] text-coffee text-xs md:text-sm uppercase">
        {label}
      </div>
    </div>
  );
}

function AnimatedCountdownCell({ value, label, isVisible, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isSettled, setIsSettled] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) {
      if (!hasAnimated.current) return;
      setDisplayValue(value);
      setIsSettled(true);
      return;
    }

    hasAnimated.current = true;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      setIsSettled(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      const duration = 2400;
      const startedAt = performance.now();
      let lastValue = -1;

      const step = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const nextValue = Math.round(value * eased);

        if (nextValue !== lastValue) {
          lastValue = nextValue;
          setDisplayValue(nextValue);
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
          setIsSettled(true);
        }
      };

      requestAnimationFrame(step);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [delay, isVisible, value]);

  return (
    <div className={`${isVisible ? "count-up-cell is-visible" : "count-up-cell"} ${isSettled ? "is-settled" : ""}`}>
      <CountdownCell value={displayValue} label={label} animateTick={isSettled} />
      <span className={isSettled ? "count-up-glow is-done" : "count-up-glow"} aria-hidden="true" />
    </div>
  );
}

function Countdown() {
  const { copy } = useSiteCopy();
  const cd = copy.countdown;
  const { days, hours, minutes } = useCountdown(TARGET);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="countdown" ref={ref} className="section-shell relative py-24 md:py-32 px-6" aria-label={copy.a11y.countdownSection}>
      <span className="section-label">{cd.section}</span>
      <div className="mx-auto max-w-5xl text-center">
        <SectionIntro
          eyebrow={cd.eyebrow}
          title={cd.title}
          text={cd.body}
        />

        <Reveal delay={200} className="mt-12 md:mt-14">
          <div className="flex items-stretch justify-center gap-3 md:gap-5">
            <AnimatedCountdownCell value={days} label={cd.days} isVisible={isVisible} delay={180} />
            <AnimatedCountdownCell value={hours} label={cd.hours} isVisible={isVisible} delay={360} />
            <AnimatedCountdownCell value={minutes} label={cd.minutes} isVisible={isVisible} delay={540} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── Timeline ──────────────────────────────────────────── */
const mapLink = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

function Timeline() {
  const { copy } = useSiteCopy();
  const ts = copy.timelineSection;
  const timeline = copy.timeline;
  const ref = useRef(null);
  const progress = useScrollProgress(ref);

  return (
    <section id="timeline" ref={ref} className="section-shell relative overflow-hidden py-24 md:py-36 px-6">
      <span className="section-label">{ts.section}</span>
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 grid grid-cols-1 items-end gap-8 md:grid-cols-[.9fr_1.1fr]">
          <SectionIntro
            eyebrow={ts.eyebrow}
            title={ts.title}
            align="left"
          />
          <Reveal delay={120} className="max-w-xl text-coffee/90 leading-relaxed md:justify-self-end">
            <p>{ts.intro}</p>
          </Reveal>
        </div>

        <ol className="relative border-l border-sand/90 md:ml-28">
          <span
            className="absolute left-[-1px] top-0 w-px bg-coffee transition-[height] duration-300 ease-out"
            style={{ height: `${progress * 100}%` }}
          />
          {timeline.map((row, i) => {
            const IconComp = Icons[row.icon];
            return (
              <Reveal as="li" key={i} delay={i * 120}
                className="relative grid grid-cols-1 gap-5 pb-12 pl-8 last:pb-0 md:grid-cols-[180px_1fr] md:gap-10 md:pl-12">
                <span className="absolute -left-[9px] top-2 z-10 grid h-4 w-4 place-items-center rounded-full bg-coffee ring-8 ring-cream" />
                <div>
                  <p className="font-display text-5xl leading-none text-espresso md:text-6xl">{row.time}</p>
                  <p className="mt-1 font-script text-lg italic tracking-wide text-coffee">{ts.oclock}</p>
                </div>
                <article className="border-b border-sand/80 pb-10">
                  <div className="mb-4 flex items-center gap-3 text-coffee">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-sand/80 text-espresso">
                    <IconComp w={20} h={20} sw={1.6} />
                  </span>
                    <span className="font-micro">{ts.stationPrefix} {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display text-3xl leading-tight text-espresso md:text-4xl">{row.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-coffee/85">{row.sub}</p>
                  {row.note && <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-ink/75">{row.note}</p>}
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
  const { copy } = useSiteCopy();
  const vm = copy.venueMaps;
  const locations = copy.locations;

  return (
    <section id="locations" className="section-shell relative py-24 md:py-36 px-6 bg-ivory/50">
      <span className="section-label">{vm.section}</span>
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow={vm.eyebrow}
          title={vm.title}
          text={vm.body}
          className="mb-14 max-w-2xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {locations.map((location, i) => (
            <Reveal key={`${location.title}-${i}`} delay={i * 90} className="card overflow-hidden">
              <div
                className={`ph !rounded-none !shadow-none aspect-[16/10] ${location.imageFit === "contain" ? "location-image-contain" : ""}`}
                style={location.imageFit === "contain" ? { backgroundImage: `url(${location.image})` } : undefined}
              >
                <img
                  src={location.image}
                  alt={location.imageAlt}
                  loading="lazy"
                  className={location.imageFit === "contain" ? "location-image-contain-main" : ""}
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
                  {vm.openRoute} <Icons.ArrowRight w={14} h={14} sw={2}/>
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
function Hotels() {
  const { copy } = useSiteCopy();
  const hs = copy.hotelsSection;
  const hotels = copy.hotels;

  return (
    <section id="hotels" className="section-shell relative py-24 md:py-36 px-6 bg-ivory/50">
      <span className="section-label">{hs.section}</span>
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow={hs.eyebrow}
          title={hs.title}
          text={hs.intro}
          className="mb-14 max-w-2xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {hotels.map((h, i) => (
            <Reveal key={i} delay={i * 100} className="card overflow-hidden flex flex-col">
              <div className="ph !rounded-none !shadow-none aspect-[4/3]">
                <iframe
                  title={`${h.name}${hs.mapFrameTitleSuffix}`}
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
                <p className="mt-4 text-[14px] leading-relaxed text-ink/75">{h.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-sand/70 pt-5">
                  <span className="font-script italic text-coffee">{h.price}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-coffee/80">{hs.reservedBadge}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RSVPDeadline() {
  const { copy } = useSiteCopy();
  const d = copy.deadline;
  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="deadline" className="deadline-section section-shell relative overflow-hidden px-6 py-24 text-center md:py-32">
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <div className="rings-ornament mx-auto mb-7" aria-hidden="true">
            <span className="rings-shine"></span>
          </div>
        </Reveal>

        <Reveal>
          <p className="editorial-kicker justify-center">{d.eyebrow}</p>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="deadline-title mx-auto mt-8 max-w-4xl font-display text-5xl italic leading-[.95] tracking-[-.04em] text-espresso md:text-8xl">
            {d.titleLine1}<br />
            <span className="deadline-date">{d.date}</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-ink/70 md:text-base">
            {d.body}
          </p>
        </Reveal>

        <Reveal delay={360}>
          <button
            type="button"
            onClick={scrollToRsvp}
            className="btn-primary mt-10 inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-xs uppercase tracking-[0.24em]"
          >
            {d.cta} <Icons.ArrowRight w={14} h={14} sw={2}/>
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function VerseSection() {
  const { copy } = useSiteCopy();
  const v = copy.verse;
  return (
    <section className="section-shell relative overflow-hidden bg-ivory/50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="rings-ornament mx-auto mb-8" aria-hidden="true">
            <span className="rings-shine"></span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <blockquote className="font-display italic text-espresso text-2xl md:text-4xl leading-[1.35] [text-wrap:balance]">
            {v.quote}
          </blockquote>
        </Reveal>
        <Reveal delay={250}>
          <div className="mt-8 flex items-center justify-center gap-5 text-coffee">
            <span className="hairline w-16"></span>
            <span className="font-script italic text-base tracking-[0.2em]">{v.ref}</span>
            <span className="hairline w-16"></span>
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
  guestNames: [],
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
  const { copy } = useSiteCopy();
  const r = copy.rsvp;
  const [state, setState] = useState(EMPTY_RSVP);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const set = (k, v) => setState((s) => ({ ...s, [k]: v }));
  const thanksName = state.firstName.trim() ? state.firstName : r.thanksFallbackName;
  const fullName = `${state.firstName} ${state.lastName}`.trim();
  const guestNames = state.guestNames.slice(0, state.plusOnes);
  const allGuestNamesEntered = guestNames.every((name) => name.trim().length > 1);

  const validStep1 = state.firstName.trim().length > 1 && state.lastName.trim().length > 1 && state.attending;
  const validStep2 = state.attending === "yes" && state.arrival && state.needsHotel && (
    state.needsHotel === "no" || (state.hotelCount > 0 && state.family)
  ) && (state.plusOnes === 0 || allGuestNamesEntered);
  const valid = state.attending === "no" ? validStep1 : validStep1 && validStep2;

  const setPlusOnes = (count) => {
    setState((s) => ({
      ...s,
      plusOnes: count,
      guestNames: Array.from({ length: count }, (_, index) => s.guestNames[index] || ""),
    }));
  };

  const setGuestName = (index, value) => {
    setState((s) => {
      const guestNames = Array.from({ length: s.plusOnes }, (_, i) => s.guestNames[i] || "");
      guestNames[index] = value;
      return { ...s, guestNames };
    });
  };

  const goToSummary = () => {
    if (!validStep1) return;
    setStep(state.attending === "yes" ? 2 : 3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, guestNames: state.guestNames.slice(0, state.plusOnes) }),
      });
      if (!res.ok) throw new Error("Fehler beim Senden");
      setSubmitted(true);
    } catch {
      setSubmitError("Es ist ein Fehler aufgetreten. Bitte versuche es nochmal oder schreibe uns direkt eine E-Mail.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmitError(null);
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
            <h3 className="mt-6 font-display text-3xl md:text-4xl text-espresso">{r.thanksTitle(thanksName)}</h3>
            <p className="mt-4 font-script italic text-coffee text-lg">{r.thanksSub}</p>
            <p className="mt-4 text-ink/75 leading-relaxed">
              {state.attending === "yes" ? r.thanksYes : r.thanksNo}
            </p>
            <button onClick={resetForm}
              className="btn-ghost mt-8 px-6 py-3 rounded-sm text-xs uppercase tracking-[0.25em]">
              {r.changeAnswer}
            </button>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="section-shell relative overflow-hidden py-24 md:py-36 px-6">
      <span className="section-label">{r.section}</span>
      <span className="script-watermark right-6 top-20 hidden md:block">{r.watermark}</span>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-[.82fr_1.18fr]">
        <div className="lg:sticky lg:top-28">
          <SectionIntro
            eyebrow={r.eyebrow}
            title={r.title}
            text={r.intro}
            align="left"
          />
          <Reveal delay={160} className="mt-10 hidden lg:block">
            <Monogram className="text-coffee/80" />
          </Reveal>
        </div>

        <Reveal>
          <form className="lux-panel ornament-corners p-7 md:p-10" onSubmit={handleSubmit}>
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
                    <FieldLabel n="01">{r.firstName}</FieldLabel>
                    <input
                      value={state.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className="field w-full rounded-sm px-4 py-3.5 placeholder:text-coffee/45"
                      placeholder={r.placeholderFirstName}
                    />
                  </div>
                  <div>
                    <FieldLabel n="02">{r.lastName}</FieldLabel>
                    <input
                      value={state.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className="field w-full rounded-sm px-4 py-3.5 placeholder:text-coffee/45"
                      placeholder={r.placeholderLastName}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <FieldLabel n="03">{r.attending}</FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { v: "yes", label: r.yesAttend, icon: <Icons.Check w={16} h={16} sw={2}/> },
                      { v: "no",  label: r.noAttend, icon: <Icons.X w={16} h={16} sw={2}/> },
                    ].map(o => (
                      <label key={o.v} className={`chip ${state.attending===o.v?"is-on":""} cursor-pointer rounded-sm px-5 py-4 flex items-center gap-3 text-sm`}>
                        <input type="radio" name="attending" value={o.v}
                          checked={state.attending===o.v}
                          onChange={() => setState((s) => ({ ...s, attending: o.v, plusOnes: 0, guestNames: [], needsHotel: "", hotelCount: 1, family: "", arrival: "" }))}
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
                <FieldLabel n="04">{r.companions}</FieldLabel>
                <div className="relative">
                  <select value={state.plusOnes}
                          onChange={(e)=>setPlusOnes(Number(e.target.value))}
                          className="field w-full rounded-sm px-4 py-3.5 pr-10 appearance-none">
                    {Array.from({ length: 11 }, (_, n) => (
                      <option key={n} value={n}>{n === 0 ? r.companionNone : r.companionN(n)}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-coffee">
                    <Icons.ChevronDown w={18} h={18}/>
                  </span>
                </div>

                {state.plusOnes > 0 && (
                  <div className="mt-8">
                    <FieldLabel n="05">{r.otherGuestNames}</FieldLabel>
                    <div className="space-y-3">
                      {Array.from({ length: state.plusOnes }, (_, index) => (
                        <div key={index} className="grid grid-cols-[32px_1fr] items-center gap-3">
                          <span className="font-script italic text-coffee text-lg">{index + 2}</span>
                          <input
                            value={state.guestNames[index] || ""}
                            onChange={(e) => setGuestName(index, e.target.value)}
                            className="field w-full rounded-sm px-4 py-3.5 placeholder:text-coffee/45"
                            placeholder={r.placeholderGuest}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-coffee/70">
                      {r.guestHint}
                    </p>
                  </div>
                )}

                <div className="mt-8">
                  <FieldLabel n="06">{r.needsHotel}</FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { v: "yes", label: r.yes, icon: <Icons.Bed w={16} h={16} sw={1.6}/> },
                      { v: "no", label: r.no, icon: <Icons.X w={16} h={16} sw={2}/> },
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
                      <FieldLabel n="07">{r.roomCount}</FieldLabel>
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
                      <FieldLabel n="08">{r.family}</FieldLabel>
                      <div className="relative">
                        <select value={state.family}
                                onChange={(e)=>set("family", e.target.value)}
                                className="field w-full rounded-sm px-4 py-3.5 pr-10 appearance-none">
                          <option value="">{r.chooseFamily}</option>
                          <option value="Piro">{r.familyPiro}</option>
                          <option value="Malki">{r.familyMalki}</option>
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-coffee">
                          <Icons.ChevronDown w={18} h={18}/>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <FieldLabel n="09">{r.ownCar}</FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { v: "car",   label: r.yes,   icon: <Icons.Car w={16} h={16} sw={1.7}/> },
                      { v: "noCar", label: r.no, icon: <Icons.CarOff w={16} h={16} sw={1.7}/> },
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
                <FieldLabel n="10">{r.summary}</FieldLabel>
                {state.attending === "no" ? (
                  <p className="text-ink/75 leading-relaxed">{r.summaryNoGuests}</p>
                ) : (
                  <div className="space-y-3 text-sm text-ink/75">
                    <p><strong className="text-espresso">{r.labelName}</strong> {fullName}</p>
                    <p><strong className="text-espresso">{r.labelAttending}</strong> {r.summaryYesPhrase}</p>
                    <p><strong className="text-espresso">{r.labelCompanions}</strong> {state.plusOnes}</p>
                    {state.plusOnes > 0 && (
                      <div>
                        <strong className="text-espresso">{r.labelOtherGuests}</strong>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {guestNames.map((name, index) => (
                            <li key={`${name}-${index}`}>{name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p><strong className="text-espresso">{r.labelHotel}</strong> {state.needsHotel === "yes" ? r.summaryHotelYes(state.hotelCount, state.family === "Piro" ? r.familyPiro : state.family === "Malki" ? r.familyMalki : "") : r.summaryHotelNo}</p>
                    <p><strong className="text-espresso">{r.labelCar}</strong> {state.arrival === "car" ? r.yes : r.no}</p>
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-coffee/70 font-script italic">{r.questionsFooter}</p>
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(state.attending === "yes" && step === 3 ? 2 : 1)}
                    className="btn-ghost px-6 py-4 rounded-sm uppercase text-xs tracking-[0.25em]">
                    {r.back}
                  </button>
                )}
                {step < 3 ? (
                  <button type="button"
                    disabled={step === 1 ? !validStep1 : !validStep2}
                    onClick={step === 1 ? goToSummary : () => setStep(3)}
                    className={`btn-primary px-8 py-4 rounded-sm uppercase text-xs tracking-[0.3em] flex items-center gap-3 ${(step === 1 ? !validStep1 : !validStep2) ? "opacity-40 cursor-not-allowed" : ""}`}>
                    {r.next} <Icons.ArrowRight w={14} h={14} sw={2}/>
                  </button>
                ) : (
                  <button type="submit" disabled={!valid || submitting}
                    className={`btn-primary px-8 py-4 rounded-sm uppercase text-xs tracking-[0.3em] flex items-center gap-3 ${(!valid || submitting) ? "opacity-40 cursor-not-allowed" : ""}`}>
                    {submitting ? "..." : r.submit} {!submitting && <Icons.ArrowRight w={14} h={14} sw={2}/>}
                  </button>
                )}
              </div>
            </div>
            {submitError && (
              <p className="mt-4 text-sm text-red-600 text-center">{submitError}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── Footer ────────────────────────────────────────────── */
function Footer() {
  const { copy } = useSiteCopy();
  return (
    <footer className="relative py-32 md:py-44 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-coffee/80">
            <div className="font-display text-2xl text-espresso">
              Izla <span className="ampersand text-coffee">&amp;</span> Gabriel
            </div>
            <div className="text-[11px] tracking-[0.4em] uppercase" dangerouslySetInnerHTML={{ __html: copy.footerTagline }} />
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
      <LanguageSwitcher />
      <FloatingNav/>
      <Hero heroLayout={t.heroLayout}/>
      <VerseSection/>
      {t.showCountdown && <Countdown/>}
      <RSVPDeadline/>
      {t.showTimeline && <Timeline/>}
      {t.showTimeline && <VenueMaps/>}
      {t.showHotels && <Hotels/>}
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
        <TweakToggle label="Timeline" value={t.showTimeline}  onChange={(v) => setTweak("showTimeline", v)}/>
        <TweakToggle label="Hotels"   value={t.showHotels}    onChange={(v) => setTweak("showHotels", v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nProvider>
    <App />
  </I18nProvider>,
);
