import React, { useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

/**
 * Hero component for the portfolio.
 * Features:
 * - Sritan Motati's name and social links.
 * - Interactive Canvas-based "PokeBall" sphere replacing the original dot-sphere.
 * - Rustic aesthetic with fade-in animations.
 * - Responsive 3-column layout below the intro text.
 */
const Hero = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-8 text-gray-400">
        {/* Header Section */}
        <div className="flex justify-between items-center animate-fade-in delay-0 gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold mb-3 font-header text-white tracking-tighter" style={{ fontSize: "30px", fontFamily: 'var(--font-sans)' }}>
              Sritan Motati
            </h1>
            <div className="flex gap-4 outline-none">
              <a
                className="hover:text-white transition-colors border-none p-0"
                href="https://github.com/sritanmotati"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} strokeWidth={1.5} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                className="hover:text-white transition-colors border-none p-0"
                href="https://www.linkedin.com/in/sritan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} strokeWidth={1.5} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                className="hover:text-white transition-colors border-none p-0"
                href="mailto:sritan@a37.ai"
              >
                <Mail size={20} strokeWidth={1.5} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <PokeBallCanvas />
          </div>
        </div>

        {/* Bio Section */}
        <section className="animate-fade-in delay-400">
          <p className="leading-relaxed text-base" style={{ fontSize: "16px", color: "rgb(156, 163, 175)" }}>
            Hey, I'm Sritan. I'm currently tackling DevOps at{" "}
            <a className="hover:text-white transition-colors border-dotted border-b border-gray-600" href="https://a37.ai">
              a37
            </a>
            . Previously studied at{" "}
            <a className="hover:text-white transition-colors border-dotted border-b border-gray-600" href="https://fisher.wharton.upenn.edu">
              Penn M&T
            </a>
            . I'm excited about AI, product engineering, and infrastructure.
          </p>
        </section>

        {/* Main Grid Content */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Experience Column */}
          <div>
            <h2 className="text-lg font-semibold mb-4 font-header text-white animate-fade-in delay-700" style={{ fontSize: "18px" }}>
              Experience
            </h2>
            <ul className="space-y-3">
              <ExperienceItem number="01" delay="delay-900">
                Co-founded <a href="https://a37.ai" className="hover:text-white border-dotted border-b border-gray-600">a37</a> to build <a href="https://tryforge.ai" className="hover:text-white border-dotted border-b border-gray-600">Forge</a>, an AI-native workspace for DevOps.
              </ExperienceItem>
              <ExperienceItem number="02" delay="delay-1100">
                Led engineering at <a href="https://www.forbes.com/sites/craigsmith/2023/09/05/teens-launch-125m-eye-scan-startup-to-detect-dementia/" className="hover:text-white border-dotted border-b border-gray-600">Vytal.ai</a>. Built lightweight gaze tracking algorithms and surrounding software.
              </ExperienceItem>
              <ExperienceItem number="03" delay="delay-1300">
                Joined <a href="https://contrary.com" className="hover:text-white border-dotted border-b border-gray-600">Contrary</a> as a venture partner. Early-stage investing.
              </ExperienceItem>
              <ExperienceItem number="04" delay="delay-1500">
                Maintained infrastructure for <a href="https://pennlabs.org" className="hover:text-white border-dotted border-b border-gray-600">Penn Labs</a> as a DevOps engineer.
              </ExperienceItem>
              <ExperienceItem number="05" delay="delay-1700">
                Worked on applied AI research. See my <a href="https://scholar.google.com/citations?user=QZNuPBQAAAAJ&hl=en" className="hover:text-white border-dotted border-b border-gray-600">Google Scholar</a> for more.
              </ExperienceItem>
            </ul>
          </div>

          {/* Work Column */}
          <div>
            <h2 className="text-lg font-semibold mb-4 font-header text-white animate-fade-in delay-700" style={{ fontSize: "18px" }}>
              Work
            </h2>
            <ul className="space-y-3">
              <ExperienceItem number="01" delay="delay-900">
                Trained video foundation models for cataract surgery at the <a href="https://ophai.hms.harvard.edu" className="hover:text-white border-dotted border-b border-gray-600">Harvard Ophthalmology AI Lab</a>.
              </ExperienceItem>
              <ExperienceItem number="02" delay="delay-1100">
                Explored few-shot omics translation at Stanford&apos;s <a href="https://nalab.stanford.edu" className="hover:text-white border-dotted border-b border-gray-600">Aghaeepour Lab</a>.
              </ExperienceItem>
              <ExperienceItem number="03" delay="delay-1300">
                Designed physics-informed AI methods for acoustics at the <a href="https://www.nrl.navy.mil/itd/aic/" className="hover:text-white border-dotted border-b border-gray-600">Naval Research Laboratory</a>.
              </ExperienceItem>
              <ExperienceItem number="04" delay="delay-1500">
                Built methods for text-to-3D printing with diffusion. Won 1st at <a href="https://isef.net/project/teca019t-diffusion-based-3d-art-generation" className="hover:text-white border-dotted border-b border-gray-600">ISEF</a>.
              </ExperienceItem>
              <ExperienceItem number="05" delay="delay-1700">
                Automated ear infection screening with a mobile otoscope. <a href="https://isef.net/project/tmed042t-otitis-media-diagnosis-with-smartphones" className="hover:text-white border-dotted border-b border-gray-600">ISEF</a> & <a href="https://dl.acm.org/doi/10.1007/978-3-031-47076-9_16" className="hover:text-white border-dotted border-b border-gray-600">MICCAI 2023</a>.
              </ExperienceItem>
            </ul>
          </div>

          {/* Other Column */}
          <div>
            <h2 className="text-lg font-semibold mb-4 font-header text-white animate-fade-in delay-700" style={{ fontSize: "18px" }}>
              Other
            </h2>
            <ul className="space-y-3">
              <ExperienceItem number="01" delay="delay-900">
                Based in San Francisco, CA. Always down to chat.
              </ExperienceItem>
              <ExperienceItem number="02" delay="delay-1100">
                <p>Some of my favorite reads.</p>
                <ol className="list-decimal list-outside pl-5 mt-1 space-y-0.5" style={{ fontSize: "12px" }}>
                  <li className="pl-0.5">When Breath Becomes Air</li>
                  <li className="pl-0.5">Steve Jobs (Isaacson)</li>
                  <li className="pl-0.5">The Aeneid (Virgil)</li>
                  <li className="pl-0.5">One Piece (Oda)</li>
                </ol>
              </ExperienceItem>
              <ExperienceItem number="03" delay="delay-1300">
                <p>Big fan of...</p>
                <ol className="list-decimal list-outside pl-5 mt-1 space-y-0.5" style={{ fontSize: "12px" }}>
                  <li className="pl-0.5">Cleveland Cavaliers</li>
                  <li className="pl-0.5">Afrobeats and hip-hop</li>
                  <li className="pl-0.5">Pushing to prod ;)</li>
                </ol>
              </ExperienceItem>
              <ExperienceItem number="04" delay="delay-1500">
                Other affiliations: TJHSST (ML Club), <a href="https://www.zfellows.com" className="hover:text-white border-dotted border-b border-gray-600">Z Fellows</a>
              </ExperienceItem>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

/**
 * Sub-component for individual list items in the grid columns.
 */
const ExperienceItem = ({ number, children, delay }: { number: string; children: React.ReactNode; delay: string }) => (
  <li className={`text-xs leading-relaxed animate-fade-in-up ${delay}`} style={{ opacity: 0 }}>
    <div className="text-[10px] italic text-gray-500 mb-1 font-mono tracking-widest">{number}</div>
    <div style={{ fontSize: '14px' }}>{children}</div>
  </li>
);

/**
 * Interactive canvas element that renders a stylized dot-sphere
 * approximating the 'Pokemon Ball' request from the instructions.
 * Replaces the static generated dot-sphere.
 */
const PokeBallCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotationX = 0;
    let rotationY = 0;

    const points: { x: number; y: number; z: number }[] = [];
    const count = 300;
    const radius = 38;

    // Generate points on a sphere
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Update rotation
      rotationX += 0.003;
      rotationY += 0.005;

      points.forEach((p) => {
        // Rotate X
        let y1 = p.y * Math.cos(rotationX) - p.z * Math.sin(rotationX);
        let z1 = p.y * Math.sin(rotationX) + p.z * Math.cos(rotationX);
        
        // Rotate Y
        let x2 = p.x * Math.cos(rotationY) + z1 * Math.sin(rotationY);
        let z2 = -p.x * Math.sin(rotationY) + z1 * Math.cos(rotationY);

        // Perspective
        const scale = 200 / (200 + z2);
        const x2d = x2 * scale + centerX;
        const y2d = y1 * scale + centerY;

        // Visual distinction for "PokeBall" top/bottom (simplified coloring)
        // Upper hemisphere points are slightly brighter
        const opacity = (z2 + radius) / (2 * radius) * 0.5 + 0.1;
        const isUpper = y1 < -2; // Stylized "red" top
        ctx.fillStyle = isUpper ? `rgba(255, 255, 255, ${opacity + 0.2})` : `rgba(156, 163, 175, ${opacity})`;
        
        // Center belt points differentiator
        if (Math.abs(y1) < 1.5) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity + 0.4})`;
        }

        ctx.beginPath();
        ctx.arc(x2d, y2d, 0.8 * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={85}
      height={85}
      className="block opacity-80 hover:opacity-100 transition-opacity cursor-crosshair"
      style={{ width: "85px", height: "85px" }}
    />
  );
};

export default Hero;