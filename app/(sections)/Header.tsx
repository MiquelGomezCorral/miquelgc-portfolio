"use client"

import Link from "next/link";
import { HeaderButton, HeaderButtonLink } from "../(components)/HeaderButton";
import { DownloadCV } from "../(components)/Utils";
import { IconText } from "../(components)/IconsButtons";
import { CloseMenu, OpenMenu } from "../(constants)/constants.d";
import { useState } from "react";
import cn from 'classnames';

export default function Header() {
  const [showMenu, setshowMenu] = useState(false)
  return (
    <>
    <div
      className="fixed z-50 top-4 right-6 rounded-full p-2 w-9 border hover:bg-miquel-black-300"
      onClick={()=>setshowMenu(!showMenu)}
    >
    <IconText
      src={!showMenu ? "menu-close" : "menu-open"} title={!showMenu ? CloseMenu : OpenMenu}
      width={20} height={20}
      />
    </div>
      <header className={cn('z-40 px-6 sm:px-20 py-4 w-full h-full sm:h-auto fixed gap-10 top-0 backdrop-blur-md sm:border-b-2 border-b-miquel-white-200/50', {"opacity-0 -z-10": showMenu})}>
        <section className="w-full hidden sm:flex justify-between">
          <Link href="/" className="opacity-70 hover:opacity-100 transform duration-300">
            Miquel Gómez
          </Link>
          <nav className='gap-5 flex'>
            <HeaderButtonLink link="/">Sobre mí</HeaderButtonLink>
            <HeaderButtonLink link="/#Proyects">Proyectos</HeaderButtonLink>
            <DownloadCV>
              <HeaderButton>CV</HeaderButton>
            </DownloadCV>
            <HeaderButtonLink link="">Links</HeaderButtonLink>
            <HeaderButtonLink link="">ES ^</HeaderButtonLink>
          </nav>
        </section>

        <section className='gap-4 sm:hidden flex flex-col'>
          <hr className="border-b-miquel-white-200/50" />

          <nav className="flex flex-col gap-4">
            <HeaderButtonLink link="/">Sobre mí</HeaderButtonLink>
            <HeaderButtonLink link="/#Proyects">Proyectos</HeaderButtonLink>
            <DownloadCV>
              <HeaderButton>CV</HeaderButton>
            </DownloadCV>
            <HeaderButtonLink link="">Links</HeaderButtonLink>
            <HeaderButtonLink link="">ES ^</HeaderButtonLink>
          </nav>
        </section>
      </header>
    </>
  )
}
