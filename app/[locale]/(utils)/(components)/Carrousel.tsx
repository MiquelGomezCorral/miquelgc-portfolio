"use client"

import { LegacyRef, useRef, useState, useEffect } from "react";

import CONFIG from '@/app/[locale]/(utils)/(constants)/configuration'

export function useCarrousel({list}: {list: object[]}){
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [scrollOnIdx, setScrollOnIdx] = useState<number>(0) // 0 left, 1 middle, 2 right
	const [cardSize, setCardSize] = useState(724) // 720 px for the w-[45rem] + 8/2 for the gap-2
	const hasScrolled = useRef(false); // To control fist time the user sees the carrousel
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	// Make the slider set to the righ so it is not sticked to the left
	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth/(Math.max(list.length-1, 1)) // If it was all the way to the righ it would go too fast
		}
	}, []);

	// ================================== SCROLLERS ==================================
	const scrollLeft = () => {
		if (scrollOnIdx === 0) return // == 2 left
		computeScroll("left")
	}
	
	const scrollRight = () => {
		if (scrollOnIdx === 2) return // == 2 right
		computeScroll("right")
	}

	const computeScroll = (side: "left" | "right") => {
		const container = scrollContainerRef.current
		if (!container) return 

		const currentScrollIdx = Math.ceil(container.scrollLeft / cardSize)
		const targetScrollPixels = (
			side == "left" 
			? Math.max((currentScrollIdx - 1) * cardSize, 0) 
			: (currentScrollIdx + 1) * cardSize
		)
		console.log(`currentScroll = ${currentScrollIdx}`);
		console.log(`targetScroll = ${targetScrollPixels}`);

		container.scrollTo({ left: Math.floor(targetScrollPixels), behavior: "smooth" })

		const pos = Math.ceil(targetScrollPixels / cardSize)
		setScrollOnIdx((pos === 0) ? 0 : (pos >= list.length - 1) ? 2 : 1)
	}
	
	// ================================== SET BACK IN PLACE THE SLIDER ==================================
	const scrollSlider = () => {
		if (!scrollContainerRef.current) return
		if (timeoutRef.current) clearTimeout(timeoutRef.current)

		timeoutRef.current  = setTimeout(() => {
			const container = scrollContainerRef.current
			if(!container) return

			const currentScrollIdx = Math.ceil(container.scrollLeft / cardSize)
			const targetScrollPixels = currentScrollIdx * cardSize // Scroll fixed to by 724px
			container.scrollTo({ left: Math.floor(targetScrollPixels), behavior: "smooth" })
			
			setScrollOnIdx(
				Math.ceil(targetScrollPixels / cardSize) >= list.length - 1? 
				2 : 
				Math.ceil(targetScrollPixels / cardSize) === 0 ? 
				0 : 1
			)
		}, CONFIG.debounceTime);
	}


	// ================================== ANIMATION ==================================
	// Observe the viewe of the user so we can animate the slider when it gets into the veiwe
	useEffect(() => {
		const container = scrollContainerRef.current
		if (!container || hasScrolled.current) return;

		// Intersection to scroll-to-zero once
		const io = new IntersectionObserver(([entry]) => {
			setTimeout(() =>{
				if (entry.isIntersecting && container) {
				container.scrollTo({ left: 0, behavior: "smooth" });
				hasScrolled.current = true;
				io.disconnect();
			}},100)
		})
		io.observe(container);

		// ResizeObserver to update cardSize whenever container width changes
		const ro = new ResizeObserver(() => {
			setCardSize(container.scrollWidth / list.length)
		})
		ro.observe(container)

		//  initial calc
		setCardSize(container.scrollWidth / list.length)

		return () => {
			io.disconnect()
			ro.disconnect()
		}
	}, [scrollContainerRef])

	return { scrollContainerRef, scrollOn: scrollOnIdx, scrollLeft, scrollRight, scrollSlider }
}


// ================================== COMPONENT ==================================

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