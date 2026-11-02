import { CareMegaMenu } from "./site-navigation";
import { useEffect, useRef, useState } from "react";
import {useLocation} from "react-router-dom";
import {HomeLink as Link,HomeNavLink as NavLink} from "./home-links";
import {
  ArrowRight,
  CaretDown,
  Phone,
  List,
  X,
  Heart,
  ShieldCheck,
  HandHeart,
  Leaf,
  MapPin,
  ArrowUpRight,
  Envelope,
} from "@phosphor-icons/react";
import { services } from "./data";
export const Arrow = () => <ArrowRight size={19} aria-hidden="true" />;
export function Button({
  children,
  to = "/contact/",
  secondary = false,
  className = "",
}) {
  return (
    <Link
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
      to={to}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function Photo({ name, alt, className = "", eager = false }) {
  return (
    <img
      src={`/images/${name}.webp`}
      alt={alt}
      className={`photo ${["home-care", "live-in-care", "companionship", "wellbeing"].includes(name) ? "original-photo" : ""} ${className}`}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="AccuCare home">
      <img src="/images/logo-mark.webp" alt="" width="49" height="49" />
      <span>
        ACCUCARE<small>CLINICALLY LED. PERSONALLY DELIVERED.</small>
      </span>
    </Link>
  );
}
export function Header() {
  const [menu, setMenu] = useState(false),
    [careMenu, setCareMenu] = useState(false);
  const location = useLocation(),
    nav = useRef(null);
  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    try {
      localStorage.removeItem("accucare-theme");
    } catch {}
  }, []);
  useEffect(() => {
    setMenu(false);
    setCareMenu(false);
  }, [location.pathname]);
  useEffect(() => {
    const close = (e) => {
        if (!nav.current?.contains(e.target)) setCareMenu(false);
      },
      escape = (e) => {
        if (e.key === "Escape") {
          setCareMenu(false);
          setMenu(false);
        }
      };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="utility">
        <div className="container utility-inner">
          <span>Thoughtful care. Wherever you call home.</span>
          <div>
            <NavLink to="/">United Kingdom</NavLink>
            <span className="utility-divider" />
            <NavLink to="/nigeria/">
              Nigeria <ArrowUpRight size={12} />
            </NavLink>
            <Link to="/contact/">Care consultation</Link>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container nav-inner" ref={nav}>
          <Logo />
          <nav
            className={menu ? "main-nav is-open" : "main-nav"}
            aria-label="Main navigation"
          >
            <NavLink to="/" end>Home</NavLink>
            <div className="nav-care">
              <button
                className={careMenu ? "nav-link active" : "nav-link"}
                aria-expanded={careMenu}
                aria-controls="care-dropdown"
                onClick={() => setCareMenu(!careMenu)}
              >
                Our care <CaretDown size={13} />
              </button>
              {careMenu && (
                <CareMegaMenu design="original" onClose={()=>setCareMenu(false)}/>
              )}
            </div>
            <NavLink to="/about-us/">About us</NavLink>
            <NavLink to="/accucare-plus/">
              AccuCare<span className="nav-plus">+</span>
            </NavLink>
            <NavLink to="/nigeria/">Nigeria</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
          </nav>
          <a className="header-phone" href="tel:+442038770929">
            <Phone size={19} />
            <span>020 3877 0929</span>
          </a>
          <Link className="button nav-cta" to="/contact/">
            Arrange a Care Consultation <Arrow />
          </Link>
          <button
            className="mobile-toggle"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={26} /> : <List size={26} />}
          </button>
        </div>
      </header>
    </>
  );
}
export function ServiceCard({ service }) {
  return (
    <Link to={`/${service.slug}/`} className="service-card">
      <div className="service-image">
        <Photo
          name={service.image}
          alt={
            service.image === "life-at-home"
              ? "An older couple enjoying their garden"
              : "Personalised care and support at home"
          }
        />
        <span className="image-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="service-card-body">
        <h3>{service.title}</h3>
        <p>{service.short}</p>
        <span className="text-link">
          Explore care <Arrow />
        </span>
      </div>
    </Link>
  );
}
export function CarePromise() {
  return (
    <div className="promise-strip container">
      {[
        [
          ShieldCheck,
          "Clinically led care",
          "Expertise you can feel confident in",
        ],
        [
          Heart,
          "Personally delivered",
          "Your wishes at the heart of your care",
        ],
        [Leaf, "Whole-person wellbeing", "Care beyond everyday essentials"],
        [HandHeart, "Here for your family", "Reassurance at every step"],
      ].map(([Icon, title, desc]) => (
        <div className="promise" key={title}>
          <Icon size={28} weight="light" />
          <div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function CTA({
  title = "Good care starts with a conversation.",
  description = "Tell us what matters to you. We’ll listen, answer your questions and help you explore the right support.",
}) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div>
          <Button>Arrange a Care Consultation</Button>
          <a className="cta-phone" href="tel:+442038770929">
            <Phone size={18} /> Or call 020 3877 0929
          </a>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Thoughtful care for the whole person.
            <br />
            More independence. More peace of mind.
          </p>
          <a href="tel:+442038770929">
            <Phone size={17} /> 020 3877 0929
          </a>
          <a href="mailto:info@accucare.co.uk">
            <Envelope size={17} /> info@accucare.co.uk
          </a>
        </div>
        <div>
          <h3>Explore AccuCare</h3>
          <Link to="/about-us/">About us</Link>
          <Link to="/accucare-plus/">AccuCare+ concierge</Link>
          <Link to="/how-care-works/">How care works</Link>
          <Link to="/nigeria/">Care in Nigeria</Link>
          <Link to="/about-us/">Nutrition & wellbeing</Link>
        </div>
        <div>
          <h3>Our care</h3>
          <Link to="/live-in-care/">Live-in care</Link>
          <Link to="/domiciliary-care/">Home care</Link>
          <Link to="/accucare-plus/">AccuCare+ concierge</Link>
          <Link to="/palliative-care/">Palliative care</Link>
          <Link to="/services/">
            Explore our care <ArrowRight size={13} />
          </Link>
        </div>
        <div>
          <h3>Here to help</h3>
          <Link to="/contact/">Arrange a consultation</Link>
          <Link to="/how-care-works/">How our care works</Link>
          <Link to="/nigeria/">AccuCare Nigeria</Link>
          <p className="footer-address">
            <MapPin size={17} /> 51 Olympic Way
            <br />
            Greenford, UB6 8NJ
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} AccuCare. All rights reserved.</p>
        <span>Clinically led. Compassionately delivered.</span>
        <Link to="/privacy-policy/">Privacy & cookies</Link>
      </div>
    </footer>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  image = "personal-care",
  alt = "A caring conversation about support at home",
  children,
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{eyebrow}</span>
          </div>
          <h1>{title}</h1>
          <p>{description}</p>
          {children || <Button>Arrange a Care Consultation</Button>}
        </div>
        <div className="page-hero-image">
          <Photo name={image} alt={alt} eager />
        </div>
      </div>
    </section>
  );
}
export function FAQ({ questions }) {
  return (
    <div className="faq-list">
      {questions.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span className="faq-icon">
              <span />
              <span />
            </span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
