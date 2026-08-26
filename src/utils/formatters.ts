import confetti from 'canvas-confetti';

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG', { maximumFractionDigits: 0 });
}

export function generateOrderNumber(prefix = 'DST'): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randomNum}`;
}

export function triggerConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#047857', '#d97706', '#dc2626', '#2563eb', '#ca8a04']
  });
}
