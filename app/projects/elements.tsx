import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';
import { Icon, IconLink } from "../(utils)/(components)/IconsButtons";
import { ProjectType } from "../(utils)/(constants)/project.text.d";

export function Technology({ src }: { src: string }) {
  const Title = (src: string) => {
    switch (src) {
      case "html": return "Html"
      case "react": return "React"
      case "typescript": return "TypeScript"
      case "next": return "Next.js"
      case "tailwind": return "Tailwind CSS"
      case "github": return "GitHub"
      case "css": return "CSS"
      case "java": return "Java"
      case "unity": return "Unity"
      case "python": return "Python"
      case "pygame": return "Pygame"
      case "c++": return "C ++"
      case "c-sharp": return "C #"
    }
  }

  return (
    <section className="rounded-full bg-miquel-black-200 px-4 py-1 flex justify-center items-center gap-2 text-xs">
      <Image src={`/assets/icons/${src}.svg`} alt={src}
        width={20}
        height={20}
        title={Title(src)}
      />
      <p className="opacity-80 text-nowrap">{Title(src)}</p>
    </section>
  )
}

export function Project({ object, disabled }: { object: ProjectType, disabled?: boolean }) {
  return (
    <li
      className={cn("relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300 group", { "hover:bg-miquel-black-400/40": !disabled })} // hover:scale-105
    >
      <Link href={object.link} className={
        "group/img relative w-full rounded-xl aspect-video col-span-1 flex justify-end items-center overflow-hidden"+  " " +
        "lg:col-span-5 bg-gradient-to-r from-blue-500 to-orange-500 hover:outline hover:outline-miquel-black-100" 
      }>
        <Image
          src={`/assets/projects/${object.miniatura}.webp`}
          alt={object.title}
          // fill
          width={800}
          height={450}
          className="rounded-xl w-10/12 group-hover/img:w-11/12 translate-x-4 transform duration-500 aspect-video outline outline-miquel-white-500/40"
        />
      </Link>

      <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7">
        <span>
          <header className="flex items-end gap-3">
            <h2 className="text-2xl">{object.title}</h2>
            <IconLink
              src="external-link" title={object.title}
              width={25} height={25}
              link={object.link}
              className="opacity-90 group-hover:opacity-100 transform duration-300"
            />
          </header>
          <p className="opacity-50">{object.finished ? "Terminado" : "En progreso"}</p>
        </span>

        <p className="opacity-70 ">{object.descriptionShort}</p>

        <footer className="flex gap-2 flex-wrap">
          {object.technologies.map((tech, idx) =>
            <Technology key={idx} src={tech} />
          )}
        </footer>
      </article>
    </li>
  )
}

export function EmptyProject({ object }: { object: ProjectType }) {
  return (
    <li
      className="relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300"
    >
      <div className="relative w-full aspect-video col-span-1 lg:col-span-5">
        <Image
          src="/assets/projects/Captura.png"
          alt={object.title}
          fill
        />
      </div>

      <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7">
        <span>
          <header className="flex items-center gap-3">
            <h2 className="text-2xl">{object.title}</h2>
            <Icon
              src="external-link" title={object.title}
              width={20} height={20}
            />
          </header>
          <p className="opacity-50">{object.finished ? "Terminado" : "En progreso"}</p>
        </span>
        <p className="opacity-70 ">{object.descriptionShort}</p>
      </article>
    </li>
  )
}

export function ProjectPageTemplate({object}: {object: ProjectType}) {
  return (
    <main className="w-full flex flex-col justify-center gap-10 rounded-xl">
      <header className="w-full h-full flex justify-center">
        <div className="relative max-w-3xl w-full h-full aspect-video">
          {/* <Image
            src={`/assets/projects/${object.miniatura}.webp`}
            alt={object.title}
            fill
            className="rounded-xl"
          /> */}
          <iframe
            // width="560"
            // height="315"
            src={object.youtube} // Replace with your video ID
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl w-full h-full"
            ></iframe>
        </div>
      </header>

      <article className="flex flex-col gap-10">
        <section className="flex flex-col gap-6 col-span-7">
          <span>
            <header className="flex items-end gap-3">
              <h2 className="text-5xl">{object.title}</h2>

              {object.github &&
                <IconLink
                  src="external-link" title={object.title}
                  width={40} height={40}
                  link={object.github}
                  blank
                />
              }
            </header>
            <p className="opacity-50 text-xl">{object.finished ? "Terminado" : "En progreso"}</p>
          </span>

          <p className="opacity-70">{object.descriptionLong}</p>

          <footer className="flex flex-col gap-2">
            <h2 className="text-xl">Tecnologías</h2>
            <div className="flex gap-2 flex-wrap">
              {object.technologies.map((tech, idx) =>
                <Technology key={idx} src={tech} />
              )}
            </div>
          </footer>
        </section>

        <section className="h-52 sm:h-96 w-full">
          <Marquee pauseOnHover
            className="[--duration:20s] w-full h-full">
            {object.screenShoots.map((screenShoot, idx) =>
              <CarrouselItem key={idx} screenShoot={screenShoot}/>
            )}
          </Marquee>
        </section>

      </article>
    </main>
  )
}



// =============================================
//              IMAGE CARROUSEL 
// =============================================

function CarrouselItem({ screenShoot }: { screenShoot: string}) {
  return (
    <figure className="relative h-full aspect-video" aria-label={screenShoot}>
      <Image
        src={`/assets/projects/${screenShoot}.webp`}
        alt={screenShoot}
        fill
        loading="eager"
        className="rounded-xl"
      />
    </figure>
  );
}

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}