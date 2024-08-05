
export default function HeaderButton({ ...props }: { children: React.ReactNode }) {
  return (
    <button className="text-miquel-white hover:opacity-60 transform duration-300">
      {props.children}
    </button>
  )
}