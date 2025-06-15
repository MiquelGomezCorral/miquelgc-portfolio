"use client"

import cn from "classnames"
import emailjs from '@emailjs/browser';
import { useState, useRef } from 'react';
import { Button } from './FormComponents';
import { useTranslation } from "react-i18next";
import { ShakeHard } from 'reshake'

export function FormSendEmail(){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({ name: "", email: "", message: "" , general: ""})

  const [shake, setShake] = useState(false)
  const t0 = useRef<number>(Date.now()-1000); // set a difference of 1 second before actually mesuring
  const t1 = useRef<number>(Date.now());
  const timeoutShakeRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutScreamRef = useRef<NodeJS.Timeout | null>(null);
  const [shakedTooMuch, setShakedTooMuch] = useState(false)
  const shakingTime = 300 //ms

  const {t} = useTranslation("footer")

  // ================== SHAKING ==================
  const checkShaking = () => {
    const t2 = Date.now()
    const diff12 = t2 - t1.current 
    const diff01 = t1.current - t0.current

    if (diff12 < shakingTime && diff01 < shakingTime){
      setShakedTooMuch(true)
      if (timeoutScreamRef.current) clearTimeout(timeoutScreamRef.current)
      timeoutScreamRef.current = setTimeout(()=>{
        setShakedTooMuch(false)
        timeoutScreamRef.current = null
      }, 1000)
    }

    t0.current = t1.current 
    t1.current = t2 
  }

  // ================== handleSubmit ==================
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    let errorName = ""
    if (!name.trim() || name.trim().length < 3){
      errorName = t("error.name")
    }

    // Check email format
    let errorEmail = ""
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      errorEmail = t("error.mail")
    }

    let errorMessage = ""
    if (!message.trim() || message.split(" ").length < 3){
      errorMessage = t("error.message")
    }
    

    // Check last time sent
    let errorGeneral = ""
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    const currentTime = Date.now();
    const timeLimit = 5 * 60 * 1000; // 5 minutes in milliseconds -> at most every 5 minutes (300,000ms)
    if (lastSubmitTime && currentTime - parseInt(lastSubmitTime) < timeLimit) { 
      const diff = timeLimit - (currentTime - parseInt(lastSubmitTime))

      const mins = Math.floor(diff / 60000); // Get the full minutes
      const secs = Math.floor((diff % 60000) / 1000); // Get the remaining seconds
      // Format minutes and seconds as 00:00
      const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      errorGeneral = `${t("error.name")}: ${formattedTime} min`
    }

    const newErrors = {
      name: errorName,
      email: errorEmail,
      message: errorMessage,
      general: errorGeneral,
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.message || newErrors.general) {
      setShake(true)
      if (timeoutShakeRef.current) clearTimeout(timeoutShakeRef.current)
      setTimeout(()=>{
        setShake(false)
        timeoutShakeRef.current = null
      }, shakingTime)
      return
    }

    // ============================================
    //  ALL CHECK PASSED, SENDING THE EMAIL
    // ============================================

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Miquel Gómez',
      message: message,
    }


    localStorage.setItem('lastSubmitTime', currentTime.toString());

    // setName("")
    // setEmail("")
    // setMessage("")
    // return

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          // Save last time sent
          localStorage.setItem('lastSubmitTime', currentTime.toString());

          alert(t("alert.success"))
          console.log('SUCCESS!');

          setName("")
          setEmail("")
          setMessage("")
        },
        (error) => {
          alert(t("alert.failed"))
          console.log('FAILED...', error.text);
        },
      );

  }

  // ================== Return ==================
  const formStyle = "p-2 rounded-md text-white bg-miquel-blue-500/20 border border-miquel-blue-400 transform duration-300"
  return(
    <form onSubmit={handleSubmit} noValidate className='w-full flex flex-col p-4 border-2 border-miquel-blue-400 rounded-md gap-2 relative'>
      <ShakeHard key={shakedTooMuch ? 'shake' : 'no-shake'} active={shake} fixed onClick={checkShaking}>
        {shakedTooMuch && <p className="w-full mb-4 text-red-500 absolute -top-12 flex justify-center">
          AAAAAAAAAAAAAAAAHHHHHHHH!!!!!!
        </p>}
        
        <section className="w-full flex flex-col gap-1">
          <input 
            type="text" 
            placeholder='Isabel Vallés Bertomeu'
            value={name}
            autoComplete="additional-name"
            onChange={(e) => {
              const newValue = e.target.value
              setName(newValue)
            }}
            className={
              cn(formStyle + '',
              {'border-red-500 bg-red-500/30 placeholder-red-400/80': errors.name }
            )}
          />
          <p className="text-red-500 min-h-[1rem] text-xs">{errors.name}</p>
        </section>

        <section className="w-full flex flex-col gap-1">
          <input 
            type="email" 
            placeholder='isabel_vb@eg.company.com'
            value={email}
            autoComplete="email"
            onChange={(e) => {
              const newValue = e.target.value;
              setEmail(newValue);
            }}
            className={
              cn(formStyle + '',
              { 'border-red-500 bg-red-500/30 placeholder-red-400/80': errors.email }
            )}
          />
          <p className="text-red-500 min-h-[1rem] text-xs">{errors.email}</p>
        </section>
          
        <section className="w-full flex flex-col gap-1">
          <textarea 
            placeholder={t("placeholder")}
            value={message}
            onChange={(e) => {
              const newValue = e.target.value
              setMessage(newValue)
            }}
            className={
              cn(formStyle + ' h-64 w-full',
              { 'border-red-500 bg-red-500/30 placeholder-red-400/80': errors.message }
            )}
          />
          <p className="text-red-500 min-h-[1rem] text-xs">{errors.message}</p>
        </section>

        <section className="w-full flex flex-col gap-1">
          <Button type='submit' disabled={ !name.trim() || !email.trim() ||  !message.trim()}>
            {t("send")}
          </Button>
          <p className="text-red-500 min-h-[1rem] text-xs">{errors.general}</p>
        </section>

      </ShakeHard>
    </form>
  )
}