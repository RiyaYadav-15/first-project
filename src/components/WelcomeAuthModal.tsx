import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SchoolType, UserAccount } from '../types';
import { 
  X, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const SCHOOL_OPTIONS: SchoolType[] = [
  'School of Information & Communication Technology (SoICT)',
  'School of Management (SoM)',
  'School of Biotechnology (SoBT)',
  'School of Engineering (SoE)',
  'School of Vocational Studies & Applied Sciences (SoVSAS)',
  'School of Humanities & Social Sciences (SoHSS)',
  'School of Law, Justice & Governance (SoLJG)',
  'School of Buddhist Studies & Civilization (SoBSC)'
];

export const WelcomeAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, signup, showToast } = useApp();
  
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'alumni' | 'student'>('alumni');
  const [school, setSchool] = useState<SchoolType>(SCHOOL_OPTIONS[0]);
  const [batchYear, setBatchYear] = useState<number>(2021);
  const [degree, setDegree] = useState('B.Tech in Computer Science');
  const [currentRole, setCurrentRole] = useState('Software Engineer');
  const [currentCompany, setCurrentCompany] = useState('Tech Solutions');
  const [isAvailableForMentoring, setIsAvailableForMentoring] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim()) {
      showToast('Please enter your university or personal email.');
      return;
    }
    login(signInEmail.trim());
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      showToast('Please provide your name and email address.');
      return;
    }

    const newUserData: Partial<UserAccount> = {
      fullName,
      email,
      role,
      school,
      batchYear: Number(batchYear),
      degree,
      currentRole,
      currentCompany,
      isAvailableForMentoring: role === 'alumni' ? isAvailableForMentoring : false,
      bio: `${role === 'alumni' ? 'Alumnus' : 'Student'} of ${school}, Batch of ${batchYear}.`,
      skills: ['Networking', 'Professional Development'],
      interests: ['Alumni Connect', 'Campus Mentorship']
    };

    signup(newUserData);
  };

  // Quick 1-click test login helpers for immediate demo evaluation
  const handleQuickDemoLogin = (type: 'student' | 'alumni') => {
    if (type === 'student') {
      login('aayush.rastogi@gbu.ac.in', 'student');
    } else {
      login('aditi.sharma.gbu@alumni.ac.in', 'alumni');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="welcome-auth-card"
        className="relative w-full max-w-4xl bg-[#0f0f12] rounded-xl shadow-2xl border border-[#27272a] overflow-hidden my-6 flex flex-col md:flex-row text-white"
      >
        {/* Close Button */}
        <button
          id="close-auth-modal"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#3f3f46]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Welcome Proclamation & University Heritage */}
        <div className="w-full md:w-5/12 bg-gradient-to-b from-[#18181b] via-[#0f0f12] to-[#18181b] text-white p-8 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-[#27272a]">
          {/* Subtle decorative watermark */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#2dd4bf]/5 blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-lg bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e]">
                <GraduationCap className="w-6 h-6" />
              </span>
              <span className="font-locania text-xs tracking-widest text-[#2dd4bf] uppercase font-bold">
                AlumNet Portal
              </span>
            </div>

            <h2 className="font-locania text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight mb-3">
              Gautam Buddha University
            </h2>

            <p className="text-xs text-[#2dd4bf] font-bold italic font-editorial text-[14px] leading-relaxed mb-4">
              "Prajñā Śīla Karuṇā — Wisdom, Moral Integrity, and Compassion"
            </p>

            <p className="text-xs text-[#a1a1aa] leading-relaxed font-normal mb-6">
              Welcome to the official alumni ecosystem. Connect with thousands of GBU graduates worldwide across technology, governance, sciences, consulting, and entrepreneurship.
            </p>

            <div className="space-y-3 pt-3 border-t border-[#27272a]">
              <div className="flex items-center gap-2.5 text-xs text-[#cbd5e1]">
                <CheckCircle2 className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                <span>Verified Alumni Directory with School Filtering</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#cbd5e1]">
                <CheckCircle2 className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                <span>Career Mentorship Portal for Graduates</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#cbd5e1]">
                <CheckCircle2 className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                <span>Personalized Interest & Skills Matchmaking</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#cbd5e1]">
                <CheckCircle2 className="w-4 h-4 text-[#2dd4bf] shrink-0" />
                <span>Annual Conclaves & Chapter Reunions</span>
              </div>
            </div>
          </div>

          {/* 1-Click Quick Demo Login Pill */}
          <div className="mt-8 pt-4 border-t border-[#27272a]">
            <p className="text-[11px] text-[#2dd4bf] uppercase font-bold tracking-wider mb-2">
              Instant Preview Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="demo-login-student"
                type="button"
                onClick={() => handleQuickDemoLogin('student')}
                className="px-2.5 py-1.5 bg-[#18181b] hover:bg-[#042f2e] text-[#2dd4bf] hover:text-white text-[11px] font-semibold rounded border border-[#27272a] hover:border-[#0f766e] text-center transition-colors cursor-pointer shadow-2xs"
              >
                Log in as Student
              </button>
              <button
                id="demo-login-alumni"
                type="button"
                onClick={() => handleQuickDemoLogin('alumni')}
                className="px-2.5 py-1.5 bg-[#18181b] hover:bg-[#042f2e] text-[#2dd4bf] hover:text-white text-[11px] font-semibold rounded border border-[#27272a] hover:border-[#0f766e] text-center transition-colors cursor-pointer shadow-2xs"
              >
                Log in as Alumnus
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Login & Sign Up Form */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 bg-[#0f0f12] text-white flex flex-col justify-center">
          {/* Form Header / Tabs */}
          <div className="flex items-center justify-between border-b border-[#27272a] pb-3 mb-6">
            <div className="flex gap-4">
              <button
                id="tab-btn-signin"
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`text-sm font-bold pb-2 transition-all cursor-pointer font-locania tracking-wider uppercase border-b-2 ${
                  authMode === 'signin'
                    ? 'border-[#2dd4bf] text-[#2dd4bf]'
                    : 'border-transparent text-[#a1a1aa] hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                id="tab-btn-signup"
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`text-sm font-bold pb-2 transition-all cursor-pointer font-locania tracking-wider uppercase border-b-2 ${
                  authMode === 'signup'
                    ? 'border-[#2dd4bf] text-[#2dd4bf]'
                    : 'border-transparent text-[#a1a1aa] hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            <span className="text-[11px] text-[#a1a1aa] hidden sm:inline">
              {authMode === 'signin' ? 'Welcome back!' : 'Join the alumni network'}
            </span>
          </div>

          {/* SIGN IN FORM */}
          {authMode === 'signin' ? (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
                  <input
                    id="signin-email"
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="e.g. aditi.sharma.gbu@alumni.ac.in or personal email"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-[#cbd5e1]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link sent to registered email.')}
                    className="text-[11px] text-[#2dd4bf] font-medium hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
                  <input
                    id="signin-password"
                    type="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="submit-signin-btn"
                  type="submit"
                  className="w-full py-2.5 rounded-md bg-[#0d9488] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0f766e] transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 border border-[#0d9488]"
                >
                  <span>Sign In to AlumNet</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="p-3 bg-[#18181b] rounded-lg border border-[#27272a] text-[11px] text-[#a1a1aa] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#2dd4bf]" />
                <span>
                  GBU Roll Numbers and official institutional credentials are authenticated securely.
                </span>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a]" />
                    <input
                      id="signup-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a]" />
                    <input
                      id="signup-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@alumni.gbu.ac.in"
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                    />
                  </div>
                </div>
              </div>

              {/* Role Toggle */}
              <div>
                <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('alumni')}
                    className={`py-1.5 text-xs font-medium rounded border text-center transition-colors cursor-pointer ${
                      role === 'alumni'
                        ? 'bg-[#0d9488] text-white font-bold border-[#0d9488]'
                        : 'bg-[#18181b] text-[#a1a1aa] border-[#27272a] hover:bg-[#27272a]'
                    }`}
                  >
                    Graduated Alumnus
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`py-1.5 text-xs font-medium rounded border text-center transition-colors cursor-pointer ${
                      role === 'student'
                        ? 'bg-[#0d9488] text-white font-bold border-[#0d9488]'
                        : 'bg-[#18181b] text-[#a1a1aa] border-[#27272a] hover:bg-[#27272a]'
                    }`}
                  >
                    Current Student
                  </button>
                </div>
              </div>

              {/* School selection */}
              <div>
                <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                  GBU School / Faculty *
                </label>
                <select
                  id="signup-school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value as SchoolType)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
                >
                  {SCHOOL_OPTIONS.map((sch) => (
                    <option key={sch} value={sch} className="bg-[#18181b] text-white">
                      {sch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch & Degree */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                    Graduation Year / Batch
                  </label>
                  <input
                    id="signup-batch"
                    type="number"
                    min="2008"
                    max="2030"
                    value={batchYear}
                    onChange={(e) => setBatchYear(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                    Degree / Branch
                  </label>
                  <input
                    id="signup-degree"
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Tech (CSE), MBA, Ph.D"
                    className="w-full px-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                  />
                </div>
              </div>

              {/* Career Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                    Current Role / Designation
                  </label>
                  <input
                    id="signup-role"
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="e.g. Product Manager, IAS Officer"
                    className="w-full px-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a]" />
                    <input
                      id="signup-company"
                      type="text"
                      value={currentCompany}
                      onChange={(e) => setCurrentCompany(e.target.value)}
                      placeholder="e.g. Microsoft, Govt of India"
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71717a]" />
                  <input
                    id="signup-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                  />
                </div>
              </div>

              {/* Open to Mentoring Checkbox */}
              {role === 'alumni' && (
                <div className="flex items-center gap-2 p-2 bg-[#18181b] border border-[#27272a] rounded-md">
                  <input
                    id="signup-mentor-checkbox"
                    type="checkbox"
                    checked={isAvailableForMentoring}
                    onChange={(e) => setIsAvailableForMentoring(e.target.checked)}
                    className="w-4 h-4 accent-[#0d9488] rounded cursor-pointer"
                  />
                  <label htmlFor="signup-mentor-checkbox" className="text-xs text-white font-medium cursor-pointer">
                    I am willing to mentor GBU graduates and juniors on career tracks
                  </label>
                </div>
              )}

              <div className="pt-2">
                <button
                  id="submit-signup-btn"
                  type="submit"
                  className="w-full py-2.5 rounded-md bg-[#0d9488] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0f766e] transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 border border-[#0d9488]"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Register & Join AlumNet</span>
                </button>
              </div>
            </form>
          )}

          {/* Guest browsing notice */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(false)}
              className="text-xs text-[#a1a1aa] hover:text-[#2dd4bf] underline decoration-dotted cursor-pointer"
            >
              Continue exploring as guest visitor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
