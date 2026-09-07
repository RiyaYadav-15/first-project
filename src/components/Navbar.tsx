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
    <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#383430] shadow-xs">
      {/* Top micro banner with university identity */}
      <div className="bg-[#141414] text-[#d6cfc7] px-4 py-1.5 text-xs font-medium tracking-wide flex justify-between items-center border-b border-[#2d2a27]">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#8d7d70] animate-pulse"></span>
            <span className="font-locania tracking-wider text-[11px] uppercase">
              Gautam Buddha University • Official Alumni Portal
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#a1958b]">
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
            <div className="w-10 h-10 rounded-lg bg-[#252321] flex items-center justify-center text-white shadow-xs border border-[#3e3833] group-hover:bg-[#2e2a26] transition-colors">
              <GraduationCap className="w-6 h-6 text-[#c99c7b]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-locania text-2xl font-bold text-[#f5f2ed] tracking-wider uppercase">
                  AlumNet
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#2d2a27] text-[#c99c7b] border border-[#3e3833] px-1.5 py-0.5 rounded-sm">
                  GBU
                </span>
              </div>
              <p className="text-[10.5px] text-[#a1958b] tracking-wide uppercase font-medium">
                Gautam Buddha University
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716c]" />
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
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#242220] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70] focus:bg-[#2a2724] transition-all"
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
                    ? 'bg-[#2d2a27] text-[#f5f2ed] border border-[#423c37] shadow-xs'
                    : 'text-[#c2b8ad] hover:text-[#ffffff] hover:bg-[#282522]'
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#8d7d70] text-[#141414] text-xs font-semibold hover:bg-[#a1958b] active:scale-98 transition-all shadow-2xs cursor-pointer border border-[#a1958b]"
              title="Add alumnus record manually"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#141414]" />
              <span>Add Alumni</span>
            </button>

            {/* Auth / Profile Area */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-profile-menu-button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-md border border-[#383430] bg-[#242220] hover:bg-[#2d2a27] transition-colors cursor-pointer"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-[#8d7d70]"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-[#f5f2ed] line-clamp-1 leading-tight">
                      {currentUser.fullName}
                    </p>
                    <p className="text-[10px] text-[#a1958b] uppercase tracking-wider">
                      {currentUser.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#c99c7b]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-[#242220] border border-[#383430] rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 text-[#f5f2ed]"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#383430]">
                      <p className="text-xs font-bold text-[#f5f2ed]">{currentUser.fullName}</p>
                      <p className="text-[11px] text-[#a1958b] truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase rounded bg-[#2d2a27] text-[#c99c7b] border border-[#423c37]">
                        {currentUser.school.split('(')[1]?.replace(')', '') || 'GBU Member'}
                      </span>
                    </div>

                    <button
                      id="menu-profile-btn"
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#d6cfc7] hover:bg-[#2d2a27] hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#c99c7b]" />
                      <span>Manage Profile & Connections</span>
                    </button>

                    <button
                      id="menu-saved-alumni-btn"
                      onClick={() => {
                        handleNavClick('directory');
                        setUserDropdownOpen(false);
                        showToast(`Showing ${currentUser.savedAlumniIds.length} bookmarked alumni`);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#d6cfc7] hover:bg-[#2d2a27] hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4 text-[#c99c7b]" />
                      <span>Saved Alumni ({currentUser.savedAlumniIds.length})</span>
                    </button>

                    <button
                      id="menu-switch-login-btn"
                      onClick={() => {
                        setActiveTab('login');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#d6cfc7] hover:bg-[#2d2a27] hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#c99c7b]" />
                      <span>Switch Account / Login Gateway</span>
                    </button>

                    <div className="border-t border-[#383430] my-1"></div>

                    <button
                      id="menu-logout-btn"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-[#2d2a27] flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isGuestMode && (
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#242220] border border-[#383430] text-[#c99c7b]">
                    <span className="w-2 h-2 rounded-full bg-[#c99c7b] animate-pulse"></span>
                    <span>Guest Visitor</span>
                  </div>
                )}
                <button
                  id="btn-login-header"
                  onClick={() => setActiveTab('login')}
                  className="px-3.5 py-1.5 rounded-md bg-[#8d7d70] text-[#141414] text-xs font-bold hover:bg-[#a1958b] transition-colors cursor-pointer border border-[#8d7d70] flex items-center gap-1.5 shadow-2xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#141414]" />
                  <span>Sign In / Login Page</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#d6cfc7] hover:bg-[#2d2a27] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#383430] py-3 space-y-2 bg-[#1e1c1a] animate-in slide-in-from-top duration-200">
            {/* Mobile Search */}
            <div className="relative px-2 mb-3">
              <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-[#78716c]" />
              <input
                type="text"
                value={globalSearchQuery}
                onChange={(e) => {
                  setGlobalSearchQuery(e.target.value);
                  setActiveTab('directory');
                }}
                placeholder="Search alumni, batch, school..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#242220] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c]"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2.5 rounded-md text-xs font-medium tracking-wide uppercase transition-colors flex items-center gap-2 ${
                    activeTab === item.id
                      ? 'bg-[#2d2a27] text-white font-bold border border-[#423c37]'
                      : 'text-[#c2b8ad] hover:bg-[#282522]'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            <div className="px-2 pt-2 border-t border-[#383430] flex gap-2">
              <button
                onClick={() => {
                  setIsAddAlumniModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 rounded-md bg-[#8d7d70] text-[#141414] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
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
                  className="flex-1 py-2 rounded-md bg-[#8d7d70] text-[#141414] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#141414]" />
                  <span>Login / Guest Page</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-md bg-[#242220] text-red-400 border border-[#383430] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
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
