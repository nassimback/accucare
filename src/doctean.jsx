import FinalCTA from './final-cta';
import ReviewEnquiry from './review-enquiry';

import { CareMegaMenu, SupportingLinks } from "./site-navigation";
import { useEffect, useId, useRef, useState } from "react";
import {useLocation} from "react-router-dom";
import {HomeLink as Link,HomeNavLink as NavLink} from "./home-links";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  Phone,
  Envelope,
  MapPin,
  Clock,
  Leaf,
  SlidersHorizontal,
  ArrowsClockwise,
  DeviceMobile,
  ChatsCircle,
  ClipboardText,
  List,
  X,
  SquaresFour,
  CaretDown,
  HouseLine,
  HandHeart,
  ShieldCheck,
  Heart,
  UsersThree,
  Stethoscope,
  Check,
  Plus,
  Star,
} from "@phosphor-icons/react";
import { Logo, Photo } from "./components";
import { services, faqs } from "./data";
import { Count } from "./reference-sections";
import "@fontsource/plus-jakarta-sans/latin-400.css";
import "@fontsource/plus-jakarta-sans/latin-500.css";
import "@fontsource/plus-jakarta-sans/latin-600.css";
import "@fontsource/plus-jakarta-sans/latin-700.css";
import "@fontsource/sora/latin-400.css";
import "@fontsource/sora/latin-500.css";
import "@fontsource/sora/latin-600.css";
import "./doctean.css";
const featureIcons = [
  HouseLine,
  HandHeart,
  ShieldCheck,
  Heart,
  UsersThree,
  Stethoscope,
];
function DReveal({ children, className = "", delay = 0, stationary = false }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: stationary ? 0 : 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.65, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
function DHeading({ children, center = false }) {
  const reduce = useReducedMotion();
  return (
    <motion.h2
      className={`dt-heading ${center ? "dt-heading-center" : ""}`}
      aria-label={children}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.012 } },
      }}
    >
      {children.split(" ").map((word, i) => (
        <span className="dt-word" aria-hidden="true" key={i}>
          {[...word].map((c, j) => (
            <motion.span
              key={j}
              variants={{
                hidden: { opacity: 0.12 },
                show: { opacity: 1, transition: { duration: 0.5 } },
              }}
            >
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}
function DEyebrow({ children }) {
  return <span className="dt-eyebrow">{children}</span>;
}
function DButton({
  children = "Arrange a Care Consultation",
  to = "/contact/",
  outline = false,
}) {
  return (
    <Link className={`dt-button ${outline ? "dt-button-outline" : ""}`} to={to}>
      <span>{children}</span>
      <ArrowUpRight size={18} />
    </Link>
  );
}
function DNotch({ className = "" }) {
  return (
    <svg
      className={`dt-notch ${className}`}
      viewBox="0 0 111 111"
      aria-hidden="true"
    >
      <path d="M0 0C19.33 0 35 15.67 35 35V41C35 60.33 50.67 76 70 76H76C95.33 76 111 91.67 111 111V0H0Z" />
    </svg>
  );
}
function DPhoto({ name, alt = "", className = "", eager = false }) {
  return (
    <img
      className={`dt-photo ${className}`}
      src={`/images/doctean/${name}.webp`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}
function DCircleLink({ to = "/about-us/", label = "Explore our care" }) {
  const id = useId().replaceAll(":", "");
  return (
    <Link className="dt-circle-link" to={to} aria-label={label}>
      <svg viewBox="0 0 180 180" aria-hidden="true">
        <defs>
          <path
            id={`circle-${id}`}
            d="M90 90m-60 0a60 60 0 1 1 120 0a60 60 0 1 1-120 0"
          />
        </defs>
        <text>
          <textPath href={`#circle-${id}`}>
            EXPLORE MORE · EXPLORE MORE ·{" "}
          </textPath>
        </text>
      </svg>
      <ArrowUpRight size={37} />
    </Link>
  );
}
function DHeader() {
  const [menu, setMenu] = useState(false),
    [care, setCare] = useState(false),
    [panel, setPanel] = useState(false);
  const panelRef = useRef(null);
  useEffect(() => {
    if (!panel) return;
    const previous = document.activeElement;
    const elements = () => [
      ...panelRef.current.querySelectorAll("button,a[href]"),
    ];
    elements()[0]?.focus();
    const trap = (e) => {
      if (e.key !== "Tab") return;
      const items = elements(),
        first = items[0],
        last = items.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      previous?.focus();
    };
  }, [panel]);
  const { pathname } = useLocation();
  useEffect(() => {
    setMenu(false);
    setCare(false);
    setPanel(false);
  }, [pathname]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        setCare(false);
        setPanel(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <div className="dt-topbar dt-container">
        <span>
          <Clock size={19} />
          Clinically led. Personally delivered.
        </span>
        <Link to="/nigeria/">
          <MapPin size={19} />
          United Kingdom & Nigeria
        </Link>
        <a href="mailto:info@accucare.co.uk">
          <Envelope size={19} />
          info@accucare.co.uk
        </a>
        <a className="dt-top-phone" href="tel:+442038770929">
          <Phone size={17} />
          020 3877 0929
        </a>
      </div>
      <header className="dt-header">
        <div className="dt-header-inner">
          <Logo />
          <nav
            className={menu ? "dt-navigation is-open" : "dt-navigation"}
            aria-label="Main navigation"
          >
            <NavLink to="/" end>
              Home
            </NavLink>
            <div className="dt-nav-care">
              <button onClick={() => setCare((v) => !v)} aria-expanded={care} aria-controls="care-menu-doctean">
                Our care <CaretDown size={13} />
              </button>
              {care && (
                <CareMegaMenu design="doctean" onClose={()=>setCare(false)}/>
              )}
            </div>
            <NavLink to="/about-us/">About us</NavLink>
            <NavLink to="/accucare-plus/">AccuCare+</NavLink>
            <NavLink to="/nigeria/">Nigeria</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
          </nav>
          <button
            className="dt-grid-button"
            aria-label="Open care information"
            onClick={() => setPanel(true)}
          >
            <SquaresFour size={26} />
          </button>
          <DButton>Arrange a Care Consultation</DButton>
          <button
            className="dt-mobile-toggle"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <X size={25} /> : <List size={25} />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {panel && (
          <motion.div
            className="dt-panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPanel(false)}
          >
            <motion.aside
              className="dt-side-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Care information"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close care information"
                onClick={() => setPanel(false)}
              >
                <X size={26} />
              </button>
              <Logo />
              <DPhoto name="care-team" alt="Healthcare professionals" />
              <h3>Care for every part of life.</h3>
              <p>
                Tell us what matters to you. We’ll listen and help you explore
                the right support.
              </p>
              <a href="tel:+442038770929">020 3877 0929</a>
              <a href="mailto:info@accucare.co.uk">info@accucare.co.uk</a>
              <DButton>Let’s talk care</DButton>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
const heroSlides = [
  {
    image: "hero-doctor",
    top: "Care at home.",
    bottom: "Built around you.",
    tag: "London & surrounding counties · UK live-in care",
    body: "Clinically led home care, live-in support and private care concierge. Personal attention for every stage of life.",
  },
  {
    image: "hero-team",
    top: "Personal care.",
    bottom: "Peace of mind.",
    tag: "Care for every part of life",
    body: "From everyday help to dedicated live-in support, we bring clinical understanding and genuine compassion to your care.",
  },
];
function DHero({ careAtHome = false }) {
  const [slide, setSlide] = useState(0),
    [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || hover) return;
    const timer = setInterval(() => setSlide((v) => (v + 1) % 2), 6500);
    return () => clearInterval(timer);
  }, [reduce, hover]);
  const s = heroSlides[slide];
  return (
    <section
      className="dt-hero"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHover(false);
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          className="dt-hero-photo"
          key={s.image}
          initial={reduce ? false : { opacity: 0, scale: 1.045 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1 }, scale: { duration: 6.5 } }}
        >
          {careAtHome ? <Photo name={slide === 0 ? "home-care" : "life-at-home"} alt={slide === 0 ? "Personal support and companionship at home" : "An older couple enjoying life together"} eager /> : <DPhoto name={s.image} alt="Illustrative portrait of a healthcare professional" eager />}
        </motion.div>
      </AnimatePresence>
      <div className="dt-hero-shade" />
      <div className="dt-container dt-hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: reduce ? 0 : 0.65 }}
          >
            <span className="dt-hero-tag">{s.tag}</span>
            <h1>
              {s.top}
              <span>{s.bottom}</span>
            </h1>
            <div className="dt-hero-bottom">
              <DCircleLink />
              <p>{s.body}</p>
            </div>
            <div className="dt-hero-actions"><DButton to="/contact/">Request a Care Assessment</DButton><DButton to="/services/" outline>Explore Our Services</DButton></div>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        className="dt-hero-arrow is-prev"
        aria-label="Previous hero slide"
        onClick={() => setSlide((v) => (v + 1) % 2)}
      >
        <ArrowLeft size={30} />
      </button>
      <button
        className="dt-hero-arrow is-next"
        aria-label="Next hero slide"
        onClick={() => setSlide((v) => (v + 1) % 2)}
      >
        <ArrowRight size={30} />
      </button>
    </section>
  );
}
function DFeatures() {
  return (
    <section className="dt-container dt-features">
      {[
        [
          Stethoscope,
          "Clinically led care",
          "Clinical understanding and thoughtful coordination, shaped around your needs.",
        ],
        [
          HandHeart,
          "Personal attention",
          "Care that listens to your preferences and respects the life you want to live.",
        ],
        [
          HouseLine,
          "Support at home",
          "From personal visits to live-in care, in the comfort of familiar surroundings.",
        ],
      ].map(([Icon, title, body], i) => (
        <DReveal key={title} delay={i * 0.1}>
          <article className="dt-feature">
            <DNotch />
            <span className="dt-feature-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <Icon size={67} weight="light" />
          </article>
        </DReveal>
      ))}
    </section>
  );
}
function DParallaxPhoto(){const target=useRef(null);const reduce=useReducedMotion();const {scrollYProgress}=useScroll({target,offset:['start end','end start']});const y=useTransform(scrollYProgress,[0,1],['-7%','7%']);return <div className="dt-about-picture" ref={target}><motion.div style={{y:reduce?0:y,height:'118%'}}><DPhoto name="care-team" alt="A team of healthcare professionals"/></motion.div></div>}
function DAboutBlock() {
  return <section id="wellbeing" className="dt-container dt-section dt-about-demo dt-welcome-care">
    <div className="dt-about-demo-main">
      <div className="dt-about-demo-heading">
        <DReveal><DEyebrow>Welcome to AccuCare</DEyebrow><DHeading>More Than Help Around the Home</DHeading></DReveal>
        <DReveal><p>The right care should protect independence, preserve dignity and bring reassurance to the whole family.</p><p>At AccuCare, we take time to understand each person’s routines, preferences and circumstances. We then create a care plan built around the individual, whether they need occasional support, daily visits or continuous live-in care. We support children, young people, adults and older people, according to assessed needs.</p><DButton to="https://n7hx8oeibctrgf.projectwebtec10.com/about-us/">Discover AccuCare</DButton></DReveal>
      </div>
      <DReveal className="dt-about-demo-wide"><Photo name="personal-care" alt="An older couple discussing their care with a supportive professional"/></DReveal>
    </div>
    <div className="dt-about-demo-side">
      <DReveal className="dt-about-demo-portrait"><Photo name="client/care-14" alt="A carer offering personal support and reassurance to an older woman"/><DNotch className="dt-about-demo-notch"/><a href="https://n7hx8oeibctrgf.projectwebtec10.com/about-us/" className="dt-about-demo-link" aria-label="Discover AccuCare"><ArrowUpRight size={27}/></a></DReveal>
      <DReveal className="dt-about-demo-stats dt-about-service-facts"><div><strong>Personal</strong><span>Assessment-led care</span></div><div><strong>Connected</strong><span>Family communication</span></div></DReveal>
    </div>
  </section>;
}
function DMarquee({ second = false }) {
  return (
    <div
      className={`dt-marquee ${second ? "dt-marquee-second" : ""}`}
      aria-hidden="true"
    >
      <div>
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>
            {second ? "Personal care" : "Care at home"} <Plus size={60} />
            <b>{second ? "Peace of mind" : "Whole-person wellbeing"}</b>
            <Plus size={60} />
          </span>
        ))}
      </div>
    </div>
  );
}
function DServiceCard({ s, i = 0 }) {
  const Icon = featureIcons[i % featureIcons.length];
  return (
    <Link className="dt-service-card" to={`/${s.slug}/`}>
      <div className="dt-service-image">
        <Photo name={s.image} alt={s.title} />
        <DNotch className="dt-notch-left" />
        <span className="dt-service-icon">
          <Icon size={37} weight="light" />
        </span>
      </div>
      <div className="dt-service-copy">
        <span>{s.category}</span>
        <h3>{s.title}</h3>
      </div>
      <DNotch className="dt-service-bottom-notch" />
      <span className="dt-service-arrow"><ArrowUpRight size={25} /></span>
    </Link>
  );
}
function DServices({ all = false }) {
  const rail = useRef(null);
  const reduce = useReducedMotion();
  const [interacting, setInteracting] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (all || reduce || paused || interacting) return;
    const timer = setInterval(() => {
      const el = rail.current;
      if (!el) return;
      const step =
        el.firstElementChild.getBoundingClientRect().width +
        parseFloat(getComputedStyle(el).columnGap);
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });

      } else {
        el.scrollBy({ left: step, behavior: "smooth" });

      }
    }, 6000);
    return () => clearInterval(timer);
  }, [all, reduce, paused, interacting]);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All care");
  const items = all
    ? services.filter(
        (s) =>
          (category === "All care" || s.category === category) &&
          `${s.title} ${s.intro}`.toLowerCase().includes(query.toLowerCase()),
      )
    : services.slice(0, 8);
  function startDrag(e) {
    if (all || e.pointerType !== "mouse" || e.button !== 0) return;
    suppressClick.current = false;
    drag.current = { x: e.clientX, scroll: e.currentTarget.scrollLeft, pointer: e.pointerId };
    setPaused(true);
  }
  function moveDrag(e) {
    const start = drag.current;
    if (!start) return;
    const delta = e.clientX - start.x;
    if (Math.abs(delta) > 5 && !suppressClick.current) {
      suppressClick.current = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(start.pointer);
      e.currentTarget.classList.add("is-dragging");
    }
    if (suppressClick.current) {
      e.preventDefault();
      e.currentTarget.scrollLeft = start.scroll - delta;
    }
  }
  function endDrag(e) {
    const start = drag.current;
    if (!start) return;
    drag.current = null;
    setDragging(false);
    e.currentTarget.classList.remove("is-dragging");
    if (e.currentTarget.hasPointerCapture(start.pointer)) e.currentTarget.releasePointerCapture(start.pointer);
  }
  return (
    <section
      className="dt-section dt-services"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false);
      }}
    >
      <div className="dt-container">
        <div className="dt-section-title">
          <DEyebrow>Our care services</DEyebrow>
          <DHeading center>Thoughtful support for every part of life.</DHeading>
        </div>
        {all && (
          <div className="dt-service-filters">
            <label>
              Find your care
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search care services"
              />
            </label>
            <div role="group" aria-label="Filter care services">
              {["All care", ...new Set(services.map((s) => s.category))].map(
                (c) => (
                  <button
                    key={c}
                    aria-pressed={c === category}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
        <div
          className={all ? "dt-service-grid" : `dt-service-rail${dragging ? " is-dragging" : ""}`}
          ref={rail}
          tabIndex={all ? undefined : 0}
          role={all ? undefined : "region"}
          aria-label={all ? undefined : "Care services. Drag or swipe to explore; use arrow keys when focused."}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          onDragStart={all ? undefined : (e) => e.preventDefault()}
          onClickCapture={(e) => {
            if (!all && suppressClick.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClick.current = false;
            }
          }}
          onKeyDown={(e) => {
            if (all || e.target !== e.currentTarget || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
            e.preventDefault();
            setPaused(true);
            const el = e.currentTarget;
            el.scrollBy({ left: (e.key === "ArrowRight" ? 1 : -1) * (el.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap)), behavior: reduce ? "instant" : "smooth" });
          }}
        >
          {items.map((s, i) => (
            <DReveal key={s.slug} stationary>
              <DServiceCard s={s} i={i} />
            </DReveal>
          ))}
        </div>
        {all && !items.length && (
          <p role="status">No matching care services. Try another search.</p>
        )}

      </div>
    </section>
  );
}
const careServiceItems = [
  ["Bespoke Home Care","Daily living",UsersThree,"Personal visits for daily routines, personal care, meals and companionship, shaped around your preferences and independence.","Explore home care","Support is tailored through assessment and an agreed care plan. We involve relevant healthcare professionals where specialist clinical input is required."],
  ["Live-in & Overnight Care","At home",HouseLine,"A reassuring presence at home, with routines and overnight support agreed around your assessed requirements.","Explore live-in care","Support is tailored through assessment and an agreed care plan. We involve relevant healthcare professionals where specialist clinical input is required."],
  ["Supported Living","Independence",HandHeart,"Practical, personal support to build daily living skills, participate in community life and make your own choices.","Explore supported living","Support is tailored through assessment and an agreed care plan. We involve relevant healthcare professionals where specialist clinical input is required."],
  ["Specialist & Complex Care","Specialist support",ShieldCheck,"Assessed support for additional health, disability and mobility needs, including coordination with appropriate specialist professionals.","Explore specialist care","Support is tailored through assessment and an agreed care plan. We involve relevant healthcare professionals where specialist clinical input is required."],
  ["Hospital-to-Home Care","Recovery",Clock,"A considered transition after illness, surgery or a hospital stay, with support for recovery routines and everyday life.","Explore recovery support","Support is tailored through assessment and an agreed care plan. We involve relevant healthcare professionals where specialist clinical input is required."],
  ["Palliative & End-of-Life Care","Comfort & dignity",Heart,"Sensitive assistance focused on comfort, dignity and individual wishes, working alongside the appropriate clinical teams.","Explore palliative care","Support is tailored through assessment and an agreed care plan. We involve relevant healthcare professionals where specialist clinical input is required."]
];
function DSpecialistDepartments() {
  const [selected,setSelected]=useState(null);
  const dialog=useRef(null);
  function openService(item){setSelected(item);dialog.current.showModal()}
  return <section id="care" className="dt-departments-panel dt-care-services"><div className="dt-container"><div className="dt-section-title"><DEyebrow>Our Care Services</DEyebrow><DHeading center>The Right Support for Every Stage of Life</DHeading><p>Care needs can change over time. Our flexible services provide practical, personal and emotional support without taking away the independence that matters.</p></div><div className="dt-departments-grid">{careServiceItems.map(item=>{const [title,tag,Icon,body,label]=item;return <DReveal key={title}><button type="button" onClick={()=>openService(item)} className="dt-department-card" aria-label={label==='Learn more'?`Learn more about ${title}`:label}><Icon className="dt-department-icon" size={56} weight="light"/><span className="dt-department-tag">{tag}</span><h3>{title}</h3><p>{body}</p><span className="dt-care-learn">{label}</span><DNotch className="dt-department-notch"/><span className="dt-department-arrow"><ArrowUpRight size={24}/></span></button></DReveal>})}</div></div><dialog ref={dialog} className="dt-care-dialog" aria-labelledby="dt-care-dialog-title"><button className="dt-care-dialog-close" onClick={()=>dialog.current.close()} aria-label="Close service information"><X size={24}/></button>{selected&&<><DEyebrow>Our Care Services</DEyebrow><h2 id="dt-care-dialog-title">{selected[0]}</h2><p>{selected[3]}</p><p>{selected[5]}</p><a className="dt-button" href="tel:+442038770929">Discuss your care <Phone size={19}/></a></>}</dialog></section>;
}
function DRings() {
  return (
    <section className="dt-container dt-rings">
      {[
        [
          "14",
          "Care services",
          "Everyday support and specialist understanding, connected around you.",
        ],
        [
          "3",
          "Concierge tiers",
          "Explore the right level of personal coordination with our team.",
        ],
        ["2", "Countries", "UK experience and local understanding in Nigeria."],
      ].map(([n, title, body]) => (
        <DReveal key={title}>
          <div className="dt-ring">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="53" />
              <motion.circle
                cx="60"
                cy="60"
                r="53"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 0.78 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8 }}
              />
            </svg>
            <Count value={n} />
          </div>
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </DReveal>
      ))}
    </section>
  );
}
function DEnquiry({ standalone = false }) {
  const [draft, setDraft] = useState("");
  const [ready, setReady] = useState(false);
  const location = useLocation();
  const region =
    new URLSearchParams(location.search).get("region") || "United Kingdom";
  const requestedMembership = new URLSearchParams(location.search).get("membership");
  const membership = ["1", "2", "3"].includes(requestedMembership) ? requestedMembership : "";
  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setDraft(
      "mailto:info@accucare.co.uk?subject=Care%20consultation&body=" +
        encodeURIComponent(
          `Name: ${d.get("name")}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone")}\nCare: ${d.get("care")}\nRegion: ${d.get("region")}\nPreferred contact date: ${d.get("date")}\nPreferred contact time: ${d.get("time")}\n${membership ? `AccuCare+ membership of interest: ${membership}\n` : ""}\n${d.get("message")}`,
        ),
    );
    setReady(true);
  }
  return (
    <section
      className={`dt-enquiry ${standalone ? "dt-enquiry-standalone" : ""}`}
    >
      <div className="dt-enquiry-copy">
        <h3>Good care begins with understanding.</h3>
        <p>
          A complimentary initial consultation gives you time to talk, ask
          questions and explore the support that could help.
        </p>
        {[
          [
            "dt-icon-insurance",
            "Confidence in your care",
            "Clinical understanding and a personalised care plan.",
          ],
          [
            "dt-icon-healthcare",
            "A connected approach",
            "Clear communication with you and the people you trust.",
          ],
          [
            "dt-icon-team",
            "Care for the whole person",
            "Nutrition, mobility and emotional wellbeing, considered together.",
          ],
        ].map(([Icon, t, p]) => (
          <div className="dt-enquiry-feature" key={t}>
            <i className={`dt-medical-icon ${Icon}`} aria-hidden="true" />
            <div>
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dt-enquiry-form">
        <span className="dt-enquiry-badge">
          <i className="dt-medical-icon dt-icon-appointment" aria-hidden="true" />
        </span>
        <DEyebrow>Get in touch</DEyebrow>
        <DHeading>Care consultation</DHeading>
        {ready ? (
          <div className="dt-enquiry-ready" role="status">
            <ShieldCheck size={48} />
            <h3>Your enquiry is ready.</h3>
            <p>
              Review and send it through your email app, or call our team on 020
              3877 0929.
            </p>
            <a className="dt-button" href={draft}>
              Open your email draft <ArrowUpRight size={18} />
            </a>
            <button className="dt-text-button" onClick={() => setReady(false)}>
              Edit your enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            {membership && <p className="dt-membership-context">AccuCare+ membership {membership} enquiry</p>}
            <div className="dt-form-grid">
              <label>
                <span>Your name</span>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </label>
              <label>
                <span>Email address</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  required
                />
              </label>
              <label>
                <span>Care required</span>
                <select name="care">
                  <option>Help me find the right care</option>
                  {services.map((s) => (
                    <option key={s.slug}>{s.title}</option>
                  ))}
                  <option>AccuCare+ concierge</option>
                </select>
              </label>
              <label>
                <span>Care location</span>
                <select name="region" defaultValue={region}>
                  <option>United Kingdom</option>
                  <option>Nigeria</option>
                </select>
              </label>
              <div className="dt-contact-row"><label>
                <span>Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Phone number"
                  required
                />
              </label>
              <label>
                <span>Preferred contact date</span>
                <input type="date" name="date" />
              </label>
              <label><span>Preferred contact time</span><select name="time"><option>Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label></div>
            </div>
            <label>
              <span>Your message</span>
              <textarea
                name="message"
                placeholder="Tell us a little about the support you need"
                rows="4"
              />
            </label>
            <label className="dt-consent">
              <input type="checkbox" required />I agree to be contacted about
              this enquiry. <Link to="/privacy-policy/">Privacy policy</Link>
            </label>
            <button className="dt-button" type="submit">
              Prepare your enquiry <ArrowUpRight size={18} />
            </button>
            <p className="dt-form-note">
              Your details stay on your device until you choose to send the
              email.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
const expertise = [
  [
    "portrait-1",
    "Specialist care support",
    "Clinical understanding",
    "/complex-care/",
  ],
  [
    "portrait-2",
    "Nutrition & wellbeing",
    "A holistic approach",
    "/nutrition-and-wellbeing/",
  ],
  [
    "portrait-3",
    "Care coordination",
    "Personal communication",
    "/accucare-plus/",
  ],
  [
    "portrait-4",
    "Everyday independence",
    "Dignity and choice",
    "/domiciliary-care/",
  ],
];
function DExpertise() {
  return (
    <section className="dt-section dt-container">
      <div className="dt-section-title">
        <DEyebrow>Connected expertise</DEyebrow>
        <DHeading center>Personal attention. Thoughtful support.</DHeading>
      </div>
      <div className="dt-expertise-grid">
        {expertise.map(([image, title, tag, to]) => (
          <DReveal key={title}>
            <Link className="dt-expertise-card" to={to}>
              <DPhoto
                name={image}
                alt="Illustrative portrait of a healthcare professional"
              />
              <div>
                <h3>{title}</h3>
                <span>{tag}</span>
              </div>
              <span className="dt-expertise-more">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          </DReveal>
        ))}
      </div>
    </section>
  );
}
const promises = [
  [
    "Care should respect your dignity, understand your life and help you feel more like yourself.",
    "The AccuCare promise",
  ],
  [
    "Your preferences and priorities should shape your care, with clear communication and thoughtful personal attention.",
    "A personal approach",
  ],
  [
    "Care is more reassuring when nutrition, mobility, emotional wellbeing and everyday life are considered together.",
    "Care for the whole person",
  ],
];
function DPromise() {
  const reduce=useReducedMotion();
  const [index, setIndex] = useState(0);
  const carousel = useRef(null);
  const current = useRef(0);
  const gesture = useRef(null);
  const lastWheel = useRef(0);
  function changeSlide(direction) {
    setIndex((value) => {
      const next = (value + direction + promises.length) % promises.length;
      current.current = next;
      return next;
    });
  }
  useEffect(() => {
    const el = carousel.current;
    let total = 0;
    function wheel(e) {
      if (e.ctrlKey || Math.abs(e.deltaY) >= Math.abs(e.deltaX)) return;
      const delta = e.deltaX;
      if (!delta) return;
      const direction = Math.sign(delta);
      const now = performance.now();
      if (now - lastWheel.current < 700) { e.preventDefault(); return; }
      if ((current.current === 0 && direction < 0) || (current.current === promises.length - 1 && direction > 0)) return;
      e.preventDefault();
      total += delta;
      if (Math.abs(total) >= 40) {
        changeSlide(direction);
        lastWheel.current = now;
        total = 0;
      }
    }
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, []);
  return (
    <section className="dt-promise">
      <div className="dt-promise-fixed-image" role="img" aria-label="A reassuring care conversation" />
      <div className="dt-promise-copy" ref={carousel} tabIndex={0} role="region" aria-label="AccuCare promises. Drag, swipe or scroll to change slides."
        onKeyDown={(e) => { if (["ArrowLeft", "ArrowRight"].includes(e.key)) { e.preventDefault(); changeSlide(e.key === "ArrowRight" ? 1 : -1); } }}
        onPointerDown={(e) => { if (e.button !== 0) return; gesture.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerUp={(e) => { const start = gesture.current; gesture.current = null; if (start && Math.abs(e.clientX - start.x) > 45 && Math.abs(e.clientX-start.x) > Math.abs(e.clientY-start.y)) changeSlide(e.clientX < start.x ? 1 : -1); if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); }}
        onPointerCancel={() => { gesture.current = null; }}
      >
        <DNotch />
        <span className="dt-promise-icon">
          <i className="dt-medical-icon dt-icon-quotation" aria-hidden="true" />
        </span>
        <div className="dt-promise-rating" aria-label="Five-star rating design preview; no customer rating supplied">
          <span aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={17} weight="fill" />)}</span>
          <small>Rating preview</small>
        </div>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{duration:reduce?0:.35}}
          >
            <p>“{promises[index][0]}”</p>
            <footer>
              <img
                src="/images/doctean/portrait-2.webp"
                alt="Illustrative healthcare professional portrait"
              />
              <div>
                <h3>{promises[index][1]}</h3>
                <span>Clinically led. Personally delivered.</span>
              </div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <span className="dt-sr-only" aria-live="polite">Care promise {index + 1} of {promises.length}</span>
      </div>
    </section>
  );
}
function DPlans() {
  return (
    <section className="dt-container dt-section dt-plans">
      <DEyebrow>Care that fits your life</DEyebrow>
      <DHeading>Explore the right support for you.</DHeading>
      <div className="dt-plans-grid">
        {[
          [
            "Personalised visits",
            "Home care",
            "A little help with everyday life.",
            [
              "An individual care plan",
              "Support for your routines",
              "Dignity and personal choice",
            ],
            "/domiciliary-care/",
          ],
          [
            "Dedicated support",
            "Live-in care",
            "A reassuring presence at home.",
            [
              "Familiar surroundings",
              "Individually agreed arrangements",
              "Continuity and companionship",
            ],
            "/live-in-care/",
          ],
          [
            "Private care concierge",
            "AccuCare+",
            "A little more personal attention.",
            [
              "Thoughtful coordination",
              "Holistic wellbeing",
              "Three membership tiers to explore",
            ],
            "/accucare-plus/",
          ],
        ].map(([tag, title, body, points, to], i) => (
          <DReveal key={title}>
            <article className={`dt-plan ${i === 1 ? "is-featured" : ""}`}>
              <span>{tag}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <ul>
                {points.map((t) => (
                  <li key={t}>
                    <Check size={18} />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="dt-plan-note">
                Care and costs agreed after assessment.
              </p>
              <DButton to={to} outline>
                Explore your options
              </DButton>
            </article>
          </DReveal>
        ))}
      </div>
    </section>
  );
}
function DCoverage() {
  const [filter, setFilter] = useState("All care");
  const rows = ["Home care", "Live-in care", "Specialist support", "AccuCare+"];
  return (
    <section className="dt-container dt-section dt-coverage">
      <div className="dt-section-title">
        <DEyebrow>Care close to home</DEyebrow>
        <DHeading center>Local understanding. Personal care.</DHeading>
      </div>
      <div
        className="dt-coverage-filters"
        role="group"
        aria-label="Filter care coverage"
      >
        {["All care", ...rows].map((t) => (
          <button
            key={t}
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="dt-table-scroll">
        <table>
          <thead>
            <tr>
              <th>Care options</th>
              {[
                "London",
                "Kent",
                "Essex",
                "Surrey",
                "Bucks",
                "East Sussex",
                "UK wide",
              ].map((t) => (
                <th key={t}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows
              .filter((t) => filter === "All care" || t === filter)
              .map((t, i) => (
                <tr key={t}>
                  <th>{t}</th>
                  {Array.from({ length: 7 }, (_, j) => (
                    <td
                      key={j}
                      className={(i + j) % 3 === 0 ? "dt-coverage-tint" : ""}
                    >
                      <Link to="/contact/">
                        {t === "Home care" && j === 6
                          ? "Enquire"
                          : "Discuss care"}
                        <small>Individually assessed</small>
                      </Link>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="dt-small">
        Support depends on your assessment, staffing availability and agreed
        arrangements. For Nigeria, explore our dedicated care page.
      </p>
    </section>
  );
}
function DGuidance() {
  return (
    <section className="dt-container dt-section">
      <div className="dt-section-title">
        <DEyebrow>Helpful information</DEyebrow>
        <DHeading center>A little clarity. A lot of reassurance.</DHeading>
      </div>
      <div className="dt-guidance-grid">
        {[
          [
            "personal-care",
            "Getting started",
            "Your care journey, step by step.",
            "/how-care-works/",
          ],
          [
            "life-at-home",
            "Care planning",
            "Understanding care and funding.",
            "/planning-and-care-funding/",
          ],
          [
            "wellbeing",
            "Whole-person care",
            "Personal attention beyond the everyday.",
            "/accucare-plus/",
          ],
        ].map(([image, tag, title, to]) => (
          <DReveal key={to}>
            <Link to={to} className="dt-guidance-card">
              <div>
                <Photo name={image} alt={tag} />
                <DNotch />
                <span className="dt-guidance-arrow">
                  <ArrowUpRight size={25} />
                </span>
              </div>
              <section>
                <span>{tag}</span>
                <h3>{title}</h3>
                <span className="dt-read-more">
                  Read more <ArrowUpRight size={17} />
                </span>
              </section>
            </Link>
          </DReveal>
        ))}
      </div>
    </section>
  );
}
function DHomeServices() {
  return <section id="care" className="dt-container dt-section dt-home-services">
    <div className="dt-home-section-heading"><div><DEyebrow>Care, thoughtfully considered</DEyebrow><DHeading>The right support. A life that feels like yours.</DHeading></div><p>From a little help with daily life to more specialist support, your care starts with you.</p></div>
    <div className="dt-home-service-layout">
      <DReveal className="dt-home-service-lead"><Link to="/domiciliary-care/"><Photo name="home-care" alt="A carer sharing a warm moment with an older person at home"/><div><span>01 / Bespoke home care</span><h3>Everyday life.<br/>On your terms.</h3><p>Personal visits shaped around your routines, preferences and independence.</p><span className="dt-home-inline-link">Explore home care <ArrowUpRight size={22}/></span></div></Link></DReveal>
      <div className="dt-home-service-stack">
        {[["02", "live-in-care", "Live-in care", "A reassuring presence. The comfort of home.", "/live-in-care/"], ["03", "personal-care", "Specialist care", "Thoughtful support for more complex needs.", "/complex-care/"]].map(([n,img,title,body,to])=><DReveal key={n}><Link to={to} className="dt-home-service-small"><Photo name={img} alt={title === "Live-in care" ? "Support and conversation in familiar surroundings" : "Personal care planning with an older couple"}/><div><span>{n} / Personalised support</span><h3>{title}</h3><p>{body}</p><ArrowUpRight size={25}/></div></Link></DReveal>)}
        <Link to="/accucare-plus/" className="dt-home-plus-link"><span>04 / AccuCare+</span><strong>Your private care concierge</strong><ArrowUpRight size={25}/></Link>
      </div>
    </div>
  </section>;
}
function DHomeConcierge() {
  const [tier, setTier] = useState(1);
  return <section id="accucare-plus" className="dt-home-concierge dt-container">
    <div className="dt-home-concierge-photo"><Photo name="life-at-home" alt="An older couple enjoying a peaceful moment in their garden"/><div><span>ACCUCARE<span className="dt-home-plus-symbol">+</span></span><p>A little more attention.<br/>An altogether more personal experience.</p></div></div>
    <div className="dt-home-concierge-copy"><DEyebrow>Exclusive private care concierge</DEyebrow><DHeading>Every detail. Thoughtfully connected.</DHeading><p>For individuals and families who value privacy, discretion and a trusted partner to coordinate care and wider wellbeing.</p><div className="dt-home-concierge-points"><span>Care & specialist coordination</span><span>Nutrition & holistic wellbeing</span><span>Lifestyle & family communication</span></div><h3>Three membership tiers.<br/>One deeply personal approach.</h3><div className="dt-home-tier-selector" role="group" aria-label="Explore membership tiers">{[1,2,3].map(n=><button key={n} aria-pressed={tier===n} onClick={()=>setTier(n)}><small>MEMBERSHIP</small><strong>0{n}</strong><span>{tier===n ? "Selected" : "Explore"} <ArrowUpRight size={16}/></span></button>)}</div><p className="dt-home-tier-note" aria-live="polite">Explore membership {tier} with our team. Your consultation explains each tier’s inclusions, availability and individually agreed arrangements.</p><DButton to={`/contact/?membership=${tier}`}>Discuss your membership</DButton><Link className="dt-home-concierge-more" to="/accucare-plus/">Discover AccuCare+ <ArrowUpRight size={18}/></Link></div>
  </section>;
}
function DHomeJourney() {
  return <section id="how-care-works" className="dt-container dt-section dt-home-journey"><div className="dt-home-section-heading"><div><DEyebrow>How our care works</DEyebrow><DHeading>A clear first step. A considered way forward.</DHeading></div><p>We take the time to understand your life, then build the right support around it.</p></div><div className="dt-home-journey-layout"><DReveal className="dt-home-journey-photo"><Photo name="personal-care" alt="A relaxed care consultation with an older couple"/><span>It starts with a conversation.</span></DReveal><ol>{[["Consultation", "A complimentary first conversation to listen, answer your questions and explore what could help."],["Individual assessment", "We consider care needs, daily routines, nutrition, mobility and the things that matter to you."],["Your personalised care plan", "Together, we agree the right support, preferences and practical arrangements."],["Ongoing support", "Clear communication and regular reviews help your care adapt as life changes."]].map(([title,body],i)=><li key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></div><DButton to="/how-care-works/" outline>Explore your care journey</DButton></section>;
}
function DHomeWellbeing() {
  return <section id="wellbeing" className="dt-container dt-home-wellbeing"><div className="dt-home-wellbeing-copy"><DEyebrow>Clinically led. Personally delivered.</DEyebrow><DHeading>Care for the person. Not just the everyday tasks.</DHeading><p>Clinical understanding gives your care direction. Compassion gives it meaning. We bring both together, with support that considers the whole of your wellbeing.</p><div>{[["Clinical understanding", "An individual assessment and thoughtful coordination, with appropriately qualified professionals where required."],["Nutrition that belongs in your care", "Nutritional and dietary guidance is considered during onboarding, with input from our in-house dietitian and fitness coach."],["More of what makes life yours", "Movement, companionship, emotional wellbeing and familiar routines all have a place in your care plan."]].map(([t,b])=><article key={t}><h3>{t}</h3><p>{b}</p></article>)}</div><Link to="/about-us/" className="dt-home-inline-link">Get to know AccuCare <ArrowUpRight size={22}/></Link></div><div className="dt-home-wellbeing-images"><Photo name="wellbeing" alt="Support with a nourishing meal at home"/><Photo name="companionship" alt="Companionship and meaningful time together"/><span>Wellbeing is in the details.</span></div></section>;
}
function DHomeCoverage() {
  return <section id="coverage" className="dt-container dt-section dt-home-coverage"><div className="dt-home-coverage-main"><DEyebrow>Care close to home</DEyebrow><DHeading>Local understanding. A wider circle of care.</DHeading><p>Home care across London and the surrounding counties. Dedicated live-in care across the UK, subject to assessment and agreed arrangements.</p><div className="dt-home-counties">{["London", "Kent", "Essex", "Surrey", "Buckinghamshire", "East Sussex"].map(c=><span key={c}><MapPin size={15}/>{c}</span>)}</div><DButton to="/contact/" outline>Discuss care in your area</DButton><div className="dt-home-uk-note"><HouseLine size={28}/><div><strong>Nationwide live-in care</strong><span>Familiar surroundings. Personal support.</span></div></div></div><div className="dt-home-nigeria"><Photo name="care-at-home" alt="Compassionate personal support at home"/><div><span>ACCUCARE NIGERIA</span><h3>Thoughtful care.<br/>Across borders.</h3><p>Our UK-informed approach, with local understanding and agreed updates for families living overseas.</p><Link to="/nigeria/">Explore care in Nigeria <ArrowUpRight size={23}/></Link></div></div></section>;
}
function DCauses() {
  const reduce=useReducedMotion();
  const logos=[["eve.svg","The Eve Appeal"],["alzheimers.png","Alzheimer’s Society"],["age-uk.png","Age UK"],["cause-four.svg","Supported cause"]];
  return <section className="dt-causes dt-container" aria-labelledby="dt-causes-title"><div className="dt-causes-heading"><DEyebrow>Helping Hands</DEyebrow><h2 id="dt-causes-title">Supporting Causes That Matter</h2></div><div className={`dt-causes-carousel${reduce?' is-still':''}`} tabIndex={0} aria-label="Supported causes logo carousel"><div className="dt-causes-track">{[0,1].map(copy=><div className="dt-causes-set" key={copy} aria-hidden={copy===1?true:undefined}>{logos.map(([file,name])=><div className="dt-cause-logo" key={file}><img src={`/images/causes/${file}`} alt={copy===0?name:""} loading="lazy"/></div>)}</div>)}</div></div></section>;
}
function DCareTimeline() {
  const steps=[
    ["Initial Conversation","We listen to your concerns, answer your questions and learn what support may be needed.",ChatsCircle],
    ["Care Assessment","A member of our team meets with you and your family, involving relevant healthcare professionals where appropriate.",ClipboardText],
    ["Personalised Care Plan","Together, we create a detailed plan covering routines, preferences, risks, health needs and personal goals.",ShieldCheck],
    ["Carefully Matched Support","We introduce trained carers whose experience and approach are suited to your needs.",HandHeart],
    ["Ongoing Review","We monitor care delivery, keep communication clear and adjust your plan whenever circumstances change.",Clock]
  ];
  return <section id="how-care-works" className="dt-care-timeline dt-container"><div className="dt-timeline-intro"><div className="dt-timeline-sticky"><DEyebrow>Planning Your Care</DEyebrow><DHeading>Care Begins with Listening</DHeading><p>We understand how personal the decision to arrange care can be. Our process is clear, collaborative and centred on the person receiving support.</p><div className="dt-timeline-photo"><Photo name="client/care-04" alt="A care professional discussing support with an older woman"/><span><HandHeart size={24} weight="light"/>Your voice.<br/>At every step.</span></div><DButton to="https://n7hx8oeibctrgf.projectwebtec10.com/areas-we-cover/">Learn How Care Is Arranged</DButton></div></div><ol className="dt-timeline-steps">{steps.map(([title,body,Icon],i)=><li key={title}><span className="dt-timeline-node" aria-hidden="true"><span/></span><DReveal className="dt-timeline-step"><div className="dt-timeline-step-top"><span className="dt-timeline-number">0{i+1}</span><Icon size={32} weight="light" aria-hidden="true"/></div><h3>{title}</h3><p>{body}</p><span className="dt-timeline-step-caption">{i===4?'Care that grows with you':'Your care journey'}</span></DReveal></li>)}</ol></section>;
}
function DWhyFamilies() {
  const reasons=[
    [Leaf,"Holistic Care","We consider physical, emotional and social wellbeing, not only individual care tasks."],
    [SlidersHorizontal,"Tailor-Made Support","Every care plan reflects the person’s needs, preferences, routines and circumstances."],
    [HandHeart,"Compassionate Carers","Our carers are selected for their experience, professionalism and genuine commitment to helping others."],
    [ArrowsClockwise,"Continuity of Care","We aim to provide familiar carers who understand the individual and build trusted relationships over time."],
    [DeviceMobile,"Local Support, Modern Technology","A responsive local team is supported by digital systems that improve communication, accuracy and accountability."]
  ];
  return <section className="dt-why-families dt-container" id="why-accucare"><DReveal className="dt-why-photo"><Photo name="client/care-06" alt="A carer and an older woman sharing a warm moment"/></DReveal><div className="dt-why-copy"><DEyebrow>Why Families Choose Us</DEyebrow><DHeading>Personal Care, Delivered with Professional Standards</DHeading><p className="dt-why-introduction">Inviting someone into your home requires trust. We combine compassionate relationships with structured care planning, trained staff and clear oversight.</p><div className="dt-why-reasons">{reasons.map(([Icon,title,body],i)=><DReveal className="dt-why-reason" key={title} delay={i*.05}><span className="dt-why-icon"><Icon size={34} weight="light" aria-hidden="true"/></span><div><h3>{title}</h3><p>{body}</p></div></DReveal>)}</div></div></section>;
}
function DFamilySupport() {
  return <section id="family-support" className="dt-family-support dt-container"><DReveal className="dt-family-photo"><Photo name="client/care-13" alt="Thoughtful support for an older person in the comfort of home"/></DReveal><div className="dt-family-copy"><svg className="dt-family-number dt-family-brandmark" viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"><path d="M73 165v-17c-15-11-28-25-33-43l-7-31c-2-9-11-8-11 1l3 37c1 16 9 29 20 40l7 7v13"/><path d="M73 148c4-16 1-27-7-38L54 94c-6-8-15-2-11 6l10 20"/><path d="M177 165v-17c15-11 28-25 33-43l7-31c2-9 11-8 11 1l-3 37c-1 16-9 29-20 40l-7 7v13"/><path d="M177 148c-4-16-1-27 7-38l12-16c6-8 15-2 11 6l-10 20"/><path d="M47 168h31v18H47zM172 168h31v18h-31z"/><path d="M127 119c1-21-4-39-18-54M125 92c9-12 15-27 18-43"/><path d="M119 84c-26 2-42-15-44-48 30 2 49 19 44 48Z"/><path d="M130 64c-2-25 12-39 34-43-1 26-12 43-34 43Z"/><path d="m94 57 21 22m29-34 9-10"/></g></svg><DReveal><div className="dt-family-icon"><span><HandHeart size={56} weight="light" aria-hidden="true"/></span></div><span className="dt-family-eyebrow">Supporting the Whole Family</span><h2>You Do Not Have to Make Care Decisions Alone</h2><p>It is natural to feel uncertain when someone you love begins to need additional support. You may be balancing safety concerns, family responsibilities and the wish to protect their independence.</p><p>Our team will explain the available options clearly, without pressure, so you can make an informed decision with confidence.</p><div className="dt-family-actions"><DButton to="https://n7hx8oeibctrgf.projectwebtec10.com/contact/">Speak With Our Care Team</DButton><a className="dt-family-phone" href="tel:+442038770929"><Phone size={18}/>Call 020 3877 0929</a></div></DReveal></div></section>;
}
function DHome() {
  return <div className="dt-home-refined"><DHero careAtHome/><DAboutBlock/><DCauses/><DSpecialistDepartments/><DCareTimeline/><DWhyFamilies/><ReviewEnquiry/><DFamilySupport/><FinalCTA/></div>;
}
function DFooter() {
  return (
    <footer className="dt-footer">
      <div className="dt-container">
        <div className="dt-footer-grid">
          <div>
            <Logo />
            <p>
              Thoughtful care for the whole person. More independence. More
              peace of mind.
            </p>
            <DButton>Start a conversation</DButton>
          </div>
          <div>
            <h3>Useful links</h3>
            {[
              ["About AccuCare", "/about-us/"],
              ["How care works", "/how-care-works/"],
              ["AccuCare+", "/accucare-plus/"],
              ["Nigeria", "/nigeria/"],
              ["Contact", "/contact/"],
            ].map(([t, to]) => (
              <Link key={to} to={to}>
                {t}
              </Link>
            ))}
          </div>
          <div>
            <h3>Our care</h3>
            {services.slice(0, 5).map((s) => (
              <Link key={s.slug} to={`/${s.slug}/`}>
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h3>Care made personal</h3>
            <Link to="/planning-and-care-funding/">
              Planning & care funding
            </Link>
            <Link to="/referrals/">Professional referrals</Link>
            <Link to="/careers/">Careers & recruitment</Link>
            <p>
              Personalised care arrangements.
              <br />A complimentary first conversation.
            </p>
          </div>
        </div>
        <div className="dt-footer-contact">
          <div>
            <MapPin size={32} />
            <span>
              Our address<strong>51 Olympic Way, Greenford, UB6 8NJ</strong>
            </span>
          </div>
          <div>
            <Envelope size={32} />
            <span>
              Email address
              <a href="mailto:info@accucare.co.uk">info@accucare.co.uk</a>
            </span>
          </div>
          <div>
            <Phone size={32} />
            <span>
              Speak to our team<a href="tel:+442038770929">020 3877 0929</a>
            </span>
          </div>
        </div>
        <div className="dt-footer-bottom">
          <span>
            © {new Date().getFullYear()} AccuCare. All rights reserved.
          </span>
          <span>Clinically led. Personally delivered.</span>
          <Link to="/privacy-policy/">Privacy & cookies</Link>
        </div>
      </div>
    </footer>
  );
}
function DScroll() {
  const { scrollYProgress } = useScroll();
  return (
    <button
      className="dt-scroll-top"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
            ? "instant"
            : "smooth",
        })
      }
    >
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <motion.circle
          cx="32"
          cy="32"
          r="29"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <ArrowUp size={24} />
    </button>
  );
}

export default function DocteanSite(){return <div className="dt-site"><a className="dt-skip" href="#main">Skip to content</a><DHeader/><main id="main"><DHome/></main><SupportingLinks/><DFooter/><DScroll/></div>}
