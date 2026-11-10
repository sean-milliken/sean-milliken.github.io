// Tiny shared store so the footer button and the canvas agree on pause state.
type Listener = () => void;

let paused = false;
const listeners = new Set<Listener>();

export const starsStore = {
  get: () => paused,
  set(next: boolean) {
    if (next === paused) return;
    paused = next;
    listeners.forEach((l) => l());
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};
