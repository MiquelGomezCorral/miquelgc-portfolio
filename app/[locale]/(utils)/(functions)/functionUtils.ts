// =========================================================================
//                              UTIL FUNCTIONS
// =========================================================================
export function secondsToTime(sec: number): string{
  const minutes = Math.floor(sec/60)
  const seconds = Math.floor(sec%60)
  
  // Pad minutes and seconds with leading zeros
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}min ${formattedSeconds}sec`;
}


export function checkLimits(value: number, limits: readonly [number?, number?]): { value: number; valid: boolean } {
  const [low, top] = limits
  if (low !== undefined && value < low) return { value: low, valid: false }
  if (top !== undefined && value > top) return { value: top, valid: false }
  return { value, valid: true }
}

export function getLineKey (a: number, b: number) {
 return a < b ? `${a}-${b}` : `${b}-${a}` // consistent key regardless of order
}

