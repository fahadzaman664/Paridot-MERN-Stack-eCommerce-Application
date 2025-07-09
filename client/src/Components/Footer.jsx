// components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-4">Paridot</h2>
          <p className="text-sm text-gray-300">
            Your go-to destination for clothing and perfumes.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/" className="hover:text-white">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/return-policy" className="hover:text-white">Return Policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email: fahadzaman664@gmail.com</li>
            <li>Phone: +92 317 6195489</li>
            <li>Location: Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Paridot. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
