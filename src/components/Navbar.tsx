import React, { useState } from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { 
  GraduationCap, 
  Search, 
  UserPlus, 
  Menu, 
  X, 
  User, 
  Bookmark, 
  Calendar, 
  Compass, 
  BookOpen, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    isGuestMode,
    setIsAuthModalOpen, 
    setIsAddAlumniModalOpen,
    setIsProfileModalOpen,
    logout,
    globalSearchQuery,
    setGlobalSearchQuery,
    showToast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'directory', label: 'Directory', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'mentorship', label: 'Mentorship', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <User className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-[#27272a] shadow-xs text-white">
      {/* Top micro banner with university identity */}
      <div className="bg-[#022c22] text-[#2dd4bf] px-4 py-1.5 text-xs font-medium tracking-wide flex justify-between items-center border-b border-[#0f766e]">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse"></span>
            <span className="font-locania tracking-wider text-[11px] uppercase font-bold text-[#2dd4bf]">
              Gautam Buddha University • Official Alumni Portal
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#2dd4bf]/90 font-medium">
            <span>Greater Noida, Uttar Pradesh</span>
            <span>•</span>
            <span>Est. 2008</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo Brand */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-lg bg-[#042f2e] flex items-center justify-center text-[#2dd4bf] shadow-xs border border-[#0d9488] group-hover:bg-[#0f766e] transition-colors">
              <GraduationCap className="w-6 h-6 text-[#2dd4bf]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-locania text-2xl font-bold text-white tracking-wider uppercase">
                  AlumNet
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#042f2e] text-[#2dd4bf] border border-[#0d9488] px-1.5 py-0.5 rounded-sm">
                  GBU
                </span>
              </div>
              <p className="text-[10.5px] text-[#cbd5e1] tracking-wide uppercase font-semibold">
                Gautam Buddha University
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                id="global-search-input"
                type="text"
                value={globalSearchQuery}
                onChange={(e) => {
                  setGlobalSearchQuery(e.target.value);
                  if (activeTab !== 'directory' && e.target.value.trim().length > 0) {
                    setActiveTab('directory');
                  }
                }}
                placeholder="Search alumni, batch, school, skill..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#14b8a6] focus:bg-[#09090b] transition-all"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'bg-[#0d9488] text-white border border-[#0d9488] shadow-xs'
                    : 'text-[#cbd5e1] hover:text-[#2dd4bf] hover:bg-[#18181b]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls: Add Alumni & User Profile / Login */}
          <div className="flex items-center gap-2.5">
            {/* Add Alumni Button */}
            <button
              id="btn-add-alumni-nav"
              onClick={() => setIsAddAlumniModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#0d9488] text-white text-xs font-semibold hover:bg-[#0f766e] active:scale-98 transition-all shadow-2xs cursor-pointer border border-[#0d9488]"
              title="Add alumnus record manually"
            >
              <UserPlus className="w-3.5 h-3.5 text-white" />
              <span>Add Alumni</span>
            </button>

            {/* Auth / Profile Area */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-profile-menu-button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-md border border-[#27272a] bg-[#18181b] hover:bg-[#27272a] transition-colors cursor-pointer text-white"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-[#0d9488]"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-white line-clamp-1 leading-tight">
                      {currentUser.fullName}
                    </p>
                    <p className="text-[10px] text-[#2dd4bf] uppercase tracking-wider">
                      {currentUser.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#2dd4bf]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-[#0a0a0a] border border-[#27272a] rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 text-white"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#27272a]">
                      <p className="text-xs font-bold text-white">{currentUser.fullName}</p>
                      <p className="text-[11px] text-[#a1a1aa] truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase rounded bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e]">
                        {currentUser.school.split('(')[1]?.replace(')', '') || 'GBU Member'}
                      </span>
                    </div>

                    <button
                      id="menu-profile-btn"
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#cbd5e1] hover:bg-[#18181b] hover:text-[#2dd4bf] flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#2dd4bf]" />
                      <span>Manage Profile & Connections</span>
                    </button>

                    <button
                      id="menu-saved-alumni-btn"
                      onClick={() => {
                        handleNavClick('directory');
                        setUserDropdownOpen(false);
                        showToast(`Showing ${currentUser.savedAlumniIds.length} bookmarked alumni`);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#cbd5e1] hover:bg-[#18181b] hover:text-[#2dd4bf] flex items-center gap-2 cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4 text-[#2dd4bf]" />
                      <span>Saved Alumni ({currentUser.savedAlumniIds.length})</span>
                    </button>

                    <button
                      id="menu-switch-login-btn"
                      onClick={() => {
                        setActiveTab('login');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#cbd5e1] hover:bg-[#18181b] hover:text-[#2dd4bf] flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#2dd4bf]" />
                      <span>Switch Account / Login Gateway</span>
                    </button>

                    <div className="border-t border-[#27272a] my-1"></div>

                    <button
                      id="menu-logout-btn"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isGuestMode && (
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#042f2e] border border-[#0f766e] text-[#2dd4bf]">
                    <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse"></span>
                    <span>Guest Visitor</span>
                  </div>
                )}
                <button
                  id="btn-login-header"
                  onClick={() => setActiveTab('login')}
                  className="px-3.5 py-1.5 rounded-md bg-[#0d9488] text-white text-xs font-bold hover:bg-[#0f766e] transition-colors cursor-pointer border border-[#0d9488] flex items-center gap-1.5 shadow-2xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>Sign In / Login Page</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#cbd5e1] hover:bg-[#18181b] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#27272a] py-3 space-y-2 bg-[#0a0a0a] animate-in slide-in-from-top duration-200 shadow-lg text-white">
            {/* Mobile Search */}
            <div className="relative px-2 mb-3">
              <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                type="text"
                value={globalSearchQuery}
                onChange={(e) => {
                  setGlobalSearchQuery(e.target.value);
                  setActiveTab('directory');
                }}
                placeholder="Search alumni, batch, school..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a]"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2.5 rounded-md text-xs font-medium tracking-wide uppercase transition-colors flex items-center gap-2 ${
                    activeTab === item.id
                      ? 'bg-[#0d9488] text-white font-bold border border-[#0d9488]'
                      : 'text-[#cbd5e1] hover:bg-[#18181b]'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            <div className="px-2 pt-2 border-t border-[#27272a] flex gap-2">
              <button
                onClick={() => {
                  setIsAddAlumniModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 rounded-md bg-[#0d9488] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer border border-[#0d9488]"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Alumni</span>
              </button>
              
              {!currentUser ? (
                <button
                  onClick={() => {
                    setActiveTab('login');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-md bg-[#0d9488] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-[#0d9488]"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Login / Guest Page</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-md bg-[#18181b] text-rose-400 border border-[#27272a] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
