import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { RecommendationBar } from './components/RecommendationBar';
import { DirectorySection } from './components/DirectorySection';
import { MentorshipPortal } from './components/MentorshipPortal';
import { EventsSection } from './components/EventsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';

// Modals
import { WelcomeAuthModal } from './components/WelcomeAuthModal';
import { AlumniDetailModal } from './components/AlumniDetailModal';
import { AddAlumniModal } from './components/AddAlumniModal';
import { MentorshipBookingModal } from './components/MentorshipBookingModal';
import { ProfileModal } from './components/ProfileModal';

// Icons for Home preview cards
import { 
  Users, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Building2,
  ChevronRight,
  Eye
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser,
    isGuestMode,
    setIsAuthModalOpen,
    toastMessage, 
    alumniList, 
    events, 
    setSelectedAlumniForDetail,
    setSelectedMentorForBooking,
    setIsAddAlumniModalOpen 
  } = useApp();

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // If visitor is unauthenticated and hasn't chosen guest mode, or navigated to login
  if ((!currentUser && !isGuestMode) || activeTab === 'login') {
    return (
      <div className="min-h-screen bg-black text-white font-body selection:bg-[#0d9488] selection:text-white">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#042f2e] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#0d9488] flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
            <Sparkles className="w-4 h-4 text-[#2dd4bf]" />
            <span>{toastMessage}</span>
          </div>
        )}

        <LoginPage />

        {/* Global Modals */}
        <WelcomeAuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-body selection:bg-[#0d9488] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#042f2e] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#0d9488] flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-[#2dd4bf]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Guest Mode Indicator Ribbon */}
      {isGuestMode && (
        <aside 
          id="guest-visitor-banner"
          className="bg-[#042f2e]/90 border-b border-[#115e59] py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-[#2dd4bf]"
        >
          <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black text-[#2dd4bf] border border-[#0d9488] font-bold uppercase text-[10px] tracking-wider shadow-2xs">
                <Eye className="w-3 h-3 text-[#2dd4bf]" />
                <span>Guest Visitor</span>
              </span>
              <span className="font-locania text-xs font-bold text-white tracking-wider uppercase px-2 py-0.5 bg-black rounded border border-[#115e59]">
                Discover • Connect • Grow
              </span>
              <span className="text-[#cbd5e1] text-[11px] hidden lg:inline">
                • Read-only access. Sign in anytime to bookmark alumni, RSVP for events, or book mentorship.
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                id="btn-guest-banner-signin"
                onClick={() => setIsAuthModalOpen(true)}
                className="font-bold text-[#2dd4bf] hover:text-[#5eead4] transition-colors cursor-pointer flex items-center gap-1 text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#2dd4bf]" />
                <span>Sign In / Join</span>
              </button>
              <span className="text-[#4b5563]">•</span>
              <button
                id="btn-guest-banner-login-page"
                onClick={() => setActiveTab('login')}
                className="text-[#94a3b8] hover:text-white text-[11px] cursor-pointer"
              >
                Return to Login Page
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-0">
            {/* Editorial Hero Section with quick search & university metrics */}
            <HomeHero />

            {/* Personalized Recommendation Bar based on user interests & interactive questions */}
            <RecommendationBar />

            {/* Interactive Section Previews on the Home Page */}
            <section className="py-14 px-4 sm:px-6 lg:px-8 bg-black border-b border-[#27272a]">
              <div className="container mx-auto max-w-7xl space-y-12">
                
                {/* 3 Core Portals Feature Strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1: Directory */}
                  <div 
                    onClick={() => setActiveTab('directory')}
                    className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#27272a] hover:border-[#14b8a6] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] flex items-center justify-center mb-4 shadow-2xs">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#2dd4bf]">
                        Searchable Database
                      </span>
                      <h3 className="font-locania text-xl font-bold text-white mt-1 mb-2 group-hover:text-[#2dd4bf] transition-colors">
                        Alumni Directory
                      </h3>
                      <p className="text-xs text-[#cbd5e1] leading-relaxed font-editorial text-[15px]">
                        Access verified records across all GBU schools, batch years (2008-2025), companies, and global chapters.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#27272a] flex items-center justify-between text-xs font-bold text-[#2dd4bf]">
                      <span>Explore Directory</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#2dd4bf]" />
                    </div>
                  </div>

                  {/* Card 2: Mentorship */}
                  <div 
                    onClick={() => setActiveTab('mentorship')}
                    className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#27272a] hover:border-[#14b8a6] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] flex items-center justify-center mb-4 shadow-2xs">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#2dd4bf]">
                        1-on-1 Guidance
                      </span>
                      <h3 className="font-locania text-xl font-bold text-white mt-1 mb-2 group-hover:text-[#2dd4bf] transition-colors">
                        Career Mentorship Portal
                      </h3>
                      <p className="text-xs text-[#cbd5e1] leading-relaxed font-editorial text-[15px]">
                        Book dedicated mentorship sessions and request internal job referrals from alumni at Google, Amazon, UPSC, and startups.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#27272a] flex items-center justify-between text-xs font-bold text-[#2dd4bf]">
                      <span>Browse Mentors & Jobs</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#2dd4bf]" />
                    </div>
                  </div>

                  {/* Card 3: Events */}
                  <div 
                    onClick={() => setActiveTab('events')}
                    className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#27272a] hover:border-[#14b8a6] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] flex items-center justify-center mb-4 shadow-2xs">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#2dd4bf]">
                        Reunions & Conclaves
                      </span>
                      <h3 className="font-locania text-xl font-bold text-white mt-1 mb-2 group-hover:text-[#2dd4bf] transition-colors">
                        Event Announcements
                      </h3>
                      <p className="text-xs text-[#cbd5e1] leading-relaxed font-editorial text-[15px]">
                        RSVP for upcoming alumni conclaves, technical firesides, virtual webinars, and homecoming gatherings.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#27272a] flex items-center justify-between text-xs font-bold text-[#2dd4bf]">
                      <span>View Announcements</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#2dd4bf]" />
                    </div>
                  </div>

                </div>

                {/* Featured Alumni Showcase on Home */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#27272a]">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf]">
                        Distinguished Graduates
                      </span>
                      <h3 className="font-locania text-2xl font-bold text-white">
                        Featured GBU Alumni
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('directory')}
                      className="text-xs font-bold uppercase tracking-wider text-[#2dd4bf] hover:text-[#5eead4] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({alumniList.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {alumniList.slice(0, 4).map((alumnus) => (
                      <div
                        key={alumnus.id}
                        className="p-4 rounded-xl bg-[#0a0a0a] border border-[#27272a] hover:border-[#14b8a6] hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start gap-3 mb-3">
                            <img
                              src={alumnus.avatarUrl}
                              alt={alumnus.fullName}
                              className="w-12 h-12 rounded-full object-cover border border-[#0d9488]"
                            />
                            <div className="min-w-0">
                              <h4 
                                onClick={() => setSelectedAlumniForDetail(alumnus)}
                                className="font-locania text-base font-bold text-white hover:text-[#2dd4bf] cursor-pointer truncate"
                              >
                                {alumnus.fullName}
                              </h4>
                              <p className="text-xs font-semibold text-[#2dd4bf] truncate">
                                {alumnus.currentRole}
                              </p>
                              <p className="text-[11px] text-[#cbd5e1] truncate">
                                {alumnus.currentCompany}
                              </p>
                            </div>
                          </div>

                          <div className="text-[11px] text-[#cbd5e1] space-y-0.5 mb-3 bg-[#18181b] p-2 rounded border border-[#27272a]">
                            <p className="font-semibold text-white">{alumnus.degree}</p>
                            <p className="truncate text-[#a1a1aa]">Batch of {alumnus.batchYear}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#27272a] flex items-center justify-between">
                          <button
                            onClick={() => setSelectedAlumniForDetail(alumnus)}
                            className="text-xs font-semibold text-[#2dd4bf] hover:text-[#5eead4] cursor-pointer"
                          >
                            Full Bio
                          </button>
                          {alumnus.isAvailableForMentoring ? (
                            <button
                              onClick={() => setSelectedMentorForBooking(alumnus)}
                              className="px-2.5 py-1 rounded text-[11px] font-bold bg-[#0d9488] text-white hover:bg-[#0f766e] cursor-pointer shadow-2xs border border-[#0d9488]"
                            >
                              Mentorship
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#a1a1aa]">
                              {alumnus.location}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events Preview on Home */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#27272a]">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf]">
                        Calendar Highlights
                      </span>
                      <h3 className="font-locania text-2xl font-bold text-white">
                        Upcoming Campus & Virtual Events
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('events')}
                      className="text-xs font-bold uppercase tracking-wider text-[#2dd4bf] hover:text-[#5eead4] flex items-center gap-1 cursor-pointer"
                    >
                      <span>All Events ({events.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {events.slice(0, 2).map((evt) => (
                      <div
                        key={evt.id}
                        className="bg-[#0a0a0a] rounded-xl border border-[#27272a] hover:border-[#14b8a6] p-5 shadow-xs flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2.5 py-0.5 rounded text-[10.5px] font-bold uppercase bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e]">
                              {evt.category}
                            </span>
                            <span className="text-xs font-semibold text-[#a1a1aa]">
                              {evt.date}
                            </span>
                          </div>
                          <h4 className="font-locania text-lg font-bold text-white leading-snug">
                            {evt.title}
                          </h4>
                          <p className="text-xs text-[#cbd5e1] mt-1 line-clamp-2">
                            {evt.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#27272a] flex items-center justify-between text-xs">
                          <span className="text-[#2dd4bf] font-medium truncate max-w-xs">
                            {evt.venue}
                          </span>
                          <button
                            onClick={() => setActiveTab('events')}
                            className="px-3 py-1 rounded bg-[#0d9488] text-white font-semibold hover:bg-[#0f766e] transition-colors cursor-pointer shrink-0 shadow-2xs border border-[#0d9488]"
                          >
                            RSVP Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manual Add Alumni Banner on Home */}
                <div className="p-8 rounded-2xl bg-[#042f2e]/80 border-2 border-[#0d9488] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf]">
                      Institutional Record Keeping
                    </span>
                    <h3 className="font-locania text-2xl font-bold text-white">
                      Are You a Gautam Buddha University Graduate?
                    </h3>
                    <p className="text-xs text-[#cbd5e1] font-editorial text-[16px]">
                      Add your alumni profile manually to connect with your batchmates, receive university newsletters, and guide upcoming students.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddAlumniModalOpen(true)}
                    className="px-6 py-3 rounded-lg bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0f766e] transition-all shadow-md shrink-0 cursor-pointer border border-[#0d9488]"
                  >
                    Add Alumni Data Manually
                  </button>
                </div>

              </div>
            </section>
          </div>
        )}

        {activeTab === 'directory' && <DirectorySection />}

        {activeTab === 'mentorship' && <MentorshipPortal />}

        {activeTab === 'events' && <EventsSection />}

        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* MODALS */}
      <WelcomeAuthModal />
      <AlumniDetailModal />
      <AddAlumniModal />
      <MentorshipBookingModal />
      <ProfileModal />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
