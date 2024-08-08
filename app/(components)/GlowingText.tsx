export default function GlowingText({ bold, ...props }: { bold?: boolean, children: React.ReactNode }) {
	return (
		<span>
			{bold
				?
				<p>
					<strong className="text-miquel-blue-400 blur-md absolute">
						{props.children}
					</strong>
					<strong className="text-miquel-blue-400 relative">
						{props.children}
					</strong>
				</p>
				:
				<p>
					<span className="text-miquel-blue-400 blur-md absolute">
						{props.children}
					</span>
					<span className="text-miquel-blue-400 relative">
						{props.children}
					</span>
				</p>
			}
		</span>
	)
}