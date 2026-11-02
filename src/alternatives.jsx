import MDContact from './md-contact';
import MDWelcome from './md-welcome';
import MDWhyFamilies from './md-why-families';
import MDCareTimeline from './md-care-timeline';
import MDCareServices from './md-care-services';
import MDCauses from './md-causes';

import { CareMegaMenu, SupportingLinks } from "./site-navigation";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import {useLocation} from "react-router-dom";
import {HomeLink as Link,HomeNavLink as NavLink} from "./home-links";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import {
  ArrowUpRight,
  CaretDown,
  Heart,
  Phone,
  X,
  List,
  Envelope,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Leaf,
  HandHeart,
  HouseLine,
  ClipboardText,
  ChatsCircle,
  Plus as Plus$1,
  MagnifyingGlass,
  CheckCircle,
  UsersThree,
  ArrowUp,
  Sparkle,
  ArrowLeft,
} from "@phosphor-icons/react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { services, faqs } from "./data";
import { Logo, Photo, FAQ } from "./components";

import "./alternatives.css";
import {
  MDReferenceSections,
  CiyaReferenceHome,
  ReferenceFooter,
  ReferenceContact,
} from "./reference-sections";
import "./reference-fidelity.css";
import "./md-spacing.css";
import "@fontsource/urbanist/latin-400.css";
import "@fontsource/urbanist/latin-500.css";
import "@fontsource/urbanist/latin-600.css";
import "@fontsource/urbanist/latin-700.css";
import "@fontsource/mulish/latin-400.css";
import "@fontsource/mulish/latin-600.css";
import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-600.css";
import "@fontsource/outfit/latin-700.css";
const DesignContext = createContext("md");
const useDesign = () => useContext(DesignContext);
const serviceIcons = [
  HouseLine,
  HandHeart,
  UsersThree,
  ShieldCheck,
  Heart,
  Leaf,
];
export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const reduced = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;
  return (
    <Component
      className={className}
      initial={
        reduced
          ? false
          : {
              opacity: 0,
              y: 28,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </Component>
  );
}
export function Action({
  children = "Arrange a Care Consultation",
  to = "/contact/",
  outline = false,
  light = false,
  className = "",
}) {
  return (
    <Link
      className={`a-button ${outline ? "a-button-outline" : ""} ${light ? "a-button-light" : ""} ${className}`}
      to={to}
    >
      <span>{children}</span>
      <ArrowUpRight size={19} />
    </Link>
  );
}
export function TextLink({ children, to = "/contact/" }) {
  return (
    <Link className={"a-text-link"} to={to}>
      {children}
      <ArrowUpRight size={19} />
    </Link>
  );
}
export function Pattern({ className = "" }) {
  return (
    <img
      className={`a-pattern ${className}`}
      src={"/images/about-pattern.svg"}
      width={"300"}
      height={"300"}
      alt={""}
      aria-hidden={"true"}
    />
  );
}
export function Eyebrow({ children }) {
  return (
    <span className={"a-eyebrow"}>
      <span /> {children}
    </span>
  );
}
function Navigation() {
  const design = useDesign(),
    location = useLocation(),
    [menu, setMenu] = useState(false),
    [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const sentinel = useRef(null),
    header = useRef(null);
  useEffect(() => {
    setMenu(false);
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    if (sentinel.current) observer.observe(sentinel.current);
    const close = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        setOpen(false);
      }
    };
    const outside = (e) => {
      if (!header.current?.contains(e.target)) {
        setOpen(false);
        setMenu(false);
      }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <>
      <div ref={sentinel} className={"a-nav-sentinel"} />
      <a className={"skip-link"} href={"#main"}>
        {"Skip to content"}
      </a>
      <header
        ref={header}
        className={`a-header ${scrolled ? "a-header-scrolled" : ""}`}
      >
        <div className={"a-header-inner"}>
          <Logo />
          <nav
            className={menu ? "a-nav a-nav-open" : "a-nav"}
            aria-label={"Main navigation"}
          >
            <NavLink to={"/"} end={true}>
              {"Home"}
            </NavLink>
            <div className={"a-care-nav"}>
              <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={`care-menu-${design}`}
              >
                {"Our care "}
                <CaretDown size={13} />
              </button>
              {open && (
                <CareMegaMenu design={design} onClose={()=>setOpen(false)}/>
              )}
            </div>
            <NavLink to={"/about-us/"}>{"About us"}</NavLink>
            <NavLink to={"/accucare-plus/"}>{"AccuCare+"}</NavLink>
            <NavLink to={"/nigeria/"}>{"Nigeria"}</NavLink>
            <NavLink to={"/contact/"}>{"Contact"}</NavLink>
          </nav>
          <a
            className={"a-header-call"}
            href={"tel:+442038770929"}
            aria-label={"Call AccuCare on 020 3877 0929"}
          >
            <Phone size={21} />
            <span>{"020 3877 0929"}</span>
          </a>
          <Action className={"a-header-cta"}>{"Arrange a Care Consultation"}</Action>
          <button
            className={"a-mobile-toggle"}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={27} /> : <List size={27} />}
          </button>
        </div>
      </header>
    </>
  );
}
function Footer() {
  return <ReferenceFooter design={useDesign()} />;
}
function MDHome() {
  const reduced = useReducedMotion();
  return (
    <>
      <section className={"md-hero"}>
        <div className={"md-hero-backtype"} aria-hidden={"true"}>
          <span>{"PERSONAL"}</span>
          <span>{"CARE"}</span>
        </div>
        <Pattern className={"md-hero-pattern"} />
        <motion.img
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 45,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className={"md-hero-person"}
          src={"/images/care-professional-cutout.webp"}
          alt={"A friendly care professional in a teal uniform"}
          fetchPriority={"high"}
        />
        <div className={"a-container md-hero-content"}>
          <motion.div
            className={"md-hero-copy"}
            initial={
              reduced
                ? false
                : {
                    opacity: 0,
                    y: 25,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >
            <h1>
              {"Personal care"}
              <br />
              {"you trust."}
            </h1>
            <p>
              {"Expert support. Genuine compassion."}
              <br />
              {"Care built around you, at home."}
            </p>
            <Action to={"/services/"}>{"Find your care"}</Action>
          </motion.div>
          <Reveal className={"md-hero-aside"} delay={0.4}>
            <div className={"md-hero-seal"}>
              <Photo name={"care-professional"} alt={""} />
              <Photo name={"client/care-03"} alt={""} />
              <span>{"+"}</span>
            </div>
            <h3>
              {"Clinically led."}
              <br />
              {"Personally delivered."}
            </h3>
            <p>
              {"For your wellbeing."}
              <br />
              {"For your peace of mind."}
            </p>
            <Link
              to={"/about-us/"}
              aria-label={"Discover the AccuCare approach"}
            >
              <ArrowUpRight size={27} />
            </Link>
          </Reveal>
        </div>
      </section>
      <MDWelcome/>
      <MDCauses/>
      <MDCareServices/>
      <MDCareTimeline/>
      <MDWhyFamilies/>
      <MDContact/>
    </>
  );
}
const slides = [
  {
    title: (
      <>
        {"Expert care."}
        <br />
        {"Made personal."}
      </>
    ),
    body: "Clinically led home care that puts your dignity, independence and wellbeing first.",
    image: "home-care",
    tag: "Welcome to AccuCare",
  },
  {
    title: (
      <>
        {"Your home."}
        <br />
        {"Your life. Your care."}
      </>
    ),
    body: "Dedicated live-in and overnight support, built around the life you want to live.",
    image: "live-in-care",
    tag: "Care that fits your life",
  },
];
function CiyaHero() {
  const [slide, setSlide] = useState(0),
    [paused, setPaused] = useState(false),
    [interacting, setInteracting] = useState(false);
  const reduced = useReducedMotion();
  const s = slides[slide];
  useEffect(() => {
    if (paused || interacting || reduced) return;
    const timer = setInterval(
      () => setSlide((v) => (v + 1) % slides.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [paused, interacting, reduced]);
  return (
    <section
      className="ciya-hero"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false);
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          className="ciya-hero-background"
          key={s.image}
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  scale: 1.05,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            opacity: {
              duration: 1.5,
            },
            scale: {
              duration: 5,
            },
          }}
        >
          <Photo
            name={s.image}
            alt="Warm, personal support in the comfort of home"
            eager
          />
        </motion.div>
      </AnimatePresence>
      <div className="ciya-hero-shade" />
      <div className="a-container ciya-hero-layout">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            className="ciya-hero-copy"
            initial={
              reduced
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.45,
            }}
          >
            <Eyebrow>{s.tag}</Eyebrow>
            <h1>{s.title}</h1>
            <p>{s.body}</p>
            <Action light>Arrange a Care Consultation</Action>
          </motion.div>
        </AnimatePresence>
        <div className="ciya-hero-reassurance">
          <div className="ciya-mini-images">
            <Photo name="care-professional" alt="" />
            <Photo name="personal-care" alt="" />
            <span>+</span>
          </div>
          <h3>UK &amp; Nigeria</h3>
          <p>
            Personalised care,
            <br />
            close to home.
          </p>
          <Photo name="personal-care" alt="Personalised care at home" />
        </div>
      </div>
      <div className="a-container ciya-slider-controls">
        <button
          aria-label="Previous hero slide"
          onClick={() =>
            setSlide((v) => (v + slides.length - 1) % slides.length)
          }
        >
          <ArrowLeft size={21} />
        </button>
        <div role="group" aria-label="Choose hero slide">
          {slides.map((_, i) => (
            <button
              key={i}
              className={slide === i ? "selected" : ""}
              aria-label={`Show hero slide ${i + 1}`}
              aria-pressed={slide === i}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
        <button
          aria-label="Next hero slide"
          onClick={() => setSlide((v) => (v + 1) % slides.length)}
        >
          <ArrowRight size={21} />
        </button>
        <button
          aria-label={paused ? "Play hero slideshow" : "Pause hero slideshow"}
          onClick={() => setPaused((v) => !v)}
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </section>
  );
}
function CiyaHome() {
  return <CiyaHero />;
}
export function AlternativeSite({design}){return <DesignContext.Provider value={design}><div className={`alt-site alt-${design}`}><Navigation/><main id="main"><div id="top">{design==='md'?<MDHome/>:<CiyaHome/>}</div></main><SupportingLinks/><Footer/></div></DesignContext.Provider>}
export default AlternativeSite;
