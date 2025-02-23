"use client"

import cn from "classnames"
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { Button } from './Button';

export function FormSendEmail(){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const [errors, setErrors] = useState({ name: "", email: "", message: "" });


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    let errorName = ""
    if (!name.trim() || name.trim().length < 3){
      errorName = "El nombre tiene que tener al menos 3 letras."
    }

    let errorEmail = ""
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      errorEmail = "Use un formato de mail valido: isabel_vb@eg.company.com"
    }

    let errorMessage = ""
    if (!message.trim() || message.split(" ").length < 3){
      errorMessage = "El mensaje tiene que tener al menos 3 palabras."
    }
    
    const newErrors = {
      name: errorName,
      email: errorEmail,
      message: errorMessage,
    };

    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.message) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Miquel Gómez',
      message: message,
    }
    // setName("")
    // setEmail("")
    // setMessage("")
    // return
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          alert("¡Email mandado con éxito! En cuanto pueda te contacto de vuelta ;)")
          console.log('SUCCESS!');

          setName("")
          setEmail("")
          setMessage("")
        },
        (error) => {
          alert("🚫¡El mail no ha podido ser mandado por algún error!🚫 Lo siento pero te toca mandalor por email :(")
          console.log('FAILED...', error.text);
        },
      );
  }

  return(
    <form onSubmit={handleSubmit} noValidate className='flex flex-col p-4 border border-miquel-blue-400 rounded-md gap-2 w-1/3'>
      <section className="w-full flex flex-col gap-1">
        <input 
          type="text" 
          placeholder='Isbel Vallés Bertomeu'
          value={name}
          autoComplete="additional-name"
          onChange={(e) => {
            const newValue = e.target.value
            setName(newValue)
          }}
          className={
            cn('p-2 rounded-md text-white bg-miquel-blue-500/40 border border-miquel-blue-400 broder-2',
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
            cn('p-2 rounded-md text-white bg-miquel-blue-500/40 border border-miquel-blue-400 broder-2',
            { 'border-red-500 bg-red-500/30 placeholder-red-400/80': errors.email }
          )}
        />
        <p className="text-red-500 min-h-[1rem] text-xs">{errors.email}</p>
      </section>
        
      <section className="w-full flex flex-col gap-1">
        <textarea 
          placeholder={'Hello!\n\nMy name is Isabel Vallés, from ...'}
          value={message}
          onChange={(e) => {
            const newValue = e.target.value
            setMessage(newValue)
          }}
          className={
            cn('p-2 rounded-md text-white bg-miquel-blue-500/40 border border-miquel-blue-400 broder-2 h-64 w-full',
            { 'border-red-500 bg-red-500/30 placeholder-red-400/80': errors.message }
          )}
        />
        <p className="text-red-500 min-h-[1rem] text-xs">{errors.message}</p>
      </section>

      <Button type='submit' disabled={ !name.trim() || !email.trim() ||  !message.trim()}>
        Send email
      </Button>
    </form>
  )
}