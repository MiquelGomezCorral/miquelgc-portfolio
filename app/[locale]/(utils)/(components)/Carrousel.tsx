"use client"

import { LegacyRef, useRef, useState } from "react";

export function useCarrousel({list}: {list: object[]}){
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [scrollOn, setScrollOn] = useState<number>(0) // 0 left, 1 middle, 2 right
	const cardSize = 724 // 720 px for the w-[45rem] + 8/2 for the gap-2
	let timeout: NodeJS.Timeout;

	const scrollLeft = () => {
		if (scrollOn === 0) return
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current
			const currentScroll = Math.ceil(container.scrollLeft / cardSize)
			const targetScroll = Math.max(currentScroll * cardSize - cardSize, 0)
			container.scrollTo({ left: targetScroll, behavior: "smooth" })

			setScrollOn(Math.ceil(targetScroll / cardSize) === 0 ? 0 : 1)
		}
	};
	
	const scrollRight = () => {
		if (scrollOn === 2) return

		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current
			const currentScroll = Math.ceil(container.scrollLeft / cardSize)
			const targetScroll = currentScroll * cardSize + cardSize // Scroll by 724px
			container.scrollTo({ left: targetScroll, behavior: "smooth" })

			setScrollOn(Math.ceil(targetScroll / cardSize) >= list.length - 1? 2 : 1)
		}
	};

	const scrollSlider = () => {
		if (scrollContainerRef.current) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				const container = scrollContainerRef.current
				if(!container) return

				const currentScroll = Math.ceil(container.scrollLeft / cardSize)
				const targetScroll = currentScroll * cardSize // Scroll fixed to by 724px
				container.scrollTo({ left: targetScroll, behavior: "smooth" })
				
				setScrollOn(
					Math.ceil(targetScroll / cardSize) >= list.length - 1? 
					2 : 
					Math.ceil(targetScroll / cardSize) === 0 ? 
					0 : 1
				)
			}, 350);

		}
	};
	return { scrollContainerRef, scrollOn, scrollLeft, scrollRight, scrollSlider }
}


interface CarrouselProps{
	scrollContainerRef: LegacyRef<HTMLDivElement> | undefined,
	scrollSlider: () => void,
	children: React.ReactNode,
}
export function Carrousel({scrollContainerRef, scrollSlider,  children }: CarrouselProps){
	return(
		<div 
			className="grid grid-flow-col md:auto-cols-[minmax(45rem,1fr)] auto-cols-[minmax(25rem,1fr)] gap-2 w-full h-full overflow-x-scroll"
			ref={scrollContainerRef}
			onScroll={scrollSlider}
		>
			{children}
		</div>
	)
}