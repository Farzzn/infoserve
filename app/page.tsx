// File: app/page.tsx
// This is the homepage, simplified with hardcoded Malayalam text.

import HeroSlideshow from './components/HeroSlideshow';

export default function HomePage() {
  return (
    <div>

      <section className="hero">
        <HeroSlideshow />
      </section>

      <section className="featured-services">
        <h3>Our Services</h3>
        <div className="service-list">
          <div className="service-item">
            <h4>സർക്കാർ സേവനങ്ങൾ</h4>
            <p>ആധാർ, പാൻ കാർഡ്, പാസ്‌പോർട്ട് തുടങ്ങിയ എല്ലാ സർക്കാർ സേവനങ്ങളും.</p>
          </div>
          <div className="service-item">
            <h4>ബിൽ പേയ്മെന്റുകൾ</h4>
            <p>വൈദ്യുതി, വെള്ളം, ഫോൺ, മറ്റ് യൂട്ടിലിറ്റി ബില്ലുകൾ തൽക്ഷണം അടയ്ക്കാം.</p>
          </div>
          <div className="service-item">
            <h4>യാത്രാ ബുക്കിംഗ്</h4>
            <p>നിങ്ങളുടെ അടുത്ത യാത്രയ്ക്കായി ട്രെയിൻ, ബസ് ടിക്കറ്റുകൾ എളുപ്പത്തിൽ ബുക്ക് ചെയ്യാം.</p>
          </div>
        </div>
      </section>
    </div>
  );
}