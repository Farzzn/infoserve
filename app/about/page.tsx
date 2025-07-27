
// File: app/about/page.tsx

import type { Metadata } from 'next';

// Metadata for the About page
export const metadata: Metadata = {
  title: 'About Us - InfoServe CSC Karathode',
  description: 'Learn more about the goals and services of InfoServe CSC Center Karathode.',
};

export default function AboutPage() {
  return (
    <div className="page-container">
     
    <h1 className="page-title">About Us</h1>
    
    <div className="about-content">
      <p className="intro-paragraph">
        InfoServe CSC Center Karathode is your trusted digital service center in Karathode. We operate with the goal of delivering government and private services quickly and easily to the public. We provide a simple solution for all your digital needs.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our main mission is to simplify the lives of ordinary people through technology. We are committed to making complex online procedures simple and digital services accessible to everyone.
      </p>

      <h2>Why Choose Us?</h2>
      <div className="features-grid">
        <div className="feature-item">
        <h3>Reliable Service</h3>
        <p>We ensure your trust by providing accurate and transparent services.</p>
        </div>
        <div className="feature-item">
        <h3>Wide Range of Services</h3>
        <p>From Aadhaar and PAN card to bill payments and ticket booking, everything in one place.</p>
        </div>
        <div className="feature-item">
        <h3>Friendly Approach</h3>
        <p>We are always ready to clear your doubts and provide the necessary assistance.</p>
        </div>
      </div>
      
      <p className="closing-paragraph">
        Visit our center today and let us fulfill your digital needs!
      </p>
    </div>
    </div>
  );
}