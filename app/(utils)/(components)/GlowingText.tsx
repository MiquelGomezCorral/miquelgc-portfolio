import cn from 'classnames';


export default function GlowingText({ bold, className, ...props }: { bold?: boolean, className?: string, children: React.ReactNode }) {
	return (
		<span>
			{bold
				?
				<p className={cn("", className)}>
					<strong className="text-miquel-blue-400 blur-md absolute text-nowrap">
						{props.children}
					</strong>
					<strong className="text-miquel-blue-400 relative text-nowrap">
						{props.children}
					</strong>
				</p>
				:
				<p className={cn("", className)}>
					<span className="text-miquel-blue-400 blur-md absolute text-nowrap">
						{props.children}
					</span>
					<span className="text-miquel-blue-400 relative text-nowrap">
						{props.children}
					</span>
				</p>
			}
		</span>
	)
}