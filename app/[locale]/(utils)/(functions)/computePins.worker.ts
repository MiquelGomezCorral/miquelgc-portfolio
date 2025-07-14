
import { getLineKey } from '@/app/[locale]/(utils)/(functions)/functionUtils';

// =========================================================================
//                              PINS POINT TYPE
// =========================================================================
export type point = {
  x: number,
  y: number,
}
export type line = {
  xs: Uint16Array,
  ys: Uint16Array,
}
// export type pixel = {
//   x:number,
//   y:number,
//   w:number
// }
// export type pixel = {
//   xs: Uint16Array;
//   ys: Uint16Array;
//   ws: Float32Array;
// };


export type pin = point & {
  usedWith: Set<number>,
}
// e.g. linear fade from 0→0.75 at d=[0.5…1.5]
// const basicWeightFn = (d: number, lineWidth: number) => {
//   if (d < 0.5)         return lineWidth / 100 // 0.25
//   if (d < 1.5)         return lineWidth / 100 * (1.5 - d)   // linearly down to 0
//   return 0
// }

// =========================================================================
//                              PINS Sync
// =========================================================================

// type WorkerRequest = {
//   numPins: number
//   imageSize: number
//   radius: number
//   margin: number,
//   lineWidth: number
// }
// type WorkerResponse = {
//   pins: pin[]
//   lines: Map<string, pixel[]>
// }
// self.onmessage = (event: MessageEvent<WorkerRequest>) => {
//   const { numPins, imageSize, radius, margin, lineWidth} = event.data
  
//   const pins = computePins(numPins, radius, margin);
//   const lines = precomputeLines(pins, imageSize, radius, lineWidth, 1.5)
//   postMessage({ pins, lines })
// };
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



// export function precomputeLines(
//   pinVector: pin[],
//   imageSize: number,
//   radius: number,
//   lineWidth: number,
//   maxDist: number = 1.5,
// ): Map<string, pixel> {
//   const map = new Map<string, pixel>();

//   for (let i = 0; i < pinVector.length; i++) {
//     for (let j = i + 1; j < pinVector.length; j++) {
//       const key = getLineKey(i, j);

//       // 1) Bresenham to get 1-pixel path
//       const { x1, y1, x2, y2, dx, dy, sx, sy } = getVariableForPixelSearch(
//         pinVector[i].x,
//         pinVector[i].y,
//         pinVector[j].x,
//         pinVector[j].y,
//         imageSize,
//         radius * 2,
//       );
//       const bresList: { x: number; y: number }[] = [];
//       let x = x1, y = y1;
//       let err = dx - dy;
//       do {
//         bresList.push({ x, y });
//         const e2 = err * 2;
//         if (e2 > -dy) { err -= dy; x += sx; }
//         if (e2 < dx)  { err += dx; y += sy; }
//       } while (x !== x2 || y !== y2);

//       // 2) Prepare neighbor scan
//       const R = Math.ceil(maxDist);
//       const A = y2 - y1, B = x1 - x2, C = x2 * y1 - x1 * y2;
//       const invNorm = 1 / Math.hypot(A, B);

//       const xArr: number[] = [];
//       const yArr: number[] = [];
//       const wArr: number[] = [];

//       for (const { x: x0, y: y0 } of bresList) {
//         for (let dyOff = -R; dyOff <= R; dyOff++) {
//           const yy = y0 + dyOff;
//           if (yy < 0 || yy >= imageSize) continue;
//           for (let dxOff = -R; dxOff <= R; dxOff++) {
//             const xx = x0 + dxOff;
//             if (xx < 0 || xx >= imageSize) continue;

//             const d = Math.abs(A * xx + B * yy + C) * invNorm;
//             if (d <= maxDist) {
//               const w = basicWeightFn(d, lineWidth);
//               if (w > 0) {
//                 xArr.push(xx);
//                 yArr.push(yy);
//                 wArr.push(w);
//               }
//             }
//           }
//         }
//       }

//       // 3) Convert to typed arrays
//       const xs = Uint16Array.from(xArr);
//       const ys = Uint16Array.from(yArr);
//       const ws = Float32Array.from(wArr);

//       map.set(key, { xs, ys, ws });
//     }
//   }

//   return map;
// }


export function precomputeLines (
  pinVector: pin[],
  imageSize: number,
  radius: number,
): Map<string, line> {
  const map = new Map<string, line>()
  
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
      const xArr: number[] = []
      const yArr: number[] = []

      do {
        if (actual.x >= 0 && actual.x < imageSize && actual.y >= 0 && actual.y < imageSize) {
          xArr.push(actual.x)
          yArr.push(actual.y)
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

      const xs = Uint16Array.from(xArr)
      const ys = Uint16Array.from(yArr)
      map.set(key, {xs, ys})
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

// =========================================================================
//                   STRING ART  ALGORITHM EXTERNAL FUNCTIONS
// =========================================================================
export function computeLineError ( 
  computedErrorMatrix: number[][],  pin1Idx: number,  pin2Idx: number,  precomputedLines: Map<string, line>
): number {
  const key = getLineKey(pin1Idx, pin2Idx)
  const line = precomputedLines.get(key)
  if (!line) return Infinity // Fall back just in case
  let error = 0

  const { xs, ys } = line 
  for (let i = 0; i < xs.length; i++){
    try {
      error += computedErrorMatrix[ys[i]][xs[i]] //* w[i]
    } catch (err) {
      console.error(`Access error at x=${xs[i]}, y=${ys[i]}`)
    }
  }

  return error
}

export function updateComputeImageMatrix(prevErrorMatrix:number[][], pin1Idx: number, pin2Idx: number, lineWidth: number, precomputedLines: Map<string, line>) {
  const newMatrix = prevErrorMatrix.map(row => [...row])
  const key = getLineKey(pin1Idx, pin2Idx)
  const line = precomputedLines.get(key)

  if (!line) return newMatrix // fallback if no precomputed line
  
  const { xs, ys } = line 
  for (let i = 0; i < xs.length; i++){
    newMatrix[ys[i]][xs[i]] = Math.max(newMatrix[ys[i]][xs[i]] - 255 * lineWidth / 100, 0)
  }

  return newMatrix
}


export function computeError ( 
  computedErrorMatrix: number[][]
): number {
  let error = 0
  for (let row of computedErrorMatrix){
    for (let value of row){
      error += value
    }
  }

  return error
}

// export function updateComputeImageMatrix(prevErrorMatrix:number[][], pin1Idx: number, pin2Idx: number, lineWidth: number, precomputedLines: Map<string, pixel>) {
//   const newMatrix = prevErrorMatrix.map(row => [...row])
//   const key = getLineKey(pin1Idx, pin2Idx)
//   const line = precomputedLines.get(key)

//   if (!line) return newMatrix // fallback if no precomputed line

//   const { xs, ys, ws } = line 
//   for (let i = 0; i < xs.length; i++){
//       newMatrix[ys[i]][xs[i]] = Math.max(
//       newMatrix[ys[i]][xs[i]] - (255 * ws[i] * ( lineWidth / 100)),
//       0
//     )
//   }

//   return newMatrix
// }

// =========================================================================
//                              IMAGE FUNCTIONS
// =========================================================================
export async function getCroppedImg(
  imageSrc: string, 
  pixelCrop: { x: number; y: number; width: number; height: number }, 
  imageConstrast: number
) {
  const image = new Image()
  image.src = imageSrc
  await new Promise((resolve) => (image.onload = resolve))

  const canvas = document.createElement("canvas")
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext("2d")!

  // ========= Black and white =========
  ctx.filter = `grayscale(100%) contrast(${imageConstrast}%)`
  // ========= Draw image =========
  ctx.drawImage(
    image,
    pixelCrop.x, pixelCrop.y,
    pixelCrop.width, pixelCrop.height,
    0, 0,
    pixelCrop.width, pixelCrop.height
  );

  // ========= Get image matrix =========
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const matrix: number[][] = [];

  for (let y = 0; y < canvas.height; y++) {
    const row: number[] = [];
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      // With grayscale, R, G, and B are equal; use the red channel
      row.push(data[index])
    }
    matrix.push(row);
  }

  // ========= Create a new matrix for error with the same dimensions =========
  const errorMatrix: number[][] = matrix.map(row => 
    row.map(value => {
      return 255 - value; 
    })
  );


  return {image: canvas.toDataURL("image/webp"), errorMatrix};
}
