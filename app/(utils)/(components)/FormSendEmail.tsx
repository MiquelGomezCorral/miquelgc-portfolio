"use client"

import emailjs from '@emailjs/browser';
import { useState } from 'react';

export function FormSendEmail(){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Miquel Gómez',
      message: message,
    }

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
    <form onSubmit={handleSubmit} className=''>
      <input 
        type="text" 
        placeholder='Isbel Vallés Bertomeu'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="text" 
        placeholder='isabel_vb@eg.company.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="text" 
        placeholder='Hello! My name is Isabel Vallés, from ...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type='submit'>Send email</button>
    </form>
  )
}