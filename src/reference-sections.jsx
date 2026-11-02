import { useRef, useState, useEffect } from "react";
import {HomeLink as Link} from "./home-links";
import {
  motion,
  useScroll,
  useReducedMotion,
  useInView,
  animate,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowUp,
  ShieldCheck,
  ClipboardText,
  CalendarCheck,
  Stethoscope,
  ChatsCircle,
  Plus,
  Phone,
  Clock,
} from "@phosphor-icons/react";
import { Logo, Photo } from "./components";
import { services } from "./data";
import { Reveal, Action, TextLink, Eyebrow } from "./alternatives";

export function Count({ value }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [number, setNumber] = useState(value);
  useEffect(() => {
    if (!visible || reduced) return;
    const control = animate(0, Number(value), {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setNumber(Math.round(v)),
    });
    return () => control.stop();
  }, [visible, reduced, value]);
  return (
    <strong ref={ref} aria-label={String(value)}>
      {number}
    </strong>
  );
}
export function PixelDivider({ dark = false }) {
  if (dark) return <div className="ref-brand-divider" aria-hidden="true"><div className="ref-brand-divider-inner"><span/><img src="/images/logo-mark.webp" alt="" width="42" height="42"/><span/></div></div>;
  return (
    <svg
      className={`ref-pixel ${dark ? "ref-pixel-dark" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1920 80"
      aria-hidden="true"
    >
      {[0, 20, 60].map((y) =>
        Array.from({ length: 24 }, (_, i) => (
          <rect
            key={`${y}-${i}`}
            x={i * 80 + (y === 20 ? 40 : 0)}
            y={y}
            width="40"
            height="20"
          />
        )),
      )}
    </svg>
  );
}
const guideItems = [
  [
    "personal-care",
    "How care works",
    "A little clarity. A confident first step.",
    "/how-care-works/",
  ],
  [
    "wellbeing",
    "Planning your care",
    "Understanding your care and funding options.",
    "/planning-and-care-funding/",
  ],
  [
    "companionship",
    "Personal wellbeing",
    "Care for the whole person, every day.",
    "/accucare-plus/",
  ],
];
function Guidance({ ciya = false }) {
  return (
    <section className={`ref-guidance ${ciya ? "c-ref-guidance" : ""}`}>
      <div className="a-container">
        <Reveal className="ref-guide-heading">
          {ciya ? (
            <Eyebrow>Advice & guidance</Eyebrow>
          ) : (
            <h6>HELPFUL INFORMATION</h6>
          )}
          <h2>
            Helping you take
            <br />
            the next step.
          </h2>
        </Reveal>
        <div className="ref-guide-grid">
          {guideItems.slice(0, ciya ? 3 : 2).map(([image, cat, title, to]) => (
            <Reveal key={to}>
              <Link to={to} className="ref-guide-card">
                <Photo name={image} alt={cat} />
                <span>{cat}</span>
                <h3>{title}</h3>
                <span className="ref-guide-read">
                  Read more <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
const story = [
  [
    "Understanding you",
    "We begin with a conversation. We listen to your circumstances, your preferences and the people and routines that make your life yours. Together, we explore the support that could help you feel more comfortable and confident at home.",
    "md-timeline-1.webp",
  ],
  [
    "Care, shaped around you",
    "Your care plan brings your needs, personal choices and everyday wellbeing together. From practical help to more specialist support, we agree a thoughtful approach with you and the people you choose to involve.",
    "md-timeline-2.webp",
  ],
  [
    "Support that grows with you",
    "Good care keeps listening. We stay attentive to your experience, review your support and adapt your care as your circumstances change, helping you preserve your independence and the life you enjoy.",
    "md-timeline-3.webp",
  ],
];
function MDTimeline() {
  const target = useRef(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start center", "end center"],
  });
  const reduced = useReducedMotion();
  return (
    <div className="ref-timeline" ref={target}>
      <div className="ref-timeline-rail">
        <motion.div style={{ scaleY: reduced ? 1 : scrollYProgress }} />
      </div>
      {story.map(([title, body, image], i) => (
        <Reveal
          className={`ref-timeline-row ${i % 2 ? "is-reversed" : ""}`}
          key={title}
        >
          <img
            src={`/images/reference/${image}`}
            alt="Personal healthcare and professional support"
            loading="lazy"
          />
          <span className="ref-timeline-number">{i + 1}</span>
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
            <TextLink to="/how-care-works/">Discover more</TextLink>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
export function MDReferenceSections() {
  return (
    <>
      <section id="wellbeing" className="ref-md-intro a-container">
        <Reveal>
          <h2>
            More independence. More reassurance.
            <br />
            Care for the whole person.
            <br />
            For the life you want to live.
          </h2>
        </Reveal>
        <Reveal className="ref-intro-body">
          <p>
            From a little help at home to dedicated live-in support, we bring
            clinical understanding and genuine compassion to your everyday life.
            We listen to your story, respect your choices and build care around
            what matters to you.
          </p>
        </Reveal>
        <div className="ref-md-cards">
          {[
            [
              "Your everyday wellbeing",
              "Personalised home care",
              "Everyday support shaped around your routines, your needs and your independence.",
              "/domiciliary-care/",
            ],
            [
              "Expertise & understanding",
              "Specialist care support",
              "Considered care and professional coordination for more complex needs.",
              "/complex-care/",
            ],
            [
              "Care, thoughtfully coordinated",
              "Private care concierge",
              "Thoughtful coordination and enhanced personal attention through AccuCare+.",
              "/accucare-plus/",
            ],
          ].map(([label, title, body, to], i) => (
            <Reveal key={title} delay={i * 0.1}>
              <Link to={to} className={`ref-md-card ref-md-card-${i}`}>
                <span>{label}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="ref-md-stats a-container">
        <Reveal className="ref-stat-left">
          <h6>OUR APPROACH TO YOUR CARE</h6>
          <img
            src="/images/reference/md-stats.webp"
            alt="A healthcare professional preparing personalised support"
            loading="lazy"
          />
        </Reveal>
        <Reveal>
          <h2>
            Individual care.
            <br />
            Connected thinking.
          </h2>
          <div className="ref-stat-list">
            {[
              ["14", "Care services, shaped around your needs"],
              ["2", "Countries: United Kingdom and Nigeria"],
              ["3", "AccuCare+ concierge membership tiers"],
            ].map(([n, t]) => (
              <div key={n}>
                <Count value={n} />
                <h3>{t}</h3>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
      <PixelDivider />
      <section id="care" className="ref-md-pale">
        <div className="a-container">
          <Reveal className="ref-centered">
            <h6>PERSONAL CARE, EVERY STEP</h6>
            <h2>
              We deliver care
              <br />
              designed for you.
            </h2>
          </Reveal>
          <MDTimeline />
          <section id="how-care-works" className="ref-care-table">
            <Reveal>
              <h6>CARE THAT CONNECTS</h6>
              <h2>
                Thoughtful support.
                <br />A considered approach.
              </h2>
            </Reveal>
            <div className="ref-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Care</th>
                    <th>Support</th>
                    <th>Approach</th>
                    <th>Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "01",
                      "Home care",
                      "Personalised visits",
                      "London & surrounding counties",
                    ],
                    [
                      "02",
                      "Live-in care",
                      "Dedicated support at home",
                      "Across the United Kingdom",
                    ],
                    [
                      "03",
                      "Specialist support",
                      "Individually assessed",
                      "Discuss your needs with us",
                    ],
                    [
                      "04",
                      "AccuCare+",
                      "Private care concierge",
                      "Personal coordination",
                    ],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((v) => (
                        <td key={v}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
      <section id="accucare-plus" className="ref-md-banner">
        <div className="a-container">
          <Reveal className="ref-md-banner-card">
            <h2>
              A little more
              <br />
              personal attention.
            </h2>
            <p>
              AccuCare+ brings care coordination, nutrition, mobility and
              emotional wellbeing together, with thoughtful support for every
              part of life.
            </p>
            <TextLink to="/accucare-plus/">Discover AccuCare+</TextLink>
          </Reveal>
        </div>
      </section>
      <section id="coverage" className="ref-md-promise a-container">
        <Reveal>
          <h2>
            “Care should respect your dignity, understand your life and help you
            feel more like yourself.”
          </h2>
          <span className="ref-promise-avatar"><img src="/images/care-professional-cutout.webp" alt="Portrait of a smiling care professional" loading="lazy" /></span>
          <h3>The AccuCare promise</h3>
          <p>Clinically led. Personally delivered.</p>
        </Reveal>
      </section>
      <Guidance />
      <section className="ref-gallery">
        <h3>Care for everything that matters.</h3>
        <div>
          {[
            "home-care",
            "personal-care",
            "wellbeing",
            "companionship",
            "live-in-care",
            "care-professional",
          ].map((n) => (
            <Link
              to="/services/"
              key={n}
              aria-label="Explore our care services"
            >
              <Photo name={n} alt="Personal care and wellbeing" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function CareCoverage() {
  const [filter, setFilter] = useState("All care");
  const rows = [
    ["Home care", "Visits"],
    ["Live-in care", "Live-in"],
    ["Specialist support", "By assessment"],
    ["AccuCare+", "Concierge"],
  ];
  return (
    <section className="c-ref-coverage a-container">
      <Reveal className="ref-centered">
        <Eyebrow>Where we can help</Eyebrow>
        <h2>Care, close to home.</h2>
      </Reveal>
      <div
        className="c-ref-filters"
        role="group"
        aria-label="Filter care coverage"
      >
        {["All care", ...rows.map((r) => r[0])].map((t) => (
          <button
            key={t}
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="ref-table-wrap">
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
              .filter((r) => filter === "All care" || filter === r[0])
              .map(([t, b], i) => (
                <tr key={t}>
                  <th>{t}</th>
                  {Array.from({ length: 7 }, (_, j) => (
                    <td key={j}>
                      {i === 0 && j === 6 ? (
                        <span className="c-coverage-empty">Enquire</span>
                      ) : (
                        <Link
                          to="/contact/"
                          className={`c-coverage-cell color-${(i + j) % 3}`}
                        >
                          <strong>{b}</strong>
                          <span>Discuss your needs</span>
                        </Link>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="c-coverage-caption">
        Support is individually assessed and arranged following your care
        consultation.
      </p>
    </section>
  );
}
function Enquiry() {
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState("");
  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setDraft(
      "mailto:info@accucare.co.uk?subject=Care%20consultation&body=" +
        encodeURIComponent(
          `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nCare: ${data.get("care")}\n\n${data.get("message")}`,
        ),
    );
    setReady(true);
  }
  return (
    <section id="consultation" className="c-ref-enquiry a-container">
      <Reveal>
        <Eyebrow>Your first step</Eyebrow>
        <h2>
          Let’s talk about
          <br />
          your care.
        </h2>
        <p>
          A complimentary initial consultation to explore your circumstances and
          the support that could help.
        </p>
        <a className="c-ref-call" href="tel:+442038770929">
          <Phone size={38} />
          <span>
            Call our friendly team<strong>020 3877 0929</strong>
          </span>
        </a>
      </Reveal>
      <form onSubmit={submit}>
        <h3>Arrange a care consultation</h3>
        <div>
          <label>
            Your name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Phone number
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            Care required
            <select name="care">
              <option>Help me find the right care</option>
              {services.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Your message
          <textarea name="message" rows="3" />
        </label>
        <label className="c-consent">
          <input type="checkbox" required />I agree to be contacted about this
          enquiry. <Link to="/privacy-policy/">Privacy policy</Link>
        </label>
        <button className="a-button" type="submit">
          Prepare enquiry <ArrowUpRight size={20} />
        </button>
        {ready && (
          <p role="status">
            Your enquiry is ready.{" "}
            <a href={draft}>Open your email app to contact our team</a>, or call
            020 3877 0929.
          </p>
        )}
      </form>
    </section>
  );
}
export function CiyaReferenceHome({ hero }) {
  return (
    <>
      {hero}
      <section className="c-ref-panels a-container">
        {[
          [
            CalendarCheck,
            "Care consultation",
            "A complimentary first conversation to understand your circumstances and explore your options.",
            "Arrange a consultation",
          ],
          [
            Stethoscope,
            "Clinically led care",
            "Clinical understanding, compassionate people and a plan that respects your independence.",
            "Why AccuCare",
          ],
          [
            ChatsCircle,
            "Talk to our team",
            "Practical guidance and a friendly voice, for you and the people closest to you.",
            "020 3877 0929",
          ],
        ].map(([Icon, title, body, label], i) => (
          <Reveal key={title} delay={i * 0.1}>
            <article className={`c-ref-panel panel-${i}`}>
              <Icon size={40} />
              <h3>{title}</h3>
              <p>{body}</p>
              {i === 2 ? (
                <a href="tel:+442038770929">
                  {label}
                  <ArrowUpRight size={22} />
                </a>
              ) : (
                <TextLink to={i ? "/about-us/" : "/contact/"}>{label}</TextLink>
              )}
            </article>
          </Reveal>
        ))}
      </section>
      <section className="c-ref-about a-container">
        <img
          className="c-ref-capsule"
          src="/images/reference/care-capsule.webp"
          alt=""
        />
        <Reveal className="c-ref-about-image">
          <Photo
            name="personal-care"
            alt="A thoughtful conversation about personal care"
          />
          <div>
            <Clock size={42} />
            <span>
              <strong>Complimentary consultation</strong>A clear first step.
            </span>
          </div>
        </Reveal>
        <Reveal className="c-ref-about-copy">
          <Eyebrow>About AccuCare</Eyebrow>
          <h2>
            Personal care for
            <br />
            every part of life.
          </h2>
          <p>
            We bring clinical understanding, compassionate support and holistic
            wellbeing together, so you can feel more confident at home.
          </p>
          <ul>
            {[
              "A care plan as individual as you are",
              "Dignity, independence and personal choice",
              "Nutrition and wellbeing considered together",
              "Communication with the people you trust",
            ].map((t) => (
              <li key={t}>
                <Plus size={20} />
                {t}
              </li>
            ))}
          </ul>
          <div className="c-ref-author">
            <img src="/images/logo-mark.webp" alt="" />
            <div>
              <h3>The AccuCare approach</h3>
              <p>Clinically led. Personally delivered.</p>
            </div>
          </div>
          <Action to="/about-us/" outline>
            Learn more
          </Action>
          <img
            className="c-ref-shield"
            src="/images/reference/care-shield.webp"
            alt=""
          />
        </Reveal>
      </section>
      <section className="c-ref-departments">
        <div className="c-ref-section-head">
          <Reveal>
            <Eyebrow>Our care services</Eyebrow>
            <h2>
              Thoughtful support.
              <br />
              Whatever life brings.
            </h2>
            <p>
              Our personalised care services bring practical support, clinical
              understanding and compassionate people together, around the life
              you want to live.
            </p>
          </Reveal>
          <Action to="/services/">All care services</Action>
          <img
            className="c-ref-float"
            src="/images/reference/care-virus.webp"
            alt=""
          />
        </div>
        <div className="c-ref-department-grid">
          {services.slice(0, 3).map((s) => (
            <Reveal key={s.slug}>
              <Link to={`/${s.slug}/`}>
                <Photo name={s.image} alt={s.title} />
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <ArrowUpRight size={30} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="c-ref-services a-container">
        <div className="c-ref-section-head">
          <Reveal>
            <Eyebrow>Care shaped around you</Eyebrow>
            <h2>
              The right support.
              <br />A life that’s still yours.
            </h2>
          </Reveal>
          <p>
            We take time to listen, understand your needs and agree care that
            protects your dignity and personal choices.
          </p>
        </div>
        {services.slice(3, 7).map((s, i) => (
          <Reveal key={s.slug}>
            <Link className="c-ref-service-row" to={`/${s.slug}/`}>
              <span>0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <Photo name={s.image} alt="" />
              <i>
                <ArrowUpRight size={30} />
              </i>
            </Link>
          </Reveal>
        ))}
      </section>
      <div className="c-ref-ribbons" aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i}>
            <span>
              {Array.from({ length: 6 }, (_, j) => (
                <span key={j}>
                  PERSONALISED CARE <b>✳</b> CLINICALLY LED <b>✳</b>{" "}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
      <section className="c-ref-team a-container">
        <div className="c-ref-section-head">
          <Reveal>
            <Eyebrow>Care for the whole person</Eyebrow>
            <h2>
              Connected expertise.
              <br />
              Personal attention.
            </h2>
          </Reveal>
          <p>
            Practical support and specialist understanding, brought together
            around you and your everyday wellbeing.
          </p>
        </div>
        <div className="c-ref-team-grid">
          {[
            [
              "care-professional",
              "Personal care",
              "Dignity in everyday life",
              "/domiciliary-care/",
            ],
            [
              "wellbeing",
              "Nutrition & wellbeing",
              "A thoughtful, holistic approach",
              "/accucare-plus/",
            ],
            [
              "personal-care",
              "Care coordination",
              "Clear communication and support",
              "/complex-care/",
            ],
            [
              "companionship",
              "Companionship",
              "Connection and emotional wellbeing",
              "/companionship/",
            ],
          ].map(([image, title, body, to]) => (
            <Reveal key={title}>
              <Link to={to}>
                <div>
                  <Photo name={image} alt={title} />
                  <span>
                    <ArrowUpRight size={24} />
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CareCoverage />
      <section className="c-ref-commitment">
        <div className="c-ref-commitment-photo">
          <img
            src="/images/reference/clinical-team.webp"
            alt="Healthcare professionals working together"
          />
        </div>
        <Reveal>
          <Eyebrow>A little more attention</Eyebrow>
          <h2>
            Care that connects
            <br />
            every part of life.
          </h2>
          <p>
            AccuCare+ brings your care, nutrition, mobility and emotional
            wellbeing together through a private care concierge.
          </p>
          <div className="c-ref-benefits">
            {[
              ["14", "Care services"],
              ["3", "Membership tiers"],
              ["2", "Countries"],
              ["1", "Individual care plan"],
            ].map(([n, t]) => (
              <div key={t}>
                <Count value={n} />
                <span>{t}</span>
              </div>
            ))}
          </div>
          <Action to="/accucare-plus/" light>
            Discover AccuCare+
          </Action>
        </Reveal>
      </section>
      <section className="c-ref-promises a-container">
        <Reveal className="ref-centered">
          <Eyebrow>The AccuCare promise</Eyebrow>
          <h2>Your life. Your choices. Your care.</h2>
        </Reveal>
        <div>
          {[
            [
              "We listen",
              "Your preferences and priorities shape the support we provide.",
            ],
            [
              "We respect",
              "Your dignity, independence and personal choices come first.",
            ],
            [
              "We stay connected",
              "Clear communication with you and the people you trust.",
            ],
          ].map(([t, p]) => (
            <Reveal key={t}>
              <ShieldCheck size={32} />
              <h3>{t}</h3>
              <p>{p}</p>
              <span>Our commitment to you</span>
            </Reveal>
          ))}
        </div>
      </section>
      <Guidance ciya />
      <Enquiry />
    </>
  );
}
function CiyaReferenceFooter() {
  return (
    <>
      <footer className="ref-footer ref-footer-ciya">
        <div className="a-container c-ref-footer-layout">
          <div className="c-ref-footer-brand">
            <Logo />
            <p>
              Clinically led, personalised care that respects your dignity,
              independence and the life you want to live.
            </p>
            <h3>Care, wherever you call home.</h3>
            <Link to="/">United Kingdom</Link>
            <Link to="/nigeria/">Nigeria</Link>
          </div>
          <div className="c-ref-footer-columns">
            <div>
              <h3>Our care</h3>
              {services.slice(0, 4).map((s) => (
                <Link key={s.slug} to={`/${s.slug}/`}>
                  {s.title}
                </Link>
              ))}
            </div>
            <div>
              <h3>Useful links</h3>
              <Link to="/about-us/">About AccuCare</Link>
              <Link to="/how-care-works/">How care works</Link>
              <Link to="/planning-and-care-funding/">Care funding</Link>
              <Link to="/careers/">Careers</Link>
            </div>
            <div>
              <h3>Stay connected</h3>
              <p>Let’s talk about the support that could help.</p>
              <Link className="c-ref-footer-email" to="/contact/">
                Arrange a consultation
                <ArrowUpRight size={24} />
              </Link>
            </div>
            <div>
              <h3>Care arrangements</h3>
              <p>
                Personalised visits
                <br />
                Live-in & overnight care
                <br />
                Individually assessed support
              </p>
            </div>
            <div>
              <h3>Enquiries</h3>
              <a href="tel:+442038770929">020 3877 0929</a>
              <a href="mailto:info@accucare.co.uk">info@accucare.co.uk</a>
            </div>
            <div>
              <h3>Location</h3>
              <p>
                51 Olympic Way
                <br />
                Greenford, UB6 8NJ
                <br />
                United Kingdom
              </p>
            </div>
          </div>
        </div>
        <div className="a-container ref-footer-bottom">
          <span>
            © {new Date().getFullYear()} AccuCare. All rights reserved.
          </span>
          <Link to="/privacy-policy/">Privacy & cookies</Link>
        </div>
      </footer>
      <button
        className="a-to-top"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          })
        }
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
export function ReferenceFooter({ design }) {
  if (design === "ciya") return <CiyaReferenceFooter />;
  return (
    <>
      {design === "md" && <PixelDivider dark />}
      <footer className={`ref-footer ref-footer-${design}`}>
        <div className="a-container ref-footer-grid">
          {design === "ciya" && (
            <div>
              <Logo />
              <p>
                Clinically led. Personally delivered.
                <br />
                Care for every part of life.
              </p>
            </div>
          )}
          <div>
            {design === "ciya" && <h3>Our location</h3>}
            <p>
              51 Olympic Way
              <br />
              Greenford, UB6 8NJ
              <br />
              United Kingdom
            </p>
          </div>
          <div>
            {design === "ciya" && <h3>Talk to our team</h3>}
            <a href="mailto:info@accucare.co.uk">info@accucare.co.uk</a>
            <a className="ref-footer-phone" href="tel:+442038770929">
              020 3877 0929
            </a>
            <Link to="/contact/">Arrange a consultation</Link>
          </div>
          <div>
            {design === "ciya" && <h3>Useful links</h3>}
            <Link to="/about-us/">About AccuCare</Link>
            <Link to="/services/">Our care services</Link>
            <Link to="/how-care-works/">How care works</Link>
            <Link to="/nigeria/">AccuCare Nigeria</Link>
            <Link to="/privacy-policy/">Privacy & cookies</Link>
          </div>
          {design === "md" && (
            <div>
              <p>
                © {new Date().getFullYear()} AccuCare.
                <br />
                All rights reserved.
              </p>
              <Link to="/">
                Clinically led.
                <br />
                Personally delivered.
              </Link>
            </div>
          )}
        </div>
        {design === "ciya" && (
          <div className="a-container ref-footer-bottom">
            <span>
              © {new Date().getFullYear()} AccuCare. All rights reserved.
            </span>
            <span>United Kingdom & Nigeria</span>
            <Link to="/privacy-policy/">Privacy policy</Link>
          </div>
        )}
      </footer>
      <button
        className="a-to-top"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          })
        }
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}

export function ReferenceContact({ hero, design }) {
  return (
    <div className={`ref-contact-page ref-contact-${design}`}>
      {design === "ciya" && hero}
      <Enquiry />
    </div>
  );
}
