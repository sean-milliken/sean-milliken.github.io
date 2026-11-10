"use client";

import { useEffect, useRef } from "react";
import { starsStore } from "./starsStore";

type Star = {
  x: number; // base position in CSS pixels
  y: number;
  z: number; // 0.15 (far) .. 1 (near)
  r: number;
  phase: number; // twinkle phase
  twinkle: number; // twinkle speed
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // seconds remaining
  maxLife: number;
};

const DENSITY = 1 / 6500; // stars per square CSS pixel
const MAX_STARS = 320;
const DRIFT = 6; // px/sec for the nearest stars
const MOUSE_PARALLAX = 18; // max px shift for the nearest stars
const SCROLL_PARALLAX = 0.08; // fraction of scroll applied to the nearest stars

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) starsStore.set(true);

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let shooter: Shooter | null = null;
    let nextShooter = 4 + Math.random() * 6;

    let starColor = "255,255,255";
    let accentColor = "255,255,255";
    let alphaScale = 1;
    let shootingEnabled = true;

    // Mouse parallax: target in [-1, 1], eased toward each frame.
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    function readTheme() {
      const css = getComputedStyle(document.documentElement);
      starColor = css.getPropertyValue("--star-rgb").trim() || starColor;
      accentColor = css.getPropertyValue("--accent-rgb").trim() || accentColor;
      alphaScale = parseFloat(css.getPropertyValue("--star-alpha")) || 1;
      shootingEnabled = document.documentElement.dataset.theme !== "light";
      if (!shootingEnabled) shooter = null;
    }

    function makeStar(): Star {
      const z = 0.15 + Math.random() ** 2 * 0.85; // more far stars than near ones
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        r: 0.35 + z * 1.25,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.6 + Math.random() * 1.6,
      };
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const prevW = w || window.innerWidth;
      const prevH = h || window.innerHeight;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep existing stars (rescaled) so resizing doesn't reshuffle the sky.
      for (const s of stars) {
        s.x = (s.x / prevW) * w;
        s.y = (s.y / prevH) * h;
      }
      const target = Math.min(MAX_STARS, Math.round(w * h * DENSITY));
      while (stars.length < target) stars.push(makeStar());
      if (stars.length > target) stars = stars.slice(0, target);
      draw(0);
    }

    const wrap = (v: number, max: number) => ((v % max) + max) % max;

    function spawnShooter() {
      const fromLeft = Math.random() < 0.5;
      const speed = 700 + Math.random() * 400;
      const angle = (Math.PI / 180) * (20 + Math.random() * 20);
      shooter = {
        x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
        y: Math.random() * h * 0.4,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 0.9,
        maxLife: 0.9,
      };
    }

    let time = 0;

    function draw(dt: number) {
      time += dt;
      mx += (tx - mx) * Math.min(1, dt * 2.5);
      my += (ty - my) * Math.min(1, dt * 2.5);
      const scroll = window.scrollY;

      ctx!.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.x = wrap(s.x + DRIFT * s.z * dt, w);
        const px = wrap(s.x - mx * MOUSE_PARALLAX * s.z, w);
        const py = wrap(s.y - my * MOUSE_PARALLAX * s.z - scroll * SCROLL_PARALLAX * s.z, h);
        const tw = 0.55 + 0.45 * Math.sin(time * s.twinkle + s.phase);
        const alpha = (0.25 + 0.75 * s.z) * tw * alphaScale;

        ctx!.beginPath();
        ctx!.arc(px, py, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${starColor},${alpha.toFixed(3)})`;
        ctx!.fill();

        // A soft glow on the nearest, brightest stars.
        if (s.z > 0.8 && alphaScale >= 1) {
          ctx!.beginPath();
          ctx!.arc(px, py, s.r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${accentColor},${(alpha * 0.12).toFixed(3)})`;
          ctx!.fill();
        }
      }

      if (shootingEnabled && dt > 0) {
        nextShooter -= dt;
        if (!shooter && nextShooter <= 0) {
          spawnShooter();
          nextShooter = 6 + Math.random() * 10;
        }
      }

      if (shooter) {
        shooter.x += shooter.vx * dt;
        shooter.y += shooter.vy * dt;
        shooter.life -= dt;
        const k = Math.max(0, shooter.life / shooter.maxLife);
        const tail = 0.12; // seconds of trail
        const grad = ctx!.createLinearGradient(
          shooter.x,
          shooter.y,
          shooter.x - shooter.vx * tail,
          shooter.y - shooter.vy * tail,
        );
        grad.addColorStop(0, `rgba(${starColor},${(0.9 * k).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${accentColor},0)`);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.4;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(shooter.x, shooter.y);
        ctx!.lineTo(shooter.x - shooter.vx * tail, shooter.y - shooter.vy * tail);
        ctx!.stroke();
        if (shooter.life <= 0) shooter = null;
      }
    }

    let raf = 0;
    let last = 0;

    function frame(now: number) {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      draw(dt);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf || starsStore.get() || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const sync = () => (starsStore.get() || document.hidden ? stop() : start());

    function onMouse(e: MouseEvent) {
      tx = (e.clientX / w) * 2 - 1;
      ty = (e.clientY / h) * 2 - 1;
    }

    // While paused, still redraw on scroll/theme change so the static sky stays correct.
    const redrawIfPaused = () => {
      if (!raf) draw(0);
    };
    const onTheme = () => {
      readTheme();
      redrawIfPaused();
    };
    const onMotionPref = () => starsStore.set(reduceMotion.matches);

    readTheme();
    resize();
    start();

    const unsubscribe = starsStore.subscribe(sync);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", redrawIfPaused, { passive: true });
    window.addEventListener("themechange", onTheme);
    document.addEventListener("visibilitychange", sync);
    reduceMotion.addEventListener("change", onMotionPref);

    return () => {
      stop();
      unsubscribe();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", redrawIfPaused);
      window.removeEventListener("themechange", onTheme);
      document.removeEventListener("visibilitychange", sync);
      reduceMotion.removeEventListener("change", onMotionPref);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
