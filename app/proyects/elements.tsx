import Image from "next/image";
import { Icon, IconLink } from "../(utils)/(components)/IconsButtons";
import Link from "next/link";
import cn from 'classnames';
import { ProyectType } from "../(utils)/(constants)/proyect.text.d";

export function Proyect({ object, disabled }: { object: ProyectType, disabled?: boolean }) {
  return (
    <li
      className={cn("relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300", { " hover:scale-105 hover:bg-miquel-black-400/20": !disabled })}
    >
      <Link href={object.link} className="relative w-full aspect-video col-span-1 lg:col-span-5">
        <Image
          src={`/assets/proyects/${object.miniatura}.webp`}
          alt={object.title}
          fill
          className="hover:ring hover:ring-miquel-white-200/20 rounded-xl hover:-translate-y-2 transform duration-300"
        />
      </Link>

      <article className="flex flex-col gap-2 justify-between col-span-1 lg:col-start-6 lg:col-span-7">
        <span>
          <header className="flex items-center gap-3">
            <h2 className="text-2xl">{object.title}</h2>
            <IconLink
              src="external-link" title={object.title}
              width={20} height={20}
              link={object.link}
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

export function EmptyProyect({ object }: { object: ProyectType }) {
  return (
    <li
      className="relative grid gird-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl transform duration-300"
    >
      <div className="relative w-full aspect-video col-span-1 lg:col-span-5">
        <Image
          src="/assets/proyects/Captura.png"
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

export function ProyectPageTemplate({object}: {object: ProyectType}) {
  return (
    <main className="w-full flex flex-col justify-center gap-10 rounded-xl">
      <header className="w-full h-full flex justify-center">
        <div className="relative max-w-3xl w-full h-full aspect-video">
          <Image
            src={`/assets/proyects/${object.miniatura}.webp`}
            alt={object.title}
            fill
            className="rounded-xl"
          />
        </div>
      </header>

      <article className="flex flex-col gap-10">
        <section className="flex flex-col gap-6 col-span-7">
          <span>
            <header className="flex items-center gap-3">
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

        <section className="h-96 w-full">
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

function CarrouselItem({ screenShoot }: { screenShoot: string}) {
  return (
    <figure className="relative h-full aspect-video" aria-label={screenShoot}>
      <Image
        src={`/assets/proyects/${screenShoot}.webp`}
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