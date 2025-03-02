"use client"

import Cropper from 'react-easy-crop';
import { useState, useRef, useEffect } from "react";
import NextImage from "next/image";
import { Icon } from '@/app/[locale]/(utils)/(components)/IconsButtons';
import { useTranslation } from 'react-i18next';
import { Button } from '@/app/[locale]/(utils)/(components)/Button';


type point = {
  x: number,
  y: number,
}
type nail = point & {
  usedWith: Set<number>,
}
export function StringArtComponent(){
  const {t} = useTranslation("projects")

  const [selectedImage, setSelectedImage] = useState("/assets/projects/Einstein.webp");
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [updateImage, setUpdateImage] = useState(false);

  const [creatingImage, setCreatingImage] = useState(false);
  const [croppingCompleted, setCroppingCompleted] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [imageSize, setImazeSize] = useState(1900)

  const [imageMatrix, setImageMatrix] = useState<number[][]>([[]])
  const [computedImageMatrix, setComputedImageMatrix] = useState<number[][]>([[]])
  const [lineWidth, setLineWidth] = useState(0.25)
  const [numNails, setNumNails] = useState(300)
  const [nailVector, setNailVector] = useState<nail[]>([])
  const [maxLines, setMaxLines] = useState(10000) 
  const [linesDrawn, setLinesDrawn] = useState(0) 
  const [linesVector, setLinesVector] = useState<number[]>([Math.floor(Math.random() * numNails)]) 
  
  const precomputedLines = useRef(new Map());
  const margin = 10
  const radius = 300 
  const neighbourtNailMargin = Math.ceil(numNails*0.03)
  useEffect(() => {
    // GET NAILS
    const d = (360 / numNails) * (Math.PI / 180) // convert to radians
    const nails: nail[] = []
    for(let i = 0; i < numNails; i++){
      nails.push({
        x: Math.cos(d*i) * (radius - margin) + radius,
        y: Math.sin(d*i) * (radius - margin) + radius,
        usedWith: new Set<number>(),
      })
    }
    setNailVector(nails)
    
  },[numNails, radius, margin])

  // useEffect(()=>{
  //   if (nailVector.length !== numNails) return

  //   const newPrecomputedLines = new Map();

  //   for (let i = 0; i < numNails; i++) {
  //     for (let j = i + 1; j < numNails; j++) {
  //       const pixels = computeLinePixels(nailVector[i], nailVector[j], imageSize, radius*2);
  //       newPrecomputedLines.set(`${i}-${j}`, pixels);
  //     }
  //   }
  
  //   precomputedLines.current = newPrecomputedLines;
  // },[imageSize, nailVector])


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
      const {image, matrix, blankMatrix} = await getCroppedImg(selectedImage, croppedAreaPixels);
      setSelectedImage(image);
      setCroppingCompleted(true);
      setImageMatrix(matrix)
      setComputedImageMatrix(blankMatrix)    

      setImazeSize(matrix.length)

      setLinesVector([Math.floor(Math.random() * numNails)]) 
      setLinesDrawn(0)     
           
    }
  }

  const createImage = () =>{
    setCreatingImage(true)
    
    // First nail at random
    // setLinesVector([Math.floor(Math.random() * numNails)])

    let count = 0;
    const interval = setInterval(() => {
      // CHOOSE NEXT NAIL
      setLinesVector((prev) => {
        const prevNail = prev[prev.length-1]
        let nextNail = Math.floor(Math.random() * numNails)
        let highestScore = computeLoss(prevNail, nextNail)

        for(let i = 0; i < numNails; i++){
          // MAKE THAT ONLY TAKES INTO ACOUNT LINE FURHTER THAN 10 POSTIONS %
          const up = (i + neighbourtNailMargin) % numNails
          const down = (i - neighbourtNailMargin) % numNails
          if ((prevNail <= up && prevNail >= down) || nailVector[prevNail].usedWith.has(i)) continue //Avoid using nails close to the acutal

          const auxScore = computeLoss(prevNail, i)

          if(highestScore < auxScore){
            highestScore = auxScore
            nextNail = i
          }
        }

        // UPDATE DRAWN MATRIX
        updateComputeImageMatrix(prevNail, nextNail)
        nailVector[prevNail].usedWith.add(nextNail)
        nailVector[nextNail].usedWith.add(prevNail)

        return [...prev, nextNail]
      })
      
      // UPDATE VALUES
      setLinesDrawn((prevLinesDrawn) => prevLinesDrawn + 1)
      count++;
      if (count >= maxLines) clearInterval(interval); // Stop after maxLines
    }, 0);
  }
  const computeLoss = (nail1Idx: number, nail2Idx: number) => {
    let score = 0
    
    let {x1, y1, x2, y2, dx, dy, sx, sy} = getVariableForPixelSearch(nailVector[nail1Idx].x, nailVector[nail1Idx].y, nailVector[nail2Idx].x, nailVector[nail2Idx].y, imageSize, radius*2)
    const actual: point = {x: x1, y: y1}
    let err = dx - dy

    let affectedPixels = 0 
    do{ //at least one pixel is going to be affected
      affectedPixels++
      // const target = imageMatrix[actual.y][actual.x];
      const actualComputed = computedImageMatrix[actual.y][actual.x]
      // const coverage = getLineCoverage(x1, y1, x2, y2, lineWidth, actual.x, actual.y)
      // const newPixelValue = Math.max(actualComputed - (coverage * 255), 0) // 

      // // METRIC
      // const weight = 1 - (255 - target) / 510;
      score +=  255 - actualComputed // 255 / Math.abs(Math.abs(actualComputed - target) - Math.abs(newPixelValue - target)) // (255 - actualComputed)//

      // Calculate error and adjust coordinates
      let e2 = err * 2
      if (e2 > -dy) {
          err -= dy
          actual.x += sx
      }
      if (e2 < dx) {
          err += dx
          actual.y += sy
      }
    } while (actual.x !== x2 || actual.y !== y2)
    
    return score / affectedPixels //pixels.length
  }

  const updateComputeImageMatrix = (nail1Idx: number, nail2Idx: number) => {
    setComputedImageMatrix((prev)=> {
      let {x1, y1, x2, y2, dx, dy, sx, sy} = getVariableForPixelSearch(nailVector[nail1Idx].x, nailVector[nail1Idx].y, nailVector[nail2Idx].x, nailVector[nail2Idx].y, imageSize, radius*2)
      // const newMatrix: number[][] = []
      // for (let i = 0; i < prev.length; i++) {
      //   newMatrix[i] = [...prev[i]];
      // }
      const newMatrix = prev.map((row) => [...row]);

      let coverage
      let newPixelValue
      
      const actual: point = {x: x1, y: y1}
      let err = dx - dy    

      do{
        // coverage = getLineCoverage(x1, y1, x2, y2, lineWidth, actual.x, actual.y)
        newPixelValue = Math.min(prev[actual.y][actual.x] + 10, 255) // (coverage * 255)
        newMatrix[actual.y][actual.x] = newPixelValue

        // Calculate error and adjust coordinates
        let e2 = err * 2
        if (e2 > -dy) {
            err -= dy
            actual.x += sx
        }
        if (e2 < dx) {
            err += dx
            actual.y += sy
        }
      } while (actual.x !== x2 || actual.y !== y2)
      
      return newMatrix
  })}

  return(
    <section className='w-full flex gap-10 flex-col items-center'>
      <div className='flex flex-col gap-10'>

        <p className='flex w-full'>
          {linesDrawn}/{maxLines} <br/>
          {Math.round(linesDrawn*100*100/maxLines) / 100}%
        </p>
        <figure className='relative flex justify-center w-full max-w-[600px] lg:min-w-[300px] aspect-square rounded-full'>
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
            : (!creatingImage ?
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
        
        
        <figure className='relative flex justify-center w-full max-w-[600px] lg:min-w-[300px] aspect-square rounded-full'>
          {creatingImage && updateImage && <MatrixImage matrix={computedImageMatrix} />}
        </figure>
        </div>

      <nav className='flex flex-col items-center gap-4 w-'>
        <Button
          disabled={!creatingImage}
          onClick={() => {
            setUpdateImage((prev) => !prev)
          }}
        > 
          Update matrix
        </Button>
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
          disabled={!croppingCompleted || creatingImage}
          onClick={createImage}
        > 
          <Icon 
            src={"star"}
            height={20}
            width={20}
            title={"star"}
          />
          {t("string.start")}
        </Button>

        <form id='form' encType='multipart/form-data' action="">
          <Button type='submit' className=''
            onClick={handleImageUpload}
          >
            <Icon 
              src={"upload"}
              height={20}
              width={20}
              title={"upload"}
            />
            {t("string.upload")}
          </Button>

          <input 
            type='file' id='file' 
            ref={fileUploadRef} 
            className='hidden'
            onChange={uploadIMageDisplay}
          />

        </form>
      </nav>

    </section>
  )
}

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
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
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
  const blankMatrix: number[][] = matrix.map(row => 
    row.map(value => {
      return value; 
    })
  );


  return {image: canvas.toDataURL("image/webp"), matrix, blankMatrix};
}

function getLineCoverage(
  x1: number, y1: number, x2: number, y2: number, 
  strokeWidth: number, pixelX: number, pixelY: number
): number {
  
  // Calculate the perpendicular distance from the pixel center (pixelX, pixelY) to the line (x1, y1) to (x2, y2)
  const dx = x2 - x1;
  const dy = y2 - y1;
  const numerator = Math.abs(dy * pixelX - dx * pixelY + x2 * y1 - y2 * x1);
  const denominator = Math.sqrt(dy * dy + dx * dx);
  
  const distance = numerator / denominator;

  // If the distance is smaller than or equal to half the stroke width, the pixel is affected
  if (distance <= strokeWidth / 2) {
    // Calculate the coverage as the ratio of distance to stroke width
    return 1 - (distance / (strokeWidth / 2));
  }

  return 0;
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




const matrixToImage = (matrix: number[][]): string => {
  const height = matrix.length;
  const width = matrix[0].length;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const gray = matrix[y][x]; // Value between 0-255
      const index = (y * width + x) * 4; // RGBA format

      data[index] = gray;     // Red
      data[index + 1] = gray; // Green
      data[index + 2] = gray; // Blue
      data[index + 3] = 255;  // Alpha (fully opaque)
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL(); // Convert to base64 URL
};

export default function MatrixImage({ matrix }: { matrix: number[][] }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (matrix.length > 0) {
      setImageSrc(matrixToImage(matrix));
    }
  }, [matrix]);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Grayscale Matrix" />
      ) : (
        <p>Generating image...</p>
      )}
    </div>
  );
}

const computeLinePixels = (nail1: nail, nail2: nail, imageSize: number, canvasSize: number) => {
  let pixels = [];
  
  let {x: x1, y: y1} = {x: Math.floor(nail1.x*imageSize/canvasSize), y: Math.floor(nail1.y*imageSize/canvasSize)}
  let {x: x2, y: y2} = {x: Math.floor(nail2.x*imageSize/canvasSize), y: Math.floor(nail2.y*imageSize/canvasSize)}
  

  let dx = Math.abs(x2 - x1);
  let dy = Math.abs(y2 - y1);
  let sx = x1 < x2 ? 1 : -1;
  let sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    pixels.push({ x: x1, y: y1 });

    if (x1 === x2 && y1 === y2) break;

    let e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }

  return pixels;
};