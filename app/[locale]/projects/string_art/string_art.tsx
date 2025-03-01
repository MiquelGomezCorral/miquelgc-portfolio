"use client"

import Cropper from 'react-easy-crop';
import { useState, useRef } from "react";
import NextImage from "next/image";
import { Icon } from '@/app/[locale]/(utils)/(components)/IconsButtons';
import { useTranslation } from 'react-i18next';
import { Button } from '@/app/[locale]/(utils)/(components)/Button';




export function StringArtComponent(){
  const {t} = useTranslation("projects")

  const [selectedImage, setSelectedImage] = useState("/assets/projects/Einstein.webp");
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [croppingCompleted, setCroppingCompleted] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const [imageMatrix, setImageMatrix] = useState<number[][]>()


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
  }


  return(
    <section className='w-full flex gap-10 flex-col items-center'>
      <figure className='relative flex justify-center w-full max-w-[500px] lg:min-w-[300px] aspect-square rounded-full'>
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
          :
          <NextImage
            src={selectedImage}
            fill
            alt={selectedImage}
            className='rounded-full'
          />
        }
      </figure>
      <nav className='flex flex-col items-center gap-4 w-'>

        <Button
          disabled={croppingCompleted}
          onClick={async () => {
            if (croppedAreaPixels) {
              const {image, matrix} = await getCroppedImg(selectedImage, croppedAreaPixels);
              setSelectedImage(image);
              setCroppingCompleted(true);
              setImageMatrix(matrix)
            }
          }}
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
          onClick={() => {
            
          }}
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


  return {image: canvas.toDataURL("image/webp"), matrix};
}