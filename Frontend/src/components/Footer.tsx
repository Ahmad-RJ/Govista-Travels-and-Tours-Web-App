import { Link } from "wouter";
import { Plane } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <Plane className="h-5 w-5 text-secondary" /> GoVista
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium travel experiences curated for the modern explorer.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/"><span className="hover:text-secondary cursor-pointer">Home</span></Link></li>
              <li><Link href="/about"><span className="hover:text-secondary cursor-pointer">About Us</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-secondary cursor-pointer">Contact</span></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="hover:text-secondary cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-secondary cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-secondary cursor-pointer">Privacy Policy</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span>support@govista.com</span>
              <span>+92 300 1234567</span>
              <span>Lahore, Pakistan</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © 2024 GoVista. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
