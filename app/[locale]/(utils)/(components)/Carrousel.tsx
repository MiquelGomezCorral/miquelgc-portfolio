"use client"

import { LegacyRef, useRef, useState, useEffect } from "react";



export function useCarrousel({list}: {list: object[]}){
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [scrollOn, setScrollOn] = useState<number>(0) // 0 left, 1 middle, 2 right
	const hasScrolled = useRef(false);
	const [cardSize, setCardSize] = useState(724) // 720 px for the w-[45rem] + 8/2 for the gap-2
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	// Make the slider set to the righ so it is not sticked to the left
	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth/(Math.max(list.length-1, 1)) // If it is just in the righ it will go too fast
		}
	}, []);

	const scrollLeft = () => {
		if (scrollOn === 0) return // == 2 left
		computeScroll("left")
	}
	
	const scrollRight = () => {
		if (scrollOn === 2) return // == 2 right
		computeScroll("right")
	}

	const computeScroll = (side: "left" | "right") => {
		const container = scrollContainerRef.current
		if (!container) return 

		const currentScroll = Math.ceil(container.scrollLeft / cardSize)
		const targetScroll = (
			side == "left" 
			? Math.max((currentScroll - 1) * cardSize, 0) 
			: (currentScroll + 1) * cardSize
		)
		console.log(`currentScroll = ${currentScroll}`);
		console.log(`targetScroll = ${targetScroll}`);

		container.scrollTo({ left: targetScroll, behavior: "smooth" })

		const pos = Math.ceil(targetScroll / cardSize)
		setScrollOn((pos === 0) ? 0 : (pos >= list.length - 1) ? 2 : 1)
	}
	
	const scrollSlider = () => {
		if (!scrollContainerRef.current) return
		if (timeoutRef.current) clearTimeout(timeoutRef.current)

		timeoutRef.current  = setTimeout(() => {
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



	// Observe the viewe of the user so we can animate the slider when it gets into the veiwe
	useEffect(() => {
		if (!scrollContainerRef.current || hasScrolled.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			setTimeout(() =>{
				if (entry.isIntersecting && scrollContainerRef.current) {
				scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
				hasScrolled.current = true;
				observer.disconnect();
			}},100)
		})

		observer.observe(scrollContainerRef.current);
		setCardSize(scrollContainerRef.current?.scrollWidth / list.length)

		return () => observer.disconnect();
	}, [scrollContainerRef])

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