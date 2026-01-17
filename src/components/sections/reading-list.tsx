import React from 'react';

const ReadingList = () => {
  // Data for the reading list as seen in the content and screenshots
  const readings = [
    { title: '"Siddhartha"', author: 'by Hermann Hesse' },
    { title: '"The Last Question"', author: 'by Isaac Asimov' },
    { title: '"The Art of Doing Science and Engineering"', author: 'by Richard Hamming' },
    { title: '"The Stoker"', author: 'by Franz Kafka' },
  ];

  return (
    <section className="mt-[30px] pt-[15px]">
      {/* Horizontal Rule as seen in visual instructions and high-level design */}
      <hr className="border-t border-[#BBBBBB] border-solid mb-[1.5rem] mt-0 w-full" />
      
      <div className="readings">
        <h2 
          className="text-[#222222] font-serif font-normal block mb-[10px] mt-[13.28px]"
          style={{ 
            fontSize: '13.5px', 
            lineHeight: '1.6' 
          }}
        >
          Readings I Think Are Important
        </h2>
        
        <ul className="list-none p-0 m-0 block">
          {readings.map((reading, index) => (
            <li 
              key={index} 
              className="mb-[4px] block font-serif"
              style={{ 
                fontSize: '13.5px', 
                lineHeight: '1.6',
                color: '#222222'
              }}
            >
              <span className="text-[#222222]">{reading.title}</span>
              {' '}
              <span 
                className="text-[#777777]" 
                style={{ 
                  fontSize: '13px' 
                }}
              >
                {reading.author}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReadingList;