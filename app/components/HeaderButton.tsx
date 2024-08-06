
export default function HeaderButton({ ...props }: { children: React.ReactNode }) {
  return (
    <button className="text-miquel-white opacity-70 hover:opacity-100 transform duration-300">
      {props.children}
    </button>
  )
}