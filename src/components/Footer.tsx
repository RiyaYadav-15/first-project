import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  Globe2, 
  ExternalLink,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsAddAlumniModalOpen, setIsAuthModalOpen } = useApp();

  return (
    <footer className="bg-[#141414] text-[#d6cfc7] border-t border-[#383430]">
      {/* Top Banner */}
      <div className="border-b border-[#383430] py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1a1816] flex items-center justify-center text-[#c99c7b] border border-[#383430]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-locania text-xl font-bold tracking-wider text-[#f5f2ed] uppercase">
                AlumNet • GBU
              </span>
              <p className="text-xs text-[#c99c7b]">
                Gautam Buddha University Alumni Association & Mentorship Cell
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddAlumniModalOpen(true)}
              className="px-3.5 py-1.5 rounded bg-[#8d7d70] hover:bg-[#a1958b] text-[#141414] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[#8d7d70]"
            >
              Add Alumni Record
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3.5 py-1.5 rounded bg-[#242220] hover:bg-[#2d2a27] text-[#f5f2ed] text-xs font-semibold uppercase tracking-wider border border-[#383430] transition-colors cursor-pointer"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: University Identity */}
          <div className="space-y-3">
            <h4 className="font-locania text-base font-bold text-[#f5f2ed] tracking-wide uppercase">
              Gautam Buddha University
            </h4>
            <p className="text-xs text-[#a1958b] leading-relaxed font-editorial text-[15px]">
              Recognized under Section 2(f) and 12(B) of the UGC Act, 1956. A 511-acre residential university fostering academic brilliance and moral integrity along the Yamuna Expressway.
            </p>
            <div className="text-xs text-[#c99c7b] space-y-1 pt-1 font-mono">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Greater Noida, UP 201312</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>alumni@gbu.ac.in</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Sections */}
          <div className="space-y-3">
            <h4 className="font-locania text-xs font-bold text-[#c99c7b] uppercase tracking-widest">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Portal & Recommendations
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Searchable Alumni Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('mentorship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Career Mentorship & Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('events'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Event Announcements & Conclave
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Gautam Buddha University
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Alumni Relations Helpdesk
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#c99c7b] hover:text-[#f5f2ed] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Member Login & Guest Gateway</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: GBU Faculties / Schools */}
          <div className="space-y-3">
            <h4 className="font-locania text-xs font-bold text-[#c99c7b] uppercase tracking-widest">
              Faculties & Schools
            </h4>
            <ul className="space-y-1.5 text-xs text-[#a1958b]">
              <li>School of Information & Comm. Tech (SoICT)</li>
              <li>School of Management (SoM)</li>
              <li>School of Biotechnology (SoBT)</li>
              <li>School of Engineering (SoE)</li>
              <li>School of Applied Sciences (SoVSAS)</li>
              <li>School of Humanities & Social Sciences (SoHSS)</li>
              <li>School of Law, Justice & Governance (SoLJG)</li>
              <li>School of Buddhist Studies (SoBSC)</li>
            </ul>
          </div>

          {/* Col 4: Creed & Chapters */}
          <div className="space-y-3">
            <h4 className="font-locania text-xs font-bold text-[#c99c7b] uppercase tracking-widest">
              University Motto
            </h4>
            <div className="p-3 rounded-lg bg-[#1a1816] border border-[#383430] space-y-1.5">
              <p className="font-locania text-sm text-[#f5f2ed] font-bold">
                Prajñā Śīla Karuṇā
              </p>
              <p className="text-[11px] text-[#c99c7b] italic font-editorial">
                "Wisdom to understand truth, moral integrity to live righteously, and boundless compassion for all beings."
              </p>
            </div>
            <p className="text-[11px] text-[#a1958b] pt-1">
              Active Regional Chapters: Delhi-NCR, Bengaluru, Mumbai, San Francisco Bay Area, London.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#383430] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716c]">
          <p>
            © {new Date().getFullYear()} Gautam Buddha University, Greater Noida. All rights reserved. AlumNet Portal.
          </p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted for GBU Graduates worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
