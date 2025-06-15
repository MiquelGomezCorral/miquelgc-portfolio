"use client"

import cn from 'classnames';
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { HeaderButton, ButtonLink, HeaderButtonIcon} from "@/app/[locale]/(utils)/(components)/ButtonLink";
import { DownloadCV } from "@/app/[locale]/(utils)/(components)/Utils";
import { Icon } from "@/app/[locale]/(utils)/(components)/IconsButtons";
import { CloseMenu, OpenMenu } from "@/app/[locale]/(utils)/(constants)/constants.text.d";
import { GoBackButton } from '@/app/[locale]/(utils)/(components)/GoBackButton';
import { usePageStackStore } from '@/app/[locale]/(global_state)/state';
import LanguageChanger from '@/app/[locale]/(utils)/(components)/LanguageChanger';

export default function Header() {
  const {t} = useTranslation("header");
  const [ showMenu, setshowMenu ] = useState(false)
  const { currentPage } = usePageStackStore()

  return (
    <div className='flex w-full' id="header">
      {/* ================== HORIZONTAL VIEW MENU ==================*/}
      <header className='fixed hidden lg:flex justify-between z-40 px-10 md:px-16 lg:px-20 py-4 w-full h-full sm:h-auto gap-10 top-0
      backdrop-blur-md border-b-2 border-b-miquel-white-200/50'>
        <nav className='w-max flex justify-between gap-4'>
          <GoBackButton />
          
          <Link href="/" scroll={false} className="opacity-70 hover:opacity-100 transform duration-300">
            Miquel Gómez
          </Link>
        </nav>

        <nav className='gap-4 flex'>
          <ButtonLink icon="user-tick-thick"link="/#header" >
            {t("about_me")}     
          </ButtonLink>
          <ButtonLink icon="card-thick"     link="/#experiences"  >
            {t("experience")}   
          </ButtonLink>
          <ButtonLink icon="hat-thick"      link="/#studies"      >
            {t("studies")}      
          </ButtonLink>
          <ButtonLink icon="code-tag-thick" link="/projects" >
            {t("projects")}     
          </ButtonLink>
          <ButtonLink icon="terminal-thick" link="/#technologies" >
            {t("technologies")} 
          </ButtonLink>
          <ButtonLink icon="email"          link="#footer"        notAddToStack stayPage >
            {t("contact")}      
          </ButtonLink>
          <DownloadCV>
            <HeaderButtonIcon icon='download-document'> {t("cv")} </HeaderButtonIcon>
          </DownloadCV>
          <LanguageChanger/>
        </nav>
      </header>

      {/* ================== VETICAL VIEW MENU ==================*/}
      {/* MENU BUTTON*/}

      <div
        className={cn("fixed flex justify-center items-center lg:hidden z-50 top-4 left-6 rounded-full p-2 1 w-9 border hover:bg-miquel-black-300 backdrop-blur-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]", {"hidden": showMenu || currentPage === "/" || currentPage === "/es" })}
      >
        <GoBackButton />
      </div>

      <div
        className="fixed lg:hidden z-50 top-4 right-6 rounded-full p-2 w-9 border hover:bg-miquel-black-300 backdrop-blur-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
        onClick={() => setshowMenu(!showMenu)}
      >
        <Icon
          src={showMenu ? "menu-close" : "menu-open"} title={!showMenu ? CloseMenu : OpenMenu}
          width={20} height={20} 
        />
      </div>


      {/* MENU */}

      <header className={cn('z-40 fixed gap-4 lg:hidden flex flex-col w-full h-full top-0 left-0 py-4 backdrop-blur-md text-miquel-white-200', { "hidden": !showMenu })}>
        <Link href="/" className="pl-4 opacity-70 hover:opacity-100 transform duration-300 text-2xl font-semibold">
          <h3>Miquel Gómez</h3>
        </Link>

        <div className="border-b-2 border-b-miquel-white-200/50" />

        <nav className="flex flex-col gap-4 pl-4">
          <ButtonLink onClick={()=>setshowMenu(false)} icon="user-tick-thick"link="/#header">
            {t("about_me")}     
          </ButtonLink>
          <ButtonLink onClick={()=>setshowMenu(false)} icon="card-thick"     link="/#experiences"  >
            {t("experience")}   
          </ButtonLink>
          <ButtonLink onClick={()=>setshowMenu(false)} icon="hat-thick"      link="/#studies"      >
            {t("studies")}      
          </ButtonLink>
          <ButtonLink onClick={()=>setshowMenu(false)} icon="code-tag-thick" link="/projects">
            {t("projects")}     
          </ButtonLink>
          <ButtonLink onClick={()=>setshowMenu(false)} icon="terminal-thick" link="/#technologies" >
            {t("technologies")} 
          </ButtonLink>
          <ButtonLink onClick={()=>setshowMenu(false)} icon="email"          link="#footer"         notAddToStack stayPage>
            {t("contact")}      
          </ButtonLink>
          <DownloadCV>
            <HeaderButtonIcon icon='download-document'> {t("cv")} </HeaderButtonIcon>
          </DownloadCV>
          <LanguageChanger mobile/>
        </nav>
      </header>

    </div>
  )
}
