
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import Logo from './ui/Logo';

const Footer = () => (
  <footer className="bg-gray-100 py-12 mt-16">
    <div className="container-custom">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-playfair font-medium mb-4">About Us</h3>
          <p className="text-gray-600 text-sm">
            At BeautyGlow, we're dedicated to providing exceptional skincare services tailored to your unique needs.
          </p>
          <div className="flex space-x-4 mt-4 justify-center md:justify-start">
            <a href="#" className="text-purple-500 hover:text-purple-700 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-purple-500 hover:text-purple-700 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-purple-500 hover:text-purple-700 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-playfair font-medium mb-4">Services</h3>
          <ul className="space-y-2">
            <li><Link to="/services" className="text-gray-600 hover:text-primary text-sm">Facials</Link></li>
            <li><Link to="/services" className="text-gray-600 hover:text-primary text-sm">Treatments</Link></li>
            <li><Link to="/services" className="text-gray-600 hover:text-primary text-sm">Consultations</Link></li>
            <li><Link to="/skin-test" className="text-gray-600 hover:text-primary text-sm">Skin Analysis</Link></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-playfair font-medium mb-4">Contact</h3>
          <address className="not-italic text-gray-600 text-sm">
            <p className="flex items-center justify-center md:justify-start mb-2">
              <MapPin size={16} className="mr-2 text-purple-500" />
              123 Beauty Lane, Wellness City, WC 12345
            </p>
            <p className="flex items-center justify-center md:justify-start mb-2">
              <Phone size={16} className="mr-2 text-purple-500" />
              (123) 456-7890
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <Mail size={16} className="mr-2 text-purple-500" />
              hello@beautyglow.com
            </p>
          </address>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-playfair font-medium mb-4">Hours</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>Monday - Friday: 9am - 8pm</li>
            <li>Saturday: 10am - 6pm</li>
            <li>Sunday: 10am - 4pm</li>
          </ul>
          <div className="mt-4">
            <Link to="/booking" className="text-purple-600 hover:text-purple-800 font-medium text-sm">
              Book an Appointment →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} BeautyGlow. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/privacy" className="text-gray-500 hover:text-gray-700">Privacy Policy</Link>
          <Link to="/terms" className="text-gray-500 hover:text-gray-700">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
