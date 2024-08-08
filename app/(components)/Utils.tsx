import cn from 'classnames';

export function DownloadCV({ className, ...props }: { className?: string, children: React.ReactNode}) {
  return (
    <a
      href="yo/Curriculum 01-06-24.pdf"
      download="yo/Curriculum 01-06-24.pdf"
      className={cn("", className)}
    >
      {props.children}
    </a>
  )
}