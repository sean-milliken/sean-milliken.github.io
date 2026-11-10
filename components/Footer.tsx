"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/app/content";
import { starsStore } from "./starsStore";

export default function Footer() {
  const paused = useSyncExternalStore(starsStore.subscribe, starsStore.get, () => false);

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="muted">
          © {new Date().getFullYear()} {profile.name}
        </span>
        <button
          type="button"
          className="text-button"
          aria-pressed={paused}
          onClick={() => starsStore.set(!paused)}
        >
          {paused ? "play stars" : "pause stars"}
        </button>
      </div>
    </footer>
  );
}
