import cn from "classnames"

export function Loader({enable}: {enable: boolean}){
    return(
        <div className={cn(
            "z-40 loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ",
            {"hidden": !enable}
        )}>

        </div>
    )
}