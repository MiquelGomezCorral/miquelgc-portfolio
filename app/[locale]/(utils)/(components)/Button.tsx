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
    <button type={type} disabled = {disabled} className={cn(
      "w-full p-2 rounded-md bg-miquel-blue-400 hover:bg-miquel-blue-400/70 transform duration-300 flex gap-2 justify-center", 
      {"bg-red-500/40 hover:bg-red-500/40 cursor-not-allowed": disabled},
      className)}
      onClick={(e) =>{
        if(onClick) 
          onClick(e)
      }}
    >
      {children}
    </button>
  )
}