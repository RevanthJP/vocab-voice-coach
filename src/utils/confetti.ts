import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  try {
    // Left burst
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#0B749C', '#1FBAC0', '#61D3AB', '#9CEE8D']
    });
    // Right burst
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#0B749C', '#1FBAC0', '#61D3AB', '#9CEE8D']
    });
  } catch (e) {
    // graceful fallback
  }
}
