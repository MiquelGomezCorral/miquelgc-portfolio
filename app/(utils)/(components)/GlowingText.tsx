export default function GlowingText({ bold, ...props }: { bold?: boolean, children: React.ReactNode }) {
	return (
		<span>
			{bold
				?
				<p>
					<strong className="text-miquel-blue-400 blur-md absolute text-nowrap">
						{props.children}
					</strong>
					<strong className="text-miquel-blue-400 relative text-nowrap">
						{props.children}
					</strong>
				</p>
				:
				<p>
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