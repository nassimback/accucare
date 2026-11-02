import ShowcaseLinks from './showcase-links';
import "./homepage-only.css";

import { SupportingLinks } from "./site-navigation";
import DocteanSite from "./doctean";
import PaletteSwitcher from "./palette-switcher";
import { useEffect, useState } from "react";
import {BrowserRouter,Navigate,useLocation} from "react-router-dom";
import {HomeLink as Link,homeTarget,HomeLocationEffects} from "./home-links";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Leaf,
  HandHeart,
  ShieldCheck,
  ChatsCircle,
  ClipboardText,
  UsersThree,
  MapPin,
  Phone,
  Envelope,
  LockKey,
  CheckCircle,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import { services, faqs } from "./data";
import {
  Header,
  Footer,
  Button,
  Photo,
  CarePromise,
  ServiceCard,
  CTA,
  PageHero,
  FAQ,
  Arrow,
} from "./components";
import "./styles.css";
import AlternativeSite from "./alternatives";

function Home() {
  return (
    <>
      <section id="top" className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              PERSONALISED CARE. PEACE OF MIND.
            </div>
            <h1>
              Care that feels
              <br />
              like <span>home.</span>
            </h1>
            <p>
              Expert care. Familiar comforts. Personalised support that helps
              you live well, in the place you love.
            </p>
            <div className="hero-actions">
              <Button>Arrange a Care Consultation</Button>
              <Link className="hero-discover" to="/services/">
                Find your care <ArrowRight size={19} />
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-main-photo">
              <Photo
                name="home-care"
                alt="A carer sharing a warm moment with an older woman at home"
                eager
              />
            </div>
            <div className="hero-small-photo">
              <Photo
                name="life-at-home"
                alt="A couple enjoying time together in their garden"
                eager
              />
            </div>
            <div className="hero-petal" />
            <div className="hero-flower" aria-hidden="true">
              <HandHeart size={34} weight="light" />
            </div>
          </div>
        </div>
        <div className="hero-note container">
          <span>A little support can make a big difference.</span>
          <Link to="/how-care-works/">
            Let’s find what’s right for you <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

    </>
  );
}

export function Site({design='original'}){const location=useLocation();if(location.pathname!=='/')return <Navigate to={homeTarget(location.pathname+location.search+location.hash)} replace/>;return <><ShowcaseLinks/><PaletteSwitcher/><HomeLocationEffects design={design}/>{design==='doctean'?<DocteanSite/>:design!=='original'?<AlternativeSite design={design}/>:<><Header/><main id="main"><Home/></main><SupportingLinks/><Footer/></>}</>}
export default function App(){const base=import.meta.env.BASE_URL.replace(/\/$/,'');const pathname=window.location.pathname.slice(base.length)||'/';const prefix=pathname.match(/^\/(design-[234])(?:\/|$)/)?.[1];if(prefix==='design-3'){window.location.replace(base+'/design-2/'+window.location.search+window.location.hash);return null;}const design=prefix==='design-2'?'md':prefix==='design-4'?'doctean':'md';return <BrowserRouter basename={base+(prefix?`/${prefix}`:'/')}><Site design={design}/></BrowserRouter>}
