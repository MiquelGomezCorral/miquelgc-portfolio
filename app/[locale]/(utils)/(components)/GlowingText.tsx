import cn from 'classnames';

interface GlowingTextProps { 
	bold?: boolean, 
	adjust?: boolean, 
	nowrap?: boolean, 
	className?: string, 
	children: React.ReactNode 
}

export default function GlowingText({ bold, className, adjust, nowrap, children }: GlowingTextProps) {
	const Tag = bold ? "strong" : "span";

	return (
		<div className={cn("relative inline-block", className)}>
			<Tag
				className={cn(
				"text-miquel-blue-400 blur-md absolute inset-0 pointer-events-none select-none",
				{ "text-nowrap whitespace-nowrap": nowrap }
				)}
				aria-hidden
			>
				{children}
			</Tag>
			<Tag
				className={cn("text-miquel-blue-400 relative", { "text-nowrap whitespace-nowrap": nowrap })}
			>
				{children}
			</Tag>
		</div>
	)
}