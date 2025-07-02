import cn from "classnames"

interface ButtonProps {
  children: React.ReactNode,
  type?:"button" | "submit" | "reset" | undefined, 
  className?: string,
  disabled?: boolean
  onClick?: (e:any) => void
}
export function Button({children, className, type = "button", disabled, onClick}: ButtonProps){
  return(
    <button type={type} disabled = {disabled} 
      className={cn(
        "p-2 rounded-md bg-miquel-blue-400 hover:bg-miquel-blue-400/70 transform duration-300 flex gap-2 justify-center text-nowrap", 
        {"bg-red-500/40 hover:bg-red-500/40 cursor-not-allowed": disabled},
        className
      )}
      onClick={(e) =>{
        if(onClick) 
          onClick(e)
      }}
    >
      {children}
    </button>
  )
}

interface InputProps {
  type?: "button" | "submit" | "reset" | "text" | "password" | "email" | "number" | "checkbox" | "radio" | "file" | "date";  
  className?: string,
  disabled?: boolean
  value?: string | number | readonly string[] | undefined
  onChange?: (e:any) => void
}
export function Input({className, type = "button", disabled, onChange, value}: InputProps){
  return(
    <input type={type} disabled = {disabled} value={value}
      className={cn(
        "p-2 rounded-md border border-miquel-blue-400 bg-miquel-blue-500-a/20 text-white transform duration-300 flex gap-2 justify-center text-nowrap", 
        { 'border-red-500 bg-red-500/30 placeholder-red-400/80': disabled },
        className
      )}
      onChange={(e) =>{
        if(onChange) 
          onChange(e)
      }}
    />
  )
}              

