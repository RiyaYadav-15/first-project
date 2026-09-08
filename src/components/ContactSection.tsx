import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  Building,
  GraduationCap
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [subject, setSubject] = useState('Alumni Verification & Networking');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How can I get my official GBU Alumni Card and lifelong email ID?',
      a: 'Graduates can verify their enrollment credentials via AlumNet. Once verified by the Alumni Relations Cell, a digital alumni card and @alumni.gbu.ac.in alias will be activated in your profile.'
    },
    {
      q: 'Can alumni visit the campus and Meditation Centre?',
      a: 'Yes! Gautam Buddha University warmly welcomes all alumni. You can present your digital AlumNet pass at Main Gate 1 for seamless entry to the campus, Meditation Centre (Dhyan Kendra), and Central Library.'
    },
    {
      q: 'How do I register as an official career mentor on AlumNet?',
      a: 'Simply head to your Profile page or Sign-Up screen and check "Available for Mentoring". Specify the domains you are keen to guide students on (e.g. UPSC, Tech System Design, Corporate Law).'
    },
    {
      q: 'How do I request transcripts or degree duplicate certificates?',
      a: 'You may contact the Examination and Academic Section through the Alumni Relations desk or submit a service request via the student portal with your enrollment number.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please provide your name, email, and inquiry details.');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been dispatched to the GBU Alumni Relations Cell.');
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact-section" className="py-12 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="container mx-auto max-w-7xl space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#042f2e] text-[#2dd4bf] text-xs font-semibold uppercase tracking-widest border border-[#0f766e]">
            <Building className="w-3.5 h-3.5 text-[#2dd4bf]" />
            <span>Official University Desk</span>
          </div>
          <h2 className="font-locania text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact GBU Alumni Relations
          </h2>
          <p className="text-xs sm:text-sm text-[#cbd5e1] font-editorial text-[17px]">
            We are here to assist with chapter events, campus access passes, transcript support, and corporate collaborations.
          </p>
        </div>

        {/* Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: University Details & Map preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0f0f12] rounded-2xl border border-[#27272a] p-6 shadow-xs space-y-6">
              <h3 className="font-locania text-xl font-bold text-white border-b border-[#27272a] pb-3">
                Alumni Relations Office
              </h3>

              <div className="space-y-4 text-xs text-[#cbd5e1]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#042f2e] border border-[#0f766e] text-[#2dd4bf] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Postal Address</h4>
                    <p className="leading-relaxed text-[#a1a1aa] mt-0.5">
                      Alumni Relations Cell, Administrative Building<br />
                      Gautam Buddha University, Yamuna Expressway<br />
                      Greater Noida, Gautam Buddha Nagar, UP - 201312, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#042f2e] border border-[#0f766e] text-[#2dd4bf] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Direct Email</h4>
                    <p className="font-mono text-[#2dd4bf] font-medium mt-0.5">
                      alumni@gbu.ac.in • registrar@gbu.ac.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#042f2e] border border-[#0f766e] text-[#2dd4bf] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Helpline Phone</h4>
                    <p className="font-mono text-[#2dd4bf] font-medium mt-0.5">
                      +91 120 234 4200 / 234 4224
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#042f2e] border border-[#0f766e] text-[#2dd4bf] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Office Hours</h4>
                    <p className="text-[#a1a1aa] mt-0.5">
                      Monday to Friday: 09:30 AM - 05:30 PM IST<br />
                      Closed on Second Saturdays & University Holidays
                    </p>
                  </div>
                </div>
              </div>

              {/* Campus Pass Highlight card */}
              <div className="p-3.5 bg-[#18181b] rounded-xl border border-[#27272a] text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#2dd4bf] font-bold">
                  <GraduationCap className="w-4 h-4" />
                  <span>Campus Visit Protocols</span>
                </div>
                <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                  Visiting from out of town? Alumni may stay at the University International Guest House at subsidized institutional rates with advance notice.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f0f12] rounded-2xl border border-[#27272a] p-6 sm:p-8 shadow-xs">
              <h3 className="font-locania text-xl sm:text-2xl font-bold text-white mb-1">
                Send an Inquiry to the Alumni Cell
              </h3>
              <p className="text-xs text-[#a1a1aa] mb-6 font-editorial text-[15px]">
                Whether you wish to sponsor a student initiative, organise a batch reunion, or verify records.
              </p>

              {submitted && (
                <div className="p-4 bg-[#042f2e] border border-[#0f766e] rounded-xl text-xs text-[#2dd4bf] flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-[#2dd4bf] shrink-0" />
                  <span>
                    Thank you! Your message has been safely recorded and routed to the GBU Alumni Relations team.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#cbd5e1] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alok Sharma"
                      className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#cbd5e1] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alok.sharma@domain.com"
                      className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#cbd5e1] mb-1">Batch Year / Enrollment No</label>
                    <input
                      type="text"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      placeholder="e.g. Batch 2018 or 14/ICT/030"
                      className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#cbd5e1] mb-1">Subject Area</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
                    >
                      <option value="Alumni Verification & Networking" className="bg-[#18181b] text-white">Alumni Verification & Networking</option>
                      <option value="Campus Visit & Guest House Pass" className="bg-[#18181b] text-white">Campus Visit & Guest House Pass</option>
                      <option value="Propose a Mentorship or Webinar" className="bg-[#18181b] text-white">Propose a Mentorship or Webinar</option>
                      <option value="Annual Conclave Inquiry" className="bg-[#18181b] text-white">Annual Conclave Inquiry</option>
                      <option value="Transcript & Academic Support" className="bg-[#18181b] text-white">Transcript & Academic Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#cbd5e1] mb-1">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your detailed inquiry or note for the executive alumni committee..."
                    className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#0d9488] text-white font-bold uppercase tracking-wider hover:bg-[#0f766e] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-[#0d9488]"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Send Message to GBU</span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-[#0f0f12] rounded-2xl border border-[#27272a] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#2dd4bf]" />
            <h3 className="font-locania text-xl sm:text-2xl font-bold text-white">
              Frequently Asked Questions by Alumni
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#27272a] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 bg-[#18181b] hover:bg-[#27272a] transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-white">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#2dd4bf] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-[#0f0f12] text-xs text-[#cbd5e1] leading-relaxed font-editorial text-[15px] border-t border-[#27272a]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
