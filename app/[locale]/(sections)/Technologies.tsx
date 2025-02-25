
import cn from 'classnames';
import GlowingText from "@/app/[locale]/(utils)/(components)/GlowingText";
import { Icon } from "@/app/[locale]/(utils)/(components)/IconsButtons";
import { TechnologyCathegories, TechnologyCathegoryType } from '@/app/[locale]/(utils)/(constants)/technologies.d';
import { TechnologyList, TechnologyMarquee } from '@/app/[locale]/(utils)/(components)/Technologies';



export default function TechnologiesSection() {

  return (
    <section id="technologies" className="w-full flex flex-col gap-6 group">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50 text-5xl font-bold transform duration-300 flex gap-2">
        <GlowingText>
          <Icon 
            src={`terminal`}
            width={50}
            height={50}
            type={"color"}
            title={'technologies'}
          />
        </GlowingText>
        {"Tecnologías"}
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TechnologyCathegories.map((object, idx) => 
          <TechnologyCard key={idx} object={object} />
        )}
      </main>
    
    </section>
  )
}

function TechnologyCard({ object }: { object: TechnologyCathegoryType }) {
  return( 
    <li 
      className={
        "h-full hover:bg-miquel-black-400/40 rounded-xl transform duration-300 group/li "+
        "gap-4 p-4 flex flex-col justify-between list-none"
    }>
      <main className="flex flex-col h-full gap-4 justify-between">
        <header className="w-full flex flex-col md:items-start items-center gap-4 ">
          <h2 className="text-2xl flex items-end gap-3">
            <GlowingText bold>{object.title}</GlowingText>
          </h2>
          <p className="opacity-70 md:text-start text-center">{object.description}</p>

        </header>
        <article className='grid grid-rows-2 grid-cols-1 w-full h-full justify-between md:gap-4 gap-6'>
          <section className="gap-2 w-full h-full flex lg:flex-row flex-col bg-miquel-black-150/20 p-2 rounded-md"> 
            <figure className={
                'transform duration-300 ' +
                'rounded-md flex justify-center items-center group/s5'
              }
            >
              <StarCircle n={object.startsUp} className='group-hover/s5:animate-pulse'/>
            </figure>

            <aside className='w-full'>
              <TechnologyList technologies={object.techStars45} className='justify-center lg:justify-start flex'/>
            </aside>
          </section>
          <section className="gap-2 w-full h-full flex lg:flex-row flex-col bg-miquel-black-150/20 p-2 rounded-md"> 
            <figure className={
                'transform duration-300 ' +
                'rounded-md flex justify-center items-center group/s3'
              }
            >
              <StarCircle n={object.startsDown} className='group-hover/s3:animate-pulse'/>
            </figure>

            <aside className='w-full'>
              <TechnologyList technologies={object.techStars34} className='justify-center lg:justify-start flex'/>
            </aside>
          </section>
        </article> 
      </main>
      
    </li>
)}

export function StarCircle({ n, radius = 20, iconSize = 25, className }: {n: number, radius?: number, iconSize?: number, className? : string}) {
  const containerSize = radius * 2 + iconSize;
  const center = containerSize / 2;

  return (
    <figure
      style={{
        position: 'relative',
        width: `${containerSize}px`,
        height: `${containerSize}px`
      }}
      className={cn("",className)}
    >
      {Array.from({ length: n }).map((_, i) => {
        const angle = (360 / n) * i + 90;
        const rad = (angle * Math.PI) / 180;
        // Center the icon by subtracting half its size
        const x = center + radius * Math.cos(rad) - iconSize / 2;
        const y = center - radius * Math.sin(rad) - iconSize / 2;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`
            }}
          >
            <Icon
              src="star"
              type={"color"}
              width={iconSize}
              height={iconSize}
              title="Star"
            />
          </div>
        );
      })}
    </figure>
  );
}

