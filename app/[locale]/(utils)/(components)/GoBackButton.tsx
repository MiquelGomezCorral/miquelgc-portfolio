"use client"
import cn from 'classnames';
import { usePageStackStore } from '@/app/[locale]/(global_state)/state';
import { useRouter } from "next/navigation"; 
import { Icon } from '@/app/[locale]/(utils)/(components)/IconsButtons';

export function GoBackButton(){
	const { backToPage, currentPage } = usePageStackStore()
	const router = useRouter()
	return(
    <button 
			className={cn("opacity-70 hover:opacity-100 transform duration-300", {"hidden": currentPage === "/" || currentPage === "/es" })}
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