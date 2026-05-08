import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ContactSection from '@/components/ContactSection';
import TechMarquee from '@/components/TechMarquee';
import BentoAbout from '@/components/BentoAbout';
import IdentitySection from '@/components/IdentitySection';
import { Reveal } from '@/components/Reveal';
import { PROJECTS } from '@/data/mockData';

export default async function Home() {
  const displayProjects = PROJECTS;

  return (
    <main className="min-h-screen bg-[#010101]">
      <Hero />
      <IdentitySection />


      <section id="projects" className="py-24 md:py-60 relative">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-20 md:mb-32">
              <div className="flex items-center gap-4 text-neon-cyan font-mono text-[11px] tracking-[0.4em] uppercase mb-8">
                Selected_Works
              </div>
              <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-8">
                <span className="text-white block">PROJECT</span>
                <span className="text-zinc-900 block">ARCHIVE</span>
              </h2>
              <p className="max-w-2xl text-zinc-500 text-lg md:text-xl lg:text-2xl font-medium leading-tight text-left">
                A collection of high-fidelity SaaS projects built for scalability and performance.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {displayProjects.map((project) => (
              <Reveal key={project.id}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TechMarquee />

      <Reveal>
        <BentoAbout />
      </Reveal>

      <Reveal>
        <ContactSection />
      </Reveal>

      <footer className="py-12 md:py-20 border-t border-white/[0.05] text-center">
        <p className="text-zinc-800 font-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase px-6">
          Eugene L. Bulabog // 2026 // ALL_RIGHTS_RESERVED
        </p>
      </footer>
    </main>
  );
}
