"use client"

import cn from "classnames"
import NextImage from "next/image";
import { ShakeHard } from 'reshake'
import Cropper from 'react-easy-crop';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect, useCallback } from "react";

import { Icon, IconCopy } from '@/app/[locale]/(utils)/(components)/Icons';
import { Button, Input, ButtonModal } from '@/app/[locale]/(utils)/(components)/Buttons';
import { Loader } from '@/app/[locale]/(utils)/(components)/Loader';

import { secondsToTime, checkLimits} from '@/app/[locale]/(utils)/(functions)/functionUtils';
import { 
  pin, line, computePins, precomputeLines, 
  computeLineError, updateComputeImageMatrix, 
  getCroppedImg, computeError
} from '@/app/[locale]/(utils)/(functions)/computePins.worker';
import { HeaderButton} from "@/app/[locale]/(utils)/(components)/ButtonsHeader";

import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";



export function StringArtComponent(){
  const {t} = useTranslation("projects")

  // ==========================================================================================
  //                                      VARIABLES
  // ==========================================================================================
  // ================================ IMAGE ================================
  const [idxDefaultImage, setIdxDefaultImage] = useState(0); 
  const [selectedImage, setSelectedImage] = useState(CONFIG.defaultImages[idxDefaultImage]); 
  const [modifiedImage, setModifiedImage] = useState(CONFIG.defaultImages[idxDefaultImage]); 
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const suggestImage = (e: any)=> {
    e.preventDefault(); 
    setCroppingCompleted(false)
    setIdxDefaultImage((idxDefaultImage + 1) % CONFIG.defaultImages.length)
  }
  useEffect(() => {
    setSelectedImage(CONFIG.defaultImages[idxDefaultImage])
    setModifiedImage(CONFIG.defaultImages[idxDefaultImage])
  },[idxDefaultImage])
  
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
  const precomputedLinesRef = useRef<Map<string, line>>(new Map())

  // ================================ FORM ================================
  const [errors, setErrors] = useState({ pins: false, lines: false, width: false , contrast: false})
  const [shake, setShake] = useState(false)

  // ==========================================================================================
  //                               USE EFFECT + FUNCTIONS
  // ==========================================================================================
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


  // ================================ MANAGE CREATING IMAGE ================================
  useEffect(() => { // checks whether or not the algorith is running, and if not removes the interval
    return () => {
      setCreatingImage((prevCreatingImage)=>{
        if (intervalRef.current && !prevCreatingImage) 
          clearInterval(intervalRef.current);
        
        return prevCreatingImage
      })
    };
  }, [creatingImage]);

  // ================================ CANVAS MANAGEMENT ================================
  useEffect(() => { // Update the canvas with the lines 
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


  // ================== FORM HANDLE =============
  const onChangeFormValues = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()

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
    setShake(Object.values(newErrors).some(e => e))

    return newErrors
  }, [numPins, maxLines, lineWidth, imageContrast])

  // ================================ handleSubmit  ================================
  useEffect(() => { // Contrast debounce to update de image.
    const timeout = setTimeout(() => {
      const fakeFormEvent = { preventDefault: () => {} } as React.ChangeEvent<HTMLInputElement>
      onChangeFormValues(fakeFormEvent)
    }, CONFIG.debounceTime * 2.5) // ms debounce

    return () => clearTimeout(timeout)
  }, [onChangeFormValues])

  useEffect(() => { // Shake removal
    if (!shake) return
    const timeout = setTimeout(() => setShake(false), CONFIG.shakingTime)
    return () => clearTimeout(timeout)
  }, [shake])

  // ================================ IMAGE UPDATE ================================
  const handleCropImage = useCallback(async (cropping: boolean = true) => {
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
  }, [croppedAreaPixels, croppingCompleted, selectedImage, imageContrast])

  useEffect(() => { // Contrast debounce to update de image.
    const timeout = setTimeout(() => {
      handleCropImage(false)
    }, CONFIG.debounceTime / 3) // ms debounce

    return () => clearTimeout(timeout)
  }, [handleCropImage])


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
      if (!(fileUploadRef.current && fileUploadRef.current.files)) return

      const cacheURL = URL.createObjectURL(file)
      setSelectedImage(cacheURL)
      setCroppingCompleted(false)  
      setCreatingImage(false)
  }


  // ==========================================================================================
  //                                      ALGORITH
  // ==========================================================================================
  const workerRef = useRef<Worker>(null!);
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
    
    // if stoped and then continued, aboid reseting
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
      computedErrorMatrix = errorMatrix.map((row) => [...row]);
      
      // → POST to worker and AWAIT response
      // const { pins: newPins, lines } = await new Promise<{
      //   pins: pin[]
      //   lines: Map<string, point[]>
      // }>(resolve => {
      //   const w = workerRef.current!
      //   w.onmessage = (e: MessageEvent<{
      //     pins: pin[]
      //     lines: Map<string, point[]>
      //   }>) => resolve(e.data)
      //   w.postMessage({numPins,imageSize, radius: CONFIG.radius, margin: CONFIG.margin, lineWidth})
      // })

      const newPins = computePins(numPins, CONFIG.radius, CONFIG.margin);
      // update pins & reconstruct your Map
      pins = newPins
      setPinVector(pins)
      precomputedLinesRef.current = precomputeLines(pins, imageSize, CONFIG.radius)//, lineWidth, 1.5)
      t1 = performance.now()
    }

    setLinesVector(newLinesVector) 
    setInitialTime(t1)
    setInUseErrorMatrix(computedErrorMatrix)

    setLoading(false)
    // ========================== EXECUTION ==========================
    intervalRef.current = setInterval(() => {
      // FINISH CHECK 
      if (intervalRef.current && (newLinesVector.length >= maxLines)) {
        clearInterval(intervalRef.current)
        setCreatingImage(false)
        
        return
      }
      const prevError = computeError(computedErrorMatrix)
      // ============= LOOK FOR NEXT PIN =============
      const prevPin = newLinesVector[newLinesVector.length - 1]
      const last10 = newLinesVector.slice(-CONFIG.lastNUsedPinsMargin)
      
      let nextPin = Math.floor(Math.random() * numPins)
      let highestScore = computeLineError(computedErrorMatrix, prevPin, nextPin, precomputedLinesRef.current)

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
        const score = computeLineError(computedErrorMatrix, prevPin, i, precomputedLinesRef.current)
        
        if (score > highestScore) {
          highestScore = score
          nextPin = i
        }
      }

      // ============= UPDATE MATRIX WITH THE PIN =============
      // Recopute error matrix
      computedErrorMatrix = updateComputeImageMatrix(computedErrorMatrix, prevPin, nextPin, lineWidth, precomputedLinesRef.current)
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


  // ==========================================================================================
  //                                      COMPONENT
  // ==========================================================================================
  return(
    <section className='w-full flex gap-4 lg:gap-8 flex-col lg:flex-row items-center'>
      <StringArtPreview
        loading={loading}
        croppingCompleted={croppingCompleted}
        selectedImage={selectedImage}
        crop={crop}
        zoom={zoom}
        setCrop={setCrop}
        setZoom={setZoom}
        setCroppedAreaPixels={setCroppedAreaPixels}
        creatingImage={creatingImage}
        linesVector={linesVector}
        modifiedImage={modifiedImage}
        canvasRef={canvasRef}
        maxLines={maxLines}
        totalTime={totalTime}
        stimatedTime={stimatedTime}
        t={t}
      />


      <nav className='gap-4 lg:gap-8 w-full grid grid-cols-1 items-center lg:flex lg:flex-col flex-grow'>
        <StringArtActions
          croppingCompleted={croppingCompleted}
          creatingImage={creatingImage}
          linesVector={linesVector}
          maxLines={maxLines}
          loading={loading}
          handleCropImage={handleCropImage}
          startAlgorithm={startAlgorithm}
          intervalRef={intervalRef}
          setLinesVector={setLinesVector}
          setInitialTime={setInitialTime}
          setCreatingImage={setCreatingImage}
          setLoading={setLoading}
          t={t}
        />


        <form id='form' encType='multipart/form-data' action="" noValidate
          className="w-full flex gap-4 lg:gap-8 justify-center flex-col lg:h-full min-h-0"
        >
          <ImageUploadControls
            creatingImage={creatingImage}
            fileUploadRef={fileUploadRef}
            handleImageUpload={handleImageUpload}
            suggestImage={suggestImage}
            uploadIMageDisplay={uploadIMageDisplay}
            t={t}
          />

          <StringArtSettings
            croppingCompleted={croppingCompleted}
            creatingImage={creatingImage}
            linesVector={linesVector}
            shake={shake}
            errors={errors}
            numPins={numPins}
            maxLines={maxLines}
            lineWidth={lineWidth}
            imageContrast={imageContrast}
            setNumPins={setNumPins}
            setMaxLines={setMaxLines}
            setLineWidth={setLineWidth}
            setImageContrast={setImageContrast}
            t={t}
          />

        </form>
      </nav>

    </section>
  )
}

function StringArtPreview({
  loading,
  croppingCompleted,
  selectedImage,
  crop,
  zoom,
  setCrop,
  setZoom,
  setCroppedAreaPixels,
  creatingImage,
  linesVector,
  modifiedImage,
  canvasRef,
  maxLines,
  totalTime,
  stimatedTime,
  t,
}: {
  loading: boolean
  croppingCompleted: boolean
  selectedImage: string
  crop: { x: number, y: number }
  zoom: number
  setCrop: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
  setZoom: React.Dispatch<React.SetStateAction<number>>
  setCroppedAreaPixels: React.Dispatch<React.SetStateAction<{ x: number; y: number; width: number; height: number } | null>>
  creatingImage: boolean
  linesVector: number[]
  modifiedImage: string
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  maxLines: number
  totalTime: number
  stimatedTime: number
  t: any
}) {
  return (
    <div className='flex flex-col items-center gap-2 relative'>
      <figure
        className="relative flex justify-center items-center aspect-square rounded-full overflow-hidden"
        style={{ width: `min(${CONFIG.radius * 2}px, calc(100vw - 2rem))` }}
      >
        <Loader enable={loading} type="circle"/>
        {!croppingCompleted ?
          <Cropper
            image={selectedImage}
            crop={crop}
            zoom={zoom}
            maxZoom={CONFIG.maxZoom}
            zoomSpeed={CONFIG.zoomSmoothFactor}
            aspect={1}
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
            className="w-full h-full rounded-full object-contain"
          />
          :
          <canvas
            ref={canvasRef}
            width={CONFIG.radius * 2}
            height={CONFIG.radius * 2}
            className="w-full h-full bg-miquel-white-200 rounded-full"
          />
        )}
      </figure>

      <footer className={cn("flex w-full flex-col font-mono transition-opacity duration-300", {"opacity-0": !creatingImage && !(linesVector.length > 1)})}>
        <span className="flex w-full justify-between">
          <p>{linesVector.length}/{maxLines}</p>
          <p>{((linesVector.length * 100) / maxLines).toFixed(2)}% </p>
        </span>
        <span className="flex w-full justify-between">
          <p>{t("string.total-time")}: {secondsToTime(totalTime)}</p>
          <p>{t("string.stimated-time")}: {secondsToTime(stimatedTime)}</p>
        </span>
      </footer>
    </div>
  )
}

function StringArtActions({
  croppingCompleted,
  creatingImage,
  linesVector,
  maxLines,
  loading,
  handleCropImage,
  startAlgorithm,
  intervalRef,
  setLinesVector,
  setInitialTime,
  setCreatingImage,
  setLoading,
  t,
}: {
  croppingCompleted: boolean
  creatingImage: boolean
  linesVector: number[]
  maxLines: number
  loading: boolean
  handleCropImage: () => void
  startAlgorithm: (reset: boolean) => void
  intervalRef: React.RefObject<ReturnType<typeof setInterval> | null>
  setLinesVector: React.Dispatch<React.SetStateAction<number[]>>
  setInitialTime: React.Dispatch<React.SetStateAction<number>>
  setCreatingImage: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  t: any
}) {
  return (
    <aside className="w-full grid grid-cols-1 2xl:flex 2xl:flex-row gap-4">
      <Button
        text={croppingCompleted ? t("string.crop") : t("string.accept")}
        icon={"crop"}
        className="w-full"
        disabled={creatingImage}
        onClick={(e) => {
          e.preventDefault()
          handleCropImage()
          setLoading(false)
        }}
      />

      <Button
        text={creatingImage ? t("string.stop") : (linesVector.length <= 1) ? t("string.start") : t("string.continue")}
        icon={"star"}
        className="w-full"
        disabled={!croppingCompleted || linesVector.length >= maxLines}
        onClick={(e)=>{
          e.preventDefault()
          startAlgorithm(linesVector.length <= 1)
          if (loading) setLoading(false)
        }}
      />

      <Button
        text={t("string.restart")}
        icon={"delete"}
        className="w-full"
        disabled={!croppingCompleted || linesVector.length <= 1}
        onClick={()=>{
          if(intervalRef.current) clearInterval(intervalRef.current)
          setLinesVector([CONFIG.firstPin])
          setInitialTime(0)
          setCreatingImage(false)
          setLoading(false)
        }}
      />

      <ButtonModal
        text={t("string.trace")}
        icon={"pin"}
        className="w-full"
        disabled={creatingImage || linesVector.length <= 1}
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
  )
}

function ImageUploadControls({
  creatingImage,
  fileUploadRef,
  handleImageUpload,
  suggestImage,
  uploadIMageDisplay,
  t,
}: {
  creatingImage: boolean
  fileUploadRef: React.RefObject<HTMLInputElement | null>
  handleImageUpload: (event: React.MouseEvent<HTMLButtonElement>) => void
  suggestImage: (e: any) => void
  uploadIMageDisplay: (input?: File | React.ChangeEvent<HTMLInputElement>) => void
  t: any
}) {
  const hiddenInput = (
    <input type='file' id='file'
      ref={fileUploadRef}
      className='hidden'
      onChange={uploadIMageDisplay}
    />
  )

  return (
    <>
      <aside className="flex w-full justify-center flex-col items-center lg:hidden">
        <Button type='submit' className='text-nowrap w-full lg:w-fit'
          text={t("string.upload")}
          icon="upload"
          onClick={handleImageUpload}
          disabled={creatingImage}
        />
        {hiddenInput}
        <HeaderButton onClick={suggestImage} disabled={creatingImage}>{t("string.suggest")}</HeaderButton>
      </aside>

      <aside className="w-full flex-col lg:h-44 2xl:h-64 justify-center items-center hidden lg:flex">
        <button className={cn(
          "w-full h-full rounded-xl bg-miquel-black-300 hover:bg-miquel-black-400 p-4 cursor-pointer transition-[background-color,transform] duration-300 group active:scale-[0.98]",
          {"bg-miquel-black-400 hover:bg-miquel-black-400 cursor-no-drop active:scale-100": creatingImage}
        )}
          onClick={handleImageUpload}
          disabled={creatingImage}
        >
          <div className={cn(
              "w-full h-full rounded-xl border-2 border-dashed p-4 flex justify-center items-center transition-[border-color,transform] duration-300",
              creatingImage
                ? "border-red-800 group-hover:border-red-800 cursor-no-drop"
                : "border-miquel-purple-100 group-hover:border-miquel-purple-200 group-hover:animate-pulse"
            )}>
            <span className={cn(
              "text-miquel-white-100 miquel-opacity group-hover:opacity-100 flex flex-col items-center gap-2 text-center",
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
        {hiddenInput}

        <HeaderButton onClick={suggestImage} disabled={creatingImage}>{t("string.suggest")}</HeaderButton>
      </aside>
    </>
  )
}

function StringArtSettings({
  croppingCompleted,
  creatingImage,
  linesVector,
  shake,
  errors,
  numPins,
  maxLines,
  lineWidth,
  imageContrast,
  setNumPins,
  setMaxLines,
  setLineWidth,
  setImageContrast,
  t,
}: {
  croppingCompleted: boolean
  creatingImage: boolean
  linesVector: number[]
  shake: boolean
  errors: { pins: boolean, lines: boolean, width: boolean, contrast: boolean }
  numPins: number
  maxLines: number
  lineWidth: number
  imageContrast: number
  setNumPins: React.Dispatch<React.SetStateAction<number>>
  setMaxLines: React.Dispatch<React.SetStateAction<number>>
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
  setImageContrast: React.Dispatch<React.SetStateAction<number>>
  t: any
}) {
  const disabled = !croppingCompleted || creatingImage || (linesVector.length > 1)

  return (
    <aside className="grid grid-cols-2 gap-4 w-full 2xl:flex 2xl:flex-row">
      <ShakeHard onClick={()=>{}} key={(shake && errors.pins) ? 'shake1' : 'no-shake1'} active={(shake && errors.pins)} fixed>
        <Input type="number" className="" value={numPins} step={10} min={10} text={t("string.pins")} infoText={t("string.pins-info")}
          disabled={disabled}
          error={errors.pins}
          onChange={(e)=>{
            e.preventDefault(); setNumPins(e.target.value)
          }}
        />
      </ShakeHard>
      <ShakeHard  onClick={()=>{}} key={(shake && errors.lines) ? 'shake2' : 'no-shake2'} active={(shake && errors.lines)} fixed>
        <Input type="number" className="" value={maxLines} step={100} min={500} text={t("string.lines")} infoText={t("string.lines-info")}
          disabled={disabled}
          error={errors.lines}
          onChange={(e)=>{
            e.preventDefault(); setMaxLines(e.target.value)
          }}
        />
      </ShakeHard>
      <ShakeHard  onClick={()=>{}} key={(shake && errors.width) ? 'shake3' : 'no-shake3'} active={(shake && errors.width)} fixed>
        <Input type="number" className="" value={lineWidth} step={1} min={1} text={t("string.width")} infoText={t("string.width-info")}
          disabled={disabled}
          error={errors.width}
          onChange={(e)=>{
            e.preventDefault(); setLineWidth(e.target.value)
          }}
        />
      </ShakeHard>
      <ShakeHard  onClick={()=>{}} key={(shake && errors.contrast) ? 'shake4' : 'no-shake4'} active={(shake && errors.contrast)} fixed>
        <Input type="number" className="" value={imageContrast} step={10} min={10} text={t("string.contrast")} infoText={t("string.contrast-info")}
          disabled={disabled}
          error={errors.contrast}
          onChange={(e)=>{
            e.preventDefault(); setImageContrast(e.target.value)
          }}
        />
      </ShakeHard>
    </aside>
  )
}
