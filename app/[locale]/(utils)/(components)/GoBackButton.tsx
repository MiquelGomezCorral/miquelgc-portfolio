"use client"
import cn from 'classnames';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from '@/app/[locale]/(utils)/(components)/Icons';

export function GoBackButton(){
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const localePrefix = pathname.startsWith("/es") ? "/es" : ""
	const landingPath = localePrefix || "/"
	const projectsPath = `${localePrefix}/projects`
	const isLanding = pathname === "/" || pathname === "/es"
	const isProjectsDetail = pathname.startsWith(`${projectsPath}/`)

	const goBack = () => {
		const fromProjects = searchParams.get("from") === "projects"
		router.push(isProjectsDetail && fromProjects ? projectsPath : landingPath)
	}

	return(
    <button
			className={cn("miquel-opacity",
				{"hidden": isLanding}
			)}
			onClick={goBack}
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
