"use client"

import cn from "classnames"
import NextImage from "next/image";
import { ShakeHard } from 'reshake'
import Cropper from 'react-easy-crop';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from "react";

import { Icon, IconCopy } from '@/app/[locale]/(utils)/(components)/Icons';
import { Button, Input, ButtonModal } from '@/app/[locale]/(utils)/(components)/Buttons';
import { Loader } from '@/app/[locale]/(utils)/(components)/Loader';

import { secondsToTime, getLineKey, checkLimits } from '@/app/[locale]/(utils)/(functions)/functionUtils';
import { pin, point, computePins, precomputeLines } from '@/app/[locale]/(utils)/(functions)/computePins.worker';

import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";



export function StringArtComponent(){
  const {t} = useTranslation("projects")

  // ================================ IMAGE ================================
  const [selectedImage, setSelectedImage] = useState(CONFIG.defaultImage); 
  const [modifiedImage, setModifiedImage] = useState(CONFIG.defaultImage); 
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [creatingImage, setCreatingImage] = useState(false);
  const [croppingCompleted, setCroppingCompleted] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [imageSize, setImazeSize] = useState<number>(CONFIG.imageSize)

  // ================================ MATRIX ================================
  const [errorMatrix, setErrorMatrix] = useState<number[][]>([[]])
  const [inUseErrorMatrix, setInUseErrorMatrix] = useState<number[][]>([[]])

  // ================================ LINES CONFIG ================================
  const [imageContrast, setImageContrast] = useState(CONFIG.imageConstrast)
  const [lineWidth, setLineWidth] = useState(CONFIG.lineWidth)
  const [maxLines, setMaxLines] = useState(CONFIG.maxLines)
  const [numPins, setNumPins] = useState(CONFIG.numPins)

  const [pinVector, setPinVector] = useState<pin[]>([])
  const [linesVector, setLinesVector] = useState<number[]>([CONFIG.firstPin]) 

  // ================================ TIME ================================

  const [loading, setLoading] = useState(false);
  const [initialTime, setInitialTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [stimatedTime, setStimatedTime] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // ================================ PINS ================================
  const neighbourtPinMargin = Math.ceil(CONFIG.neighbourtMaring)
  const precomputedLinesRef = useRef<Map<string, point[]>>(new Map())

 

  // ================================ MANAGE CREATING IMAGE ================================
  useEffect(() => { // checks whether or not the algorith is running, and if nore removes the interval
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

  const uploadIMageDisplay = (input?: File | React.ChangeEvent<HTMLInputElement>) => {
    let file: File | undefined

    if (input instanceof File) {
      file = input
    } else if (input?.target?.files?.[0]) {
      file = input.target.files[0]
    }

    if (!file) return
      if (!(fileUploadRef.current && fileUploadRef.current.files)) return // No selected file

      const cacheURL = URL.createObjectURL(file)
      setSelectedImage(cacheURL)
      setCroppingCompleted(false)  
      setCreatingImage(false)
    }

  const handleCropImage = async (cropping: boolean = true) => {
    if (!croppedAreaPixels)
      return

    if (!croppingCompleted || !cropping) {
      const {image, errorMatrix} = await getCroppedImg(selectedImage, croppedAreaPixels, imageContrast);
      setModifiedImage(image)
      setErrorMatrix(errorMatrix)    
      setInUseErrorMatrix(errorMatrix)    
      
      setImazeSize(errorMatrix.length)
      setLinesVector([CONFIG.firstPin])
    }
    if (cropping){
      setCroppingCompleted(!croppingCompleted)
    }
  }

  useEffect(() => { // Contrast debounce to update de image.
    const timeout = setTimeout(() => {
      handleCropImage(false)
    }, CONFIG.debounceTime) // ms debounce

    return () => clearTimeout(timeout)
  }, [imageContrast])


  // ================ DRAG & DROP ================

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const file = e.clipboardData?.files?.[0]
      if (file && file.type.startsWith('image/')) {
        uploadIMageDisplay(file)
      }
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer?.files?.[0]
      if (file && file.type.startsWith('image/')) {
        uploadIMageDisplay(file)
      }
    }

    const prevent = (e: DragEvent) => e.preventDefault()

    window.addEventListener('paste', handlePaste)
    window.addEventListener('drop', handleDrop)
    window.addEventListener('dragover', prevent)

    return () => {
      window.removeEventListener('paste', handlePaste)
      window.removeEventListener('drop', handleDrop)
      window.removeEventListener('dragover', prevent)
    }
  }, [])

  // ================================ ALGORITH ================================
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('@/app/[locale]/(utils)/(functions)/computePins.worker', import.meta.url),
      { type: 'module' }
    );
    return () => workerRef.current?.terminate();
  }, []);

  const startAlgorithm = async (reset: boolean) => {
    // ================== VALUE AND CHECKS ==================
    // Handle already initialized values if the run has been stoped
    const fakeFormEvent = { preventDefault: () => {} } as React.ChangeEvent<HTMLInputElement>
    const newErrors = onChangeFormValues(fakeFormEvent)
    if (Object.values(newErrors).some(e => e)) // At least one is truthy
    return
    
    // ================== GENERAL VARIABLES ==================
    if(intervalRef.current)
      clearInterval(intervalRef.current)
    
    // if stoped and then continued, aboid reseting always
    if (linesVector.length <= 1)
      setLinesVector([CONFIG.firstPin])
    setCreatingImage(!creatingImage)
    
    // ============= INTITIAL VARIABLES =============
    let newLinesVector = linesVector
    let t1 = initialTime
    let computedErrorMatrix = inUseErrorMatrix
    let pins = pinVector

    setLoading(true)
    
    if(reset && workerRef.current){
      newLinesVector = [CONFIG.firstPin]
      t1 = performance.now()
      computedErrorMatrix = errorMatrix.map((row) => [...row]);
      
      //→ POST to worker and AWAIT response
      // const { pins: newPins, lines } = await new Promise<{
      //   pins: pin[]
      //   lines: Map<string, point[]>
      // }>(resolve => {
      //   const w = workerRef.current!
      //   w.onmessage = (e: MessageEvent<{
      //     pins: pin[]
      //     lines: Map<string, point[]>
      //   }>) => resolve(e.data)
      //   w.postMessage({numPins,imageSize,radius: CONFIG.radius,margin: CONFIG.margin})
      // })
      const newPins = computePins(numPins, CONFIG.radius, CONFIG.margin);
      // update pins & reconstruct your Map
      pins = newPins
      setPinVector(pins)
      precomputedLinesRef.current = precomputeLines(pins, imageSize, CONFIG.radius)
    }

    setLinesVector(newLinesVector) 
    setInitialTime(t1)
    setInUseErrorMatrix(computedErrorMatrix)

    setLoading(false)
    // ========================== EXECUTION ==========================
    intervalRef.current = setInterval(() => {
      // FINISH CHECK 
      if (newLinesVector.length >= maxLines && intervalRef.current) {
        clearInterval(intervalRef.current)
        setCreatingImage(false)
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
          pins[prevPin].usedWith.has(i) ||
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
      pins[prevPin].usedWith.add(nextPin)
      pins[nextPin].usedWith.add(prevPin)

      // New vector
      newLinesVector = [...newLinesVector, nextPin]
      setLinesVector(newLinesVector)

      // Update count and update stimation
      if (newLinesVector.length % CONFIG.updateEveryNPins === 0) {
        const timePased = Number(((performance.now() - t1) / 1000).toFixed(2))
        setTotalTime(timePased)
        setStimatedTime(((timePased / (newLinesVector.length + 1)) * (maxLines - newLinesVector.length )))
      }
    }, 0)
  }

  const updateComputeImageMatrix = (prevErrorMatrix:number[][], pin1Idx: number, pin2Idx: number, precomputedLines: Map<string, point[]>) => {
    const newMatrix = prevErrorMatrix.map(row => [...row])
    const key = getLineKey(pin1Idx, pin2Idx)
    const line = precomputedLines.get(key)

    if (!line) return newMatrix // fallback if no precomputed line

    for (const { x, y } of line) {
      newMatrix[y][x] = Math.max(newMatrix[y][x] - 255 * lineWidth / 100, 0)
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
    ctx.lineWidth = lineWidth / 100;
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

  

  // ================================ handleSubmit  ================================
  const [errors, setErrors] = useState({ pins: false, lines: false, width: false , contrast: false})
  const [shake, setShake] = useState(false)
  const timeoutShakeRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => { // Contrast debounce to update de image.
    const timeout = setTimeout(() => {
      const fakeFormEvent = { preventDefault: () => {} } as React.ChangeEvent<HTMLInputElement>
      onChangeFormValues(fakeFormEvent)
    }, CONFIG.debounceTime * 5) // ms debounce

    return () => clearTimeout(timeout)
  }, [numPins, maxLines, lineWidth, imageContrast])

  useEffect(() => {
    if (!shake) return
    const timeout = setTimeout(() => setShake(false), CONFIG.shakingTime)
    return () => clearTimeout(timeout)
  }, [shake])

  const onChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()

    // Check email format
    const {value: valuePins,     valid: validPins}     = checkLimits(numPins,       CONFIG.pinLimits)
    const {value: valueLines,    valid: validLines}    = checkLimits(maxLines,      CONFIG.linesLimits)
    const {value: valueWidth,    valid: validWidth}    = checkLimits(lineWidth,     CONFIG.lineWidthLimits)
    const {value: valueContrast, valid: validContrast} = checkLimits(imageContrast, CONFIG.constrastLimits)
    
    const newErrors = {
      pins: !validPins,
      lines: !validLines,
      width: !validWidth,
      contrast: !validContrast,
    };
    setErrors(newErrors);
    // Check last time sent
    setShake(Object.values(newErrors).some(e => e))// At least one is truthy
      

    return newErrors
  }


  // ================================ COMPONENT ================================
  return(
    <section className='w-full flex gap-4 lg:gap-8 flex-col lg:flex-row items-center'>
      AAAAAAAAAAA
      <div className='flex flex-col items-center gap-2 relative'>   
        <figure 
          className="relative flex justify-center items-center aspect-square rounded-full"
          style={{ width: `${CONFIG.radius * 2}px`, minWidth: `${CONFIG.radius}px` }} // variable size following config
        >
          <Loader enable={loading}/>
          {!croppingCompleted ? 
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              zoomSpeed={CONFIG.zoomSmoothFactor} // smoother zoom
              aspect={1} // perfect circle
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedArea) => setCroppedAreaPixels(croppedArea)}
            />
            : ((!creatingImage && linesVector.length <= 1) ?
            <NextImage
              src={modifiedImage}
              alt={modifiedImage}
              width={CONFIG.radius * 2}
              height={CONFIG.radius * 2}
              className="rounded-full object-contain"
              
            />
            :
            <canvas
              ref={canvasRef}
              width={CONFIG.radius * 2}
              height={CONFIG.radius * 2}
              className="bg-miquel-white-200 rounded-full"
            />
          )}
        </figure>
        
        <header className={cn("flex w-full flex-col font-mono ", {"opacity-0": !creatingImage && !(linesVector.length > 1)})}>
          <span className="flex w-full justify-between"> 
            <p>{linesVector.length}/{maxLines}</p>
            <p>{((linesVector.length * 100) / maxLines).toFixed(2)}% </p>
          </span>
          <span className="flex w-full justify-between">
            <p>{t("string.total-time")}: {secondsToTime(totalTime)}</p>
            <p>{t("string.stimated-time")}: {secondsToTime(stimatedTime)}</p>
          </span>
        </header>
      </div>

      <nav className='gap-4 lg:gap-8 w-full grid grid-cols-1 items-center lg:flex lg:flex-col flex-grow'>
        <aside className="w-full grid grid-cols-1 2xl:flex 2xl:flex-row gap-4 ">
          <Button
            text={croppingCompleted ? t("string.crop") : t("string.accept")}
            icon={"crop"}
            className="w-full"
            disabled={creatingImage}
            onClick={handleCropImage}
          /> 

          <Button
            text={creatingImage ? t("string.stop") : (linesVector.length <= 1) ? t("string.start") : t("string.continue")}
            icon={"star"}
            className="w-full"
            disabled={!croppingCompleted || linesVector.length >= maxLines}
            onClick={()=>{
              startAlgorithm(linesVector.length <= 1) 
            }}
          /> 

          <Button
            text={t("string.restart")}
            icon={"delete"}
            className="w-full"
            disabled={!croppingCompleted || linesVector.length <= 1}
            onClick={()=>{
              if(intervalRef.current)
                clearInterval(intervalRef.current)
              setLinesVector([CONFIG.firstPin]) 
              setInitialTime(0)
              setCreatingImage(false)
            }}
          /> 

          <ButtonModal
            text={t("string.trace")}
            icon={"pin"}
            className="w-full"
            disabled={linesVector.length < maxLines}
            onClick={()=>{}}
          > 
            <div className="w-full flex flex-col justify-center items-start gap-2">
              <h2 className="text-xl font-extrabold">{t("string.trace-header")}</h2>
              <IconCopy
                src="copy" title={"Copy trace"}
                width={20} height={20}
                copyText={linesVector.join(", ")}
                text={"Copy trace"}
              />
              <span className='custom-scroll border-[1px] border-miquel-white-100 rounded-lg p-2 w-full max-h-64 overflow-y-scroll font-mono text-xs'>
                {linesVector.join(", ")}
              </span>
            </div>
          </ButtonModal>
        </aside>


        <form id='form' encType='multipart/form-data' action="" noValidate
          className="w-full flex gap-4 lg:gap-8 justify-center flex-col lg:h-full min-h-0"
        >
          {/* Let's asume the drag and drop is only used for the computer version, in the movile one you just select the image */}
          <aside className="flex w-full justify-center lg:hidden">
            <Button type='submit' className='text-nowrap w-full lg:w-fit'
              text={t("string.upload")}
              icon="upload"
              onClick={handleImageUpload}
              disabled={creatingImage}
            />
            <input type='file' id='file' 
              ref={fileUploadRef} 
              className='hidden'
              onChange={uploadIMageDisplay}
            />
          </aside>

          <aside className="w-full lg:h-44 2xl:h-64 justify-center hidden lg:flex ">
            <button className={cn(
              "w-full h-full rounded-xl bg-miquel-black-200 hover:bg-miquel-black-150 p-4 cursor-pointer transform duration-300 group", 
              {"bg-miquel-black-300 hover:bg-miquel-black-300 cursor-no-drop": creatingImage}
            )}
              onClick={handleImageUpload}
              disabled={creatingImage}
            >
              <div className={cn(
                "w-full h-full rounded-xl border-2 border-dashed border-miquel-purple-100 group-hover:border-miquel-purple-200 transform duration-300 " +
                "p-4 flex justify-center items-center group-hover:animate-pulse ",
                {"border-red-800 group-hover:border-red-800 cursor-no-drop group-hover:animate-none": creatingImage}

                )}>
                <span className={cn(
                  "text-miquel-white-100 miquel-opacity group-hover:opacity-100 flex flex-col gap-2 ",
                  {"text-red-400 group-hover:opacity-70": creatingImage}
                )}>
                  {t("string.drag-image")} 
                  <Icon 
                    src={"upload"}
                    height={20}
                    width={20}
                    title={"upload"}
                    type={creatingImage ? "color" : "white"}
                  />
                </span>
              </div>
            </button>
            <input type='file' id='file' 
              ref={fileUploadRef} 
              className='hidden'
              onChange={uploadIMageDisplay}
            />
          </aside>


          <aside className="grid grid-cols-2 gap-4 w-full 2xl:flex 2xl:flex-row">
            <ShakeHard onClick={()=>{}} key={(shake && errors.pins) ? 'shake1' : 'no-shake1'} active={(shake && errors.pins)} fixed>
              <Input type="number" className="" value={numPins} text={t("string.pins")}  infoText={t("string.pins-info")}
                disabled={!croppingCompleted || creatingImage || (linesVector.length > 1)}
                error={errors.pins}
                onChange={(e)=>{
                  e.preventDefault(); setNumPins(e.target.value)
                }} 
              />
            </ShakeHard>
            <ShakeHard  onClick={()=>{}} key={(shake && errors.lines) ? 'shake2' : 'no-shake2'} active={(shake && errors.lines)} fixed>
              <Input type="number" className="" value={maxLines} text={t("string.lines")}  infoText={t("string.lines-info")}
                disabled={!croppingCompleted || creatingImage || (linesVector.length > 1)}
                error={errors.lines}
                onChange={(e)=>{
                  e.preventDefault(); setMaxLines(e.target.value)
                }} 
              />
            </ShakeHard>
            <ShakeHard  onClick={()=>{}} key={(shake && errors.width) ? 'shake3' : 'no-shake3'} active={(shake && errors.width)} fixed>
              <Input type="number" className="" value={lineWidth} text={t("string.width")} infoText={t("string.width-info")}
                disabled={!croppingCompleted || creatingImage || (linesVector.length > 1)} 
                error={errors.width}
                onChange={(e)=>{
                  e.preventDefault(); setLineWidth(e.target.value)
                }} 
              />
            </ShakeHard>
            <ShakeHard  onClick={()=>{}} key={(shake && errors.contrast) ? 'shake4' : 'no-shake4'} active={(shake && errors.contrast)} fixed>
              <Input type="number" className="" value={imageContrast} text={t("string.contrast")} infoText={t("string.contrast-info")}
                disabled={!croppingCompleted || creatingImage || (linesVector.length > 1)}
                error={errors.contrast}
                onChange={(e)=>{
                  e.preventDefault(); setImageContrast(e.target.value)
                }} 
              />
            </ShakeHard>
          </aside>

        </form>
      </nav>

    </section>
  )
}


// =========================================================================
//                        ALGORITHM EXTERNAL FUNCTIONS
// =========================================================================
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

async function getCroppedImg(
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
