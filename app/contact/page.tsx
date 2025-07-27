
import type { Metadata } from 'next';
import './contact.css'; // We'll create this CSS file

export const metadata: Metadata = {
  title: 'ബന്ധപ്പെടുക - ഇൻഫോസെർവ് CSC കാരത്തോട്',
  description: 'ഞങ്ങളുടെ ലൊക്കേഷൻ കണ്ടെത്തുക, അല്ലെങ്കിൽ ഫോൺ, ഇമെയിൽ വഴി ഞങ്ങളെ ബന്ധപ്പെടുക.',
};

export default function ContactPage() {
  return (
    <div className="contact-container">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">
        Please feel free to reach out to us with your questions and requests.
      </p>

      <div className="contact-grid">
        {/* Left Side: Contact Information */}
        <div className="contact-details">
          <h3>Contact Information</h3>
          <div className="detail-item">
            <h4>📍 Address</h4>
            <p>
              Infoservec CSC Center,<br />
              Karathode Auto Stand Junction,<br />
              Oorakam Melmuri P.O,<br />
              Malappuram, Kerala
            </p>
          </div>
          <div className="detail-item">
            <h4>📞 Phone</h4>
            <p>+91 9048872669</p>
          </div>
          <div className="detail-item">
            <h4>✉️ Email</h4>
            <p>infoserve@gmail.com</p>
          </div>
          <div className="detail-item">
            <h4>⏰ Working Hours</h4>
            <p>
              Monday - Saturday: 9:00 AM - 9:00 PM<br />
              Sunday: 5:00 PM - 9:00 PM
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-container">
          <h3>Send a Message</h3>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="submit-button">Send</button>
          </form>
        </div>
      </div>

      {/* Google Maps Section */}
      <div className="map-container">
        <h3>Find Us Here</h3>
        <p>Use the map below to locate our center:</p>
        <div className="map-responsive">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.655866190419!2d76.0396903152668!3d11.06497399212674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63a3a4e5f6a6b%3A0x8d34bbc65955047!2sKarathode%20Auto%20Stand!5e0!3m2!1sen!2sin!4v1690288812345!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}