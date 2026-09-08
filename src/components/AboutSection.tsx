import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  GraduationCap, 
  Compass, 
  HeartHandshake, 
  Building, 
  Award, 
  MapPin, 
  Globe2, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setActiveTab } = useApp();

  const chapters = [
    { city: 'Delhi - NCR Chapter', convenor: 'Vikramaditya Chauhan (SoM \'15)', members: '2,400+ Alumni', location: 'Noida / Gurugram / Delhi' },
    { city: 'Bengaluru Tech Chapter', convenor: 'Rohan Deshmukh (SoICT \'20)', members: '1,150+ Alumni', location: 'Koramangala & Whitefield' },
    { city: 'Mumbai & Western Region', convenor: 'Harshita Pandey (SoE \'19)', members: '720+ Alumni', location: 'Mumbai & Pune' },
    { city: 'North America Chapter', convenor: 'Shubham Goel (SoICT \'21)', members: '480+ Alumni', location: 'San Francisco & New York' },
    { city: 'United Kingdom & Europe', convenor: 'Dr. Aditi Sharma (SoICT \'15)', members: '290+ Alumni', location: 'London, UK' },
  ];

  const schools = [
    { name: 'School of Information & Communication Technology', code: 'SoICT', focus: 'AI, Data Science, Distributed Systems, Software Engineering' },
    { name: 'School of Management', code: 'SoM', focus: 'Business Analytics, Marketing, Human Resource, Strategic Management' },
    { name: 'School of Biotechnology', code: 'SoBT', focus: 'Genetic Engineering, Bioprocess, Molecular Biology, Bioinformatics' },
    { name: 'School of Engineering', code: 'SoE', focus: 'Civil, Mechanical, Electrical, Architecture & Regional Planning' },
    { name: 'School of Vocational Studies & Applied Sciences', code: 'SoVSAS', focus: 'Applied Mathematics, Physics, Chemistry, Environmental Sciences' },
    { name: 'School of Humanities & Social Sciences', code: 'SoHSS', focus: 'Political Science, Psychology, Economics, Social Work' },
    { name: 'School of Law, Justice & Governance', code: 'SoLJG', focus: 'Corporate Law, Criminal Justice, Constitutional Jurisprudence' },
    { name: 'School of Buddhist Studies & Civilization', code: 'SoBSC', focus: 'Buddhist Philosophy, Heritage, Comparative Religions' },
  ];

  return (
    <section id="about-us-section" className="py-12 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="container mx-auto max-w-7xl space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#042f2e] text-[#2dd4bf] text-xs font-semibold uppercase tracking-widest border border-[#0f766e]">
            <BookOpen className="w-3.5 h-3.5 text-[#2dd4bf]" />
            <span>University Heritage & Mission</span>
          </div>

          <h2 className="font-locania text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Gautam Buddha University & AlumNet
          </h2>

          <p className="text-xs sm:text-sm text-[#cbd5e1] font-editorial text-[17px] sm:text-[19px] leading-relaxed">
            Established under Uttar Pradesh Act (9) of 2002, Gautam Buddha University represents a vibrant confluence of ancient wisdom and modern scientific research across a magnificent 511-acre campus.
          </p>
        </div>

        {/* Heritage & Values Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="border-l-4 border-[#0d9488] pl-4">
              <h3 className="font-locania text-2xl font-bold text-white leading-snug">
                Prajñā, Śīla, Karuṇā
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2dd4bf] mt-0.5">
                The Guiding Creed of Gautam Buddha University
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed font-editorial text-[16px]">
              Gautam Buddha University was conceived as a seat of higher learning that inculcates holistic knowledge with deep moral ethics. Its sprawling campus along the Yamuna Expressway in Greater Noida features world-class sports stadiums, state-of-the-art computational laboratories, and the tranquil Mahatma Jyotiba Phule Dhyan Kendra.
            </p>

            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed font-editorial text-[16px]">
              <strong className="text-white">AlumNet</strong> is the designated institutional platform connecting more than 5,800 alumni across four continents. It empowers graduates to give back, advise current undergraduates, sponsor innovation fellowships, and attend regional homecoming reunions.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-[#0f0f12] rounded-xl border border-[#27272a] shadow-2xs">
                <HeartHandshake className="w-5 h-5 text-[#2dd4bf] mb-1.5" />
                <h4 className="font-bold text-xs text-white">Lifelong Fraternity</h4>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">Continuous peer support across all industries.</p>
              </div>

              <div className="p-3.5 bg-[#0f0f12] rounded-xl border border-[#27272a] shadow-2xs">
                <Compass className="w-5 h-5 text-[#2dd4bf] mb-1.5" />
                <h4 className="font-bold text-xs text-white">Direct Student Guidance</h4>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">Mentorship that bridges classroom to corporate.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#27272a] bg-zinc-950">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=80"
                alt="Gautam Buddha University Campus"
                className="w-full h-80 sm:h-96 object-cover opacity-85 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#2dd4bf]">
                  511-Acre Eco-Campus
                </span>
                <h4 className="font-locania text-xl font-bold text-white">
                  Greater Noida, Uttar Pradesh, India
                </h4>
                <p className="text-xs text-zinc-300">
                  Equipped with Sarvapalli Radhakrishnan Central Library, Olympic-grade sports complex, and specialized research centers.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Academic Faculties & Schools Showcase */}
        <div>
          <div className="mb-6 pb-3 border-b border-[#27272a]">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf]">
              Academic Pillars
            </span>
            <h3 className="font-locania text-2xl font-bold text-white">
              The 8 Schools of Gautam Buddha University
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {schools.map((s, idx) => (
              <div
                key={idx}
                className="bg-[#0f0f12] p-4 rounded-xl border border-[#27272a] hover:border-[#0d9488]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] inline-block mb-2">
                    {s.code}
                  </span>
                  <h4 className="font-locania text-sm font-bold text-white leading-snug mb-1.5">
                    {s.name}
                  </h4>
                  <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                    {s.focus}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('directory')}
                  className="mt-3 pt-2 border-t border-[#27272a] text-[11px] font-semibold text-[#2dd4bf] hover:underline flex items-center justify-between cursor-pointer"
                >
                  <span>View Alumni</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Chapters Grid */}
        <div className="bg-[#0f0f12] p-8 rounded-2xl border border-[#27272a] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#27272a]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf]">
                Global Presence
              </span>
              <h3 className="font-locania text-2xl font-bold text-white">
                Alumni Chapters & Regional Hubs
              </h3>
            </div>
            <span className="text-xs text-[#a1a1aa]">
              Active local networks organizing regular meetups and career fairs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] space-y-1.5 shadow-2xs"
              >
                <div className="w-7 h-7 rounded-md bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] flex items-center justify-center mb-2">
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-locania text-sm font-bold text-white">
                  {ch.city}
                </h4>
                <p className="text-[11px] text-[#2dd4bf] font-semibold">
                  {ch.members}
                </p>
                <p className="text-[10.5px] text-[#a1a1aa] truncate">
                  Convenor: {ch.convenor}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
