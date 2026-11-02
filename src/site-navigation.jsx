import {useEffect,useRef} from 'react';
import {HomeLink as Link} from './home-links';
import {ArrowUpRight} from '@phosphor-icons/react';
import './homepage-only.css';
export function CareMegaMenu({design='original',onClose}){const ref=useRef(null);useEffect(()=>{const outside=e=>{if(!ref.current?.parentElement?.contains(e.target))onClose?.()};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside)},[]);return <div className="hp-care-menu" id={design==='original'?'care-dropdown':`care-menu-${design}`} ref={ref} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();onClose?.();ref.current?.parentElement?.querySelector('button')?.focus()}}}>{[['Home care','/services/'],['Live-in care','/services/'],['Specialist care','/services/'],['AccuCare+ private care concierge','/accucare-plus/']].map(([title,to])=><Link key={title} to={to} onClick={onClose}>{title}<ArrowUpRight size={15}/></Link>)}</div>}
export function SupportingLinks(){return <Link className="cc-mobile-consultation" to="/contact/">Arrange a Care Consultation <ArrowUpRight size={16}/></Link>}
