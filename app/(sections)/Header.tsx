"use client"

import cn from 'classnames';
import Link from "next/link";
import { HeaderButton, HeaderButtonLink } from "../(utils)/(components)/HeaderButton";
import { DownloadCV } from "../(utils)/(components)/Utils";
import { Icon } from "../(utils)/(components)/IconsButtons";
import { CloseMenu, OpenMenu } from "../(utils)/(constants)/constants.d";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { usePageStackStore } from '../(global_state)/state';

export default function Header() {
  const [showMenu, setshowMenu] = useState(false)
  const { backToPage, currentPage } = usePageStackStore()
  const router = useRouter()

  return (
    <>
      <header className='fixed hidden sm:flex justify-between z-40 px-10 md:px-16 lg:px-20 py-4 w-full h-full sm:h-auto gap-10 top-0
      backdrop-blur-md border-b-2 border-b-miquel-white-200/50'>
        <nav className='w-max flex justify-between'>
          <button 
            className={cn("opacity-70 hover:opacity-100 transform duration-300", {"hidden": currentPage === "/"})}
            onClick={() => router.push(backToPage())}
          >
            {"<"}
          </button>
          <Link href="/" className="opacity-70 hover:opacity-100 transform duration-300">
            Miquel Gómez
          </Link>
        </nav>

        <nav className='gap-4 flex'>
          <HeaderButtonLink link="/">Sobre mí</HeaderButtonLink>
          <HeaderButtonLink link="/projects">Projectos</HeaderButtonLink>
          <DownloadCV>
            <HeaderButton>CV</HeaderButton>
          </DownloadCV>
          <HeaderButtonLink link="/#footer">Links</HeaderButtonLink>
          <HeaderButtonLink link="">ES ^</HeaderButtonLink>
        </nav>
      </header>


      <div
        className="fixed sm:hidden z-50 top-4 right-6 rounded-full p-2 w-9 border hover:bg-miquel-black-300 backdrop-blur-md"
        onClick={() => setshowMenu(!showMenu)}
      >
        <Icon
          src={showMenu ? "menu-close" : "menu-open"} title={!showMenu ? CloseMenu : OpenMenu}
          width={20} height={20}
        />
      </div>

      <header className={cn('z-40 fixed gap-4 sm:hidden flex flex-col w-full h-full top-4 left-0 backdrop-blur-md text-miquel-white-200', { "hidden": !showMenu })}>
        <Link href="/" className="pl-4 opacity-70 hover:opacity-100 transform duration-300 text-2xl font-semibold">
          <h3>Miquel Gómez</h3>
        </Link>

        <div className="border-b-2 border-b-miquel-white-200/50" />

        <nav className="flex flex-col gap-4 pl-4">
          <HeaderButtonLink link="/">Sobre mí</HeaderButtonLink>
          <HeaderButtonLink link="/#Projects">Projectos</HeaderButtonLink>
          <DownloadCV>
            <HeaderButton>CV</HeaderButton>
          </DownloadCV>
          <HeaderButtonLink link="">Links</HeaderButtonLink>
          <HeaderButtonLink link="">ES ^</HeaderButtonLink>
        </nav>
      </header>

    </>
  )
}
