'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Scene = {
  id: string;
  clock: string;
  location: string;
  headline: string;
  narrative: string;
  details: string[];
  background: {
    gradient: string;
    highlight: string;
    vignette: string;
  };
  overlays: {
    size: number;
    blur: number;
    opacity: number;
    x: number;
    y: number;
    hue: number;
    delay: number;
    duration: number;
  }[];
};

const SCENES: Scene[] = [
  {
    id: 'sunrise-suite',
    clock: '06:04',
    location: 'Skyline Suite · Manhattan Penthouse',
    headline: 'Wake up to a sunrise worth a portfolio.',
    narrative:
      'Floor-to-ceiling glass washes the room in gold while the city hums beneath the penthouse terrace.',
    details: [
      'AI-synced blinds split open on cue',
      'Smart glass warms 2° to match circadian rhythm',
      'Energy score: 94 · Resting heart rate: 48'
    ],
    background: {
      gradient:
        'radial-gradient(circle at 25% 15%, rgba(255,245,210,0.85) 0%, rgba(255,180,130,0.35) 32%, rgba(17,25,40,0.92) 100%)',
      highlight: 'rgba(255, 210, 120, 0.85)',
      vignette:
        'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(6,10,20,0.82) 100%)'
    },
    overlays: [
      { size: 520, blur: 90, opacity: 0.4, x: -18, y: -12, hue: 22, delay: 0, duration: 14 },
      { size: 280, blur: 40, opacity: 0.35, x: 48, y: 12, hue: 210, delay: 1.2, duration: 10 },
      { size: 360, blur: 55, opacity: 0.26, x: -44, y: 28, hue: 330, delay: 2.8, duration: 16 }
    ]
  },
  {
    id: 'terrace-breath',
    clock: '06:12',
    location: 'Private Terrace · 82 floors above Madison Ave',
    headline: 'City air tastes different when it’s yours.',
    narrative:
      'Heating coils in the stone pathway guide you toward a suspended infinity pool, steam curling into the dawn.',
    details: [
      'Sky garden automatically mists rare bonsai grove',
      'Drone barista sets espresso flight on teak side table',
      'Dow Futures feed glows beside meditation metrics'
    ],
    background: {
      gradient:
        'linear-gradient(135deg, rgba(120,220,255,0.68) 0%, rgba(24,38,60,0.92) 48%, rgba(6,12,32,0.98) 100%)',
      highlight: 'rgba(110, 200, 255, 0.8)',
      vignette:
        'radial-gradient(circle at 60% 35%, rgba(0,0,0,0) 45%, rgba(3,7,18,0.82) 100%)'
    },
    overlays: [
      { size: 440, blur: 65, opacity: 0.42, x: 32, y: -18, hue: 192, delay: 0.4, duration: 12 },
      { size: 300, blur: 45, opacity: 0.32, x: -26, y: 24, hue: 162, delay: 1, duration: 18 },
      { size: 220, blur: 70, opacity: 0.28, x: 14, y: 36, hue: 210, delay: 1.8, duration: 16 }
    ]
  },
  {
    id: 'closet-orchestra',
    clock: '06:25',
    location: 'Carbon Neutral Dressing Gallery',
    headline: 'Wardrobe lights cue like a symphony.',
    narrative:
      'Automated rails glide bespoke suits while augmented mirrors pin today’s board meeting ensemble.',
    details: [
      'Predictive stylist rotates three looks based on weather + calendar',
      'Diamond cuff-links delivered via pneumatic column',
      'Portfolio recap scrolls alongside outfit heat-map'
    ],
    background: {
      gradient:
        'linear-gradient(120deg, rgba(80,65,220,0.6) 0%, rgba(16,16,40,0.96) 60%, rgba(4,4,20,1) 100%)',
      highlight: 'rgba(160, 150, 255, 0.75)',
      vignette:
        'radial-gradient(circle at 40% 60%, rgba(0,0,0,0) 50%, rgba(8,8,20,0.85) 100%)'
    },
    overlays: [
      { size: 500, blur: 80, opacity: 0.36, x: -32, y: 10, hue: 248, delay: 0.2, duration: 14 },
      { size: 260, blur: 35, opacity: 0.38, x: 40, y: -22, hue: 280, delay: 0.9, duration: 11 },
      { size: 320, blur: 55, opacity: 0.26, x: -12, y: 30, hue: 200, delay: 2.4, duration: 17 }
    ]
  },
  {
    id: 'garage-kickstart',
    clock: '06:42',
    location: 'Hyperloop-ready Garage · Hudson Access Tunnel',
    headline: 'The morning commute is a choice, not a chore.',
    narrative:
      'Biometric ignition floods a satin EV hypercar with ambient light as the floor LEDs map the day’s route.',
    details: [
      'Charging bank tops off wing-sailed roadster',
      'AI concierge confirms jet runway slot at Teterboro',
      'Investment desk holo-display greets you by name'
    ],
    background: {
      gradient:
        'linear-gradient(140deg, rgba(255,120,120,0.55) 0%, rgba(30,18,40,0.95) 58%, rgba(10,8,18,1) 100%)',
      highlight: 'rgba(255, 120, 140, 0.7)',
      vignette:
        'radial-gradient(circle at 55% 45%, rgba(0,0,0,0) 50%, rgba(12,4,16,0.88) 100%)'
    },
    overlays: [
      { size: 360, blur: 45, opacity: 0.34, x: 28, y: -16, hue: 12, delay: 0.6, duration: 15 },
      { size: 420, blur: 70, opacity: 0.38, x: -30, y: 20, hue: 332, delay: 1.1, duration: 13 },
      { size: 240, blur: 50, opacity: 0.28, x: 12, y: 38, hue: 48, delay: 2.2, duration: 17 }
    ]
  },
  {
    id: 'helipad-launch',
    clock: '07:05',
    location: 'Rooftop Helipad · Coastal Transfer Jet',
    headline: 'Sky is the next boardroom.',
    narrative:
      'Rotor wash whips across the infinity pool as your pilot syncs the flight path to the Monaco estate.',
    details: [
      'Heli-cabin aroma shifts to Mediterranean pine',
      'Private banker confirms overnight yield bump',
      'Next-gen HUD overlays global market pulse'
    ],
    background: {
      gradient:
        'linear-gradient(120deg, rgba(255,200,90,0.55) 0%, rgba(28,24,40,0.94) 52%, rgba(8,10,24,1) 100%)',
      highlight: 'rgba(255, 180, 90, 0.78)',
      vignette:
        'radial-gradient(circle at 48% 38%, rgba(0,0,0,0) 45%, rgba(3,6,18,0.9) 100%)'
    },
    overlays: [
      { size: 520, blur: 85, opacity: 0.32, x: -16, y: -8, hue: 28, delay: 0.5, duration: 18 },
      { size: 300, blur: 55, opacity: 0.3, x: 34, y: 18, hue: 210, delay: 1.4, duration: 12 },
      { size: 280, blur: 60, opacity: 0.24, x: -4, y: 36, hue: 90, delay: 2.1, duration: 16 }
    ]
  }
];

const SCENE_DURATION = 7_500;

export const MillionairePOV = (): JSX.Element => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSceneIndex((prev) => (prev + 1) % SCENES.length);
    }, SCENE_DURATION);

    return () => clearTimeout(timeout);
  }, [sceneIndex]);

  useEffect(() => {
    startRef.current = performance.now();

    const updateProgress = (time: number) => {
      const elapsed = time - startRef.current;
      const pct = Math.min(elapsed / SCENE_DURATION, 1);
      setProgress(pct);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sceneIndex]);

  const scene = useMemo(() => SCENES[sceneIndex], [sceneIndex]);

  return (
    <div className="viewer">
      <div className="hud">
        <div className="hud__group">
          <span className="hud__label">Time</span>
          <span className="hud__value">{scene.clock}</span>
        </div>
        <div className="hud__group">
          <span className="hud__label">Location</span>
          <span className="hud__value">{scene.location}</span>
        </div>
        <div className="hud__group">
          <span className="hud__label">Net Worth Pulse</span>
          <span className="hud__value">+$1.8M pre-market</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.05, ease: 'easeOut' }}
          className="scene"
          style={{
            backgroundImage: `${scene.background.gradient}, ${scene.background.vignette}`
          }}
        >
          <div className="scene__texture">
            {scene.overlays.map((overlay) => (
              <motion.span
                key={`${scene.id}-${overlay.x}-${overlay.y}`}
                className="scene__flare"
                style={{
                  width: `${overlay.size}px`,
                  height: `${overlay.size}px`,
                  filter: `blur(${overlay.blur}px)`,
                  opacity: overlay.opacity,
                  top: `${overlay.y}%`,
                  left: `${overlay.x}%`,
                  background: `conic-gradient(from 45deg, hsla(${overlay.hue}, 90%, 70%, 0.55), transparent 65%)`
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: overlay.opacity, rotate: 360 }}
                transition={{
                  duration: overlay.duration,
                  delay: overlay.delay,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}
          </div>

          <motion.div
            className="glass-panel"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 0.98 }}
            transition={{ delay: 0.45, duration: 0.9, ease: 'easeOut' }}
          >
            <motion.span
              className="glass-panel__tag"
              style={{ borderColor: scene.background.highlight, color: scene.background.highlight }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              POV · Morning Sequence
            </motion.span>

            <motion.h1
              className="glass-panel__headline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.75 }}
            >
              {scene.headline}
            </motion.h1>

            <motion.p
              className="glass-panel__narrative"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.75 }}
            >
              {scene.narrative}
            </motion.p>

            <motion.ul
              className="glass-panel__details"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delayChildren: 1, staggerChildren: 0.18 }
                }
              }}
            >
              {scene.details.map((detail) => (
                <motion.li
                  key={detail}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 0.92, y: 0 }
                  }}
                >
                  <span style={{ color: scene.background.highlight }}>•</span> {detail}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="timeline">
        <div className="timeline__progress">
          <span style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="timeline__scenes">
          {SCENES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSceneIndex(idx)}
              className={`timeline__dot ${idx === sceneIndex ? 'timeline__dot--active' : ''}`}
              aria-label={`Jump to ${item.location}`}
            >
              <span>{item.clock}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
