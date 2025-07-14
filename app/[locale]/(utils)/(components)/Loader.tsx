import cn from "classnames"


interface loadreProps {
     enable: boolean, 
     type: "blob" | "circle"
}
export function Loader({enable, type}: loadreProps){
    return(
        <div className={cn(
            `z-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `,
            { "hidden": !enable }
        )}>
            <div className={cn(`loader-${type}`)}></div>
        </div>
    )
}