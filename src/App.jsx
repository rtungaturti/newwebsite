import { useState, useEffect, useRef } from "react";

/*
  ── Aparajitha exact brand colours (from uploaded screenshot) ──────────
  #5C3098  – Aparajitha Purple   (Enquire Now button background)
  #1B2A4A  – Navy                (nav text, headings)
  #3A8DC5  – Icon Blue           (mega-menu icon stroke colour)
  #F4F6FA  – Light bg
  #E0E4ED  – Border
*/

const BRAND   = "#5C3098";   // purple – all CTAs
const NAVY    = "#1B2A4A";   // dark navy
const ICON_C  = "#3A8DC5";   // blue for SVG icons (matches Aparajitha icon style)
const BG_LIGHT = "#F4F6FA";
const BORDER   = "#E0E4ED";
const BRAND_LIGHT = "#F0EBF8"; // light purple tint

// ─── Global responsive CSS ────────────────────────────────────────────
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;color:#333;background:#fff}
#root{width:100%;min-height:100vh}
a{text-decoration:none;color:inherit}
button{cursor:pointer;font-family:inherit}
input,select,textarea{font-family:inherit}

/* ── Nav ── */
.desktop-nav{display:flex;align-items:center;gap:2px}
.hamburger{display:none;background:none;border:none;cursor:pointer;padding:8px}
.mobile-nav{display:none;position:absolute;top:100%;left:0;right:0;
  background:#fff;border-top:1px solid ${BORDER};
  box-shadow:0 8px 24px rgba(0,0,0,.1);z-index:997;padding:16px 24px 24px}
.mobile-nav.open{display:block}
.mob-item{display:block;padding:11px 0;font-size:14px;font-weight:500;
  color:${NAVY};border-bottom:1px solid #F0F2F6}
.mob-sub{display:block;padding:8px 0 8px 16px;font-size:13px;
  color:#5A6577;border-bottom:1px solid #F0F2F6}
.mob-enq{display:block;width:100%;margin-top:14px;background:${BRAND};
  color:#fff;border:none;padding:12px;border-radius:7px;font-size:14px;
  font-weight:600;text-align:center;cursor:pointer}

/* ── Mega menu ── */
.mega-wrap{position:fixed;left:0;right:0;top:72px;z-index:998;
  background:#fff;border-top:3px solid ${BRAND};
  box-shadow:0 12px 40px rgba(0,0,0,.12)}
.mega-inner{max-width:1200px;margin:0 auto;padding:24px 24px 28px}
.mega-header{display:flex;align-items:center;gap:8px;font-size:15px;
  font-weight:700;color:${NAVY};margin-bottom:18px;cursor:pointer}
.mega-header:hover{color:${BRAND}}
.mega-arrow{font-size:16px;color:${BRAND}}
.mega-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.mega-card{display:flex;align-items:center;gap:12px;padding:12px 14px;
  background:#fff;border:1px solid ${BORDER};border-radius:8px;
  cursor:pointer;transition:all .18s}
.mega-card:hover{border-color:${BRAND};background:${BRAND_LIGHT};
  box-shadow:0 2px 12px rgba(92,48,152,.1)}
.mega-card-icon{width:40px;height:40px;display:flex;align-items:center;
  justify-content:center;flex-shrink:0}
.mega-card-text{font-size:13px;font-weight:500;color:${NAVY};line-height:1.35}

/* ── Nav underline on active ── */
.nav-btn{font-size:13.5px;font-weight:500;color:${NAVY};padding:6px 12px;
  border-radius:5px;cursor:pointer;background:none;border:none;
  display:flex;align-items:center;gap:4px;transition:color .18s;
  position:relative;white-space:nowrap}
.nav-btn:hover,.nav-btn.active{color:${BRAND}}
.nav-btn.active::after{content:'';position:absolute;bottom:-18px;
  left:0;right:0;height:3px;background:${NAVY};border-radius:2px 2px 0 0}
.nav-link{font-size:13.5px;font-weight:500;color:${NAVY};padding:6px 12px;
  display:flex;align-items:center;gap:4px;transition:color .18s;white-space:nowrap}
.nav-link:hover{color:${BRAND}}

/* ── Grids ── */
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.gf{display:grid;grid-template-columns:2fr 1fr 1fr;gap:48px}

/* ── Stats ── */
.stats{display:flex;justify-content:center;flex-wrap:wrap}
.stat{padding:26px 44px;text-align:center;border-right:1px solid ${BORDER}}
.stat:last-child{border-right:none}

/* ── Form focus ── */
.fi:focus{border-color:${BRAND}!important;outline:none;
  box-shadow:0 0 0 3px rgba(92,48,152,.12)}

/* ── Responsive ── */
@media(max-width:1024px){
  .mega-grid{grid-template-columns:repeat(3,1fr)}
  .g4{grid-template-columns:repeat(2,1fr)}
  .g3{grid-template-columns:repeat(2,1fr)}
  .gf{grid-template-columns:1fr 1fr;gap:32px}
  .stat{padding:18px 28px}
}
@media(max-width:768px){
  .desktop-nav{display:none}
  .hamburger{display:flex;align-items:center;justify-content:center}
  .mega-grid,.g4,.g3,.g2{grid-template-columns:1fr}
  .gf{grid-template-columns:1fr;gap:24px}
  .stats{flex-direction:column}
  .stat{border-right:none;border-bottom:1px solid ${BORDER};padding:16px 24px}
  .stat:last-child{border-bottom:none}
  .fgrid{grid-template-columns:1fr!important}
  .fbot{flex-direction:column!important;gap:10px;text-align:center}
  h1.hero-h{font-size:28px!important}
  h2.sec-h{font-size:22px!important}
  .sec-pad{padding:44px 0!important}
  .enq-body{padding:20px!important}
  .enq-hdr{padding:22px 20px 18px!important}
  .about-box{padding:32px 20px!important}
  .fgrid2{grid-template-columns:1fr!important}
}
@media(max-width:480px){
  h1.hero-h{font-size:24px!important}
  .stat{padding:14px 16px}
}
`;

// ─── Hand-crafted SVG icons (blue/teal, matching Aparajitha icon style) ─
const IC = ICON_C;  // #3A8DC5 blue

const SvgAudit = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="6" width="24" height="32" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <line x1="13" y1="14" x2="27" y2="14" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="13" y1="20" x2="27" y2="20" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="13" y1="26" x2="21" y2="26" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="34" cy="34" r="7" stroke={IC} strokeWidth="1.8" fill="none"/>
    <line x1="39" y1="39" x2="43" y2="43" stroke={IC} strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M31 34l2 2 4-4" stroke={IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgMonitor = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="8" width="36" height="24" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <polyline points="10,24 16,16 22,20 28,13 36,22" stroke={IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="16" y1="36" x2="32" y2="36" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="24" y1="32" x2="24" y2="36" stroke={IC} strokeWidth="1.8"/>
    <circle cx="36" cy="13" r="2.5" fill={IC}/>
  </svg>
);
const SvgTraining = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <circle cx="22" cy="12" r="6" stroke={IC} strokeWidth="1.8" fill="none"/>
    <path d="M10 38c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke={IC} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <rect x="30" y="22" width="13" height="10" rx="2" stroke={IC} strokeWidth="1.5" fill="none"/>
    <line x1="33" y1="26" x2="40" y2="26" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="33" y1="29" x2="37" y2="29" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const SvgTechTrain = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="10" width="36" height="26" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="6" y="10" width="36" height="7" rx="3" stroke={IC} strokeWidth="1.8" fill={IC} fillOpacity=".08"/>
    <circle cx="12" cy="13.5" r="1.5" fill={IC}/>
    <path d="M14 26l-4 4 4 4" stroke={IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M20 26l4 4-4 4" stroke={IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="24" y1="26" x2="30" y2="34" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const SvgGap = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="14" width="14" height="20" rx="2" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="30" y="14" width="14" height="20" rx="2" stroke={IC} strokeWidth="1.8" fill="none"/>
    <line x1="7" y1="20" x2="15" y2="20" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="7" y1="24" x2="15" y2="24" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="7" y1="28" x2="13" y2="28" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="33" y1="20" x2="41" y2="20" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="33" y1="24" x2="41" y2="24" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="33" y1="28" x2="41" y2="28" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M21 24h6M24 21l3 3-3 3" stroke={IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);
const SvgPolicy = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <rect x="9" y="6" width="24" height="32" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <line x1="14" y1="14" x2="28" y2="14" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="19" x2="28" y2="19" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="24" x2="22" y2="24" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="35" cy="35" r="7" stroke={IC} strokeWidth="1.5" fill="none"/>
    <path d="M32 35.5l1.5 1.5L37 33" stroke={IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgConsent = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <path d="M24 6l3.5 7 7.5 1.1-5.5 5.3 1.3 7.6L24 23.5l-6.8 3.5 1.3-7.6L13 14.1l7.5-1.1z" stroke={IC} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
    <rect x="14" y="30" width="20" height="12" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <path d="M20 36l2.5 2.5L28 33" stroke={IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgSMB = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="22" width="32" height="20" rx="2" stroke={IC} strokeWidth="1.8" fill="none"/>
    <path d="M14 22V16a10 10 0 0120 0v6" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="20" y="30" width="8" height="12" rx="1" stroke={IC} strokeWidth="1.5" fill={IC} fillOpacity=".15"/>
    <circle cx="36" cy="16" r="6" stroke={IC} strokeWidth="1.5" fill="none"/>
    <path d="M33 16l2 2 4-4" stroke={IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgOS = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="6" width="16" height="16" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="26" y="6" width="16" height="16" rx="3" stroke={IC} strokeWidth="1.8" fill={IC} fillOpacity=".1"/>
    <rect x="6" y="26" width="16" height="16" rx="3" stroke={IC} strokeWidth="1.8" fill={IC} fillOpacity=".1"/>
    <rect x="26" y="26" width="16" height="16" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <circle cx="14" cy="14" r="3" fill={IC} opacity=".4"/>
    <circle cx="34" cy="14" r="3" fill={IC}/>
    <circle cx="14" cy="34" r="3" fill={IC}/>
    <circle cx="34" cy="34" r="3" fill={IC} opacity=".4"/>
    <line x1="22" y1="14" x2="26" y2="14" stroke={IC} strokeWidth="1.5" strokeDasharray="2 1"/>
    <line x1="14" y1="22" x2="14" y2="26" stroke={IC} strokeWidth="1.5" strokeDasharray="2 1"/>
    <line x1="34" y1="22" x2="34" y2="26" stroke={IC} strokeWidth="1.5" strokeDasharray="2 1"/>
    <line x1="22" y1="34" x2="26" y2="34" stroke={IC} strokeWidth="1.5" strokeDasharray="2 1"/>
  </svg>
);
const SvgKit = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="18" width="36" height="24" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <path d="M16 18v-4a8 8 0 0116 0v4" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="20" y="26" width="8" height="4" rx="1" stroke={IC} strokeWidth="1.5" fill={IC} fillOpacity=".2"/>
    <line x1="6" y1="30" x2="20" y2="30" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="28" y1="30" x2="42" y2="30" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const SvgCMP = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="12" width="32" height="24" rx="4" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="14" y="20" width="8" height="4" rx="2" stroke={IC} strokeWidth="1.2" fill="none" opacity=".5"/>
    <rect x="26" y="20" width="8" height="4" rx="2" fill={IC} fillOpacity=".8"/>
    <circle cx="32" cy="22" r="2.5" fill="#fff" stroke={IC} strokeWidth="1.2"/>
    <line x1="14" y1="29" x2="34" y2="29" stroke={IC} strokeWidth="1.2" opacity=".4"/>
    <circle cx="38" cy="10" r="5" stroke={IC} strokeWidth="1.5" fill="none"/>
    <path d="M36 10l1.5 1.5L40 8" stroke={IC} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgAuto = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="12" stroke={IC} strokeWidth="1.8" fill="none"/>
    <circle cx="24" cy="24" r="5" stroke={IC} strokeWidth="1.5" fill={IC} fillOpacity=".12"/>
    <line x1="24" y1="8" x2="24" y2="12" stroke={IC} strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="36" x2="24" y2="40" stroke={IC} strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="24" x2="12" y2="24" stroke={IC} strokeWidth="2" strokeLinecap="round"/>
    <line x1="36" y1="24" x2="40" y2="24" stroke={IC} strokeWidth="2" strokeLinecap="round"/>
    <path d="M33 10l-2 3M15 35l-2 3M38 15l-3 2M13 31l-3 2" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
// Solution icons
const SvgQR = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="4" y="4" width="14" height="14" rx="2" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="7" y="7" width="8" height="8" rx="1" fill={IC} fillOpacity=".6"/>
    <rect x="22" y="4" width="14" height="14" rx="2" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="25" y="7" width="8" height="8" rx="1" fill={IC} fillOpacity=".6"/>
    <rect x="4" y="22" width="14" height="14" rx="2" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="7" y="25" width="8" height="8" rx="1" fill={IC} fillOpacity=".6"/>
    <rect x="22" y="22" width="4" height="4" fill={IC} opacity=".4"/>
    <rect x="28" y="22" width="4" height="4" fill={IC} opacity=".4"/>
    <rect x="22" y="28" width="4" height="4" fill={IC} opacity=".4"/>
    <rect x="28" y="28" width="8" height="8" rx="1" fill={IC} fillOpacity=".6"/>
  </svg>
);
const SvgSMS = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="4" y="8" width="32" height="22" rx="4" stroke={IC} strokeWidth="1.8" fill="none"/>
    <circle cx="12" cy="19" r="2.5" fill={IC}/>
    <circle cx="20" cy="19" r="2.5" fill={IC}/>
    <circle cx="28" cy="19" r="2.5" fill={IC}/>
    <path d="M10 30l4-6h12l4 6" stroke={IC} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
  </svg>
);
const SvgVoice = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="14" y="4" width="12" height="20" rx="6" stroke={IC} strokeWidth="1.8" fill="none"/>
    <path d="M8 22c0 6.627 5.373 12 12 12s12-5.373 12-12" stroke={IC} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <line x1="20" y1="34" x2="20" y2="38" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="15" y1="38" x2="25" y2="38" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="16" y1="13" x2="24" y2="13" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="16" y1="17" x2="24" y2="17" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const SvgPOS = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="8" y="6" width="24" height="30" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="11" y="9" width="18" height="10" rx="2" stroke={IC} strokeWidth="1.2" fill={IC} fillOpacity=".07"/>
    <line x1="11" y1="23" x2="14" y2="23" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="18" y1="23" x2="21" y2="23" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="25" y1="23" x2="28" y2="23" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="22" y="25" width="7" height="7" rx="1" fill={IC} fillOpacity=".8"/>
    <path d="M24.5 28.5l2 0M25.5 27.5v2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const SvgUSSD = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="10" y="4" width="20" height="32" rx="4" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="13" y="8" width="14" height="8" rx="2" stroke={IC} strokeWidth="1.2" fill={IC} fillOpacity=".07"/>
    <circle cx="16" cy="22" r="2" fill={IC} opacity=".4"/>
    <circle cx="20" cy="22" r="2" fill={IC} opacity=".4"/>
    <circle cx="24" cy="22" r="2" fill={IC} opacity=".4"/>
    <circle cx="16" cy="28" r="2" fill={IC}/>
    <circle cx="20" cy="28" r="2" fill={IC}/>
    <circle cx="20" cy="33" r="1.5" fill={IC} opacity=".4"/>
  </svg>
);
const SvgBot = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="8" y="14" width="24" height="18" rx="4" stroke={IC} strokeWidth="1.8" fill="none"/>
    <circle cx="15" cy="22" r="2.5" fill={IC}/>
    <circle cx="25" cy="22" r="2.5" fill={IC}/>
    <path d="M15 27.5c1.4 1.3 3.4 2 5 2s3.6-.7 5-2" stroke={IC} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <line x1="20" y1="8" x2="20" y2="14" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="20" cy="7" r="3" stroke={IC} strokeWidth="1.5" fill="none"/>
    <line x1="4" y1="20" x2="8" y2="20" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="32" y1="20" x2="36" y2="20" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="4" y1="26" x2="8" y2="26" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="32" y1="26" x2="36" y2="26" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const SvgForm = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="6" y="6" width="28" height="28" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <rect x="6" y="6" width="28" height="8" rx="3" fill={IC} fillOpacity=".08"/>
    <rect x="10" y="17" width="20" height="4" rx="1" stroke={IC} strokeWidth="1.2" fill={IC} fillOpacity=".08"/>
    <line x1="10" y1="25" x2="30" y2="25" stroke={IC} strokeWidth="1.2" strokeLinecap="round" opacity=".4"/>
    <line x1="10" y1="29" x2="22" y2="29" stroke={IC} strokeWidth="1.2" strokeLinecap="round" opacity=".4"/>
    <circle cx="30" cy="30" r="6" fill={IC}/>
    <path d="M27.5 30l2 2 3.5-3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgDigi = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="8" y="16" width="24" height="18" rx="3" stroke={IC} strokeWidth="1.8" fill="none"/>
    <path d="M14 16V12a6 6 0 0112 0v4" stroke={IC} strokeWidth="1.8" fill="none"/>
    <circle cx="20" cy="24" r="3" stroke={IC} strokeWidth="1.5" fill={IC} fillOpacity=".15"/>
    <line x1="20" y1="27" x2="20" y2="30" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="30" cy="8" r="4" fill="#34A853" fillOpacity=".9"/>
    <path d="M28 8l1.5 1.5L32 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
// Resource icons
const SvgWP=()=>(<svg width="32" height="32" viewBox="0 0 36 36" fill="none"><rect x="6" y="3" width="20" height="26" rx="2" stroke={IC} strokeWidth="1.6" fill="none" opacity=".5"/><rect x="10" y="3" width="20" height="26" rx="2" stroke={IC} strokeWidth="1.6" fill="none"/><line x1="13" y1="12" x2="27" y2="12" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/><line x1="13" y1="17" x2="27" y2="17" stroke={IC} strokeWidth="1.2" strokeLinecap="round" opacity=".4"/><line x1="13" y1="21" x2="22" y2="21" stroke={IC} strokeWidth="1.2" strokeLinecap="round" opacity=".4"/></svg>);
const SvgCS=()=>(<svg width="32" height="32" viewBox="0 0 36 36" fill="none"><rect x="4" y="4" width="28" height="28" rx="3" stroke={IC} strokeWidth="1.6" fill="none"/><polyline points="8,26 13,18 18,22 23,13 30,20" stroke={IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="30" cy="20" r="2" fill={IC}/></svg>);
const SvgBL=()=>(<svg width="32" height="32" viewBox="0 0 36 36" fill="none"><rect x="4" y="6" width="28" height="24" rx="3" stroke={IC} strokeWidth="1.6" fill="none"/><line x1="8" y1="13" x2="28" y2="13" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="18" x2="24" y2="18" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="22" x2="20" y2="22" stroke={IC} strokeWidth="1.2" strokeLinecap="round" opacity=".4"/></svg>);
const SvgWB=()=>(<svg width="32" height="32" viewBox="0 0 36 36" fill="none"><rect x="4" y="6" width="28" height="18" rx="3" stroke={IC} strokeWidth="1.6" fill="none"/><circle cx="18" cy="15" r="4" stroke={IC} strokeWidth="1.5" fill="none"/><path d="M16 15l5 0M18 13v4" stroke={IC} strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="28" x2="24" y2="28" stroke={IC} strokeWidth="1.8" strokeLinecap="round"/><line x1="18" y1="24" x2="18" y2="28" stroke={IC} strokeWidth="1.8"/></svg>);
const SvgCL=()=>(<svg width="32" height="32" viewBox="0 0 36 36" fill="none"><rect x="6" y="4" width="24" height="28" rx="2" stroke={IC} strokeWidth="1.6" fill="none"/><rect x="10" y="10" width="5" height="5" rx="1" stroke={IC} strokeWidth="1.4" fill={IC} fillOpacity=".12"/><path d="M11 12.5l1.5 1.5L15 11" stroke={IC} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><line x1="18" y1="12.5" x2="26" y2="12.5" stroke={IC} strokeWidth="1.3" strokeLinecap="round"/><rect x="10" y="19" width="5" height="5" rx="1" stroke={IC} strokeWidth="1.4" fill="none" opacity=".35"/><line x1="18" y1="21.5" x2="26" y2="21.5" stroke={IC} strokeWidth="1.3" strokeLinecap="round" opacity=".35"/></svg>);
const SvgGD=()=>(<svg width="32" height="32" viewBox="0 0 36 36" fill="none"><path d="M18 6C13 6 8 8 8 8v22s5-2 10-2 10 2 10 2V8s-5-2-10-2z" stroke={IC} strokeWidth="1.6" fill="none"/><line x1="18" y1="6" x2="18" y2="28" stroke={IC} strokeWidth="1.4"/><line x1="11" y1="13" x2="16" y2="13" stroke={IC} strokeWidth="1.3" strokeLinecap="round"/><line x1="11" y1="17" x2="16" y2="17" stroke={IC} strokeWidth="1.3" strokeLinecap="round"/><line x1="20" y1="13" x2="25" y2="13" stroke={IC} strokeWidth="1.3" strokeLinecap="round" opacity=".4"/><line x1="20" y1="17" x2="25" y2="17" stroke={IC} strokeWidth="1.3" strokeLinecap="round" opacity=".4"/></svg>);

// Chevron
const Chev = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── App ─────────────────────────────────────────────────────────────
export default function App() {
  const [showConsent, setShowConsent]   = useState(false);
  const [showEnquiry, setShowEnquiry]   = useState(false);
  const [openMenu, setOpenMenu]         = useState(null); // "services"|"products"|"resources"|"about"
  const [mobileOpen, setMobileOpen]     = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const id = "dpdp-css";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id; s.textContent = CSS;
      document.head.appendChild(s);
    }
    if (!localStorage.getItem("dpdp_consent"))
      setTimeout(() => setShowConsent(true), 700);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    const h = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target))
        setOpenMenu(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showEnquiry || showConsent ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showEnquiry, showConsent]);

  // ── Data ─────────────────────────────────────────────────
  const services = [
    { name: "DPDP Audits",                          Icon: SvgAudit,    desc: "End‑to‑end assessment of data processing activities." },
    { name: "Continuous Compliance Monitoring",      Icon: SvgMonitor,  desc: "Real‑time dashboards and alerts for ongoing DPDP adherence." },
    { name: "Training to Employees",                 Icon: SvgTraining, desc: "Awareness and role‑based training on DPDP obligations." },
    { name: "Training to Tech Team – Compliance OS", Icon: SvgTechTrain,desc: "Deep‑dive into our Compliance OS and API integrations." },
    { name: "DPDP Gap Assessment",                   Icon: SvgGap,      desc: "Identify gaps between current practices and DPDP requirements." },
    { name: "Policy Drafting & Review",              Icon: SvgPolicy,   desc: "Privacy policies, consent notices, data retention schedules." },
    { name: "Consent Manager Integration",           Icon: SvgConsent,  desc: "Connect your systems with the National Consent Manager." },
  ];
  const products = [
    { name: "Compliance for SMBs",            Icon: SvgSMB,  desc: "Tailored DPDP kit – affordable and simple." },
    { name: "Compliance OS",                  Icon: SvgOS,   desc: "Unified OS for consent, requests, and breach management." },
    { name: "DPDP Ready Kit",                 Icon: SvgKit,  desc: "Templates, checklists, and automated workflows." },
    { name: "Consent Management Platform",    Icon: SvgCMP,  desc: "Capture, store, and withdraw consents across all channels." },
    { name: "Audit Automation Tool",          Icon: SvgAuto, desc: "Automated evidence collection and report generation." },
  ];
  const solutions = [
    { title:"QR Code + Offline Kit", bestFor:"Kirana stores, medical shops, salons",          desc:"Physical QR code at billing counter. No app required.",         Icon: SvgQR   },
    { title:"SMS-First Compliance",  bestFor:"Rural kirana, older owners, poor connectivity", desc:"Works on any phone – even feature phones. No internet needed.", Icon: SvgSMS  },
    { title:"Voice Bot / IVR",       bestFor:"Non-literate or elderly customers",              desc:"Recorded voice message asks for consent. Press 1 to accept.",   Icon: SvgVoice},
    { title:"POS-Integrated",        bestFor:"Medical shops, small e‑commerce, franchises",   desc:"Integrates with Vyapar, Tally, Shopify Lite.",                  Icon: SvgPOS  },
    { title:"USSD",                  bestFor:"Feature phone users, rural India",               desc:"Dial *123# – works without internet on ₹0 balance.",            Icon: SvgUSSD },
    { title:"Telegram Bot",          bestFor:"Younger SMB owners, tech‑savvy kirana",         desc:"Free bot, no API limits. Supports 22 Indian languages.",         Icon: SvgBot  },
    { title:"Google Form + Sheets",  bestFor:"Freelancers, tutors, micro‑businesses",         desc:"Zero‑cost, zero‑code. Google Sheet as audit log.",              Icon: SvgForm },
    { title:"DigiLocker Integration",bestFor:"Schools, clinics, pharmacies",                  desc:"Government‑backed verified consent. Rule 10 compliant.",        Icon: SvgDigi },
  ];
  const dpdp = [
    { s:"§ 4",  t:"Obligations of Data Fiduciary",  e:"Implement reasonable security safeguards, establish grievance redressal, and publish DPO contact details." },
    { s:"§ 5",  t:"Consent",                         e:"Consent must be free, specific, informed, unconditional, and unambiguous with a clear affirmative action." },
    { s:"§ 6",  t:"Legitimate Uses",                 e:"Permissible processing without consent for legal proceedings, medical emergencies, or employment." },
    { s:"§ 7",  t:"Notice",                          e:"Every data fiduciary must provide a detailed notice about personal data collected and principal rights." },
    { s:"§ 8",  t:"Rights of Data Principal",        e:"Rights to access, correction, erasure, and grievance redressal." },
    { s:"§ 9",  t:"Grievance Redressal",             e:"Every data fiduciary must provide a mechanism to address complaints." },
    { s:"§ 10", t:"Data Protection Officer",         e:"Significant data fiduciaries must appoint a DPO based in India." },
    { s:"§ 11", t:"Significant Data Fiduciary",      e:"Additional obligations for entities with large data volumes." },
    { s:"§ 12", t:"Children's Data",                 e:"Verifiable parental consent required; no behavioural monitoring of children." },
    { s:"§ 13", t:"Penalties",                       e:"Penalties up to ₹250 crore per instance for breach notification failures." },
  ];
  const resources = [
    { name:"Whitepapers",              desc:"In‑depth DPDP compliance analysis for SMBs.",                       Icon: SvgWP },
    { name:"Case Studies",             desc:"Real‑world implementations across retail, healthcare, education.",   Icon: SvgCS },
    { name:"Blogs",                    desc:"Latest updates and practical tips on DPDP compliance.",              Icon: SvgBL },
    { name:"Webinars",                 desc:"Live sessions with legal and technology experts.",                   Icon: SvgWB },
    { name:"DPDP Compliance Checklist",desc:"Step‑by‑step PDF checklist for immediate compliance action.",        Icon: SvgCL },
    { name:"DPDP Implementation Guide",desc:"Comprehensive guide to operationalise the DPDP Act 2025.",           Icon: SvgGD },
  ];

  // ── Shared style helpers ──────────────────────────────────
  const tag  = { display:"inline-block", background:BRAND_LIGHT, color:BRAND,
                  fontSize:11, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase",
                  padding:"4px 13px", borderRadius:20, marginBottom:12 };
  const h2s  = { fontSize:30, fontWeight:800, color:NAVY, marginBottom:10,
                  lineHeight:1.25, letterSpacing:"-0.4px" };
  const subs = { fontSize:15, color:"#5A6577", maxWidth:580, margin:"0 auto 44px", lineHeight:1.7 };
  const card = { background:"#fff", border:`1px solid ${BORDER}`, borderRadius:10,
                  padding:"24px 20px", boxShadow:"0 2px 8px rgba(27,42,74,.04)",
                  transition:"box-shadow .2s,transform .2s" };
  const cardHov = { boxShadow:"0 8px 28px rgba(27,42,74,.12)", transform:"translateY(-2px)" };
  const ibox = { width:58, height:58, borderRadius:12, background:BRAND_LIGHT,
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 };
  const btn  = { background:BRAND, color:"#fff", border:"none", padding:"10px 22px",
                  borderRadius:6, fontSize:14, fontWeight:600, cursor:"pointer",
                  transition:"background .2s", display:"inline-block" };
  const btnLg= { ...btn, padding:"13px 30px", borderRadius:7, fontSize:15, fontWeight:700 };
  const enquireNavBtn = {
    ...btn, marginLeft:10, padding:"9px 20px", display:"flex", alignItems:"center", gap:6,
  };

  const [hovCard, setHovCard] = useState(null);

  // ── Mega menu renderer ────────────────────────────────────
  const MegaMenu = ({ menuKey, heading, items, href }) => (
    openMenu === menuKey ? (
      <div className="mega-wrap" role="menu" aria-label={heading}>
        <div className="mega-inner">
          <a href={href} className="mega-header" onClick={() => setOpenMenu(null)}>
            Explore All {heading}
            <span className="mega-arrow">›</span>
          </a>
          <div className="mega-grid">
            {items.map((item, i) => (
              <a key={i} href={href} className="mega-card"
                role="menuitem" onClick={() => setOpenMenu(null)}>
                <div className="mega-card-icon">
                  <item.Icon />
                </div>
                <span className="mega-card-text">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    ) : null
  );

  const tog = (k) => setOpenMenu(openMenu === k ? null : k);

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:"#fff" }}>

      {/* ── Consent modal ── */}
      {showConsent && (
        <div role="dialog" aria-modal="true" aria-labelledby="consent-title"
          style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(10,20,40,.55)",
            display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",borderRadius:14,width:"100%",maxWidth:440,
            padding:"36px 32px",boxShadow:"0 24px 80px rgba(10,20,40,.2)"}}>
            <div style={{...ibox, width:52, height:52, marginBottom:18}}>
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <path d="M14 3l2.5 5 5.5.8-4 3.9 1 5.5L14 15.8l-5 2.4 1-5.5-4-3.9 5.5-.8z"
                  stroke={BRAND} strokeWidth="1.5" fill={BRAND_LIGHT} strokeLinejoin="round"/>
                <rect x="10" y="18" width="8" height="7" rx="1.5" stroke={BRAND} strokeWidth="1.5" fill="none"/>
                <path d="M12 21.5l1.5 1.5L16 20" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 id="consent-title" style={{fontSize:19,fontWeight:800,color:NAVY,marginBottom:10}}>
              We value your privacy
            </h2>
            <p style={{fontSize:14,color:"#5A6577",lineHeight:1.7,marginBottom:22}}>
              As per the <strong style={{color:NAVY}}>Digital Personal Data Protection (DPDP) Act, 2025</strong>,
              we need your consent to process browsing data to improve your experience.
            </p>
            <div style={{display:"flex",gap:12}}>
              <button onClick={() => { localStorage.setItem("dpdp_consent","true"); setShowConsent(false); }}
                style={{...btnLg, flex:1, padding:"11px", textAlign:"center"}}>Accept</button>
              <button onClick={() => { localStorage.setItem("dpdp_consent","false"); setShowConsent(false); }}
                style={{flex:1, padding:"11px", borderRadius:7, fontSize:14, fontWeight:600,
                  background:BG_LIGHT, border:`1.5px solid ${BORDER}`, color:NAVY, cursor:"pointer"}}>
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Enquiry modal ── */}
      {showEnquiry && (
        <div role="dialog" aria-modal="true" aria-labelledby="enq-title"
          style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(10,20,40,.55)",
            display:"flex",alignItems:"center",justifyContent:"center",
            padding:16, overflowY:"auto"}}
          onClick={(e) => { if (e.target === e.currentTarget) setShowEnquiry(false); }}>
          <div style={{background:"#fff",borderRadius:14,width:"100%",maxWidth:680,
            boxShadow:"0 24px 80px rgba(10,20,40,.2)",maxHeight:"95vh",
            overflowY:"auto",position:"relative"}}>

            {/* Header */}
            <div className="enq-hdr" style={{background:`linear-gradient(135deg,${NAVY},#243660)`,
              padding:"30px 40px 26px",borderRadius:"14px 14px 0 0",position:"relative"}}>
              <button onClick={() => setShowEnquiry(false)} aria-label="Close"
                style={{position:"absolute",top:14,right:18,background:"none",border:"none",
                  fontSize:22,cursor:"pointer",color:"rgba(255,255,255,.7)",lineHeight:1}}>✕</button>
              <h3 id="enq-title" style={{fontSize:21,fontWeight:800,color:"#fff",marginBottom:5}}>
                Business Enquiry Form
              </h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,.7)",lineHeight:1.5}}>
                Please drop in your details and we will get in touch with you shortly
              </p>
            </div>

            {/* Body */}
            <div className="enq-body" style={{padding:"28px 40px 32px"}}>
              <div className="fgrid2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                {[
                  {l:"Name",t:"text",p:"Full Name",r:true},
                  {l:"Corporate Email ID",t:"email",p:"company@example.com",r:true},
                  {l:"Company Name",t:"text",p:"Your company",r:true},
                  {l:"Designation",t:"text",p:"e.g., Manager, Owner",r:true},
                  {l:"Contact No.",t:"tel",p:"Mobile number",r:false},
                  {l:"Location / City / State",t:"text",p:"City, State",r:true},
                ].map((f, i) => (
                  <div key={i} style={{display:"flex",flexDirection:"column",gap:5}}>
                    <label style={{fontSize:12.5,fontWeight:600,color:NAVY}}>
                      {f.l} {f.r && <span style={{color:BRAND}}>*</span>}
                    </label>
                    <input type={f.t} placeholder={f.p} className="fi"
                      style={{border:`1.5px solid ${BORDER}`,borderRadius:7,
                        padding:"9px 13px",fontSize:13.5,color:"#333",
                        outline:"none",background:"#fff",width:"100%"}}/>
                  </div>
                ))}
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  <label style={{fontSize:12.5,fontWeight:600,color:NAVY}}>
                    Enquiry For <span style={{color:BRAND}}>*</span>
                  </label>
                  <select className="fi" style={{border:`1.5px solid ${BORDER}`,borderRadius:7,
                    padding:"9px 13px",fontSize:13.5,color:"#333",
                    outline:"none",background:"#fff",width:"100%"}}>
                    <option>Services</option>
                    <option>Software / Products</option>
                    <option>DPDP Audits</option>
                    <option>Compliance OS</option>
                    <option>Training</option>
                    <option>Consent Management</option>
                    <option>Other</option>
                  </select>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  <label style={{fontSize:12.5,fontWeight:600,color:NAVY}}>
                    How did you hear about us?
                  </label>
                  <select className="fi" style={{border:`1.5px solid ${BORDER}`,borderRadius:7,
                    padding:"9px 13px",fontSize:13.5,color:"#333",
                    outline:"none",background:"#fff",width:"100%"}}>
                    <option>Google Search Engine</option>
                    <option>Social Media</option>
                    <option>Email Campaign</option>
                    <option>Event / Webinar</option>
                    <option>Referral</option>
                    <option>Blog / News</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{fontSize:12.5,fontWeight:600,color:NAVY}}>Your Message</label>
                <textarea placeholder="Tell us about your requirements..." className="fi"
                  style={{border:`1.5px solid ${BORDER}`,borderRadius:7,
                    padding:"9px 13px",fontSize:13.5,color:"#333",outline:"none",
                    resize:"vertical",minHeight:88,width:"100%"}}/>
              </div>

              <div style={{display:"flex",alignItems:"flex-start",gap:9,
                fontSize:12,color:"#5A6577",marginTop:14,lineHeight:1.6}}>
                <input type="checkbox" id="terms" style={{marginTop:3,accentColor:BRAND}}/>
                <label htmlFor="terms">
                  By proceeding, you accept the{" "}
                  <span style={{color:BRAND,fontWeight:600,textDecoration:"underline",cursor:"pointer"}}>
                    Privacy Policy
                  </span>{" "}
                  and{" "}
                  <span style={{color:BRAND,fontWeight:600,textDecoration:"underline",cursor:"pointer"}}>
                    Terms & Conditions
                  </span>.
                </label>
              </div>

              <button type="button" style={{...btnLg,width:"100%",marginTop:18,textAlign:"center"}}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          HEADER + MEGA MENUS
      ════════════════════════════════════════════ */}
      <header ref={headerRef} style={{position:"sticky",top:0,zIndex:999,
        background:"#fff",boxShadow:"0 2px 12px rgba(0,0,0,.08)"}}>

        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 28px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          height:72,position:"relative"}}>

          {/* Logo */}
          <a href="#" aria-label="ACL CoreTech Labs – DPDP Comply Home"
            style={{display:"flex",alignItems:"center",textDecoration:"none",flexShrink:0}}>
            <img
              src="/logo.png"
              alt="ACL CoreTech Labs – DPDP Audits for SMBs"
              style={{height:52,width:"auto",objectFit:"contain",display:"block"}}
            />
          </a>

          {/* ── Desktop navigation ── */}
          <nav className="desktop-nav" aria-label="Primary navigation">

            {/* Services */}
            <button className={`nav-btn${openMenu==="services"?" active":""}`}
              onClick={() => tog("services")}
              aria-expanded={openMenu==="services"} aria-haspopup="true">
              Services <Chev/>
            </button>

            {/* Products */}
            <button className={`nav-btn${openMenu==="products"?" active":""}`}
              onClick={() => tog("products")}
              aria-expanded={openMenu==="products"} aria-haspopup="true">
              Products <Chev/>
            </button>

            {/* e-Library */}
            <a href="#eLibrary" className="nav-link" onClick={() => setOpenMenu(null)}>
              e-Library <Chev/>
            </a>

            {/* Resources */}
            <button className={`nav-btn${openMenu==="resources"?" active":""}`}
              onClick={() => tog("resources")}
              aria-expanded={openMenu==="resources"} aria-haspopup="true">
              Resources <Chev/>
            </button>

            {/* About Us */}
            <button className={`nav-btn${openMenu==="about"?" active":""}`}
              onClick={() => tog("about")}
              aria-expanded={openMenu==="about"} aria-haspopup="true">
              About Us <Chev/>
            </button>

            {/* Career */}
            <a href="#career" className="nav-link" onClick={() => setOpenMenu(null)}>
              Career
            </a>

            {/* Enquire Now */}
            <button style={enquireNavBtn} onClick={() => { setOpenMenu(null); setShowEnquiry(true); }}
              aria-label="Open enquiry form">
              Enquire Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="#fff" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </nav>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen
              ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 4l14 14M18 4L4 18" stroke={NAVY} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              : <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 6h16M3 11h16M3 16h16" stroke={NAVY} strokeWidth="2" strokeLinecap="round"/>
                </svg>
            }
          </button>
        </div>

        {/* ── Mega menus (fixed below header) ── */}
        <MegaMenu menuKey="services"  heading="Services"  items={services}  href="#services"/>
        <MegaMenu menuKey="products"  heading="Products"  items={products}  href="#products"/>
        <MegaMenu menuKey="resources" heading="Resources" items={resources} href="#resources"/>

        {/* About Us simple dropdown */}
        {openMenu === "about" && (
          <div className="mega-wrap" role="menu" aria-label="About Us">
            <div className="mega-inner" style={{paddingBottom:20}}>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {["Know More About Us","Our Team","Contact Us"].map((t,i)=>(
                  <a key={i} href="#about" className="mega-card"
                    style={{padding:"12px 20px",width:"auto",display:"inline-flex"}}
                    role="menuitem" onClick={() => setOpenMenu(null)}>
                    <span className="mega-card-text">{t}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Mobile navigation drawer ── */}
        <nav className={`mobile-nav${mobileOpen?" open":""}`} aria-label="Mobile navigation">
          {[
            {l:"Services",   h:"#services"},
            {l:"Products",   h:"#products"},
            {l:"e-Library",  h:"#eLibrary"},
            {l:"Resources",  h:"#resources"},
            {l:"About Us",   h:"#about"},
            {l:"Career",     h:"#career"},
          ].map((item,i)=>(
            <a key={i} href={item.h} className="mob-item"
              onClick={() => setMobileOpen(false)}>{item.l}</a>
          ))}
          {/* Mobile service sub-items */}
          <div style={{marginTop:8}}>
            {services.slice(0,4).map((s,i)=>(
              <a key={i} href="#services" className="mob-sub"
                onClick={() => setMobileOpen(false)}>{s.name}</a>
            ))}
          </div>
          <button className="mob-enq"
            onClick={() => { setMobileOpen(false); setShowEnquiry(true); }}>
            Enquire Now →
          </button>
        </nav>
      </header>

      {/* ════════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════════ */}
      <main>

        {/* Hero */}
        <section aria-label="Hero"
          style={{background:`linear-gradient(135deg,${NAVY} 0%,#243660 60%,#1e3a6e 100%)`,
            padding:"88px 24px",textAlign:"center"}}>
          <div style={{maxWidth:760,margin:"0 auto"}}>
            <div style={{display:"inline-block",background:"rgba(92,48,152,.22)",
              color:"#C9A8E8",fontSize:11.5,fontWeight:700,letterSpacing:"1.2px",
              textTransform:"uppercase",padding:"5px 16px",borderRadius:20,marginBottom:22}}>
              DPDP Act, 2025 – Compliance Made Simple for India
            </div>
            <h1 className="hero-h" style={{fontSize:44,fontWeight:800,color:"#fff",
              lineHeight:1.18,marginBottom:18,letterSpacing:"-0.8px"}}>
              DPDP Compliance for<br/>
              <span style={{color:"#C9A8E8"}}>Indian SMBs</span>
            </h1>
            <p style={{fontSize:17,color:"rgba(255,255,255,.76)",
              maxWidth:600,margin:"0 auto 38px",lineHeight:1.75}}>
              Beyond WhatsApp – 8 reaching channels from QR codes to DigiLocker.
              Full‑stack DPDP services, products, and e‑library for every Indian business.
            </p>
            <div style={{display:"flex",justifyContent:"center",gap:14,flexWrap:"wrap"}}>
              <a href="#solutions" style={btnLg}>Explore Solutions</a>
              <button onClick={() => setShowEnquiry(true)}
                style={{...btnLg,background:"transparent",border:"2px solid rgba(255,255,255,.45)",
                  cursor:"pointer"}}>
                Get a Free Consultation
              </button>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <div style={{background:BG_LIGHT,borderBottom:`1px solid ${BORDER}`}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
            <div className="stats">
              {[
                {n:"AI-Powered", l:"Audit Engine"},
                {n:"48-Hr",      l:"Express Audit Delivery"},
                {n:"₹250 Cr",    l:"Penalty Risk We Cover"},
                {n:"100%",       l:"DPDP Act Aligned"},
              ].map((s,i)=>(
                <div key={i} className="stat">
                  <div style={{fontSize:26,fontWeight:800,color:BRAND,lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:12,color:"#5A6577",marginTop:5,fontWeight:500}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <section id="services" aria-labelledby="srv-h" className="sec-pad"
          style={{padding:"68px 0",background:"#fff"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <span style={tag}>Our Services</span>
              <h2 id="srv-h" className="sec-h" style={h2s}>DPDP Compliance Services</h2>
              <p style={subs}>Tailored for Indian SMBs – from manual audits to full automation.</p>
            </div>
            <div className="g3">
              {services.map((s,i) => (
                <article key={i}
                  style={{...card, borderLeft:`4px solid ${BRAND}`,
                    ...(hovCard===`sv${i}`?cardHov:{})}}
                  onMouseEnter={()=>setHovCard(`sv${i}`)}
                  onMouseLeave={()=>setHovCard(null)}>
                  <div style={ibox}><s.Icon/></div>
                  <h3 style={{fontSize:14.5,fontWeight:700,color:NAVY,marginBottom:7}}>{s.name}</h3>
                  <p style={{fontSize:13,color:"#5A6577",lineHeight:1.65}}>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" aria-labelledby="prd-h" className="sec-pad"
          style={{padding:"68px 0",background:BG_LIGHT}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <span style={tag}>Our Products</span>
              <h2 id="prd-h" className="sec-h" style={h2s}>Ready‑to‑Deploy Products</h2>
              <p style={subs}>Purpose‑built tools to operationalise DPDP compliance quickly.</p>
            </div>
            <div className="g3">
              {products.map((p,i)=>(
                <article key={i}
                  style={{...card,borderTop:`3px solid ${BRAND}`,background:"#fff",
                    ...(hovCard===`pr${i}`?cardHov:{})}}
                  onMouseEnter={()=>setHovCard(`pr${i}`)}
                  onMouseLeave={()=>setHovCard(null)}>
                  <div style={ibox}><p.Icon/></div>
                  <h3 style={{fontSize:14.5,fontWeight:700,color:NAVY,marginBottom:7}}>{p.name}</h3>
                  <p style={{fontSize:13,color:"#5A6577",lineHeight:1.65}}>{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" aria-labelledby="sol-h" className="sec-pad"
          style={{padding:"68px 0",background:"#fff"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <span style={tag}>Alternative Channels</span>
              <h2 id="sol-h" className="sec-h" style={h2s}>Beyond WhatsApp – 8 Reaching Mediums</h2>
              <p style={subs}>Channels that work for every Indian customer – from feature phone to enterprise.</p>
            </div>
            <div className="g4">
              {solutions.map((sol,i)=>(
                <article key={i}
                  style={{...card,...(hovCard===`so${i}`?cardHov:{})}}
                  onMouseEnter={()=>setHovCard(`so${i}`)}
                  onMouseLeave={()=>setHovCard(null)}>
                  <div style={{...ibox,width:52,height:52,marginBottom:12}}><sol.Icon/></div>
                  <h3 style={{fontSize:14,fontWeight:700,color:NAVY,marginBottom:5}}>{sol.title}</h3>
                  <p style={{fontSize:11.5,color:BRAND,fontWeight:600,marginBottom:7}}>
                    Best for: {sol.bestFor}
                  </p>
                  <p style={{fontSize:12.5,color:"#5A6577",lineHeight:1.65}}>{sol.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* e-Library */}
        <section id="eLibrary" aria-labelledby="lib-h" className="sec-pad"
          style={{padding:"68px 0",background:BG_LIGHT}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <span style={tag}>e-Library</span>
              <h2 id="lib-h" className="sec-h" style={h2s}>DPDP Act – Key Sections Explained</h2>
              <p style={subs}>Critical provisions in plain language for SMBs and compliance teams.</p>
            </div>
            <div style={{background:"#fff",borderRadius:14,overflow:"hidden",
              border:`1px solid ${BORDER}`,boxShadow:"0 4px 16px rgba(27,42,74,.06)"}}>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13.5}}>
                  <thead>
                    <tr style={{background:NAVY}}>
                      <th scope="col" style={{padding:"14px 20px",textAlign:"left",color:"#fff",fontWeight:700,fontSize:12.5,width:86}}>Section</th>
                      <th scope="col" style={{padding:"14px 20px",textAlign:"left",color:"#fff",fontWeight:700,fontSize:12.5,width:210}}>Title</th>
                      <th scope="col" style={{padding:"14px 20px",textAlign:"left",color:"#fff",fontWeight:700,fontSize:12.5}}>Explanation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dpdp.map((r,i)=>(
                      <tr key={i} style={{background:i%2===0?"#fff":"#F8F9FC",borderBottom:`1px solid #F0F2F6`}}>
                        <td style={{padding:"12px 20px",fontWeight:700,color:BRAND,fontSize:13}}>{r.s}</td>
                        <td style={{padding:"12px 20px",fontWeight:600,color:NAVY,fontSize:13}}>{r.t}</td>
                        <td style={{padding:"12px 20px",color:"#5A6577",lineHeight:1.6,fontSize:13}}>{r.e}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section id="resources" aria-labelledby="res-h" className="sec-pad"
          style={{padding:"68px 0",background:"#fff"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <span style={tag}>Resources</span>
              <h2 id="res-h" className="sec-h" style={h2s}>DPDP Knowledge Hub</h2>
              <p style={subs}>Whitepapers, case studies, webinars, and toolkits for your team.</p>
            </div>
            <div className="g3">
              {resources.map((r,i)=>(
                <article key={i}
                  style={{...card,display:"flex",alignItems:"flex-start",gap:14,
                    ...(hovCard===`rs${i}`?cardHov:{})}}
                  onMouseEnter={()=>setHovCard(`rs${i}`)}
                  onMouseLeave={()=>setHovCard(null)}>
                  <div style={{width:48,height:48,borderRadius:10,background:BRAND_LIGHT,
                    display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <r.Icon/>
                  </div>
                  <div>
                    <h3 style={{fontSize:14.5,fontWeight:700,color:BRAND,marginBottom:5}}>{r.name}</h3>
                    <p style={{fontSize:13,color:"#5A6577",lineHeight:1.65}}>{r.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="abt-h" className="sec-pad"
          style={{padding:"68px 0",background:BG_LIGHT}}>
          <div style={{maxWidth:820,margin:"0 auto",padding:"0 24px"}}>
            <div style={{textAlign:"center",marginBottom:36}}>
              <span style={tag}>About Us</span>
              <h2 id="abt-h" className="sec-h" style={h2s}>Who We Are</h2>
            </div>
            <div className="about-box" style={{background:"#fff",borderRadius:16,padding:"44px 52px",
              border:`1px solid ${BORDER}`,boxShadow:"0 4px 20px rgba(27,42,74,.07)",textAlign:"center"}}>
              <p style={{fontSize:16.5,color:"#333",lineHeight:1.85,marginBottom:26}}>
                We are a startup driven by a team with{" "}
                <strong style={{color:NAVY}}>20+ years of combined experience in IT, cybersecurity, and law</strong>.
                Our mission is to make DPDP compliance simple, affordable, and accessible for every
                Indian small and medium business.
              </p>
              <button style={btnLg} onClick={() => setShowEnquiry(true)}>Get in Touch</button>
            </div>
          </div>
        </section>

        {/* Career */}
        <section id="career" aria-labelledby="car-h" className="sec-pad"
          style={{padding:"68px 0",background:"#fff",textAlign:"center"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
            <span style={tag}>Careers</span>
            <h2 id="car-h" className="sec-h" style={{...h2s,marginTop:12}}>Join Our Team</h2>
            <div style={{background:BG_LIGHT,borderRadius:16,maxWidth:500,margin:"28px auto 0",
              padding:"52px 36px",border:`1px solid ${BORDER}`}}>
              <div style={{...ibox,width:68,height:68,margin:"0 auto 18px"}}>
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  <path d="M18 6l2 8h8l-6.5 4.7 2.5 7.8L18 22l-6 4.5 2.5-7.8L8 14h8z"
                    stroke={BRAND} strokeWidth="1.8" fill={BRAND_LIGHT} strokeLinejoin="round"/>
                  <line x1="18" y1="22" x2="18" y2="28" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="18" cy="30" r="2" fill={BRAND} opacity=".5"/>
                </svg>
              </div>
              <h3 style={{fontSize:20,fontWeight:800,color:BRAND,marginBottom:10}}>Coming Soon!</h3>
              <p style={{color:"#5A6577",fontSize:14.5,lineHeight:1.7}}>
                We're looking for compliance experts, developers, and legal associates.
                Stay tuned for opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div style={{background:BRAND,padding:"52px 24px",textAlign:"center"}}>
          <h2 style={{fontSize:24,fontWeight:800,color:"#fff",marginBottom:10}}>
            Ready to become DPDP Compliant?
          </h2>
          <p style={{color:"rgba(255,255,255,.88)",marginBottom:26,fontSize:15}}>
            Talk to our experts and get your personalised compliance roadmap today.
          </p>
          <button onClick={() => setShowEnquiry(true)}
            style={{background:"#fff",color:BRAND,border:"none",padding:"13px 32px",
              borderRadius:7,fontSize:15,fontWeight:700,cursor:"pointer"}}>
            Enquire Now →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{background:NAVY,color:"#fff",padding:"52px 24px 28px"}}
        aria-label="Site footer">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="gf">
            <div>
              <div style={{marginBottom:14}}>
                <img src="/logo.png" alt="ACL CoreTech Labs"
                  style={{height:44,width:"auto",objectFit:"contain",
                    filter:"brightness(0) invert(1)",opacity:.9}}/>
              </div>
              <p style={{fontSize:13,color:"rgba(255,255,255,.58)",lineHeight:1.8,maxWidth:300}}>
                AI-powered DPDP audit & compliance platform built for Indian SMBs by ACL CoreTech Labs.
              </p>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"#fff",textTransform:"uppercase",
                letterSpacing:"1px",marginBottom:14}}>Services</div>
              {services.slice(0,5).map((s,i)=>(
                <a key={i} href="#services"
                  style={{display:"block",fontSize:13,color:"rgba(255,255,255,.6)",
                    marginBottom:8,textDecoration:"none"}}>
                  {s.name}
                </a>
              ))}
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"#fff",textTransform:"uppercase",
                letterSpacing:"1px",marginBottom:14}}>Quick Links</div>
              {[{l:"e-Library",h:"#eLibrary"},{l:"Resources",h:"#resources"},
                {l:"About Us",h:"#about"},{l:"Career",h:"#career"}].map((l,i)=>(
                <a key={i} href={l.h}
                  style={{display:"block",fontSize:13,color:"rgba(255,255,255,.6)",
                    marginBottom:8,textDecoration:"none"}}>
                  {l.l}
                </a>
              ))}
            </div>
          </div>

          <hr style={{borderColor:"rgba(255,255,255,.12)",margin:"26px 0"}}/>

          <div className="fbot" style={{display:"flex",justifyContent:"space-between",
            alignItems:"center",fontSize:12,color:"rgba(255,255,255,.45)"}}>
            <span>© 2025 ACL CoreTech Labs – AI-Powered DPDP Compliance for Indian SMBs</span>
            <button onClick={() => { localStorage.removeItem("dpdp_consent"); setShowConsent(true); }}
              style={{background:"none",border:"none",color:"rgba(255,255,255,.4)",
                fontSize:12,cursor:"pointer",textDecoration:"underline"}}>
              Change Consent Preferences
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
