
import type { Metadata } from 'next';
import './services.css'; // We'll create this CSS file

// Metadata for the Services page
export const metadata: Metadata = {
  title: 'Our Services - Infoservec CSC',
  description: 'Explore the various services offered by Infoservec CSC, including train ticket booking, vehicle services, and e-governance solutions.',
};

export default function ServicesPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Our Services</h1>
      <div className="services-content">
        <p className="intro-paragraph">
          At Infoservec CSC, we offer a wide range of services to cater to your digital needs. From government services to private sector solutions, we are here to assist you.
        </p>

        <h2>Service Categories</h2>
        <div className="service-dropdowns">
            <details className="service-dropdown">
                <summary>Ticket Booking</summary>
                <ul>
                    <li>Train Ticket</li>
                    <li>Flight Ticket</li>
                    <li>Bus Ticket</li>
                </ul>
            </details>
            <details className="service-dropdown">
                <summary>Vehicle Services</summary>
                <ul>
                    <li>Vehicle Registration</li>
                    <li>Insurance Renewal</li>
                    <li>Pollution Certificate</li>
                </ul>
            </details>
            <details className="service-dropdown">
                <summary>E-Governance Solutions</summary>
                <ul>
                    <li>Aadhaar Services</li>
                    <li>PAN Card Services</li>
                    <li>Passport Assistance</li>
                </ul>
            </details>
            <details className="service-dropdown">
                <summary>Utility Bill Payments</summary>
                <ul>
                    <li>Electricity Bill</li>
                    <li>Water Bill</li>
                    <li>Gas Bill</li>
                </ul>
            </details>
            <details className="service-dropdown">
                <summary>Document Verification Services</summary>
                <ul>
                    <li>Educational Certificates</li>
                    <li>Identity Proofs</li>
                    <li>Address Proofs</li>
                </ul>
            </details>
        </div>

        <h2>Why Choose Us?</h2>
        <p>
          Our center is equipped with the latest technology and trained staff to ensure that you receive the best service possible. We are committed to making your experience smooth and hassle-free.
        </p>

        <p className="closing-paragraph">
          Visit us today to learn more about our services and how we can help you!
        </p>
      </div>
    </div>
  );
}