import { IconLink } from "@/app/(utils)/(components)/IconsButtons";
import Image from "next/image";
import { Technology } from "../elements";
import { Porfolio as object } from "../../(utils)/(constants)/proyect.text.d"
import cn from "classnames"

export default function Portfolio() {
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

export function Marquee({
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