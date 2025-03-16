
import React from 'react';

const Footer = () => (
  <footer className="bg-gray-100 py-12 mt-16">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">About Us</h3>
          <p className="text-gray-600 text-sm">
            We're dedicated to providing exceptional skincare services tailored to your unique needs.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="/services" className="text-gray-600 hover:text-primary text-sm">Facials</a></li>
            <li><a href="/services" className="text-gray-600 hover:text-primary text-sm">Treatments</a></li>
            <li><a href="/services" className="text-gray-600 hover:text-primary text-sm">Consultations</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Contact</h3>
          <address className="not-italic text-gray-600 text-sm">
            <p>123 Beauty Lane</p>
            <p>Wellness City, WC 12345</p>
            <p className="mt-2">Phone: (123) 456-7890</p>
            <p>Email: hello@skincarebeauty.com</p>
          </address>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Hours</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>Monday - Friday: 9am - 8pm</li>
            <li>Saturday: 10am - 6pm</li>
            <li>Sunday: 10am - 4pm</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Skincare Beauty Center. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
