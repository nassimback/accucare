import {Leaf,SlidersHorizontal,HandHeart,ArrowsClockwise,DeviceMobile} from '@phosphor-icons/react';
import {motion,useReducedMotion} from 'motion/react';
import './md-why-families.css';
const reasons=[
 [Leaf,'Holistic Care','We consider physical, emotional and social wellbeing, not only individual care tasks.'],
 [SlidersHorizontal,'Tailor-Made Support','Every care plan reflects the person’s needs, preferences, routines and circumstances.'],
 [HandHeart,'Compassionate Carers','Our carers are selected for their experience, professionalism and genuine commitment to helping others.'],
 [ArrowsClockwise,'Continuity of Care','We aim to provide familiar carers who understand the individual and build trusted relationships over time.'],
 [DeviceMobile,'Local Support, Modern Technology','A responsive local team is supported by digital systems that improve communication, accuracy and accountability.']
];
export default function MDWhyFamilies(){const reduce=useReducedMotion();return <section className="md-why-families" id="why-accucare"><div className="md-why-collage"><div className="md-why-colour"><h3>Care that listens.<br/>Support you can trust.</h3></div><div className="md-why-portrait"><img src="/images/client/care-05.webp" alt="A carer offering reassuring personal support at home" loading="lazy"/></div><div className="md-why-wide"><img src="/images/wellbeing.webp" alt="Attentive support with nutrition and wellbeing at home" loading="lazy"/></div></div><div className="md-why-content"><header><span>Why Families Choose Us</span><h2>Personal Care, Delivered with Professional Standards</h2><p>Inviting someone into your home requires trust. We combine compassionate relationships with structured care planning, trained staff and clear oversight.</p></header><div className="md-why-points">{reasons.map(([Icon,title,body])=><motion.article key={title} initial={reduce?false:{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{duration:.55,ease:[.2,.7,.2,1]}}><Icon size={25} weight="light" aria-hidden="true"/><h3>{title}</h3><p>{body}</p></motion.article>)}</div></div></section>}
