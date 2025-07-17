"use client"

import cn from "classnames"
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from "react";

import { Icon, IconCopy } from '@/app/[locale]/(utils)/(components)/Icons';
import { Button, Input, ButtonModal } from '@/app/[locale]/(utils)/(components)/Buttons';


import CONFIG from "@/app/[locale]/(utils)/(constants)/configuration";



export function SmokingComponent(){
  const {t} = useTranslation("projects")

  // ==========================================================================================
  //                                      COMPONENT
  // ==========================================================================================
  return(
    <section className='w-full flex gap-4 lg:gap-8 flex-col lg:flex-row items-center'>
    
    </section>
  )
}

