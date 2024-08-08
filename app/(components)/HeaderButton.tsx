import Link from "next/link"

export function HeaderButtonLink({link, blank, ...props }: {link: string, blank?: boolean, children: React.ReactNode }) {
  return (
    <Link 
      href={link}
      target={blank ? "_blank": ""}
      className="group"
    >
      <button className="text-miquel-white opacity-70 group-hover:opacity-100 transform duration-300">
        {props.children}
      </button>
    </Link>
  )
}
export function HeaderButton({...props }: {children: React.ReactNode }) {
  return (
    <button className="w-full text-start text-miquel-white opacity-70 hover:opacity-100 transform duration-300">
      {props.children}
    </button>
  )
}