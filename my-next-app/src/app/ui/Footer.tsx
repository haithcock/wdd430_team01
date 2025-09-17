import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const navLinks = [
    { title: 'Features', href: '#' },
    { title: 'Learn More', href: '#' },
    { title: 'Contact', href: '#' },
    { title: 'About Us', href: '#' },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, href: 'https://twitter.com', 'aria-label': 'Twitter' },
    { icon: <FaGithub />, href: 'https://github.com', 'aria-label': 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com', 'aria-label': 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Mission */}
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2">
              Handcrafted Haven
            </h2>
            <p className="text-gray-400 text-sm max-w-xs">
              Discover unique handcrafted treasures from artisans around the world.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 tracking-wider">Product</h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 tracking-wider">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
          </p>
          <div className="flex items-center space-x-5">
            {socialLinks.map((link) => (
              <a key={link['aria-label']} href={link.href} aria-label={link['aria-label']} className="text-gray-500 hover:text-white transition-colors text-xl">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}