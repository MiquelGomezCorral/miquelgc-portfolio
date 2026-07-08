import cn from 'classnames';

interface GlowingTextProps { 
	bold?: boolean, 
	adjust?: boolean,
	nowrap?: boolean,
	color?: "blue" | "green",
	className?: string,
	children: React.ReactNode
}

export default function GlowingText({ bold, color = "blue", className, adjust, nowrap, children }: GlowingTextProps) {
	const Tag = bold ? "strong" : "span";
	const textClass = color === "green" ? "text-miquel-green-400" : "text-miquel-blue-400"

	return (
		<div className={cn("relative inline-block", className)}>
			<Tag
				className={cn(
				textClass,
				"blur-md absolute inset-0 pointer-events-none select-none",
				{ "text-nowrap whitespace-nowrap": nowrap }
				)}
				aria-hidden
			>
				{children}
			</Tag>
			<Tag
				className={cn(textClass, "relative", { "text-nowrap whitespace-nowrap": nowrap })}
			>
				{children}
			</Tag>
		</div>
	)
}
