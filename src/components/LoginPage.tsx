import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SchoolType, UserAccount } from '../types';
import { 
  GraduationCap, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Calendar, 
  BookOpen, 
  Building2, 
  Mail, 
  Lock, 
  User, 
  UserCheck,
  ChevronRight
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

export const LoginPage: React.FC = () => {
  const { login, signup, enterAsGuest, showToast } = useApp();

  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');

  // Sign In form fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signInRole, setSignInRole] = useState<'student' | 'alumni'>('student');

  // Sign Up form fields
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState<'alumni' | 'student'>('alumni');
  const [school, setSchool] = useState<SchoolType>(SCHOOL_OPTIONS[0]);
  const [batchYear, setBatchYear] = useState<number>(2022);
  const [degree, setDegree] = useState('B.Tech in Computer Science');
  const [currentRole, setCurrentRole] = useState('Software Engineer');
  const [currentCompany, setCurrentCompany] = useState('Tech Solutions');
  const [isAvailableForMentoring, setIsAvailableForMentoring] = useState(true);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim()) {
      showToast('Please enter your university or personal email.');
      return;
    }
    login(signInEmail.trim(), signInRole);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !signUpEmail.trim()) {
      showToast('Please provide your full name and email address.');
      return;
    }

    const newUserData: Partial<UserAccount> = {
      fullName: fullName.trim(),
      email: signUpEmail.trim(),
      role: signUpRole,
      school,
      batchYear: Number(batchYear),
      degree,
      currentRole: currentRole.trim(),
      currentCompany: currentCompany.trim(),
      isAvailableForMentoring: signUpRole === 'alumni' ? isAvailableForMentoring : false,
      bio: `${signUpRole === 'alumni' ? 'Alumnus' : 'Student'} of ${school}, Batch of ${batchYear}.`,
      skills: ['Networking', 'Career Growth', 'Alumni Connect'],
      interests: ['Campus Mentorship', 'Alumni Meetups']
    };

    signup(newUserData);
  };

  const handleQuickLogin = (email: string, role: 'student' | 'alumni') => {
    login(email, role);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#0d9488] selection:text-white">
      
      {/* Top Header / Brand */}
      <div className="container mx-auto max-w-6xl mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#042f2e] flex items-center justify-center text-[#2dd4bf] border border-[#0f766e] shadow-sm">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-locania text-2xl sm:text-3xl font-bold tracking-wider text-white uppercase">
                  AlumNet
                </h1>
                <span className="text-xs uppercase font-bold tracking-widest bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] px-2 py-0.5 rounded">
                  GBU Portal
                </span>
              </div>
              <p className="text-xs text-[#a1a1aa] tracking-wide uppercase font-semibold">
                Gautam Buddha University • Greater Noida, Uttar Pradesh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={enterAsGuest}
              className="px-4 py-2 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-[#2dd4bf] text-xs font-semibold uppercase tracking-wider border border-[#27272a] hover:border-[#0d9488] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Eye className="w-4 h-4 text-[#2dd4bf]" />
              <span>Direct Guest Access</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container: 2-Column Split */}
      <div className="container mx-auto max-w-6xl my-auto">
        
        {/* Big and Clear Motto Banner on Entry Front Page */}
        <div className="text-center mb-8 py-5 px-6 rounded-2xl bg-gradient-to-r from-[#042f2e]/80 via-[#0f766e]/30 to-[#042f2e]/80 border border-[#0d9488]/40 shadow-sm">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#2dd4bf] font-bold font-mono block mb-1">
            Gautam Buddha University Alumni Motto
          </span>
          <div className="font-locania text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
            <span className="hover:text-[#2dd4bf] transition-colors">Discover</span>
            <span className="text-[#2dd4bf] text-2xl sm:text-3xl">•</span>
            <span className="hover:text-[#2dd4bf] transition-colors">Connect</span>
            <span className="text-[#2dd4bf] text-2xl sm:text-3xl">•</span>
            <span className="text-[#2dd4bf]">Grow</span>
          </div>
          <p className="text-xs text-teal-200/90 mt-1.5 font-medium">
            Bridging over 12,000 graduates, active scholars, and industry mentors worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN (5 cols): "Visit as Guest" & Campus Heritage */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Small Compact Guest Visitor Box */}
            <div 
              id="guest-visitor-box"
              className="bg-[#0f0f12] rounded-xl border-2 border-[#0d9488] p-4 sm:p-5 shadow-sm relative overflow-hidden group hover:border-[#2dd4bf] transition-colors"
            >
              {/* Header with badge & mode */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#042f2e] text-[#2dd4bf] text-[10.5px] font-bold uppercase tracking-wider border border-[#0f766e]">
                  <UserCheck className="w-3 h-3 text-[#2dd4bf]" />
                  <span>Visitor Access</span>
                </div>
                <span className="text-[10px] text-[#a1a1aa] uppercase tracking-wider font-semibold">
                  No Login Required
                </span>
              </div>

              {/* Motto Display */}
              <div className="bg-[#18181b] rounded-lg px-3 py-2 border border-[#27272a] mb-3 flex items-center justify-between">
                <span className="text-[10px] text-[#a1a1aa] uppercase font-bold tracking-wider">
                  Motto:
                </span>
                <span className="font-locania text-xs sm:text-sm font-bold text-[#2dd4bf] tracking-wider uppercase">
                  Discover • Connect • Grow
                </span>
              </div>

              <div className="mb-3.5">
                <h3 className="font-locania text-base sm:text-lg font-bold text-white leading-snug">
                  Explore AlumNet as a Visitor
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-0.5 leading-relaxed">
                  Search 500+ verified alumni records, browse mentorship tracks, and check campus reunions immediately.
                </p>
              </div>

              <button
                id="btn-visit-as-guest"
                onClick={enterAsGuest}
                className="w-full py-2.5 px-4 rounded-lg bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] border border-[#0d9488]"
              >
                <span>Continue / Visit as Guest</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>

              <p className="text-[10.5px] text-[#a1a1aa] text-center mt-2.5">
                Switch accounts or sign in anytime from the navigation bar.
              </p>
            </div>

            {/* University Heritage & Stats Card */}
            <div className="bg-[#0f0f12] rounded-2xl border border-[#27272a] p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#042f2e] flex items-center justify-center text-[#2dd4bf] border border-[#0f766e]">
                  <Building2 className="w-4 h-4 text-[#2dd4bf]" />
                </div>
                <div>
                  <h4 className="font-locania text-sm font-bold text-white uppercase">
                    Prajñā Śīla Karuṇā
                  </h4>
                  <p className="text-[11px] text-[#a1a1aa]">
                    Wisdom • Morality • Compassion
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center border-t border-[#27272a]">
                <div className="p-2.5 rounded-lg bg-[#18181b] border border-[#27272a]">
                  <span className="font-locania text-lg font-bold text-white block">12,000+</span>
                  <span className="text-[10px] text-[#a1a1aa] uppercase font-medium">Global Alumni</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#18181b] border border-[#27272a]">
                  <span className="font-locania text-lg font-bold text-[#2dd4bf] block">8</span>
                  <span className="text-[10px] text-[#a1a1aa] uppercase font-medium">Schools</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#18181b] border border-[#27272a]">
                  <span className="font-locania text-lg font-bold text-white block">511</span>
                  <span className="text-[10px] text-[#a1a1aa] uppercase font-medium">Acre Campus</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (7 cols): Member Sign In / Sign Up Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f0f12] rounded-2xl border border-[#27272a] p-6 sm:p-8 shadow-sm">
              
              {/* Form Tab Switcher: Sign In vs Register */}
              <div className="flex items-center justify-between border-b border-[#27272a] pb-4 mb-6">
                <div>
                  <h3 className="font-locania text-xl sm:text-2xl font-bold text-white">
                    {authTab === 'signin' ? 'GBU Member Sign In' : 'Create an AlumNet Account'}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">
                    {authTab === 'signin' 
                      ? 'Sign in as a student, graduate, or faculty member' 
                      : 'Join our verified institutional graduate community'}
                  </p>
                </div>

                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#18181b] border border-[#27272a]">
                  <button
                    onClick={() => setAuthTab('signin')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      authTab === 'signin'
                        ? 'bg-[#0d9488] text-white shadow-xs'
                        : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthTab('signup')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      authTab === 'signup'
                        ? 'bg-[#0d9488] text-white shadow-xs'
                        : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* TAB 1: SIGN IN */}
              {authTab === 'signin' && (
                <div className="space-y-6">
                  
                  {/* Quick 1-Click Demo Profiles */}
                  <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold uppercase tracking-wider text-[#2dd4bf] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#2dd4bf]" />
                        <span>Quick 1-Click Demo Logins</span>
                      </span>
                      <span className="text-[11px] text-[#a1a1aa]">Instant test accounts</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => handleQuickLogin('aayush.rastogi@gbu.ac.in', 'student')}
                        className="p-2.5 rounded-lg bg-[#0f0f12] border border-[#27272a] hover:border-[#0d9488] hover:bg-[#18181b] text-left transition-colors cursor-pointer group shadow-2xs"
                      >
                        <p className="text-xs font-bold text-white group-hover:text-[#2dd4bf] truncate">
                          Aayush Rastogi
                        </p>
                        <p className="text-[10px] text-[#a1a1aa]">Student • SoICT '25</p>
                        <span className="text-[9px] text-[#2dd4bf] font-semibold block mt-1">Pre-final AI Club Lead</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickLogin('aditi.sharma.gbu@alumni.ac.in', 'alumni')}
                        className="p-2.5 rounded-lg bg-[#0f0f12] border border-[#27272a] hover:border-[#0d9488] hover:bg-[#18181b] text-left transition-colors cursor-pointer group shadow-2xs"
                      >
                        <p className="text-xs font-bold text-white group-hover:text-[#2dd4bf] truncate">
                          Dr. Aditi Sharma
                        </p>
                        <p className="text-[10px] text-[#a1a1aa]">Alumni • Batch '15</p>
                        <span className="text-[9px] text-[#2dd4bf] font-semibold block mt-1">AI Scientist @ DeepMind</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickLogin('vikram.chauhan@alumni.gbu.ac.in', 'alumni')}
                        className="p-2.5 rounded-lg bg-[#0f0f12] border border-[#27272a] hover:border-[#0d9488] hover:bg-[#18181b] text-left transition-colors cursor-pointer group shadow-2xs"
                      >
                        <p className="text-xs font-bold text-white group-hover:text-[#2dd4bf] truncate">
                          Vikramaditya C.
                        </p>
                        <p className="text-[10px] text-[#a1a1aa]">Alumni • Batch '15</p>
                        <span className="text-[9px] text-[#2dd4bf] font-semibold block mt-1">VP Strategy @ McKinsey</span>
                      </button>
                    </div>
                  </div>

                  {/* Standard Sign In Form */}
                  <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">
                    
                    {/* Role Radio Group */}
                    <div>
                      <label className="block font-semibold text-[#cbd5e1] mb-1.5">
                        Signing in as:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSignInRole('student')}
                          className={`p-2.5 rounded-lg border text-center font-semibold transition-colors cursor-pointer ${
                            signInRole === 'student'
                              ? 'bg-[#042f2e] text-[#2dd4bf] border-[#0d9488]'
                              : 'bg-[#18181b] text-[#cbd5e1] border-[#27272a] hover:bg-[#27272a]'
                          }`}
                        >
                          Enrolled Student
                        </button>
                        <button
                          type="button"
                          onClick={() => setSignInRole('alumni')}
                          className={`p-2.5 rounded-lg border text-center font-semibold transition-colors cursor-pointer ${
                            signInRole === 'alumni'
                              ? 'bg-[#042f2e] text-[#2dd4bf] border-[#0d9488]'
                              : 'bg-[#18181b] text-[#cbd5e1] border-[#27272a] hover:bg-[#27272a]'
                          }`}
                        >
                          GBU Graduate / Alumni
                        </button>
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block font-semibold text-[#cbd5e1] mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
                        <input
                          id="login-email-input"
                          type="email"
                          required
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="e.g. name@gbu.ac.in or personal email"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-semibold text-[#cbd5e1]">Password *</label>
                        <span className="text-[11px] text-[#a1a1aa]">Demo: any password works</span>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
                        <input
                          id="login-password-input"
                          type={showPassword ? 'text' : 'password'}
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-9 pr-10 py-2.5 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-white cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Submit Action */}
                    <button
                      id="btn-submit-signin"
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-md bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm border border-[#0d9488]"
                    >
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span>Sign In to AlumNet</span>
                    </button>

                  </form>
                </div>
              )}

              {/* TAB 2: SIGN UP / REGISTER */}
              {authTab === 'signup' && (
                <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs">
                  
                  {/* Role Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSignUpRole('alumni')}
                      className={`p-2.5 rounded-lg border text-center font-semibold transition-colors cursor-pointer ${
                        signUpRole === 'alumni'
                          ? 'bg-[#042f2e] text-[#2dd4bf] border-[#0d9488]'
                          : 'bg-[#18181b] text-[#cbd5e1] border-[#27272a] hover:bg-[#27272a]'
                      }`}
                    >
                      Graduate / Alumni
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignUpRole('student')}
                      className={`p-2.5 rounded-lg border text-center font-semibold transition-colors cursor-pointer ${
                        signUpRole === 'student'
                          ? 'bg-[#042f2e] text-[#2dd4bf] border-[#0d9488]'
                          : 'bg-[#18181b] text-[#cbd5e1] border-[#27272a] hover:bg-[#27272a]'
                      }`}
                    >
                      Current Student
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#cbd5e1] mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alok Sharma"
                        className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#cbd5e1] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="alok@alumni.gbu.ac.in"
                        className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#cbd5e1] mb-1">Password</label>
                      <input
                        type="password"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#cbd5e1] mb-1">Batch Graduation Year</label>
                      <input
                        type="number"
                        min="2008"
                        max="2030"
                        value={batchYear}
                        onChange={(e) => setBatchYear(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#cbd5e1] mb-1">Academic School *</label>
                    <select
                      value={school}
                      onChange={(e) => setSchool(e.target.value as SchoolType)}
                      className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
                    >
                      {SCHOOL_OPTIONS.map((sc) => (
                        <option key={sc} value={sc} className="bg-[#18181b] text-white">
                          {sc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#cbd5e1] mb-1">Degree Program</label>
                      <input
                        type="text"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        placeholder="e.g. B.Tech (CSE) or MBA"
                        className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#cbd5e1] mb-1">Current Role</label>
                      <input
                        type="text"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#cbd5e1] mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={currentCompany}
                      onChange={(e) => setCurrentCompany(e.target.value)}
                      placeholder="e.g. Microsoft, Deloitte, Govt of India"
                      className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                    />
                  </div>

                  {signUpRole === 'alumni' && (
                    <div className="p-3 bg-[#18181b] rounded-lg border border-[#27272a]">
                      <label className="flex items-center gap-2 text-xs text-[#cbd5e1] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAvailableForMentoring}
                          onChange={(e) => setIsAvailableForMentoring(e.target.checked)}
                          className="w-4 h-4 rounded text-[#0d9488] focus:ring-0 border-[#27272a] bg-[#0f0f12]"
                        />
                        <span>I am open to mentoring Gautam Buddha University students & juniors</span>
                      </label>
                    </div>
                  )}

                  <button
                    id="btn-submit-signup"
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-md bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm border border-[#0d9488]"
                  >
                    <GraduationCap className="w-4 h-4 text-white" />
                    <span>Register & Access Portal</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Footer Info */}
      <div className="container mx-auto max-w-6xl mt-8 pt-4 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between text-xs text-[#a1a1aa] gap-2">
        <p>© {new Date().getFullYear()} Gautam Buddha University, Greater Noida. All rights reserved.</p>
        <p>Alumni Relations Cell: <span className="font-mono text-[#2dd4bf] font-semibold">alumni@gbu.ac.in</span></p>
      </div>

    </div>
  );
};
