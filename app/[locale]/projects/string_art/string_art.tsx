"use client"

import cn from "classnames"
import Cropper from 'react-easy-crop';
import { useState, useRef, useEffect } from "react";
import NextImage from "next/image";
import { Icon } from '@/app/[locale]/(utils)/(components)/Icons';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@/app/[locale]/(utils)/(components)/FormComponents';


type point = {
  x: number,
  y: number,
}
type nail = point & {
  usedWith: Set<number>,
}


export function StringArtComponent(){
  const {t} = useTranslation("projects")

  // const [selectedImage, setSelectedImage] = useState("/assets/projects/Robot.webp");
  const [selectedImage, setSelectedImage] = useState("/assets/projects/Einstein.webp");
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [updateImage, setUpdateImage] = useState(false);

  const [creatingImage, setCreatingImage] = useState(false);
  const [croppingCompleted, setCroppingCompleted] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [imageSize, setImazeSize] = useState(1900)

  const [errorMatrix, setErrorMatrix] = useState<number[][]>([[]])
  const [inUseErrorMatrix, setInUseErrorMatrix] = useState<number[][]>([[]])
  const [lineWidth, setLineWidth] = useState(0.20)
  const [numPins, setNumPins] = useState(288)
  const [nailVector, setNailVector] = useState<nail[]>([])
  const [maxLines, setMaxLines] = useState(3500) 
  const [linesDrawn, setLinesDrawn] = useState(0) 
  const [linesVector, setLinesVector] = useState<number[]>([0]) //Math.floor(Math.random() * numPins)
  const [initialTime, setInitialTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [stimatedTime, setStimatedTime] = useState(0)
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ================================ NAILS ================================
  const precomputedLinesRef = useRef<Map<string, point[]>>(new Map())
  const margin = 10
  const radius = 350 
  const neighbourtNailMargin = Math.ceil(numPins*0.035)
  useEffect(() => {
    // GET NAILS
    const d = (360 / numPins) * (Math.PI / 180) // convert to radians
    const pins: nail[] = []
    for(let i = 0; i < numPins; i++){
      pins.push({
        x: Math.cos(d*i) * (radius - margin) + radius,
        y: Math.sin(d*i) * (radius - margin) + radius,
        usedWith: new Set<number>(),
      })
    }

    // update state
    setNailVector(pins)
    

    // Precompute lines immediately after
    // NOTE: precomputeLinePoints needs nailVector synchronously,
    // so call it here with pins, not nailVector (which updates async)
    precomputedLinesRef.current = precomputeLinePoints(pins, imageSize, radius, numPins)
  },[numPins, radius, margin])

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

      setImazeSize(errorMatrix.length)
      setLinesDrawn(0)     
    }
  }


  // ================================ ALGORITH ================================
  const createImage = (reset: boolean) => {
    let newLinesVector = linesVector
    let t1 = initialTime
    let count = linesDrawn
    let computedErrorMatrix = inUseErrorMatrix
    if(reset){
      newLinesVector = [Math.floor(Math.random() * numPins)]
      t1 = performance.now()
      count = 0
      computedErrorMatrix = errorMatrix.map((row) => [...row]);
    }

    setLinesVector(newLinesVector) 
    setInitialTime(t1)
    setInUseErrorMatrix(computedErrorMatrix)

    intervalRef.current = setInterval(() =>{
      if (count >= maxLines - 1 && intervalRef.current){
        clearInterval(intervalRef.current)
      }
      // CHOOSE NEXT NAIL
      setLinesVector((prevPinsVector) => {
        const prevNail = prevPinsVector[prevPinsVector.length-1]
        let nextNail = Math.floor(Math.random() * numPins)
        let highestScore = computeError(computedErrorMatrix, prevNail, nextNail, precomputedLinesRef.current)
        const last10 = prevPinsVector.slice(-10)
        
        for(let i = 0; i < numPins; i++){
          // MAKE THAT ONLY TAKES INTO ACOUNT LINE FURHTER THAN 10 POSTIONS %
          const up = (i + neighbourtNailMargin) % numPins
          const down = (i - neighbourtNailMargin + numPins) % numPins
          if ((prevNail <= up && prevNail >= down) || nailVector[prevNail].usedWith.has(i) || last10.includes(i)) 
            continue //Avoid using pins close to the acutal

          const auxScore = computeError(computedErrorMatrix, prevNail, i, precomputedLinesRef.current)

          if(highestScore < auxScore){
            highestScore = auxScore
            nextNail = i
          }
        }

        // UPDATE DRAWN MATRIX
        computedErrorMatrix = updateComputeImageMatrix(computedErrorMatrix, prevNail, nextNail, precomputedLinesRef.current)
        nailVector[prevNail].usedWith.add(nextNail)
        nailVector[nextNail].usedWith.add(prevNail)

        return [...prevPinsVector, nextNail]
      })
      
      // UPDATE VALUES
      setLinesDrawn((prevLinesDrawn) => prevLinesDrawn + 1)
      if(count % 20 == 0) {
        const computedTime = Math.round((performance.now() - t1)/100)/10
        setTotalTime(computedTime) // 2 digits precision
        setStimatedTime(((computedTime / count) * (maxLines - count)))
      }
      count++;
      // setErrorMatrix(computedErrorMatrix)
    }, 0);
  }


  const precomputeLinePoints = (
    nailVector: nail[],
    imageSize: number,
    radius: number,
    numPins: number
  ): Map<string, point[]> => {
    const map = new Map<string, point[]>()

    for (let i = 0; i < numPins; i++) {
      for (let j = 0; j < numPins; j++) {
        if (i === j) continue
        const key = getLineKey(i, j)

        const { x1, y1, x2, y2, dx, dy, sx, sy } = getVariableForPixelSearch(
          nailVector[i].x, nailVector[i].y,
          nailVector[j].x, nailVector[j].y,
          imageSize, radius * 2
        )

        const actual: point = { x: x1, y: y1 }
        let err = dx - dy
        const line: point[] = []

        do {
          line.push({ x: actual.x, y: actual.y })
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

  const updateComputeImageMatrix = (prevErrorMatrix:number[][], nail1Idx: number, nail2Idx: number, precomputedLines: Map<string, point[]>) => {

    const newMatrix = prevErrorMatrix.map(row => [...row])
    const key = getLineKey(nail1Idx, nail2Idx)
    const line = precomputedLines.get(key)

    if (!line) return newMatrix // fallback if no precomputed line

    for (const { x, y } of line) {
      newMatrix[y][x] = Math.max(newMatrix[y][x] - 255 * lineWidth, 0)
    }

    return newMatrix
  }

  return(
    <section className='w-full flex gap-4 flex-col items-center'>
      <div className='flex flex-col items-center gap-2'>
        <header className={cn("flex w-full flex-col font-mono", {"opacity-0": !creatingImage})}>
          <span className="flex w-full justify-between"> 
            <p>{linesDrawn}/{maxLines} </p>
            <p>{((linesDrawn * 100) / maxLines).toFixed(2)}% </p>
          </span>
          <span className="flex w-full justify-between">
            <p>Total time: {secondsToTime(totalTime)}</p>
            <p>Stimated time:  {secondsToTime(stimatedTime)}</p>
          </span>
        </header>
        <figure className='relative flex justify-center w-[700px] lg:min-w-[300px] aspect-square rounded-full'>
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
            <svg width={(radius)*2} height={(radius)*2} className="bg-white/80">
              {nailVector.map((nail, idx) => (
                <circle key={idx} cx={nail.x} cy={nail.y} r={1.5} fill="#000" />
              ))}
              {linesVector.slice(1).map((nextNail, idx) => (
                <line key={idx} stroke="black" strokeWidth={lineWidth}
                  x1={nailVector[linesVector[idx]].x} 
                  y1={nailVector[linesVector[idx]].y} 
                  x2={nailVector[nextNail].x} 
                  y2={nailVector[nextNail].y} 
                />
              ))}
            </svg>
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

              createImage(linesVector.length <= 1)

              setCreatingImage(!creatingImage)
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
              setLinesVector([]) 
              setInitialTime(0)
              setLinesDrawn(0)
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
  computedErrorMatrix: number[][],  nail1Idx: number,  nail2Idx: number,  precomputedLines: Map<string, point[]>
): number {
  const key = getLineKey(nail1Idx, nail2Idx)
  const line = precomputedLines.get(key)
  if (!line) return Infinity

  let error = 0
  for (const { x, y } of line) {
    error += computedErrorMatrix[y][x]
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

  // Black and white
  ctx.filter = "grayscale(100%)";
  ctx.drawImage(canvas, 0, 0);

  //Get image matrix
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

    // Create a new matrix with the same dimensions
  const errorMatrix: number[][] = matrix.map(row => 
    row.map(value => {
      return 255 - value; 
    })
  );


  return {image: canvas.toDataURL("image/webp"), errorMatrix};
}


function getVariableForPixelSearch(nailx1: number, naily1: number, nailx2: number, naily2: number, imageSize: number, canvasSize: number){
  const {x: x1, y: y1} = {x: Math.floor(nailx1*imageSize/canvasSize), y: Math.floor(naily1*imageSize/canvasSize)}
  const {x: x2, y: y2} = {x: Math.floor(nailx2*imageSize/canvasSize), y: Math.floor(naily2*imageSize/canvasSize)}
  
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