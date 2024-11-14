import React, { useState, useEffect } from 'react';

// react helmet
import { Helmet } from 'react-helmet';

// components
import ContentHeader from '../../../../../Shared/ContentHeader';
import OverviewFooter from '../../../../../Shared/OverviewFooter';
import Showcode from '../../../../../Shared/ShowCode';

// contents for scrollspy
import { carouselContents } from '../../../../../Utils/ContentsConfig/SurfacesContents';
import { useScrollSpy } from '../../../../../CustomHooks/useScrollSpy';

// icons
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = () => {
  const sectionIds = carouselContents.map((item) => item.href.slice(1));
  const activeSection = useScrollSpy(sectionIds);

  const [carouselPreview, setCarouselPreview] = useState(true);
  const [carouselCode, setCarouselCode] = useState(false);

  // Carousel state for first carousel
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const slides1 = [
    { id: 1, content: 'Carousel 1 - Slide 1 Content' },
    { id: 2, content: 'Carousel 1 - Slide 2 Content' },
    { id: 3, content: 'Carousel 1 - Slide 3 Content' },
  ];

  // Carousel state for second carousel
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const slides2 = [
    { id: 1, content: 'Carousel 2 - Slide 1 Content' },
    { id: 2, content: 'Carousel 2 - Slide 2 Content' },
    { id: 3, content: 'Carousel 2 - Slide 3 Content' },
  ];

  // Auto-advance carousel every 3 seconds for both carousels
  useEffect(() => {
    const autoSlide2 = setInterval(() => {
      setCurrentSlide2((prev) => (prev + 1) % slides2.length);
    }, 1000);

    return () => {
      clearInterval(autoSlide2);
    };
  }, [slides1.length, slides2.length]);

  const handleCarouselPreview = () => {
    setCarouselPreview(true);
    setCarouselCode(false);
  };

  const handleCarouselCode = () => {
    setCarouselCode(true);
    setCarouselPreview(false);
  };

  const nextSlide1 = () => {
    setCurrentSlide1((prev) => (prev + 1) % slides1.length);
  };

  const prevSlide1 = () => {
    setCurrentSlide1((prev) => (prev - 1 + slides1.length) % slides1.length);
  };

  const nextSlide2 = () => {
    setCurrentSlide2((prev) => (prev + 1) % slides2.length);
  };

  const prevSlide2 = () => {
    setCurrentSlide2((prev) => (prev - 1 + slides2.length) % slides2.length);
  };

  return (
    <>
      <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
        <div className='w-full 425px:w-[80%]'>
          <ContentHeader id='normal-carousel' text={'Carousel 1'} />

          <p className='w-full 425px:w-[80%] text-text text-[1rem]'>
            This is a carousel component with manual navigation to cycle through
            slides.
          </p>

          {/* First Carousel Container */}
          <div className='w-full 425px:w-[80%] border border-border rounded mt-8'>
            <div className='relative'>
              <div
                className={`absolute top-0 left-0 w-[90px] h-[40px] z-[1] bg-border transition-all duration-500 ${
                  carouselPreview
                    ? 'translate-x-[0px] !w-[100px]'
                    : 'translate-x-[106px] rounded-br'
                }`}
              ></div>
              <button
                className={`${
                  carouselPreview && 'text-tabTextColor'
                } px-6 py-2 border-b z-[2] relative text-text border-border`}
                onClick={handleCarouselPreview}
              >
                Preview
              </button>
              <button
                className={`${
                  carouselCode && 'text-tabTextColor'
                } px-6 py-2 border-r z-[2] relative text-text border-b rounded-br border-border`}
                onClick={handleCarouselCode}
              >
                Code
              </button>
            </div>

            {carouselPreview && (
              <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
                <div className='relative flex items-center justify-center w-full h-[200px] bg-primary rounded-lg'>
                  <FiChevronLeft
                    className='absolute left-5 text-secondary text-[1.8rem] cursor-pointer'
                    onClick={prevSlide1}
                  />
                  <div className='text-[1.3rem] text-secondary font-[600]'>
                    {slides1[currentSlide1].content}
                  </div>
                  <FiChevronRight
                    className='absolute right-5 text-secondary text-[1.8rem] cursor-pointer'
                    onClick={nextSlide1}
                  />
                </div>
              </div>
            )}

            {carouselCode && (
              <Showcode
                code={`
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CarouselComponent1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, content: "Carousel 1 - Slide 1 Content" },
    { id: 2, content: "Carousel 1 - Slide 2 Content" },
    { id: 3, content: "Carousel 1 - Slide 3 Content" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[200px] bg-primary rounded-lg">
      <FiChevronLeft
          className="absolute left-5 text-secondary text-[1.8rem] cursor-pointer"
          onClick={prevSlide}
      />
      <div className="text-[1.3rem] text-secondary font-[600]">
        {slides[currentSlide].content}
      </div>
      <FiChevronRight
          className="absolute right-5 text-secondary text-[1.8rem] cursor-pointer"
          onClick={nextSlide}
      />
    </div>
  );
};

export default CarouselComponent1;
                                `}
              />
            )}
          </div>

          {/* Second Carousel Container */}
          <div className='mt-8'>
            <ContentHeader id='second-carousel' text={'Carousel 2'} />
          </div>

          <p className='w-full 425px:w-[80%] text-text text-[1rem]'>
            This is a carousel component with automatic navigation to cycle
            through slides.
          </p>
          <div className='w-full 425px:w-[80%] border border-border rounded mt-8'>
            <div className='relative'>
              <div
                className={`absolute top-0 left-0 w-[90px] h-[40px] z-[1] bg-border transition-all duration-500 ${
                  carouselPreview
                    ? 'translate-x-[0px] !w-[100px]'
                    : 'translate-x-[106px] rounded-br'
                }`}
              ></div>
              <button
                className={`${
                  carouselPreview && 'text-tabTextColor'
                } px-6 py-2 border-b z-[2] relative text-text border-border`}
                onClick={handleCarouselPreview}
              >
                Preview
              </button>
              <button
                className={`${
                  carouselCode && 'text-tabTextColor'
                } px-6 py-2 border-r z-[2] relative text-text border-b rounded-br border-border`}
                onClick={handleCarouselCode}
              >
                Code
              </button>
            </div>

            {carouselPreview && (
              <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
                <div className='relative flex items-center justify-center w-full h-[200px] bg-primary rounded-lg'>
                  <FiChevronLeft
                    className='absolute left-5 text-secondary text-[1.8rem] cursor-pointer'
                    onClick={prevSlide2}
                  />
                  <div className='text-[1.3rem] text-secondary font-[600]'>
                    {slides2[currentSlide2].content}
                  </div>
                  <FiChevronRight
                    className='absolute right-5 text-secondary text-[1.8rem] cursor-pointer'
                    onClick={nextSlide2}
                  />
                </div>
              </div>
            )}

            {carouselCode && (
              <Showcode
                code={`
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CarouselComponent2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, content: "Carousel 2 - Slide 1 Content" },
    { id: 2, content: "Carousel 2 - Slide 2 Content" },
    { id: 3, content: "Carousel 2 - Slide 3 Content" },
  ];

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[200px] bg-primary rounded-lg">
      <FiChevronLeft
          className="absolute left-5 text-secondary text-[1.8rem] cursor-pointer"
          onClick={prevSlide}
      />
      <div className="text-[1.3rem] text-secondary font-[600]">
        {slides[currentSlide].content}
      </div>
      <FiChevronRight
          className="absolute right-5 text-secondary text-[1.8rem] cursor-pointer"
          onClick={nextSlide}
      />
    </div>
  );
};

export default CarouselComponent2;
                                `}
              />
            )}
          </div>

          <OverviewFooter
            backUrl='/components/image-gallery'
            backName='Image Gallery'
            forwardName='Pagination'
            forwardUrl='/components/pagination'
          />
        </div>

        <div className='1024px:flex hidden flex-col gap-4 sticky top-4 right-0 w-[35%]'>
          <h2 className='text-[0.9rem] font-[600] text-text tracking-widest'>
            CONTENTS
          </h2>
          {carouselContents.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`${
                activeSection === item.href.slice(1) &&
                '!text-primary !border-primary'
              } text-[0.9rem] text-text border-l border-transparent pl-4`}
            >
              {item.title}
            </a>
          ))}
        </div>
      </aside>
      <Helmet>
        <title>Components - Carousel</title>
      </Helmet>
    </>
  );
};

export default Carousel;
