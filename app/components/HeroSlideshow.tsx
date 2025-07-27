// File: app/components/HeroSlideshow.tsx
'use client'; // This component needs to be a client component for hooks

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './HeroSlideshow.css'; // We'll create this CSS file next

// Define the structure for a single slide
interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

// The list of slides. You can add more objects here later.
const slides: Slide[] = [
  {
    image: '/train-booking-service2.png', // The path to your image in the `public` folder
    title: 'Book Tickets for Your Next Destination',
    subtitle: 'Through IRCTC Authorized Agent'
  },
    {
    image: '/vehicle-services.png', // The path to your image in the `public` folder
    title: 'Vehicle Related Services',
    subtitle: 'License Renewal, Insurance Policy, RC Transfer, and More'
  },
    {
    image: '/e-gov-services.png', // The path to your image in the `public` folder
    title: 'E-Governance Services',
    subtitle: 'Aadhaar Updates, PAN Card Services, Tax Filing, Income Certificate, and More'
  }
  // Add more slides here like this:
  // {
  //   image: '/path/to/another-image.jpg',
  //   title: 'മറ്റൊരു സേവനം',
  //   subtitle: 'അതിൻ്റെ വിവരണം'
  // }
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // This effect will handle changing the slide automatically.
  // It's paused for now since there's only one slide.
  useEffect(() => {
    if (slides.length > 1) {
      const timer = setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={index === 0} // Load the first image with high priority
          />
          <div className="slide-overlay"></div>
          <div className="slide-content">
            <h2 className="slide-title">{slide.title}</h2>
            <p className="slide-subtitle">{slide.subtitle}</p>
          </div>
        </div>
      ))}
      
      {/* Optional: Add navigation dots if you have more than one slide */}
      {slides.length > 1 && (
        <div className="slide-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlideshow;