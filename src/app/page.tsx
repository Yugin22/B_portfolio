import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ContactSection from '@/components/ContactSection';
import TechMarquee from '@/components/TechMarquee';
import BentoAbout from '@/components/BentoAbout';
import { Reveal } from '@/components/Reveal';
import { createServerSideClient } from '@/lib/supabase';

const FALLBACK_PROJECTS = [
  {
    id: '1',
    title: 'SECURE-TICKET V2',
    description: 'Professional ticketing system for enterprise support teams. Features real-time conversation sync, role-based access control (RBAC), and automated SLA tracking.',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    live_url: '#',
    repo_url: '#',
    tags: ['NEXT.JS', 'SUPABASE', 'REALTIME', 'RBAC']
  },
  {
    id: '2',
    title: 'ANALYTICS-NODE',
    description: 'High-performance dashboard for monitoring digital ecosystems. Reduced load times by 40% using optimized server components and edge-caching.',
    image_url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop',
    live_url: '#',
    repo_url: '#',
    tags: ['REACT', 'POSTGRES', 'RECHARTS']
  },
  {
    id: '3',
    title: 'SAAS-FLOW PRO',
    description: 'Automated workflow engine for SaaS startups. Includes clean dashboard UI, secure payment integration, and dynamic user onboarding.',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
    live_url: '#',
    repo_url: '#',
    tags: ['TAILWIND', 'NEXTJS', 'STRIPE']
  }
];

export default async function Home() {
  const supabase = await createServerSideClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  const displayProjects = projects && projects.length > 0 ? projects : FALLBACK_PROJECTS;

  return (
    <main className="min-h-screen bg-[#010101]">
      <Hero />

      <section id="projects" className="py-60 relative">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-12 mb-32 items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 text-neon-cyan font-mono text-[11px] tracking-[0.4em] uppercase mb-8">
                  Selected_Works
                </div>
                <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.8] mb-0">
                  <span className="text-white block">PROJECT</span>
                  <span className="text-zinc-900 block">ARCHIVE</span>
                </h2>
              </div>
              <div className="lg:col-span-4 pb-6">
                <p className="max-w-sm text-zinc-500 text-xl md:text-2xl font-medium leading-tight text-left lg:text-right ml-auto">
                  A collection of high-fidelity SaaS projects built for scalability and performance.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

      <footer className="py-20 border-t border-white/[0.05] text-center">
        <p className="text-zinc-800 font-mono text-xs tracking-[0.5em] uppercase">
          Eugene L. Bulabog // 2026 // ALL_RIGHTS_RESERVED
        </p>
      </footer>
    </main>
  );
}
