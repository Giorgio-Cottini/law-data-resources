import { useEffect, useRef, useState } from 'react';
import logo from '../assets/github-logo.png';

const PROFILE = 'https://github.com/Giorgio-Cottini';
const SIZE = 72;
const ROWS = 20;

function GithubMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  );
}

function MarqueeChunk() {
  return (
    <span className="gb-chunk">
      <span className="gb-star">⭐</span> Star this Repo!
      <span className="gb-dot">·</span>
      <GithubMark /> Follow me on github!
      <span className="gb-dot">·</span>
    </span>
  );
}

export default function GithubBounce() {
  // phase: 'bounce' -> 'boom' -> 'bg'
  const [phase, setPhase] = useState('bounce');
  const [boom, setBoom] = useState({ x: 0, y: 0 });

  const logoRef = useRef(null);
  const pos = useRef({ x: 60, y: 90 });
  const vel = useRef({ x: 2.6, y: 2.1 });
  const raf = useRef(0);

  useEffect(() => {
    if (phase !== 'bounce') return;
    const step = () => {
      const maxX = window.innerWidth - SIZE;
      const maxY = window.innerHeight - SIZE;
      const p = pos.current;
      const v = vel.current;
      p.x += v.x;
      p.y += v.y;
      if (p.x <= 0) { p.x = 0; v.x = Math.abs(v.x); }
      else if (p.x >= maxX) { p.x = maxX; v.x = -Math.abs(v.x); }
      if (p.y <= 0) { p.y = 0; v.y = Math.abs(v.y); }
      else if (p.y >= maxY) { p.y = maxY; v.y = -Math.abs(v.y); }
      if (logoRef.current) {
        logoRef.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [phase]);

  function explode() {
    cancelAnimationFrame(raf.current);
    const p = pos.current;
    setBoom({ x: p.x + SIZE / 2, y: p.y + SIZE / 2 });
    setPhase('boom');
    // glitch + shockwave duration, then reveal background
    setTimeout(() => setPhase('bg'), 750);
  }

  if (phase === 'bg') {
    return (
      <a
        className="gb-bg"
        href={PROFILE}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Giorgio Cottini's GitHub profile"
      >
        {Array.from({ length: ROWS }, (_, r) => (
          <div
            key={r}
            className={`gb-row ${r % 2 ? 'gb-right' : 'gb-left'}`}
            style={{ '--gb-dur': `${16 + (r % 5) * 4}s` }}
          >
            <div className="gb-track">
              <MarqueeChunk /><MarqueeChunk /><MarqueeChunk /><MarqueeChunk />
            </div>
            <div className="gb-track" aria-hidden="true">
              <MarqueeChunk /><MarqueeChunk /><MarqueeChunk /><MarqueeChunk />
            </div>
          </div>
        ))}
      </a>
    );
  }

  return (
    <div className={`gb-overlay ${phase === 'boom' ? 'gb-booming' : ''}`}>
      {phase === 'boom' && (
        <>
          <div className="gb-shock" style={{ left: boom.x, top: boom.y }} />
          <div className="gb-shock gb-shock2" style={{ left: boom.x, top: boom.y }} />
          <div className="gb-glitch" />
        </>
      )}
      {phase === 'bounce' && (
        <button
          ref={logoRef}
          className="gb-logo"
          onClick={explode}
          aria-label="Surprise"
          style={{ width: SIZE, height: SIZE }}
        >
          <img src={logo} alt="" draggable="false" />
        </button>
      )}
    </div>
  );
}
