import cn from 'classnames';


export default function GlowingText({ bold, className, children }: { bold?: boolean, className?: string, children: React.ReactNode }) {
	const Tag = bold ? "strong" : "span";

	return (
		<div className={cn("", className)}>
			<Tag className="text-miquel-blue-400 blur-md absolute text-nowrap">
				{children}
			</Tag>
			<Tag className="text-miquel-blue-400 relative text-nowrap">
				{children}
			</Tag>
		</div>
	);
}