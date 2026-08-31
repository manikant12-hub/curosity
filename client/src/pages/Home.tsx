// Sea Glass Editorial — the page is an authored digital art-book, not a template.
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, LockKeyhole, Menu, RotateCcw, Sparkles, X } from "lucide-react";
import { birthdayConfig as c } from "@/content";

const sections = ["Surprise", "Fun", "Memories", "Letter", "Wishes", "Celebration"];
const pad = (n: number) => String(n).padStart(2, "0");

function useCountdown(target: string, preview: boolean) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { if (preview) return; const id = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(id); }, [preview]);
  const targetMs = new Date(target).getTime();
  const distance = Math.max(0, targetMs - now);
  return { unlocked: preview || distance === 0, days: Math.floor(distance / 86400000), hours: Math.floor(distance / 3600000) % 24, minutes: Math.floor(distance / 60000) % 60, seconds: Math.floor(distance / 1000) % 60 };
}

export default function Home() {
  const params = new URLSearchParams(window.location.search);
  const preview = params.get(c.previewParam) === "true";
  const revealOnly = preview && params.get("reveal") === "true";
  const countdown = useCountdown(c.birthdayDate, preview);
  const [started, setStarted] = useState(revealOnly);
  const [photoReveal, setPhotoReveal] = useState(revealOnly);
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [wishCount, setWishCount] = useState(0);
  const [candleOut, setCandleOut] = useState(false);
  const [secret, setSecret] = useState(false);

  const currentQuestion = c.questions[questionIndex % c.questions.length];
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setNavOpen(false); };
  const response = useMemo(() => answers.length ? (answers.at(-1) === "YOU" || answers.at(-1) === "Obviously YOU" ? "Correct. Obviously." : "Interesting choice. I'll allow it.") : "Choose carefully.", [answers]);

  const audioNode = <audio ref={audioRef} src="/manus-storage/kalyani_remix_c835e34a.mp3" loop preload="auto" aria-label="Background music" />;
  const startExperience = () => { setStarted(true); setPhotoReveal(true); void audioRef.current?.play().catch(() => setSoundOn(false)); };
  if (!started) return <>{audioNode}<Opening onStart={startExperience} preview={preview} /></>;
  if (photoReveal) return <>{audioNode}<PhotoReveal soundOn={soundOn} onToggleSound={() => { if (soundOn) { audioRef.current?.pause(); setSoundOn(false); } else { void audioRef.current?.play().catch(() => undefined); setSoundOn(true); } }} onContinue={() => setPhotoReveal(false)} /></>;
  if (!countdown.unlocked) return <>{audioNode}<LockedScreen countdown={countdown} onReset={() => { setStarted(false); setPhotoReveal(false); }} /></>;

  return <><div className="site-shell">
    <header className="topbar">
      <button className="seal" aria-label="Open chapter navigation" onClick={() => setNavOpen(!navOpen)}><span>20</span><Menu size={15} /></button>
      <div className="topbar-meta"><span>08 JUNE 2027</span><span className="topbar-dot" /> <span>IST / 00:00</span></div>
      <div className="progress-readout"><span>{pad(chapter + 1)}</span><i>/</i><span>06</span></div>
    </header>
    {navOpen && <div className="chapter-menu"><button className="menu-close" onClick={() => setNavOpen(false)} aria-label="Close menu"><X size={18}/></button><p className="eyebrow">A SMALL INDEX</p>{sections.map((s, i) => <button key={s} onClick={() => { setChapter(i); scrollTo(`chapter-${i}`); }}><span>{pad(i + 1)}</span>{s}</button>)}<p className="menu-foot">Made slowly, for one person.</p></div>}

    <main>
      <section id="chapter-0" className="chapter hero-chapter" onMouseEnter={() => setChapter(0)}>
        <div className="hero-image"><img src={c.photos[2].src} alt={c.photos[2].alt} /><div className="image-wash" /></div>
        <div className="hero-copy"><p className="eyebrow light">01 — THE SURPRISE</p><p className="reveal-line light delay-1">Okay...</p><h1 className="hero-name light delay-2">Aishwarya</h1><p className="hero-sub light delay-3">It’s finally your day.<br/><em>Happy 20th birthday.</em></p><div className="hero-bottom"><span>20 looks good on you.</span><span>Scroll slowly <ArrowDown size={16}/></span></div></div>
      </section>

      <section id="chapter-1" className="chapter ink-chapter fun-chapter" onMouseEnter={() => setChapter(1)}><div className="chapter-number">02</div><div className="chapter-inner narrow"><p className="eyebrow sea">A LITTLE CHAOS</p><h2>Before I say anything serious<span className="sea">…</span></h2><p className="lede">Apparently you’re an adult now. I’m not convinced.</p><div className="question-card"><span className="question-count">{pad(questionIndex + 1)} / 05</span><h3>{currentQuestion.prompt}</h3><div className="choice-row">{currentQuestion.options.map(o => <button key={o} className="choice" onClick={() => { setAnswers([...answers, o]); setQuestionIndex(questionIndex + 1); }}>{o}<ArrowRight size={15}/></button>)}</div><p className="answer-note">{response}</p></div></div></section>

      <section id="chapter-2" className="chapter paper-chapter memories-chapter" onMouseEnter={() => setChapter(2)}><div className="chapter-number ink-text">03</div><div className="chapter-inner"><p className="eyebrow clay">SOME MEMORIES</p><div className="memory-heading"><h2>Somewhere between<br/><em>all the ordinary days…</em></h2><p>…you became one of my favorite people.</p></div><div className="photo-stack"><div className="stack-shadow"/><img key={photoIndex} src={c.photos[photoIndex].src} alt={c.photos[photoIndex].alt} /><div className="photo-caption"><span>{c.photos[photoIndex].label}</span><p>{c.photos[photoIndex].caption}</p></div></div><div className="photo-controls"><button onClick={() => setPhotoIndex((photoIndex + c.photos.length - 1) % c.photos.length)} aria-label="Previous photo"><ChevronLeft size={20}/></button><span>{photoIndex + 1} / {c.photos.length}</span><button onClick={() => setPhotoIndex((photoIndex + 1) % c.photos.length)} aria-label="Next photo"><ChevronRight size={20}/></button></div></div></section>

      <section id="chapter-3" className="chapter letter-chapter" onMouseEnter={() => setChapter(3)}><div className="chapter-number">04</div><div className="chapter-inner letter-layout"><div><p className="eyebrow sea">WHY YOU MATTER</p><h2>A little something<br/><em>I actually mean.</em></h2></div><div className="letter-copy">{c.letter.map((line, i) => <p key={i} className={i === 0 || i === c.letter.length - 1 ? "letter-strong" : ""}>{line}</p>)}</div></div></section>

      <section id="chapter-4" className="chapter wishes-chapter" onMouseEnter={() => setChapter(4)}><div className="chapter-number ink-text">05</div><div className="chapter-inner wishes-layout"><div><p className="eyebrow clay">YOUR NEXT CHAPTER</p><h2>20 things<br/><em>I wish for you.</em></h2><p className="lede">Tap the number. Keep the ones that feel like yours.</p><button className="wish-orbit" onClick={() => setWishCount(Math.min(20, wishCount + 1))}><span className="orbit-number">{pad(Math.max(1, wishCount))}</span><span className="orbit-label">{wishCount >= 20 ? "all yours" : "reveal next"}</span></button></div><div className="wish-list">{c.wishes.slice(0, wishCount).map((w, i) => <div className="wish-item" key={w}><span>{pad(i + 1)}</span><p>{w}</p></div>)}{wishCount === 0 && <p className="wish-hint">The first one is waiting.</p>}</div></div></section>

      <section id="chapter-5" className="chapter celebration-chapter" onMouseEnter={() => setChapter(5)}><div className="celebration-image"><img src={c.photos[0].src} alt={c.photos[0].alt}/><div className="image-wash"/></div><div className="chapter-inner celebration-inner"><p className="eyebrow light">06 — THE FINAL GIFT</p><p className="celebrate-kicker light">Enough emotional damage.</p><h2 className="light">It’s your<br/><em>birthday!!!</em></h2><div className="candle-wrap"><button className={`candle ${candleOut ? "out" : ""}`} onClick={() => setCandleOut(true)} aria-label="Tap to blow out the candle"><span className="flame"/><span className="wick"/><span className="candle-body"/></button><p className="light candle-copy">{candleOut ? "Make a wish." : "Tap the candle."}</p></div><p className="final-line light">Happy 20th, Aishwarya.<br/><span>Here’s to everything that’s still waiting for you.</span></p><button className="last-thing" onClick={() => setSecret(true)}>One last thing <ArrowRight size={17}/></button></div>{candleOut && <div className="confetti" aria-hidden="true">{Array.from({length: 18}).map((_, i) => <i key={i} style={{'--i': i} as React.CSSProperties}/>)}</div>}</section>
    </main>
    <footer className="site-footer"><span>For Aishwarya, always.</span><button onClick={() => setSecret(true)}><Sparkles size={14}/> Psst…</button></footer>
    {secret && <div className="secret-overlay" role="dialog" aria-modal="true"><button className="menu-close" onClick={() => setSecret(false)} aria-label="Close secret"><X size={18}/></button><div className="secret-seal">20</div><p className="eyebrow clay">YOU FOUND IT</p><h2>Psst…</h2><p>Okay, now you’re officially not allowed to say I didn’t put effort into this.</p><p className="secret-signoff">Happy Birthday, Aishwarya.<br/>🤍</p><button className="reset-button" onClick={() => window.location.href = window.location.pathname}><RotateCcw size={15}/> Start again</button></div>}
  </div>{audioNode}</>
}

function Opening({ onStart, preview }: { onStart: () => void; preview: boolean }) { const [line, setLine] = useState(0); useEffect(() => { const id = window.setInterval(() => setLine(v => Math.min(2, v + 1)), 1600); return () => window.clearInterval(id); }, []); return <section className="opening opening-paper"><div className="opening-noise"/><div className="opening-mark"><span className="mark-loop mark-loop-a"/><span className="mark-loop mark-loop-b"/><b>20</b></div><div className="opening-copy"><p className={line >= 0 ? "visible" : ""}>Hey, Aishwarya.</p><p className={line >= 1 ? "visible" : ""}>I made something for you.</p><p className={`promise ${line >= 2 ? "visible" : ""}`}>Before you continue…<br/>promise me you’ll actually explore this?</p></div>{line >= 2 && <div className="opening-actions"><button onClick={onStart}>Yes, obviously <ArrowRight size={16}/></button><button onClick={onStart} className="maybe">Hmm…</button></div>}<span className="opening-date">08.06.27</span>{preview && <span className="preview-badge">PREVIEW MODE</span>}</section> }
function PhotoReveal({ onContinue, soundOn, onToggleSound }: { onContinue: () => void; soundOn: boolean; onToggleSound: () => void }) { return <section className="photo-reveal" style={{color: '#21291f'}}><div className="photo-reveal-top" style={{color: '#21291f'}}><span className="eyebrow clay" style={{color: '#21291f'}}>A LITTLE SOMETHING FIRST</span><span className="photo-reveal-index" style={{color: '#21291f'}}>01 / 03</span></div><div className="photo-reveal-copy" style={{color: '#21291f'}}><h1 style={{color: '#21291f'}}>Before the<br style={{color: '#21291f'}}/><em style={{color: '#21291f'}}>countdown…</em></h1><p style={{color: '#21291f'}}>I wanted you to see these first. sorry for using your photos without your permission but still something is waiting a head</p></div><div className="reveal-gallery" style={{color: '#21291f'}}>{c.photos.map((photo, i) => <figure key={photo.label} className={`reveal-card reveal-card-${i + 1}`} style={{color: '#21291f'}}><img src={photo.src} alt={photo.alt} style={{color: '#21291f'}}/><figcaption style={{color: '#21291f'}}><span style={{color: '#21291f'}}>{photo.label}</span><p style={{color: '#21291f'}}>{photo.caption}</p></figcaption></figure>)}</div><div className="reveal-actions" style={{color: '#21291f'}}><button className="sound-toggle" onClick={onToggleSound} aria-pressed={soundOn} style={{color: '#21291f'}}>♪ Sound {soundOn ? "on" : "off"}</button><button className="reveal-continue" onClick={onContinue} style={{color: '#21291f'}}>Keep going <ArrowRight size={16} style={{color: '#21291f'}}/></button></div></section> }
function LockedScreen({ countdown, onReset }: { countdown: {days:number;hours:number;minutes:number;seconds:number}; onReset:()=>void }) { return <section className="locked"><div className="locked-orbit"><LockKeyhole size={18}/><span>THE SURPRISE IS SLEEPING</span></div><div className="locked-copy"><p className="eyebrow sea">COME BACK WHEN THE CLOCK SAYS IT’S YOUR DAY</p><h1>Something is<br/><em>waiting for you.</em></h1><div className="countdown">{[[countdown.days,"days"],[countdown.hours,"hours"],[countdown.minutes,"minutes"],[countdown.seconds,"seconds"]].map(([n, label]) => <div key={label as string}><strong>{pad(n as number)}</strong><span>{label}</span></div>)}</div><p className="locked-note">8 June 2027 · midnight in India</p></div><button className="locked-reset" onClick={onReset}>Back to the beginning</button></section> }
