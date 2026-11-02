import {useEffect} from 'react';

// The client preview keeps link styling while disabling all destinations.
export function neutraliseShowcaseLinks(html){return html.replace(/(<a\b[^>]*\bhref=")[^"]*(")/g,'$1#$2')}
export default function ShowcaseLinks(){useEffect(()=>{
 const update=()=>document.querySelectorAll('a[href]').forEach(a=>{if(a.getAttribute('href')!=='#')a.setAttribute('href','#')});
 update();
 const observer=new MutationObserver(update);
 observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['href']});
 const preventNavigation=e=>{if(e.target instanceof Element&&e.target.closest('a[href]')){e.preventDefault();e.stopPropagation()}};
 document.addEventListener('click',preventNavigation,true);
 document.addEventListener('auxclick',preventNavigation,true);
 return()=>{observer.disconnect();document.removeEventListener('click',preventNavigation,true);document.removeEventListener('auxclick',preventNavigation,true)};
 },[]);return null}
