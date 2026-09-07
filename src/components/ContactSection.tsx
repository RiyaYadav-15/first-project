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
    <section id="contact-section" className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1a1816]">
      <div className="container mx-auto max-w-7xl space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1a18] text-[#c99c7b] text-xs font-semibold uppercase tracking-widest border border-[#383430]">
            <Building className="w-3.5 h-3.5 text-[#c99c7b]" />
            <span>Official University Desk</span>
          </div>
          <h2 className="font-locania text-3xl sm:text-4xl font-extrabold text-[#f5f2ed] tracking-tight">
            Contact GBU Alumni Relations
          </h2>
          <p className="text-xs sm:text-sm text-[#a1958b] font-editorial text-[17px]">
            We are here to assist with chapter events, campus access passes, transcript support, and corporate collaborations.
          </p>
        </div>

        {/* Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: University Details & Map preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#242220] rounded-2xl border border-[#383430] p-6 shadow-xs space-y-6">
              <h3 className="font-locania text-xl font-bold text-[#f5f2ed] border-b border-[#383430] pb-3">
                Alumni Relations Office
              </h3>

              <div className="space-y-4 text-xs text-[#d6cfc7]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1816] border border-[#383430] text-[#c99c7b] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#f5f2ed] text-xs">Postal Address</h4>
                    <p className="leading-relaxed text-[#a1958b] mt-0.5">
                      Alumni Relations Cell, Administrative Building<br />
                      Gautam Buddha University, Yamuna Expressway<br />
                      Greater Noida, Gautam Buddha Nagar, UP - 201312, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1816] border border-[#383430] text-[#c99c7b] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#f5f2ed] text-xs">Direct Email</h4>
                    <p className="font-mono text-[#c99c7b] mt-0.5">
                      alumni@gbu.ac.in • registrar@gbu.ac.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1816] border border-[#383430] text-[#c99c7b] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#f5f2ed] text-xs">Helpline Phone</h4>
                    <p className="font-mono text-[#c99c7b] mt-0.5">
                      +91 120 234 4200 / 234 4224
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1816] border border-[#383430] text-[#c99c7b] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#f5f2ed] text-xs">Office Hours</h4>
                    <p className="text-[#a1958b] mt-0.5">
                      Monday to Friday: 09:30 AM - 05:30 PM IST<br />
                      Closed on Second Saturdays & University Holidays
                    </p>
                  </div>
                </div>
              </div>

              {/* Campus Pass Highlight card */}
              <div className="p-3.5 bg-[#1a1816] rounded-xl border border-[#383430] text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#c99c7b] font-bold">
                  <GraduationCap className="w-4 h-4" />
                  <span>Campus Visit Protocols</span>
                </div>
                <p className="text-[11px] text-[#a1958b] leading-relaxed">
                  Visiting from out of town? Alumni may stay at the University International Guest House at subsidized institutional rates with advance notice.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#242220] rounded-2xl border border-[#383430] p-6 sm:p-8 shadow-xs">
              <h3 className="font-locania text-xl sm:text-2xl font-bold text-[#f5f2ed] mb-1">
                Send an Inquiry to the Alumni Cell
              </h3>
              <p className="text-xs text-[#a1958b] mb-6 font-editorial text-[15px]">
                Whether you wish to sponsor a student initiative, organise a batch reunion, or verify records.
              </p>

              {submitted && (
                <div className="p-4 bg-emerald-950/70 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    Thank you! Your message has been safely recorded and routed to the GBU Alumni Relations team.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#d6cfc7] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alok Sharma"
                      className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#d6cfc7] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alok.sharma@domain.com"
                      className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#d6cfc7] mb-1">Batch Year / Enrollment No</label>
                    <input
                      type="text"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      placeholder="e.g. Batch 2018 or 14/ICT/030"
                      className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#d6cfc7] mb-1">Subject Area</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70]"
                    >
                      <option value="Alumni Verification & Networking" className="bg-[#242220]">Alumni Verification & Networking</option>
                      <option value="Campus Visit & Guest House Pass" className="bg-[#242220]">Campus Visit & Guest House Pass</option>
                      <option value="Propose a Mentorship or Webinar" className="bg-[#242220]">Propose a Mentorship or Webinar</option>
                      <option value="Annual Conclave Inquiry" className="bg-[#242220]">Annual Conclave Inquiry</option>
                      <option value="Transcript & Academic Support" className="bg-[#242220]">Transcript & Academic Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your detailed inquiry or note for the executive alumni committee..."
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#8d7d70] text-[#141414] font-bold uppercase tracking-wider hover:bg-[#a1958b] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4 text-[#141414]" />
                  <span>Send Message to GBU</span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-[#242220] rounded-2xl border border-[#383430] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#8d7d70]" />
            <h3 className="font-locania text-xl sm:text-2xl font-bold text-[#f5f2ed]">
              Frequently Asked Questions by Alumni
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#383430] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 bg-[#1a1816] hover:bg-[#2d2a27] transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-[#f5f2ed]">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#8d7d70] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-[#242220] text-xs text-[#d6cfc7] leading-relaxed font-editorial text-[15px] border-t border-[#383430]">
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
