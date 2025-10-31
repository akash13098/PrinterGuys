import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">PG</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                PrinterGuys
              </span>
            </div>
            <p className="text-gray-400">
              Your one-stop destination for custom printed apparel and premium clothing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/printer_guys?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-yellow-400 transition-colors">Shop</Link></li>
              <li><Link to="/customizer" className="text-gray-400 hover:text-yellow-400 transition-colors">Customizer</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Custom T-Shirts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Hoodies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Premium Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Bulk Orders</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-yellow-400" />
                <span className="text-gray-400">printerguy1007@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-yellow-400" />
                <span className="text-gray-400">+91 9529279003</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-yellow-400" />
                <span className="text-gray-400">Uma Nagari, Solapur</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 PrinterGuys. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;