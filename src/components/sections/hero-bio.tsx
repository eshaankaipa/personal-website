import React from 'react';

const HeroBio = () => {
  return (
    <section className="min-h-screen bg-[#f2eee3] flex items-center justify-center font-serif text-[#222222] selection:bg-[#4b55a3] selection:text-[#f2eee3]">
      <div className="w-full max-w-[520px] px-10 py-[15vh]">
        <div className="flex flex-col space-y-5">
          {/* Introduction */}
          <p className="text-[16px] leading-[1.6] m-0">
            Hi, my name is Rohan. I currently work for{' '}
            <a 
              href="https://a37.ai" 
              className="text-[#4b55a3] hover:underline transition-opacity duration-200"
            >
              a37.ai
            </a>.
          </p>

          <p className="text-[16px] leading-[1.6] m-0">
            In the past, I built a company, invested, and worked on artificial intelligence research.
          </p>

          <p className="text-[16px] leading-[1.6] m-0">
            Feel free to reach out at{' '}
            <a 
              href="mailto:kalahastyrohan@gmail.com" 
              className="text-[#4b55a3] hover:underline transition-opacity duration-200"
            >
              kalahastyrohan@gmail.com
            </a>.
          </p>

          {/* Navigation Links */}
          <div className="pt-5 flex items-center space-x-2 text-[16px]">
            <a 
              href="/photography" 
              className="text-[#4b55a3] hover:underline transition-opacity duration-200"
            >
              Photography
            </a>
            <span className="text-[#bbbbbb] text-[14px]">{"•"}</span>
            <a 
              href="/writings" 
              className="text-[#4b55a3] hover:underline transition-opacity duration-200"
            >
              Writings
            </a>
          </div>

          {/* Divider */}
          <hr className="border-0 border-t border-[#bbbbbb] my-6" />

          {/* Readings Section */}
          <div className="pt-4">
            <h2 className="text-[16px] leading-[1.6] font-normal mb-3 text-[#222222]">
              Readings I Think Are Important
            </h2>
            <ul className="list-none p-0 m-0 space-y-1">
              <li className="text-[16px] leading-[1.6]">
                "Siddhartha" <span className="text-[#777777]">by Hermann Hesse</span>
              </li>
              <li className="text-[16px] leading-[1.6]">
                "The Last Question" <span className="text-[#777777]">by Isaac Asimov</span>
              </li>
              <li className="text-[16px] leading-[1.6]">
                "The Art of Doing Science and Engineering" <span className="text-[#777777]">by Richard Hamming</span>
              </li>
              <li className="text-[16px] leading-[1.6]">
                "The Stoker" <span className="text-[#777777]">by Franz Kafka</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBio;