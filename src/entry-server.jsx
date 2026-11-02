import {neutraliseShowcaseLinks} from './showcase-links';
import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Site} from './App';
export function renderPages(){return [['','md'],['/design-2','md'],['/design-4','doctean'],['/design-2-revised','md-revised'],['/design-4-revised','doctean-revised']].map(([prefix,design])=>({path:prefix+'/',title:'AccuCare | Personalised Home Care & Private Care Concierge',description:'Clinically led, personalised home care, live-in support, specialist care and AccuCare+ private care concierge. UK-focused care with a dedicated Nigeria offering.',html:neutraliseShowcaseLinks(renderToString(createElement(StaticRouter,{basename:prefix||'/',location:prefix+'/'},createElement(Site,{design}))))}))}
