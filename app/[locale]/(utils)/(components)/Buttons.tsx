import cn from "classnames"
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from "react";


import { Icon, IconProps } from '@/app/[locale]/(utils)/(components)/Icons';
import { Modal } from '@/app/[locale]/(utils)/(components)/Utils';


interface ButtonProps {
  children?: React.ReactNode,
  text?:string,
  icon?:string,
  iconType?: IconProps["type"],
  type?:"button" | "submit" | "reset" | undefined, 
  className?: string,
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}
export function Button({text, children, icon, iconType, className, type = "button", disabled, onClick}: ButtonProps){
  return(
    <button type={type} disabled = {disabled} 
      className={cn(
        "p-2 px-4 rounded-md bg-miquel-blue-400 hover:bg-miquel-blue-500 transition-[background-color,transform] duration-300 flex gap-2 justify-center text-nowrap active:duration-75 active:scale-95", 
        {"bg-red-500/40 hover:bg-red-500/40 cursor-not-allowed": disabled},
        className
      )}
      onClick={(e) =>{
        if(onClick) 
          onClick(e)
      }}
    >
      {icon &&
        <Icon 
          src={icon}
          height={20}
          width={20}
          title={icon}
          type={iconType}
        />
      }
      {text}
      {children}
    </button>
  )
}




interface InputProps {
  type?: React.HTMLInputTypeAttribute,  
  className?: string,
  disabled?: boolean,
  error?: boolean,
  value?: string | number | readonly string[] | undefined,
  step?: number,
  min?: number,
  max?: number,
  text?: string,
  infoText?: string,
  onChange?: (e:any) => void,
}
export function Input({className, type, disabled, error, onChange, value, step = 1, min, max, text, infoText}: InputProps){
  const repeatTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const repeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const valueRef = useRef(value)
  const isNumber = type === "number"

  useEffect(() => {
    valueRef.current = value
  }, [value])

  const stopStepping = () => {
    if (repeatTimeoutRef.current) clearTimeout(repeatTimeoutRef.current)
    if (repeatIntervalRef.current) clearInterval(repeatIntervalRef.current)
    repeatTimeoutRef.current = null
    repeatIntervalRef.current = null
  }

  useEffect(() => stopStepping, [])

  const getNextValue = (direction: 1 | -1) => {
    const currentValue = Array.isArray(valueRef.current) ? valueRef.current[0] : valueRef.current
    const currentNumber = Number(currentValue || 0)
    const steppedValue = Number.isFinite(currentNumber) ? currentNumber + direction * step : direction * step
    if (max !== undefined && steppedValue > max) return null
    if (min !== undefined && steppedValue < min) return null

    return steppedValue
  }

  const changeByStep = (direction: 1 | -1) => {
    if (!onChange || disabled) return
    const nextValue = getNextValue(direction)
    if (nextValue === null) return

    valueRef.current = nextValue

    onChange({
      preventDefault: () => {},
      target: { value: String(nextValue) },
    })
  }

  const startStepping = (direction: 1 | -1) => {
    stopStepping()
    changeByStep(direction)
    repeatTimeoutRef.current = setTimeout(() => {
      repeatIntervalRef.current = setInterval(() => changeByStep(direction), 80)
    }, 350)
  }

  return(
    <div className="grid grid-cols-1 w-full lg:w-fit gap-2">
      <h2 className="w-full flex relative gap-2">
        {text}
        <InfoPopUp infoText={infoText} onHover/>
      </h2>
      <div className="relative w-full">
        <input type={type} disabled = {disabled} value={value} step={step} min={min} max={max}
          className={cn(
            "p-2 rounded-md border border-miquel-blue-400 bg-miquel-blue-500-a/20 text-miquel-white-100 " +
            "transition-[border-color,background-color] duration-300 flex gap-2 justify-center text-nowrap w-full outline-none focus:outline-none focus:ring-0", 
            { 'no-spinner pr-9': isNumber },
            { 'border-red-500 bg-red-500/30 placeholder-red-400/80': disabled },
            { 'border-red-500 bg-red-500/30 placeholder-red-400/80 text-red-500 focus:text-miquel-white-100' : error},
            className
          )}
          onChange={(e) =>{
            if(onChange) 
              onChange(e)
          }}
        />
        {isNumber &&
          <div className="number-stepper absolute right-1 top-1/2 flex -translate-y-1/2 flex-col overflow-hidden rounded">
            {[1, -1].map(direction => (
              <button
                key={direction}
                type="button"
                aria-label={direction === 1 ? "Increase value" : "Decrease value"}
                disabled={disabled}
                className="flex h-4 w-6 touch-none items-center justify-center opacity-70 transition-[opacity,background-color] outline-none focus:outline-none focus:ring-0 hover:bg-miquel-blue-400-a/20 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30"
                onPointerDown={(e) => { e.preventDefault(); startStepping(direction as 1 | -1) }}
                onPointerUp={stopStepping}
                onPointerCancel={stopStepping}
                onPointerLeave={stopStepping}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    changeByStep(direction as 1 | -1)
                  }
                }}
              >
                <Icon
                  src={direction === 1 ? "chevron-up" : "chevron-down"}
                  height={10}
                  width={10}
                  title={direction === 1 ? "Increase" : "Decrease"}
                  type="white"
                />
              </button>
            ))}
          </div>
        }
      </div>
    </div>
  )
}              





export function InfoPopUp({infoText, onHover}: {infoText?: string, onHover?: boolean}){
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Detect outside clicks
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <div className="relative inline-block group" ref={ref}>
    {infoText && 
      <button type="button" className="miquel-opacity flex items-center" onClick={(e) => {e.preventDefault(); setOpen(!open)}}>
        <Icon 
          src={"question-mark"}
          height={20}
          width={20}
          title={!onHover ? "Info" : ""} //Avoid the text of the icon to show if hovering
          /> 
      </button>
    }
    {infoText && (
      <div className={cn(
        "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 translate-y-1 scale-95 bg-miquel-black-300 text-white text-sm px-2 py-2 rounded shadow z-10 text-nowrap opacity-0 pointer-events-none transition-[opacity,transform] duration-150 ease-out",
        {"opacity-100 translate-y-0 scale-100": open && !onHover},
        {"group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100": onHover}
      )}>
        {infoText?.split("\n").map((line, idx) => 
          idx === 0 ? (
            <span key={idx} className="block font-medium">
              {line}
            </span>
          ) : (
            <div key={idx} className="text-xs opacity-80">
              {line}
            </div>
          )
        )}
      </div>
    )}
    </div>
  )
}




export function ButtonModal({children, onClick, ...props }: ButtonProps){
  const [ showModal, setShowModal ] = useState(false)
  const {t} = useTranslation("general");
  
  return(
    <>
      <Button {...props} onClick={(e)=>{
          e.preventDefault(); setShowModal(true)
          if (onClick) onClick(e)
      }}/>
      {showModal &&
      <Modal onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center gap-2 justify-center flex-grow">
          {children}
        </div>
        <div className="flex justify-end w-full">
          <Button onClick={() => setShowModal(false)} className="max-w-min" text={t("close")}/>
        </div>
      </Modal>
      }
    </>
  )
}

interface MultiChoiceProps<T extends string> {
  options: Record<string, string>
  value: T
  onChange: (value: T) => void
  className?: string
}
export function MultiChoice<T extends string>({ options, value, onChange, className }: MultiChoiceProps<T>) {
  return (
    <div className={cn("h-full flex rounded-full bg-miquel-black-300 p-0.5", className)}>
      {Object.entries(options).map(([key, text]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key as T)}
          className={cn("rounded-full px-3 py-2 text-sm transition-[background-color,opacity]",
            value === key ? "bg-miquel-blue-400" : "opacity-60 hover:opacity-100")}
        >
          {text}
        </button>
      ))}
    </div>
  )
}
