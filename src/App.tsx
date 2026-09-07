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
      <div className="min-h-screen bg-[#141414] font-body selection:bg-[#8d7d70] selection:text-[#141414]">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#252321] text-[#f5f2ed] px-4 py-3 rounded-xl shadow-2xl border border-[#8d7d70] flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
            <Sparkles className="w-4 h-4 text-[#c99c7b]" />
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
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-[#f5f2ed] font-body selection:bg-[#8d7d70] selection:text-[#1a1a1a]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#252321] text-[#f5f2ed] px-4 py-3 rounded-xl shadow-2xl border border-[#8d7d70] flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-[#c99c7b]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Guest Mode Indicator Ribbon */}
      {isGuestMode && (
        <aside 
          id="guest-visitor-banner"
          className="bg-[#242220] border-b border-[#383430] py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-[#d6cfc7]"
        >
          <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1c1a18] text-[#c99c7b] border border-[#3e3833] font-bold uppercase text-[10px] tracking-wider">
                <Eye className="w-3 h-3 text-[#c99c7b]" />
                <span>Guest Visitor</span>
              </span>
              <span className="font-locania text-xs font-bold text-[#f5f2ed] tracking-wider uppercase px-2 py-0.5 bg-[#181615] rounded border border-[#383430]">
                Discover • Connect • Grow
              </span>
              <span className="text-[#a1958b] text-[11px] hidden lg:inline">
                • Read-only access. Sign in anytime to bookmark alumni, RSVP for events, or book mentorship.
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                id="btn-guest-banner-signin"
                onClick={() => setIsAuthModalOpen(true)}
                className="font-bold text-[#f5f2ed] hover:text-[#c99c7b] transition-colors cursor-pointer flex items-center gap-1 text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#c99c7b]" />
                <span>Sign In / Join</span>
              </button>
              <span className="text-[#423c37]">•</span>
              <button
                id="btn-guest-banner-login-page"
                onClick={() => setActiveTab('login')}
                className="text-[#a1958b] hover:text-[#f5f2ed] text-[11px] cursor-pointer"
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
            <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#1e1c1a] border-b border-[#383430]">
              <div className="container mx-auto max-w-7xl space-y-12">
                
                {/* 3 Core Portals Feature Strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1: Directory */}
                  <div 
                    onClick={() => setActiveTab('directory')}
                    className="p-6 rounded-2xl bg-[#242220] border border-[#383430] hover:border-[#8d7d70] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#2d2a27] text-[#c99c7b] border border-[#423c37] flex items-center justify-center mb-4">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#a1958b]">
                        Searchable Database
                      </span>
                      <h3 className="font-locania text-xl font-bold text-[#f5f2ed] mt-1 mb-2 group-hover:text-[#c99c7b] transition-colors">
                        Alumni Directory
                      </h3>
                      <p className="text-xs text-[#a1958b] leading-relaxed font-editorial text-[15px]">
                        Access verified records across all GBU schools, batch years (2008-2025), companies, and global chapters.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#383430] flex items-center justify-between text-xs font-bold text-[#c99c7b]">
                      <span>Explore Directory</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2: Mentorship */}
                  <div 
                    onClick={() => setActiveTab('mentorship')}
                    className="p-6 rounded-2xl bg-[#242220] border border-[#383430] hover:border-[#8d7d70] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#2d2a27] text-[#c99c7b] border border-[#423c37] flex items-center justify-center mb-4">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#a1958b]">
                        1-on-1 Guidance
                      </span>
                      <h3 className="font-locania text-xl font-bold text-[#f5f2ed] mt-1 mb-2 group-hover:text-[#c99c7b] transition-colors">
                        Career Mentorship Portal
                      </h3>
                      <p className="text-xs text-[#a1958b] leading-relaxed font-editorial text-[15px]">
                        Book dedicated mentorship sessions and request internal job referrals from alumni at Google, Amazon, UPSC, and startups.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#383430] flex items-center justify-between text-xs font-bold text-[#c99c7b]">
                      <span>Browse Mentors & Jobs</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3: Events */}
                  <div 
                    onClick={() => setActiveTab('events')}
                    className="p-6 rounded-2xl bg-[#242220] border border-[#383430] hover:border-[#8d7d70] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#2d2a27] text-[#c99c7b] border border-[#423c37] flex items-center justify-center mb-4">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#a1958b]">
                        Reunions & Conclaves
                      </span>
                      <h3 className="font-locania text-xl font-bold text-[#f5f2ed] mt-1 mb-2 group-hover:text-[#c99c7b] transition-colors">
                        Event Announcements
                      </h3>
                      <p className="text-xs text-[#a1958b] leading-relaxed font-editorial text-[15px]">
                        RSVP for upcoming alumni conclaves, technical firesides, virtual webinars, and homecoming gatherings.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#383430] flex items-center justify-between text-xs font-bold text-[#c99c7b]">
                      <span>View Announcements</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>

                {/* Featured Alumni Showcase on Home */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#383430]">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#a1958b]">
                        Distinguished Graduates
                      </span>
                      <h3 className="font-locania text-2xl font-bold text-[#f5f2ed]">
                        Featured GBU Alumni
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('directory')}
                      className="text-xs font-bold uppercase tracking-wider text-[#c99c7b] hover:text-[#f5f2ed] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({alumniList.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {alumniList.slice(0, 4).map((alumnus) => (
                      <div
                        key={alumnus.id}
                        className="p-4 rounded-xl bg-[#242220] border border-[#383430] hover:border-[#504842] transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start gap-3 mb-3">
                            <img
                              src={alumnus.avatarUrl}
                              alt={alumnus.fullName}
                              className="w-12 h-12 rounded-full object-cover border border-[#8d7d70]"
                            />
                            <div className="min-w-0">
                              <h4 
                                onClick={() => setSelectedAlumniForDetail(alumnus)}
                                className="font-locania text-base font-bold text-[#f5f2ed] hover:text-[#c99c7b] cursor-pointer truncate"
                              >
                                {alumnus.fullName}
                              </h4>
                              <p className="text-xs font-semibold text-[#c99c7b] truncate">
                                {alumnus.currentRole}
                              </p>
                              <p className="text-[11px] text-[#8d7d70] truncate">
                                {alumnus.currentCompany}
                              </p>
                            </div>
                          </div>

                          <div className="text-[11px] text-[#a1958b] space-y-0.5 mb-3 bg-[#1c1a18] p-2 rounded border border-[#383430]">
                            <p className="font-semibold text-[#f5f2ed]">{alumnus.degree}</p>
                            <p className="truncate">Batch of {alumnus.batchYear}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#383430] flex items-center justify-between">
                          <button
                            onClick={() => setSelectedAlumniForDetail(alumnus)}
                            className="text-xs font-semibold text-[#c99c7b] hover:text-[#f5f2ed] cursor-pointer"
                          >
                            Full Bio
                          </button>
                          {alumnus.isAvailableForMentoring ? (
                            <button
                              onClick={() => setSelectedMentorForBooking(alumnus)}
                              className="px-2 py-1 rounded text-[11px] font-bold bg-[#8d7d70] text-[#141414] hover:bg-[#a1958b] cursor-pointer"
                            >
                              Mentorship
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#8d7d70]">
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
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#383430]">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#a1958b]">
                        Calendar Highlights
                      </span>
                      <h3 className="font-locania text-2xl font-bold text-[#f5f2ed]">
                        Upcoming Campus & Virtual Events
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('events')}
                      className="text-xs font-bold uppercase tracking-wider text-[#c99c7b] hover:text-[#f5f2ed] flex items-center gap-1 cursor-pointer"
                    >
                      <span>All Events ({events.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {events.slice(0, 2).map((evt) => (
                      <div
                        key={evt.id}
                        className="bg-[#242220] rounded-xl border border-[#383430] p-5 flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2.5 py-0.5 rounded text-[10.5px] font-bold uppercase bg-[#2d2a27] text-[#c99c7b] border border-[#423c37]">
                              {evt.category}
                            </span>
                            <span className="text-xs font-semibold text-[#a1958b]">
                              {evt.date}
                            </span>
                          </div>
                          <h4 className="font-locania text-lg font-bold text-[#f5f2ed] leading-snug">
                            {evt.title}
                          </h4>
                          <p className="text-xs text-[#a1958b] mt-1 line-clamp-2">
                            {evt.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#383430] flex items-center justify-between text-xs">
                          <span className="text-[#c99c7b] font-medium truncate max-w-xs">
                            {evt.venue}
                          </span>
                          <button
                            onClick={() => setActiveTab('events')}
                            className="px-3 py-1 rounded bg-[#8d7d70] text-[#141414] font-semibold hover:bg-[#a1958b] transition-colors cursor-pointer shrink-0"
                          >
                            RSVP Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manual Add Alumni Banner on Home */}
                <div className="p-8 rounded-2xl bg-[#242220] border border-[#3e3833] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#c99c7b]">
                      Institutional Record Keeping
                    </span>
                    <h3 className="font-locania text-2xl font-bold text-[#f5f2ed]">
                      Are You a Gautam Buddha University Graduate?
                    </h3>
                    <p className="text-xs text-[#a1958b] font-editorial text-[16px]">
                      Add your alumni profile manually to connect with your batchmates, receive university newsletters, and guide upcoming students.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddAlumniModalOpen(true)}
                    className="px-6 py-3 rounded-lg bg-[#8d7d70] text-[#141414] font-bold text-xs uppercase tracking-wider hover:bg-[#a1958b] transition-all shadow-md shrink-0 cursor-pointer"
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
