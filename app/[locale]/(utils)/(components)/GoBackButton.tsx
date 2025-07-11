"use client"
import cn from 'classnames';
import { usePageStackStore } from '@/app/[locale]/(global_state)/state';
import { useRouter } from "next/navigation"; 
import { Icon } from '@/app/[locale]/(utils)/(components)/Icons';

export function GoBackButton(){
	const { backToPage, currentPage, pageStack } = usePageStackStore()
	const router = useRouter()
	return(
    <button 
			className={cn("miquel-opacity", 
				{"hidden": (
					pageStack.length === 0 ||  
					(pageStack.length === 1 && pageStack[0] === "/" )
				)}
			)}
			onClick={() => router.push(backToPage())}
		>
			<Icon 
				src={`go-back`}
				width={20}
				height={20}
				title={'go back'}
			/>
    </button>
	)
}