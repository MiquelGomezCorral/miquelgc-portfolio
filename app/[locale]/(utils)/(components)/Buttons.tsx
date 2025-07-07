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
        "p-2 px-4 rounded-md bg-miquel-blue-400 hover:bg-miquel-blue-500 transform duration-300 flex gap-2 justify-center text-nowrap", 
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
  type?: React.HTMLInputTypeAttribute,  
  className?: string,
  disabled?: boolean,
  value?: string | number | readonly string[] | undefined,
  text?: string,
  onChange?: (e:any) => void,
}
export function Input({className, type, disabled, onChange, value, text}: InputProps){
  return(
    <div className="grid grid-cols-1 w-full md:w-fit gap-2">
      <h2 className="w-full">{text}</h2>
      <input type={type} disabled = {disabled} value={value}
        className={cn(
          "p-2 rounded-md border border-miquel-blue-400 bg-miquel-blue-500-a/20 text-white " +
          "transform duration-300 flex gap-2 justify-center text-nowrap w-full", 
          { 'border-red-500 bg-red-500/30 placeholder-red-400/80': disabled },
          className
        )}
        onChange={(e) =>{
          if(onChange) 
            onChange(e)
        }}
      />
    </div>
  )
}              

