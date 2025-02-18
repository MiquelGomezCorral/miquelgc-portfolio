"use client"
import cn from 'classnames';
import Image from "next/image";
import { usePageStackStore } from '@/app/(global_state)/state';
import { useRouter } from "next/navigation"; 
import { Icon } from '@/app/(utils)/(components)/IconsButtons';

export function GoBackButton(){
	const { backToPage, currentPage } = usePageStackStore()
	const router = useRouter()
	return(
    <button 
			className={cn("opacity-70 hover:opacity-100 transform duration-300", {"hidden": currentPage === "/"})}
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