"use client"

import cn from "classnames"
import NextImage from "next/image";
import Cropper from 'react-easy-crop';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from "react";

import { Icon } from '@/app/[locale]/(utils)/(components)/Icons';
import { Button, Input } from '@/app/[locale]/(utils)/(components)/Buttons';

import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";

type point = {
  x: number,
  y: number,
}
type pin = point & {
  usedWith: Set<number>,
}


export function StringArtComponent(){
  const {t} = useTranslation("projects")

  // ================================ IMAGE ================================
  const [selectedImage, setSelectedImage] = useState(CONFIG.defaultImage); 
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [creatingImage, setCreatingImage] = useState(false);
  const [croppingCompleted, setCroppingCompleted] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [imageSize, setImazeSize] = useState<number  | undefined>(CONFIG.imageSize)

  // ================================ MATRIX ================================
  const [errorMatrix, setErrorMatrix] = useState<number[][]>([[]])
  const [inUseErrorMatrix, setInUseErrorMatrix] = useState<number[][]>([[]])

  // ================================ CONFIG ================================
  const [lineWidth, setLineWidth] = useState(CONFIG.lineWidth)
  const [numPins, setNumPins] = useState(CONFIG.numPins)
  const [pinVector, setPinVector] = useState<pin[]>([])
  const [maxLines, setMaxLines] = useState(CONFIG.maxLines)

  // ================================ LINES ================================
  const [linesVector, setLinesVector] = useState<number[]>([CONFIG.firstPin]) 

  // ================================ TIME ================================
  const [initialTime, setInitialTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [stimatedTime, setStimatedTime] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // ================================ PINS ================================
  const precomputedLinesRef = useRef<Map<string, point[]>>(new Map())
  const neighbourtPinMargin = Math.ceil(CONFIG.neighbourtMaring)

  useEffect(() => {
    // GET PIN
    //    degrees between pins
    const d = (360 / numPins) * (Math.PI / 180) // convert to radians
    const pins: pin[] = []
    for(let i = 0; i < numPins; i++){
      pins.push({ //  - Math.PI / 2 -> rotate by 90 | Margin with the canvas
        x: Math.cos(d*i - Math.PI / 2) * (CONFIG.radius - CONFIG.margin) + CONFIG.radius, 
        y: Math.sin(d*i - Math.PI / 2) * (CONFIG.radius - CONFIG.margin) + CONFIG.radius,
        usedWith: new Set<number>(),
      })
    }

    // update state
    setPinVector(pins)

  },[numPins, CONFIG.radius, CONFIG.margin])

  useEffect(() => {
    if (!imageSize || pinVector.length < numPins)
      return
    // Precompute lines immediately after
    // NOTE: precomputeLinePoints needs PinVector synchronously,
    // so call it here with pins, not PinVector (which updates async)
    precomputedLinesRef.current = precomputeLinePoints(pinVector, imageSize, CONFIG.radius)
  }, [imageSize])

  // ================================ MANAGE CREATING IMAGE ================================
  useEffect(() => {
    return () => {
      setCreatingImage((prevCreatingImage)=>{
        if (intervalRef.current && !prevCreatingImage) 
          clearInterval(intervalRef.current);
        
        return prevCreatingImage
      })
    };
  }, [creatingImage]);


  // ================================ IMAGE UPDATE ================================
  const handleImageUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    fileUploadRef.current?.click()
  }

  const uploadIMageDisplay = () => {
    if (!(fileUploadRef.current && fileUploadRef.current.files)) return // No selected file

    const uploadedFile = fileUploadRef.current.files[0];
    const cacheURL = URL.createObjectURL(uploadedFile)
    setSelectedImage(cacheURL)
    setCroppingCompleted(false)  
    setCreatingImage(false)
  }

  const handleCropImage = async () => {
    if (croppedAreaPixels) {
      const {image, errorMatrix} = await getCroppedImg(selectedImage, croppedAreaPixels);
      setSelectedImage(image)
      setCroppingCompleted(true)
      setErrorMatrix(errorMatrix)    
      setInUseErrorMatrix(errorMatrix)    

      console.log(`errorMatrix.length ${errorMatrix.length}`);
        
      setImazeSize(errorMatrix.length)
      setLinesVector([CONFIG.firstPin])
    }
  }


  // ================================ ALGORITH ================================
  const startAlgorithm = (reset: boolean) => {
    // ============= INTITIAL VARIABLES =============
    // Handle already initialized values if the run has been stoped
    let newLinesVector = linesVector
    let t1 = initialTime
    let computedErrorMatrix = inUseErrorMatrix
    if(reset){
      newLinesVector = [CONFIG.firstPin]
      t1 = performance.now()
      computedErrorMatrix = errorMatrix.map((row) => [...row]);
    }

    setLinesVector(newLinesVector) 
    setInitialTime(t1)
    setInUseErrorMatrix(computedErrorMatrix)
    
    // ========================== EXECUTION ==========================
    intervalRef.current = setInterval(() => {
      // FINISH CHECK 
      if (newLinesVector.length >= maxLines && intervalRef.current) {
        clearInterval(intervalRef.current)
        return
      }

      // ============= LOOK FOR NEXT PIN =============
      const prevPin = newLinesVector[newLinesVector.length - 1]
      const last10 = newLinesVector.slice(-CONFIG.lastNUsedPinsMargin)
      
      let nextPin = Math.floor(Math.random() * numPins)
      let highestScore = computeError(computedErrorMatrix, prevPin, nextPin, precomputedLinesRef.current)

      for (let i = 0; i < numPins; i++) {
        // Initial check for valid pints
        // If closer than margin or if in the last n used pass
        const up = (i + neighbourtPinMargin) % numPins
        const down = (i - neighbourtPinMargin + numPins) % numPins
        if (
          (prevPin <= up && prevPin >= down) ||
          pinVector[prevPin].usedWith.has(i) ||
          last10.includes(i)
        ) continue

        // Compute and compare score for the candidate 
        const score = computeError(computedErrorMatrix, prevPin, i, precomputedLinesRef.current)
        
        if (score > highestScore) {
          highestScore = score
          nextPin = i
        }
      }

      // ============= UPDATE MATRIX WITH THE PIN =============
      // Recopute error matrix
      computedErrorMatrix = updateComputeImageMatrix(computedErrorMatrix, prevPin, nextPin, precomputedLinesRef.current)
      pinVector[prevPin].usedWith.add(nextPin)
      pinVector[nextPin].usedWith.add(prevPin)

      // New vector
      newLinesVector = [...newLinesVector, nextPin]
      setLinesVector(newLinesVector)

      // Update count and update stimation
      if (newLinesVector.length % CONFIG.updateEveryNPins === 0) {
        const timePased = Number(((performance.now() - t1) / 1000).toFixed(2))
        setTotalTime(timePased)
        setStimatedTime(((timePased / (newLinesVector.length + 1)) * (maxLines - newLinesVector.length - 1)))
      }
    }, 0)
  }


  const precomputeLinePoints = (
    pinVector: pin[],
    imageSize: number,
    radius: number,
  ): Map<string, point[]> => {
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

  const updateComputeImageMatrix = (prevErrorMatrix:number[][], pin1Idx: number, pin2Idx: number, precomputedLines: Map<string, point[]>) => {

    const newMatrix = prevErrorMatrix.map(row => [...row])
    const key = getLineKey(pin1Idx, pin2Idx)
    const line = precomputedLines.get(key)

    if (!line) return newMatrix // fallback if no precomputed line

    for (const { x, y } of line) {
      newMatrix[y][x] = Math.max(newMatrix[y][x] - 255 * lineWidth, 0)
    }

    return newMatrix
  }


  // ================================ CANVAS MANAGEMENT ================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pinVector.length || !linesVector.length) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#000";

    // Draw shape
    ctx.beginPath();
    for (let i = 1; i < linesVector.length; i++) {
      const from = pinVector[linesVector[i - 1]];
      const to = pinVector[linesVector[i]];
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
    }
    ctx.stroke();
  }, [pinVector, linesVector, lineWidth]);

  
  // ================================ COMPONENT ================================
  return(
    <section className='w-full flex gap-4 flex-col items-center'>
      <div className='flex flex-col items-center gap-2'>
        <header className={cn("flex w-full flex-col font-mono", {"opacity-0": !creatingImage})}>
          <span className="flex w-full justify-between"> 
            <p>{linesVector.length}/{maxLines}</p>
            <p>{((linesVector.length * 100) / maxLines).toFixed(2)}% </p>
          </span>
          <span className="flex w-full justify-between">
            <p>Total time: {secondsToTime(totalTime)}</p>
            <p>Stimated time:  {secondsToTime(stimatedTime)}</p>
          </span>
        </header>
        <figure 
          className="relative flex justify-center aspect-square rounded-full"
          style={{ width: `${CONFIG.radius * 2}px`, minWidth: `${CONFIG.radius}px` }}
        >
          {!croppingCompleted ? 
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedArea) => setCroppedAreaPixels(croppedArea)}
            />
            : ((!creatingImage && !intervalRef.current) ?
            <NextImage
              src={selectedImage}
              fill
              alt={selectedImage}
              className='rounded-full'
            />
            :
            <canvas
              ref={canvasRef}
              width={CONFIG.radius * 2}
              height={CONFIG.radius * 2}
              className="bg-miquel-white-200 rounded-full"
            />
            )
          }
        </figure>
              
      </div>

      <nav className='flex items-center gap-4 w-full'>
        <aside className="w-full flex gap-4">
          <Button
            disabled={croppingCompleted}
            onClick={handleCropImage}
          > 
            <Icon 
              src={"crop"}
              height={20}
              width={20}
              title={"crop"}
            />
            {t("string.crop")}
          </Button>

          <Button
            disabled={!croppingCompleted}
            onClick={()=>{
              if(intervalRef.current)
                clearInterval(intervalRef.current)
              // if stoped and then continued, aboid reseting always
              startAlgorithm(linesVector.length <= 1) 
              setCreatingImage(!creatingImage)
              if (linesVector.length <= 1)
                setLinesVector([CONFIG.firstPin])
            }}
          > 
            <Icon 
              src={"star"}
              height={20}
              width={20}
              title={"star"}
            />
            {creatingImage ? t("string.stop") : (linesVector.length <= 1) ? t("string.start") : t("string.continue")}
          </Button>
          <Button
            disabled={!croppingCompleted || linesVector.length <= 1}
            onClick={()=>{
              if(intervalRef.current)
                clearInterval(intervalRef.current)
              setLinesVector([CONFIG.firstPin]) 
              setInitialTime(0)
              setCreatingImage(false)
            }}
          > 
            <Icon 
              src={"delete"}
              height={20}
              width={20}
              title={"delete"}
            />
            {t("string.restart")}
          </Button>
        </aside>


        <form id='form' encType='multipart/form-data' action="" className="w-full flex justify-between">
          <aside className="flex gap-4">
            <Button type='submit' className='text-nowrap '
              onClick={handleImageUpload}
              disabled={creatingImage}
            >
              <Icon 
                src={"upload"}
                height={20}
                width={20}
                title={"upload"}
              />
              {t("string.upload")}
            </Button>
            <input type='file' id='file' 
              ref={fileUploadRef} 
              className='hidden'
              onChange={uploadIMageDisplay}
            />
          </aside>
          <aside className="flex gap-4">
            <Input type="text" className="w-20" value={numPins} onChange={(e)=>{e.preventDefault(); setNumPins(e.target.value)}} disabled={creatingImage || (linesVector.length > 1)}/>
            <Input type="text" className="w-20" value={maxLines} onChange={(e)=>{e.preventDefault(); setMaxLines(e.target.value)}} disabled={creatingImage || (linesVector.length > 1)}/>
            <Input type="text" className="w-20" value={lineWidth} onChange={(e)=>{e.preventDefault(); setLineWidth(e.target.value)}} disabled={creatingImage || (linesVector.length > 1)}/>
          </aside>

        </form>
      </nav>

    </section>
  )
}

// =========================================================================
//                        ALGORITHM EXTERNAL FUNCTIONS
// =========================================================================


function getLineKey (a: number, b: number) {
 return a < b ? `${a}-${b}` : `${b}-${a}` // consistent key regardless of order
}

function computeError ( 
  computedErrorMatrix: number[][],  pin1Idx: number,  pin2Idx: number,  precomputedLines: Map<string, point[]>
): number {
  const key = getLineKey(pin1Idx, pin2Idx)
  const line = precomputedLines.get(key)
  if (!line) return Infinity // Fall back just in case
  let error = 0
  for (const { x, y } of line) {
    try {
      error += computedErrorMatrix[y][x]
    } catch (err) {
      console.error(`Access error at x=${x}, y=${y}`)
      // console.error(err)
    }
  }

  return error
}


// =========================================================================
//                              IMAGE FUNCTIONS
// =========================================================================

async function getCroppedImg(imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }) {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    pixelCrop.x, pixelCrop.y,
    pixelCrop.width, pixelCrop.height,
    0, 0,
    pixelCrop.width, pixelCrop.height
  );

  // ========= Black and white =========
  ctx.filter = `grayscale(100%) contrast(${CONFIG.imageConstrast}%)`;
  ctx.drawImage(canvas, 0, 0);

  // ========= Get image matrix =========
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const matrix: number[][] = [];

  for (let y = 0; y < canvas.height; y++) {
    const row: number[] = [];
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      // With grayscale, R, G, and B are equal; use the red channel
      row.push(data[index]);
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
//                              UTIL FUNCTIONS
// =========================================================================

function secondsToTime(sec: number): string{
  const minutes = Math.floor(sec/60)
  const seconds = Math.floor(sec%60)
  
  // Pad minutes and seconds with leading zeros
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}min ${formattedSeconds}sec`;
}