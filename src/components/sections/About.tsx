import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

/**
 * About Section
 * 
 * Implements the introductory section of the website including:
 * - Header with Name and Social Links
 * - Interactive Canvas Element (Placeholder for PokéBall effect)
 * - Narrative Bio with grey-to-white transition on links
 * - Grid-based Experience, Work, and Other information
 * 
 * Design Details:
 * - Font: Inter (Headings), JetBrains Mono (Body)
 * - Animations: fade-in-up with progressive delays (400ms, 700ms, 900ms+)
 * - Links: Muted grey (#9CA3AF) transitioning to White (#FFFFFF) with dotted underline
 */

const About = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-8 text-[#9ca3af]">
        
        {/* Header Section: Name, Socials, and Canvas Asset */}
        <div className="flex justify-between items-center animate-fade-in-up gap-4">
          <div className="flex flex-col">
            <h1 className="text-[30px] font-semibold mb-3 font-sans text-white leading-tight">
              Sritan Motati
            </h1>
            <div className="flex gap-4 outline-none">
              <a 
                href="https://github.com/sritanmotati" 
                className="text-[#9ca3af] hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/sritan/" 
                className="text-[#9ca3af] hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:sritan@a37.ai" 
                className="text-[#9ca3af] hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <canvas 
              width="85" 
              height="85" 
              className="block opacity-80"
              title="Interactive PokéBall Visual"
            />
          </div>
        </div>

        {/* Introductory Paragraph Section */}
        <section className="animate-fade-in-up delay-400">
          <p className="leading-relaxed text-[16px] font-mono">
            Hey, I'm Sritan. I'm currently tackling DevOps at{' '}
            <a 
              href="https://a37.ai" 
              className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200"
            >
              a37
            </a>. Previously studied at{' '}
            <a 
              href="https://fisher.wharton.upenn.edu" 
              className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200"
            >
              Penn M&T
            </a>. I'm excited about AI, product engineering, and infrastructure.
          </p>
        </section>

        {/* Content Grid: Experience, Work, Other */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Experience Column */}
          <div>
            <h2 className="text-[18px] font-semibold mb-4 font-sans text-white animate-fade-in-up delay-700">
              Experience
            </h2>
            <ul className="space-y-3 font-mono">
              <li className="text-[14px] leading-relaxed animate-fade-in-up delay-900">
                <div className="text-[12px] italic text-[#6b7280] mb-1">01</div>
                <p>
                  Co-founded{' '}
                  <a href="https://a37.ai" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">a37</a>
                  {' '}to build{' '}
                  <a href="https://tryforge.ai" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">Forge</a>, an AI-native workspace for DevOps.
                </p>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1100ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">02</div>
                <p>
                  Led engineering at{' '}
                  <a href="https://vytal.ai" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">Vytal.ai</a>. Built lightweight gaze tracking algorithms and the surrounding software and infrastructure.
                </p>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1300ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">03</div>
                <p>
                  Joined{' '}
                  <a href="https://contrary.com" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">Contrary</a>
                  {' '}as a venture partner. Early-stage investing.
                </p>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1500ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">04</div>
                <p>
                  Maintained infrastructure for{' '}
                  <a href="https://pennlabs.org" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">Penn Labs</a>
                  {' '}as a DevOps engineer.
                </p>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1700ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">05</div>
                <p>
                  Worked on applied AI research across many disciplines. See my{' '}
                  <a href="https://scholar.google.com" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">Google Scholar</a>
                  {' '}for more.
                </p>
              </li>
            </ul>
          </div>

          {/* Work Column */}
          <div>
            <h2 className="text-[18px] font-semibold mb-4 font-sans text-white animate-fade-in-up delay-700">
              Work
            </h2>
            <ul className="space-y-3 font-mono">
              <li className="text-[14px] leading-relaxed animate-fade-in-up delay-900">
                <div className="text-[12px] italic text-[#6b7280] mb-1">01</div>
                <p>
                  Trained video foundation models for cataract surgery at the{' '}
                  <a href="https://ophai.hms.harvard.edu" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">Harvard Ophthalmology AI Lab</a>.
                </p>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1100ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">02</div>
                <p>
                  Explored few-shot omics translation with autoencoders at Stanford's{' '}
                  <a href="https://nalab.stanford.edu" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">Aghaeepour Lab</a>.
                </p>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1300ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">03</div>
                <p>
                  Designed physics-informed AI methods for acoustics simulations at the{' '}
                  <a href="https://www.nrl.navy.mil" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">Naval Research Laboratory</a>.
                </p>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1500ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">04</div>
                <p>
                  Built methods for text-to-3D design and printing with diffusion. Won 1st at{' '}
                  <a href="https://isef.net" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">ISEF</a>.
                </p>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1700ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">05</div>
                <p>
                  Automated ear infection screening with a 3D-printed mobile otoscope. Presented at{' '}
                  <a href="https://isef.net" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">ISEF</a> and MICCAI 2023.
                </p>
              </li>
            </ul>
          </div>

          {/* Other Column */}
          <div>
            <h2 className="text-[18px] font-semibold mb-4 font-sans text-white animate-fade-in-up delay-700">
              Other
            </h2>
            <ul className="space-y-3 font-mono">
              <li className="text-[14px] leading-relaxed animate-fade-in-up delay-900">
                <div className="text-[12px] italic text-[#6b7280] mb-1">01</div>
                <p>Based in San Francisco, CA. Always down to chat.</p>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1100ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">02</div>
                <div>
                  <p className="mb-1">Some of my favorite reads.</p>
                  <ol className="list-decimal list-outside pl-5 space-y-0.5 text-[#9ca3af]">
                    <li>When Breath Becomes Air</li>
                    <li>Steve Jobs (Isaacson)</li>
                    <li>The Aeneid (Virgil)</li>
                    <li>One Piece (Oda)</li>
                  </ol>
                </div>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1300ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">03</div>
                <div>
                  <p className="mb-1">Big fan of...</p>
                  <ol className="list-decimal list-outside pl-5 space-y-0.5 text-[#9ca3af]">
                    <li>Cleveland Cavaliers</li>
                    <li>Afrobeats and hip-hop</li>
                    <li>Pushing to prod ;)</li>
                  </ol>
                </div>
              </li>
              <li className="text-[14px] leading-relaxed animate-fade-in-up [animation-delay:1500ms]">
                <div className="text-[12px] italic text-[#6b7280] mb-1">04</div>
                <p>
                  Other affiliations: TJHSST (ML Club),{' '}
                  <a href="https://www.zfellows.com" className="text-[#9ca3af] hover:text-white border-b border-dotted border-[#374151] hover:border-white transition-all duration-200">Z Fellows</a>
                </p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;