// utils/shuffle.js
import { getDateSeed } from "./dateSeed";

/**
 * Deterministically shuffle an array based on today’s date.
 * Uses a simple LCG (linear congruential generator) seeded by getDateSeed().
 */
export function shuffleByDate(arr) {
  // copy the array so we don't mutate the original
  const array = arr.slice();
  // initialize LCG seed
  let seed = Math.floor(getDateSeed() * 0x100000000);

  function rand() {
    // 1664525 & 1013904223 are common LCG constants
    seed = (seed * 1664525 + 1013904223) % 0x100000000;
    return seed / 0x100000000;
  }

  // Fisher–Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}