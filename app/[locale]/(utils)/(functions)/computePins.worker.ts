
import { getLineKey } from '@/app/[locale]/(utils)/(functions)/functionUtils';

// =========================================================================
//                              PINS POINT TYPE
// =========================================================================
export type point = {
  x: number,
  y: number,
}
export type pin = point & {
  usedWith: Set<number>,
}

// =========================================================================
//                              PINS Sync
// =========================================================================

type WorkerRequest = {
  numPins: number
  imageSize: number
  radius: number
  margin: number
}
type WorkerResponse = {
  pins: pin[]
  lines: Map<string, point[]>
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const { numPins, imageSize, radius, margin } = event.data
  
  const pins = computePins(numPins, radius, margin);
  const lines = precomputeLines(pins, imageSize, radius)

  postMessage({ pins, lines })
};
// =========================================================================
//                              PINS FUNCTIONS
// =========================================================================
export function computePins (
  numPins: number,
  radius: number,
  margin: number,
): pin[] {
  // GET PIN
  const degree = (360 / numPins) * (Math.PI / 180) // convert to radians
  const pins: pin[] = []
  for(let i = 0; i < numPins; i++){
    pins.push({ //  - Math.PI / 2 -> rotate by 90 | Margin with the canvas
      x: Math.cos(degree*i - Math.PI / 2) * (radius - margin) + radius, 
      y: Math.sin(degree*i - Math.PI / 2) * (radius - margin) + radius,
      usedWith: new Set<number>(),
    })
  }

  return pins
}//,[numPins, CONFIG.radius, CONFIG.margin])


export function precomputeLines (
  pinVector: pin[],
  imageSize: number,
  radius: number,
): Map<string, point[]> {
  const map = new Map<string, point[]>()
  
  for (let i = 0; i < pinVector.length; i++) {
    for (let j = i + 1; j < pinVector.length; j++) {
      const key = getLineKey(i, j)

      // Bresenham ALGORITHM
      const { x1, y1, x2, y2, dx, dy, sx, sy } = getVariableForPixelSearch(
        pinVector[i].x, pinVector[i].y,
        pinVector[j].x, pinVector[j].y,
        imageSize, radius * 2
      )

      const actual: point = { x: x1, y: y1 }
      let err = dx - dy
      const line: point[] = []

      do {
        if (actual.x >= 0 && actual.x < imageSize && actual.y >= 0 && actual.y < imageSize) {
          line.push({ x: actual.x, y: actual.y })
        }

        const e2 = err * 2
        if (e2 > -dy) {
          err -= dy
          actual.x += sx
        }
        if (e2 < dx) {
          err += dx
          actual.y += sy
        }
      } while (actual.x !== x2 || actual.y !== y2)

      map.set(key, line)
    }
  }

  return map
}



function getVariableForPixelSearch(pinx1: number, piny1: number, pinx2: number, piny2: number, imageSize: number, canvasSize: number){
  const {x: x1, y: y1} = {x: Math.floor(pinx1*imageSize/canvasSize), y: Math.floor(piny1*imageSize/canvasSize)}
  const {x: x2, y: y2} = {x: Math.floor(pinx2*imageSize/canvasSize), y: Math.floor(piny2*imageSize/canvasSize)}
  
  // Calculate differences
  let dx = Math.abs(x2 - x1)
  let dy = Math.abs(y2 - y1)
  // Determine directions
  let sx = (x1 < x2) ? 1 : -1
  let sy = (y1 < y2) ? 1 : -1

  return {x1, y1, x2, y2, dx, dy, sx, sy}
}
