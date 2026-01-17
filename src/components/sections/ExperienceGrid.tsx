import React from 'react';

const ExperienceGrid: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 animate-fade-in-up delay-[700ms]">
      {/* Experience Column */}
      <div>
        <h2 className="text-lg font-semibold mb-4 font-display text-white transition-opacity duration-700 animate-fade-in-up delay-700">
          Experience
        </h2>
        <ul className="space-y-3">
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-900 group">
            <div className="text-[12px] italic text-[#6B7280] mb-1">01</div>
            <p className="text-[#9CA3AF]">
              Co-founded <a href="https://a37.ai" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">a37</a> to build <a href="https://tryforge.ai" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">Forge</a>, an AI-native workspace for DevOps.
            </p>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1100ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">02</div>
            <p className="text-[#9CA3AF]">
              Led engineering at <a href="https://www.forbes.com/sites/craigsmith/2023/09/05/teens-launch-125m-eye-scan-startup-to-detect-dementia/" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">Vytal.ai</a>. Built lightweight gaze tracking algorithms and the surrounding software and infrastructure.
            </p>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1300ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">03</div>
            <p className="text-[#9CA3AF]">
              Joined <a href="https://contrary.com" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">Contrary</a> as a venture partner. Early-stage investing.
            </p>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1500ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">04</div>
            <p className="text-[#9CA3AF]">
              Maintained infrastructure for <a href="https://pennlabs.org" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">Penn Labs</a> as a DevOps engineer.
            </p>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1700ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">05</div>
            <p className="text-[#9CA3AF]">
              Worked on applied AI research across many disciplines. See my <a href="https://scholar.google.com/citations?user=QZNuPBQAAAAJ&hl=en" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">Google Scholar</a> for more.
            </p>
          </li>
        </ul>
      </div>

      {/* Work Column */}
      <div>
        <h2 className="text-lg font-semibold mb-4 font-display text-white transition-opacity duration-700 animate-fade-in-up delay-700">
          Work
        </h2>
        <ul className="space-y-3">
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-900">
            <div className="text-[12px] italic text-[#6B7280] mb-1">01</div>
            <p className="text-[#9CA3AF]">
              Trained video foundation models for cataract surgery at the <a href="https://ophai.hms.harvard.edu" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">Harvard Ophthalmology AI Lab</a>.
            </p>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1100ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">02</div>
            <p className="text-[#9CA3AF]">
              Explored few-shot omics translation with autoencoders at Stanford&apos;s <a href="https://nalab.stanford.edu" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">Aghaeepour Lab</a>.
            </p>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1300ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">03</div>
            <p className="text-[#9CA3AF]">
              Designed physics-informed AI methods for acoustics simulations at the <a href="https://www.nrl.navy.mil/itd/aic/" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">Naval Research Laboratory</a>.
            </p>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1500ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">04</div>
            <p className="text-[#9CA3AF]">
              Built methods for text-to-3D design, editing, and printing with diffusion. Won 1st at <a href="https://isef.net/project/teca019t-diffusion-based-3d-art-generation" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">ISEF</a>.
            </p>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1700ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">05</div>
            <p className="text-[#9CA3AF]">
              Automated ear infection screening with a 3D-printed mobile otoscope. Presented at <a href="https://isef.net/project/tmed042t-otitis-media-diagnosis-with-smartphones" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">ISEF</a> and <a href="https://dl.acm.org/doi/10.1007/978-3-031-47076-9_16" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">MICCAI 2023</a>.
            </p>
          </li>
        </ul>
      </div>

      {/* Other Column */}
      <div>
        <h2 className="text-lg font-semibold mb-4 font-display text-white transition-opacity duration-700 animate-fade-in-up delay-700">
          Other
        </h2>
        <ul className="space-y-3">
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-900">
            <div className="text-[12px] italic text-[#6B7280] mb-1">01</div>
            <p className="text-[#9CA3AF]">
              Based in San Francisco, CA. Always down to chat.
            </p>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1100ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">02</div>
            <div className="text-[#9CA3AF]">
              <p className="mb-1">Some of my favorite reads.</p>
              <ol className="list-decimal list-outside pl-8 space-y-0.5">
                <li className="pl-0.5">When Breath Becomes Air (Paul Kalanithi)</li>
                <li className="pl-0.5">Steve Jobs (Walter Isaacson)</li>
                <li className="pl-0.5">The Aeneid (Virgil)</li>
                <li className="pl-0.5">One Piece (Eiichiro Oda)</li>
              </ol>
            </div>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1300ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">03</div>
            <div className="text-[#9CA3AF]">
              <p className="mb-1">Big fan of...</p>
              <ol className="list-decimal list-outside pl-8 space-y-0.5">
                <li className="pl-0.5">Cleveland Cavaliers</li>
                <li className="pl-0.5">Afrobeats and hip-hop</li>
                <li className="pl-0.5">Pushing to prod ;)</li>
              </ol>
            </div>
          </li>
          <li className="text-[12px] leading-relaxed animate-fade-in-up delay-[1500ms]">
            <div className="text-[12px] italic text-[#6B7280] mb-1">04</div>
            <p className="text-[#9CA3AF]">
              Other affiliations: TJHSST (prev. ran <a href="https://tjmachinelearning.com" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">ML Club</a>), <a href="https://www.zfellows.com" className="text-[#9CA3AF] hover:text-white transition-colors border-b border-dotted border-[#374151] hover:border-white">Z Fellows</a>
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ExperienceGrid;