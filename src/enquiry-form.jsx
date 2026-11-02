import {useId,useRef,useState} from 'react';
import {useLocation} from 'react-router-dom';
import {HomeLink as Link} from './home-links';
import {ArrowUpRight,CheckCircle,Envelope,Phone} from '@phosphor-icons/react';
import {services} from './data';
export default function EnquiryForm({purpose='care',country}){
 const id=useId(),formRef=useRef(null),location=useLocation();
 const params=new URLSearchParams(location.search),initialCountry=country||(params.get('region')==='Nigeria'?'Nigeria':'United Kingdom');
 const requestedService=params.get('service');
 const tier=['1','2','3'].includes(params.get('membership'))?params.get('membership'):null;
 const [ready,setReady]=useState(false),[draft,setDraft]=useState(''),[error,setError]=useState('');
 function submit(e){e.preventDefault();setError('');const f=e.currentTarget;if(!f.reportValidity())return;const d=new FormData(f);if(d.get('website')){setError('We could not prepare this enquiry. Please contact us by telephone or email.');return}const subject=purpose==='referral'?'Professional referral enquiry':purpose==='careers'?'Careers enquiry':'Care consultation enquiry';const body=[subject,`Name: ${d.get('name')}`,`Email: ${d.get('email')}`,`Telephone: ${d.get('phone')}`,`Country: ${d.get('country')}`,`Service / area of interest: ${d.get('service')}`,`Preferred contact method: ${d.get('method')}`,tier?`AccuCare+ membership of interest: Tier ${tier}`:'',purpose==='referral'?`Organisation: ${d.get('organisation')}`:'',purpose==='careers'?`Role / skills of interest: ${d.get('role')}`:'','Message:',d.get('message')||'No additional message'].filter(Boolean).join('\n');setDraft('mailto:info@accucare.co.uk?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body));setReady(true)}
 return <div className="cc-enquiry" id="enquiry-form">
 {ready?<div className="cc-draft-ready" role="status"><CheckCircle size={46}/><h3>Your email draft is ready.</h3><p>Your enquiry has not been sent. Open it in your email app, review the details and send it to AccuCare.</p><a className="cc-button" href={draft}>Open email draft <ArrowUpRight size={18}/></a><button className="cc-text-button" onClick={()=>setReady(false)}>Edit your details</button><p>No email app? Call <a href="tel:+442038770929">020 3877 0929</a> or email <a href="mailto:info@accucare.co.uk">info@accucare.co.uk</a>.</p></div>:<form ref={formRef} onSubmit={submit}>
 {tier&&<p className="cc-form-context">AccuCare+ — Tier {tier} enquiry</p>}
 <div className="cc-form-fields">
 <label htmlFor={`${id}-name`}>Your name<input id={`${id}-name`} name="name" autoComplete="name" required maxLength={100}/></label>
 <label htmlFor={`${id}-email`}>Email address<input id={`${id}-email`} name="email" autoComplete="email" type="email" required maxLength={150}/></label>
 <label htmlFor={`${id}-phone`}>Telephone<input id={`${id}-phone`} name="phone" autoComplete="tel" type="tel" pattern="[+0-9() .-]{7,25}" title="Enter a telephone number with 7–25 characters, using numbers, spaces or + ( ) . -" required/></label>
 <label htmlFor={`${id}-country`}>Country<select id={`${id}-country`} name="country" aria-label="Country" defaultValue={initialCountry}><option>United Kingdom</option><option>Nigeria</option></select></label>
 <label htmlFor={`${id}-service`}>Service of interest<select id={`${id}-service`} name="service" aria-label="Service of interest" defaultValue={tier?'AccuCare+ private care concierge':services.some(s=>s.title===requestedService)?requestedService:'Help me find the right support'}><option>Help me find the right support</option>{services.map(s=><option key={s.slug}>{s.title}</option>)}<option>AccuCare+ private care concierge</option><option>Family support & care coordination</option></select></label>
 <label htmlFor={`${id}-method`}>Preferred contact method<select id={`${id}-method`} name="method" aria-label="Preferred contact method"><option>Telephone</option><option>Email</option></select></label>
 {purpose==='referral'&&<label>Organisation<input name="organisation" autoComplete="organization" required maxLength={150}/></label>}
 {purpose==='careers'&&<label>Role or skills of interest<input name="role" required maxLength={150}/></label>}
 </div>
 <label htmlFor={`${id}-message`}>Optional message<textarea id={`${id}-message`} name="message" rows={4} maxLength={2000} aria-describedby={`${id}-privacy`}/></label>
 <p className="cc-form-help" id={`${id}-privacy`}>{purpose==='referral'?'Please do not include identifiable patient or detailed health information. We will agree an appropriate route for a referral.':purpose==='careers'?'Please do not include identity documents or sensitive personal information. Discuss the application process with the team.':'Please keep this initial message brief. Avoid sharing detailed medical or other sensitive information.'}</p>
 <div className="cc-form-honey" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <label className="cc-form-consent"><input name="consent" type="checkbox" required/>I agree to be contacted about this enquiry and have read the <Link to="/privacy-policy/">privacy information</Link>.</label>
 {error&&<p role="alert">{error}</p>}
 <button className="cc-button" type="submit">Prepare email enquiry <ArrowUpRight size={18}/></button><p className="cc-form-help">This website concept prepares an email draft on your device. Nothing is submitted until you send it through your email app.</p>
 </form>}
 </div>
}
