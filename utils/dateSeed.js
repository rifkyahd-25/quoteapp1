// utils/dateSeed.js

/**
 * Turn today's date (YYYY-MM-DD) into a pseudo-random seed [0,1).
 */
export function getDateSeed() {
    const dateStr = new Date().toISOString().slice(0, 10); // e.g. "2025-09-16"
    let hash = 0;
  
    for (let i = 0; i < dateStr.length; i++) {
      hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0; // unsigned 32-bit
    }
  
    return hash / 0xffffffff; // normalize to [0,1)
  }