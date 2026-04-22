import { useState, useCallback } from "react";
import { EXAM_DATES, COLLEGES, NEWS_CATEGORIES, Stars } from "./data/index.jsx";

// ─── RSS HELPERS ──────────────────────────────────────────────────────────────
function stripHtml(h = "") { return h.replace(/<[^>]*>/g, "").replace(/&[a-z#0-9]+;/gi, " ").trim(); }
function parseRssXml(xml) {
  try {
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    return Array.from(doc.querySelectorAll("item")).slice(0, 12).map(item => {
      const g = t => item.querySelector(t)?.textContent?.trim() || "";
      return {
        title: g("title").replace(/ - [^-]+$/, "").trim(),
        link:  g("link") || g("guid") || "#",
        desc:  stripHtml(g("description")).slice(0, 200),
        date:  g("pubDate"),
        src:   g("source") || "Google News",
      };
    }).filter(i => i.title);
  } catch { return []; }
}
async function fetchRss(query) {
  const rss = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
  const proxies = [
    async () => { const r = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rss)}`); const j = await r.json(); if(!j.contents) throw 0; return parseRssXml(j.contents); },
    async () => { const r = await fetch(`https://corsproxy.io/?${encodeURIComponent(rss)}`); return parseRssXml(await r.text()); },
    async () => { const r = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}&count=12`); const j = await r.json(); if(j.status!=="ok") throw 0; return j.items.map(i=>({ title:i.title?.replace(/ - [^-]+$/,"").trim(), link:i.link, desc:stripHtml(i.description||"").slice(0,200), date:i.pubDate, src:i.author||"Google News" })); },
  ];
  for (const p of proxies) { try { const r = await p(); if(r?.length) return r; } catch(_){} }
  throw new Error("Could not fetch news. Please check your connection.");
}
function timeAgo(d) {
  try {
    const h = Math.floor((Date.now()-new Date(d))/3600000);
    if(h<1) return "Just now"; if(h<24) return `${h}h ago`;
    const day=Math.floor(h/24); if(day<7) return `${day}d ago`;
    return new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short"});
  } catch { return ""; }
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const card = { background:"#1e293b", border:"1px solid #334155", borderRadius:"14px", padding:"20px" };
const badge = (color) => ({ background:`${color}20`, border:`1px solid ${color}50`, borderRadius:"6px", padding:"3px 10px", fontSize:"11px", color, fontWeight:"600", letterSpacing:"0.5px", display:"inline-block" });

// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id:"news",      label:"📰 News & Updates" },
  { id:"dates",     label:"📅 Exam Calendar" },
  { id:"ranks",     label:"📊 Rank Analysis" },
  { id:"colleges",  label:"🏛️ College Guide" },
];

// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("news");
  return (
    <div style={{ minHeight:"100vh", background:"#0f172a", fontFamily:"'Inter',system-ui,sans-serif", color:"#e2e8f0" }}>
      <Header />
      <NavTabs tab={tab} setTab={setTab} />
      <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"24px 16px 60px" }}>
        {tab === "news"     && <NewsTab />}
        {tab === "dates"    && <DatesTab />}
        {tab === "ranks"    && <RanksTab />}
        {tab === "colleges" && <CollegesTab />}
      </div>
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div style={{ background:"linear-gradient(135deg,#1e1b4b 0%,#0f172a 60%)", borderBottom:"1px solid #1e293b", padding:"20px 24px" }}>
      <div style={{ maxWidth:"1000px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ fontSize:"32px" }}>🎓</div>
          <div>
            <div style={{ fontWeight:"800", fontSize:"22px", color:"#f8fafc", fontFamily:"'Space Grotesk',sans-serif" }}>ExamReady India</div>
            <div style={{ fontSize:"11px", color:"#64748b", letterSpacing:"2px" }}>JEE · BITSAT · VITEEE · WBJEE · COMEDK</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
          {["Class 11 ✓","Class 12 ✓","Droppers ✓"].map(t => (
            <span key={t} style={{ ...badge("#10b981"), fontSize:"11px" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── NAV TABS ─────────────────────────────────────────────────────────────────
function NavTabs({ tab, setTab }) {
  return (
    <div style={{ background:"#1e293b", borderBottom:"1px solid #334155", overflowX:"auto" }}>
      <div style={{ maxWidth:"1000px", margin:"0 auto", display:"flex" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding:"14px 22px", border:"none", background:"transparent", cursor:"pointer", fontFamily:"inherit", fontSize:"14px", fontWeight: tab===t.id?"700":"500", color: tab===t.id?"#6366f1":"#94a3b8", borderBottom: tab===t.id?"3px solid #6366f1":"3px solid transparent", whiteSpace:"nowrap", transition:"all 0.2s" }}>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1: NEWS
// ══════════════════════════════════════════════════════════════════════════════
function NewsTab() {
  const [activeCat, setActiveCat] = useState(null);
  const [news, setNews]           = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);

  const load = useCallback(async (cat) => {
    setActiveCat(cat.id); setLoading(true); setError(null); setNews([]);
    try { setNews(await fetchRss(cat.query)); }
    catch(e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  return (
    <div>
      <SectionHeader title="News & Updates" sub="Live news from Google News — click any exam to load latest articles" />
      <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"24px" }}>
        {NEWS_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => load(cat)} disabled={loading}
            style={{ background: activeCat===cat.id?`${cat.color}25`:"#1e293b", border:`1px solid ${activeCat===cat.id?cat.color+"80":"#334155"}`, borderRadius:"24px", padding:"8px 16px", cursor:"pointer", fontFamily:"inherit", fontSize:"13px", fontWeight: activeCat===cat.id?"700":"400", color: activeCat===cat.id?cat.color:"#94a3b8", transition:"all 0.2s", display:"flex", alignItems:"center", gap:"6px" }}>
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {!activeCat && !loading && (
        <div style={{ ...card, textAlign:"center", padding:"50px 20px" }}>
          <div style={{ fontSize:"48px", marginBottom:"12px" }}>📚</div>
          <h3 style={{ color:"#6366f1", margin:"0 0 8px" }}>Select an exam above to load latest news</h3>
          <p style={{ color:"#64748b", fontSize:"14px" }}>Stay updated with registration dates, result announcements, cutoff releases and more.</p>
        </div>
      )}

      {loading && <Spinner text="Fetching latest exam news…" />}
      {error && <ErrorBox msg={error} />}

      {!loading && news.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {news.map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
              style={{ ...card, textDecoration:"none", display:"block", borderLeft:`3px solid ${NEWS_CATEGORIES.find(c=>c.id===activeCat)?.color||"#6366f1"}`, transition:"background 0.2s", padding:"14px 18px" }}
              onMouseEnter={e=>e.currentTarget.style.background="#263248"}
              onMouseLeave={e=>e.currentTarget.style.background="#1e293b"}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"14px", fontWeight:"600", color:"#f1f5f9", lineHeight:"1.5", marginBottom:"4px" }}>{item.title}</div>
                  {item.desc && <div style={{ fontSize:"12px", color:"#64748b", lineHeight:"1.5" }}>{item.desc}</div>}
                  <div style={{ marginTop:"8px", fontSize:"11px", color:"#475569" }}>📰 {item.src} · 🕐 {timeAgo(item.date)}</div>
                </div>
                <span style={{ color:"#4f6584", fontSize:"18px", marginTop:"2px" }}>↗</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2: EXAM CALENDAR
// ══════════════════════════════════════════════════════════════════════════════
function DatesTab() {
  const [filter, setFilter] = useState("All");
  const exams = ["All", ...Array.from(new Set(EXAM_DATES.map(d=>d.exam)))];
  const types = ["All", "registration", "exam", "result", "admission"];
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = EXAM_DATES.filter(d =>
    (filter==="All" || d.exam===filter) && (typeFilter==="All" || d.type===typeFilter)
  );

  const typeIcon  = { registration:"📝", exam:"✏️", result:"📊", admission:"🎓" };
  const typeLabel = { registration:"Registration", exam:"Exam", result:"Result", admission:"Admission/Counselling" };

  return (
    <div>
      <SectionHeader title="Exam Calendar 2025" sub="Important dates for all major engineering entrance exams" />

      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
        {exams.map(e => (
          <button key={e} onClick={() => setFilter(e)}
            style={{ background: filter===e?"#6366f1":"#1e293b", border:`1px solid ${filter===e?"#6366f1":"#334155"}`, borderRadius:"20px", padding:"6px 14px", cursor:"pointer", fontFamily:"inherit", fontSize:"12px", color: filter===e?"#fff":"#94a3b8", fontWeight: filter===e?"700":"400" }}>
            {e}
          </button>
        ))}
      </div>
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"24px" }}>
        {types.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            style={{ background: typeFilter===t?"#334155":"transparent", border:`1px solid ${typeFilter===t?"#64748b":"#1e293b"}`, borderRadius:"20px", padding:"5px 12px", cursor:"pointer", fontFamily:"inherit", fontSize:"11px", color: typeFilter===t?"#e2e8f0":"#64748b" }}>
            {t==="All"?"All Types":`${typeIcon[t]} ${typeLabel[t]}`}
          </button>
        ))}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
        {filtered.map((d, i) => (
          <div key={i} style={{ ...card, display:"flex", alignItems:"center", gap:"16px", padding:"14px 18px", borderLeft:`3px solid ${d.color}` }}>
            <div style={{ fontSize:"20px" }}>{typeIcon[d.type]}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", gap:"8px", alignItems:"center", flexWrap:"wrap", marginBottom:"4px" }}>
                <span style={{ ...badge(d.color) }}>{d.exam}</span>
                <span style={{ fontSize:"11px", color:"#64748b" }}>{typeLabel[d.type]}</span>
              </div>
              <div style={{ fontSize:"14px", fontWeight:"600", color:"#f1f5f9" }}>{d.session}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:"13px", fontWeight:"700", color:"#e2e8f0" }}>{d.date}</div>
              <span style={{ fontSize:"10px", padding:"2px 8px", borderRadius:"12px", fontWeight:"600",
                background: d.status==="done"?"#1f2937":d.status==="upcoming"?"#14532d20":"#1c1917",
                color: d.status==="done"?"#6b7280":d.status==="upcoming"?"#4ade80":"#f97316",
                border: d.status==="done"?"1px solid #374151":d.status==="upcoming"?"1px solid #166534":"1px solid #ea580c",
              }}>
                {d.status==="done"?"✓ Done":"⏰ Upcoming"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop:"20px", ...card, background:"#1a1f35", borderColor:"#3730a3" }}>
        <p style={{ margin:0, fontSize:"13px", color:"#818cf8", lineHeight:"1.7" }}>
          📌 <strong>Note:</strong> Dates are indicative based on previous years and official announcements. Always verify on the official exam website before applying. Dates may change.
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3: RANK ANALYSIS
// ══════════════════════════════════════════════════════════════════════════════
function RanksTab() {
  const [selExam, setSelExam]       = useState("JEE Advanced");
  const [selCollege, setSelCollege] = useState(null);
  const exams = Array.from(new Set(COLLEGES.map(c=>c.exam)));

  const colleges = COLLEGES.filter(c => c.exam === selExam);
  const selected = selCollege ? COLLEGES.find(c=>c.name===selCollege) : colleges[0];

  const isScore = selected?.scoreType === "score";

  return (
    <div>
      <SectionHeader title="Opening & Closing Rank Analysis" sub="Based on 2024 data. Use as reference — actual cutoffs vary each year." />

      {/* Exam filter */}
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"20px" }}>
        {exams.map(e => (
          <button key={e} onClick={() => { setSelExam(e); setSelCollege(null); }}
            style={{ background: selExam===e?"#6366f1":"#1e293b", border:`1px solid ${selExam===e?"#6366f1":"#334155"}`, borderRadius:"20px", padding:"8px 18px", cursor:"pointer", fontFamily:"inherit", fontSize:"13px", color: selExam===e?"#fff":"#94a3b8", fontWeight: selExam===e?"700":"400" }}>
            {e}
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:"16px" }}>
        {/* College list */}
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {colleges.map(c => (
            <button key={c.name} onClick={() => setSelCollege(c.name)}
              style={{ background: (selCollege||colleges[0]?.name)===c.name?`${c.color}20`:"#1e293b",
                border:`1px solid ${(selCollege||colleges[0]?.name)===c.name?c.color+"60":"#334155"}`,
                borderRadius:"12px", padding:"12px 14px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", transition:"all 0.2s" }}>
              <div style={{ fontWeight:"700", fontSize:"13px", color:"#f1f5f9" }}>{c.short}</div>
              <div style={{ fontSize:"11px", color:"#64748b", marginTop:"2px" }}>{c.name.length > 20 ? c.name.slice(0,20)+"…" : c.name}</div>
              <div style={{ fontSize:"10px", color:"#475569", marginTop:"3px" }}>{c.city}</div>
            </button>
          ))}
        </div>

        {/* College detail */}
        {selected && (
          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            <div style={{ ...card, borderTop:`3px solid ${selected.color}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"8px" }}>
                <div>
                  <h3 style={{ margin:"0 0 4px", color:"#f8fafc", fontSize:"18px" }}>{selected.name}</h3>
                  <p style={{ margin:"0 0 8px", color:"#64748b", fontSize:"13px" }}>📍 {selected.city}, {selected.state} · Est. {selected.established}</p>
                  <Stars rating={selected.rating} />
                </div>
                <div style={{ textAlign:"right" }}>
                  {selected.nirf && <div style={{ fontSize:"12px", color:"#fbbf24" }}>🏆 NIRF #{selected.nirf}</div>}
                  <div style={{ fontSize:"12px", color:"#94a3b8", marginTop:"2px" }}>{selected.fees}</div>
                  <div style={{ fontSize:"12px", color:"#94a3b8" }}>{selected.accreditation}</div>
                </div>
              </div>
              <div style={{ marginTop:"12px", display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {selected.highlights.map((h,i)=>(
                  <span key={i} style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:"20px", padding:"3px 10px", fontSize:"11px", color:"#94a3b8" }}>✓ {h}</span>
                ))}
              </div>
            </div>

            {/* Rank/Score bars */}
            <div style={card}>
              <h4 style={{ margin:"0 0 16px", color:"#e2e8f0", fontSize:"14px" }}>
                {isScore ? "📊 Score Cutoffs (out of 450) — BITSAT 2024" : "📊 Opening & Closing Ranks — 2024"}
              </h4>
              {selected.branches.map((b, i) => {
                const max  = isScore ? 450 : 100000;
                const pctO = isScore ? (b.openScore/max)*100 : (1-(b.openRank/max))*100;
                const pctC = isScore ? (b.closeScore/max)*100 : (1-(b.closeRank/max))*100;
                return (
                  <div key={i} style={{ marginBottom:"18px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                      <span style={{ fontSize:"13px", fontWeight:"600", color:"#f1f5f9" }}>{b.name}</span>
                      <span style={{ fontSize:"11px", color:"#64748b" }}>{b.category}</span>
                    </div>
                    <div style={{ position:"relative", height:"32px", background:"#0f172a", borderRadius:"8px", overflow:"hidden" }}>
                      {/* background bar */}
                      <div style={{ position:"absolute", left:0, top:0, bottom:0, right:0, background:"#1e293b" }} />
                      {/* rank range bar */}
                      {isScore ? (
                        <div style={{ position:"absolute", left:`${pctC}%`, top:"4px", bottom:"4px", right:`${100-pctO}%`, background:`${selected.color}60`, border:`1px solid ${selected.color}`, borderRadius:"4px", minWidth:"4px" }} />
                      ) : (
                        <div style={{ position:"absolute", left:0, top:"4px", bottom:"4px", width:`${Math.max(pctO,2)}%`, background:`${selected.color}60`, border:`1px solid ${selected.color}`, borderRadius:"4px" }} />
                      )}
                      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 10px" }}>
                        <span style={{ fontSize:"12px", fontWeight:"700", color:"#4ade80" }}>
                          {isScore ? `Score: ${b.openScore}` : `Open: ${b.openRank?.toLocaleString()}`}
                        </span>
                        <span style={{ fontSize:"12px", fontWeight:"700", color:"#f87171" }}>
                          {isScore ? `→ ${b.closeScore}` : `Close: ${b.closeRank?.toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Admission criteria */}
            <div style={{ ...card, background:"#1a1f35", borderColor:"#3730a3" }}>
              <h4 style={{ margin:"0 0 8px", color:"#818cf8", fontSize:"13px" }}>📋 ADMISSION CRITERIA</h4>
              <p style={{ margin:"0 0 10px", fontSize:"13px", color:"#c7d2fe", lineHeight:"1.7" }}>{selected.admissionCriteria}</p>
              <a href={selected.website} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-block", background:"#6366f1", color:"#fff", padding:"7px 16px", borderRadius:"8px", fontSize:"12px", fontWeight:"700", textDecoration:"none" }}>
                Visit Official Website ↗
              </a>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop:"16px", ...card, background:"#1c1007", borderColor:"#92400e" }}>
        <p style={{ margin:0, fontSize:"13px", color:"#fbbf24", lineHeight:"1.7" }}>
          ⚠️ <strong>Disclaimer:</strong> All rank and score data is approximate and based on 2024 trends. Actual cutoffs change every year based on number of applicants, paper difficulty, and seat matrix. Always refer to official JoSAA/CSAB/college websites for authoritative data.
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4: COLLEGE GUIDE
// ══════════════════════════════════════════════════════════════════════════════
function CollegesTab() {
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [expanded, setExpanded] = useState(null);
  const types = ["All", "IIT", "NIT", "Deemed", "State University", "Private"];

  const visible = COLLEGES.filter(c =>
    (filter==="All" || c.type===filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase()) || c.exam.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <SectionHeader title="College Guide" sub="Ratings, admission criteria, fees and branch-wise cutoffs for top engineering colleges" />

      <div style={{ display:"flex", gap:"10px", marginBottom:"16px", flexWrap:"wrap" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, city, exam…"
          style={{ flex:1, minWidth:"200px", background:"#1e293b", border:"1px solid #334155", borderRadius:"10px", padding:"9px 14px", fontSize:"14px", color:"#e2e8f0", fontFamily:"inherit", outline:"none" }} />
      </div>

      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"20px" }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            style={{ background: filter===t?"#6366f1":"#1e293b", border:`1px solid ${filter===t?"#6366f1":"#334155"}`, borderRadius:"20px", padding:"6px 14px", cursor:"pointer", fontFamily:"inherit", fontSize:"12px", color: filter===t?"#fff":"#94a3b8", fontWeight: filter===t?"700":"400" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
        {visible.map(c => (
          <div key={c.name} style={{ ...card, borderLeft:`3px solid ${c.color}`, cursor:"pointer" }} onClick={() => setExpanded(expanded===c.name?null:c.name)}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"8px" }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:"8px", alignItems:"center", flexWrap:"wrap", marginBottom:"6px" }}>
                  <span style={badge(c.color)}>{c.type}</span>
                  <span style={badge("#334155")}>{c.exam}</span>
                  {c.nirf && <span style={{ fontSize:"11px", color:"#fbbf24" }}>🏆 NIRF #{c.nirf}</span>}
                </div>
                <h3 style={{ margin:"0 0 3px", fontSize:"16px", color:"#f8fafc" }}>{c.name}</h3>
                <p style={{ margin:"0", fontSize:"13px", color:"#64748b" }}>📍 {c.city}, {c.state} · {c.fees}/yr</p>
                <div style={{ marginTop:"6px" }}><Stars rating={c.rating} /></div>
              </div>
              <span style={{ color:"#475569", fontSize:"20px", transition:"transform 0.2s", transform: expanded===c.name?"rotate(180deg)":"rotate(0deg)" }}>⌄</span>
            </div>

            {expanded === c.name && (
              <div style={{ marginTop:"16px", borderTop:"1px solid #334155", paddingTop:"16px" }}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"14px" }}>
                  {c.highlights.map((h,i)=>(
                    <span key={i} style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:"20px", padding:"3px 10px", fontSize:"11px", color:"#94a3b8" }}>✓ {h}</span>
                  ))}
                </div>

                <h4 style={{ margin:"0 0 10px", fontSize:"13px", color:"#94a3b8", letterSpacing:"1px" }}>BRANCH CUTOFFS (2024)</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"14px" }}>
                  {c.branches.map((b,i) => (
                    <div key={i} style={{ background:"#0f172a", borderRadius:"8px", padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"8px" }}>
                      <span style={{ fontSize:"13px", color:"#e2e8f0" }}>{b.name}</span>
                      <div style={{ display:"flex", gap:"12px" }}>
                        <span style={{ fontSize:"12px", color:"#4ade80", fontWeight:"600" }}>
                          {c.scoreType==="score"?`Open: ${b.openScore}`:`Open: ${b.openRank?.toLocaleString()}`}
                        </span>
                        <span style={{ fontSize:"12px", color:"#f87171", fontWeight:"600" }}>
                          {c.scoreType==="score"?`Close: ${b.closeScore}`:`Close: ${b.closeRank?.toLocaleString()}`}
                        </span>
                        <span style={{ fontSize:"11px", color:"#64748b" }}>{b.category}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background:"#1a1f35", border:"1px solid #3730a3", borderRadius:"10px", padding:"12px 14px", marginBottom:"12px" }}>
                  <p style={{ margin:0, fontSize:"13px", color:"#c7d2fe", lineHeight:"1.7" }}>
                    <strong style={{ color:"#818cf8" }}>Admission: </strong>{c.admissionCriteria}
                  </p>
                </div>

                <a href={c.website} target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-block", background:c.color, color:"#fff", padding:"8px 18px", borderRadius:"8px", fontSize:"13px", fontWeight:"700", textDecoration:"none" }}>
                  Official Website ↗
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom:"24px" }}>
      <h2 style={{ margin:"0 0 4px", fontSize:"22px", color:"#f8fafc", fontFamily:"'Space Grotesk',sans-serif" }}>{title}</h2>
      <p style={{ margin:0, fontSize:"13px", color:"#64748b" }}>{sub}</p>
    </div>
  );
}
function Spinner({ text }) {
  return (
    <div style={{ textAlign:"center", padding:"50px" }}>
      <div style={{ width:"36px", height:"36px", border:"3px solid #1e293b", borderTop:"3px solid #6366f1", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 14px" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p style={{ color:"#64748b", fontSize:"14px" }}>{text}</p>
    </div>
  );
}
function ErrorBox({ msg }) {
  return (
    <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:"12px", padding:"16px 20px", color:"#f87171", fontSize:"14px" }}>
      ⚠️ {msg}
    </div>
  );
}
