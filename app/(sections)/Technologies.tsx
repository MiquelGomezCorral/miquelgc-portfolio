
import cn from 'classnames';
import GlowingText from "@/app/(utils)/(components)/GlowingText";
import { IconLink, IconCopy, Icon } from "@/app/(utils)/(components)/IconsButtons";
import { TechnologyCathegories, TechnologyCathegoryType } from '@/app/(utils)/(constants)/technologies.d';
import { TechnologyList } from '@/app/(utils)/(components)/Technologies';



export default function TechnologiesSection() {

  return (
    <section id="technologies" className="w-full flex flex-col gap-6 group">
      <header className="w-full py-4 border-b-2 border-b-miquel-white-200/50 text-5xl font-bold transform duration-300 flex gap-2">
        <GlowingText>
          <Icon 
            src={`terminal`}
            width={50}
            height={50}
            color
            title={'technologies'}
          />
        </GlowingText>
        {"Tecnologías"}
      </header>

      <main className="grid grid-cols-2 gap-4">
        {TechnologyCathegories.map((object, idx) => 
          <ExperienceCard key={idx} object={object} />
        )}
      </main>
    
    </section>
  )
}

function ExperienceCard({ object }: { object: TechnologyCathegoryType }) {
  return( 
    <li 
      className={
        "h-full hover:bg-miquel-black-400/40 rounded-xl transform duration-300 group/li "+
        "gap-4 p-4 flex flex-col justify-between list-none"
    }>
      <main className="flex flex-col gap-4">
        <header className="w-full h-full flex flex-col md:justify-start justify-center md:items-start items-center gap-4">
          <h2 className="text-2xl flex items-end md:justify-start justify-center gap-3">
            <GlowingText bold>{object.title}</GlowingText>
          </h2>
          <p className="opacity-70">{object.description}</p>

        </header>
        <article className='flex flex-col gap-4'>
          <section className="w-full flex gap-2 "> 
            <figure className=
              {'flex-shrink-0 w-1/3 h-16 bg-miquel-black-150/40 hover:bg-transparent transform duration-300 ' +
               'rounded-md flex justify-start items-center gap-2 px-1 group/s5'
              }
            >
              {Array(5).fill(0).map((_, i) => 
                <Icon key={i} src='star' color width={30} height={30} title='star' className='group-hover/s5:scale-110'/>
              )}
            </figure>
            <aside>
              <TechnologyList technologies={object.techStars45}/>
            </aside>
          </section>
          <section className="w-full flex gap-2 "> 
            <figure className=
              {'flex-shrink-0 w-1/3 h-16 bg-miquel-black-150/40 hover:bg-transparent transform duration-300 ' +
               'rounded-md flex justify-start items-center gap-2 px-1 group/s3'
              }
            >
              {Array(3).fill(0).map((_, i) => 
                <Icon key={i} src='star' color width={30} height={30} title='star' className=' group-hover/s3:scale-110'/>
              )}
            </figure>
            <aside className='flex flex-wrap '>
              <TechnologyList technologies={object.tehcStars34}/>
            </aside>
          </section>
      

        </article> 
      </main>
      
    </li>
)}

