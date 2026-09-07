import React, { createContext, useContext, useState, useEffect } from 'react';
import { AlumniProfile, EventItem, JobOpportunity, MentorshipSessionRequest, UserAccount } from '../types';
import { DEMO_USERS, INITIAL_ALUMNI, INITIAL_EVENTS, INITIAL_JOBS } from '../data/initialData';

export type NavTab = 'home' | 'about' | 'events' | 'directory' | 'mentorship' | 'contact' | 'login';

interface AppContextType {
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  isGuestMode: boolean;
  enterAsGuest: () => void;
  login: (email: string, role?: 'student' | 'alumni') => boolean;
  signup: (userData: Partial<UserAccount>) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserAccount>) => void;
  
  alumniList: AlumniProfile[];
  addAlumni: (alumni: Omit<AlumniProfile, 'id' | 'verified'>) => void;
  toggleBookmark: (alumniId: string) => void;
  sendConnectionRequest: (alumniId: string) => void;
  
  events: EventItem[];
  toggleRsvp: (eventId: string) => void;
  addEvent: (eventData: Omit<EventItem, 'id' | 'rsvpCount' | 'rsvpdUsers'>) => void;

  mentorshipRequests: MentorshipSessionRequest[];
  bookMentorship: (mentorId: string, mentorName: string, topic: string, message: string, date: string) => void;

  jobs: JobOpportunity[];
  postJob: (job: Omit<JobOpportunity, 'id' | 'postedAt'>) => void;

  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAddAlumniModalOpen: boolean;
  setIsAddAlumniModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  selectedAlumniForDetail: AlumniProfile | null;
  setSelectedAlumniForDetail: (alumni: AlumniProfile | null) => void;
  selectedMentorForBooking: AlumniProfile | null;
  setSelectedMentorForBooking: (mentor: AlumniProfile | null) => void;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Guest mode state with local storage
  const [isGuestMode, setIsGuestMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('alumnet_guest_mode') === 'true';
    } catch {
      return false;
    }
  });

  // Current user state with local storage (defaults to null so visitors experience the Login / Guest page)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('alumnet_current_user');
      if (saved) return JSON.parse(saved);
      return null;
    } catch {
      return null;
    }
  });

  // Alumni list state
  const [alumniList, setAlumniList] = useState<AlumniProfile[]>(() => {
    try {
      const saved = localStorage.getItem('alumnet_alumni_data');
      if (saved) return JSON.parse(saved);
      return INITIAL_ALUMNI;
    } catch {
      return INITIAL_ALUMNI;
    }
  });

  // Events state
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem('alumnet_events_data');
      if (saved) return JSON.parse(saved);
      return INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  // Mentorship requests
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipSessionRequest[]>(() => {
    try {
      const saved = localStorage.getItem('alumnet_mentorship_requests');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'req-01',
          senderId: 'usr-student-01',
          senderName: 'Aayush Rastogi',
          senderEmail: 'aayush.rastogi@gbu.ac.in',
          mentorId: 'gbu-alm-001',
          mentorName: 'Dr. Aditi Sharma',
          topic: 'AI Research Career Guidance & Publications',
          message: 'Hi Dr. Aditi, I am an aspiring ML researcher from SoICT. Would love 20 minutes to get feedback on my paper draft and discuss MS/PhD applications.',
          status: 'accepted',
          requestedDate: '2026-10-02',
          createdAt: '2 days ago'
        }
      ];
    } catch {
      return [];
    }
  });

  // Jobs
  const [jobs, setJobs] = useState<JobOpportunity[]>(() => {
    try {
      const saved = localStorage.getItem('alumnet_jobs_data');
      if (saved) return JSON.parse(saved);
      return INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  // Navigation & Search
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddAlumniModalOpen, setIsAddAlumniModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedAlumniForDetail, setSelectedAlumniForDetail] = useState<AlumniProfile | null>(null);
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState<AlumniProfile | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('alumnet_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('alumnet_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (isGuestMode) {
      localStorage.setItem('alumnet_guest_mode', 'true');
    } else {
      localStorage.removeItem('alumnet_guest_mode');
    }
  }, [isGuestMode]);

  useEffect(() => {
    localStorage.setItem('alumnet_alumni_data', JSON.stringify(alumniList));
  }, [alumniList]);

  useEffect(() => {
    localStorage.setItem('alumnet_events_data', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('alumnet_mentorship_requests', JSON.stringify(mentorshipRequests));
  }, [mentorshipRequests]);

  useEffect(() => {
    localStorage.setItem('alumnet_jobs_data', JSON.stringify(jobs));
  }, [jobs]);

  // Enter as guest
  const enterAsGuest = () => {
    setIsGuestMode(true);
    setCurrentUser(null);
    localStorage.setItem('alumnet_guest_mode', 'true');
    localStorage.removeItem('alumnet_current_user');
    showToast('Welcome to AlumNet! Exploring as a Guest Visitor.');
    setActiveTab('home');
    setIsAuthModalOpen(false);
  };

  // Auth functions
  const login = (email: string, role?: 'student' | 'alumni') => {
    setIsGuestMode(false);
    localStorage.removeItem('alumnet_guest_mode');
    setActiveTab('home');

    const existing = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      showToast(`Welcome back, ${existing.fullName}!`);
      setIsAuthModalOpen(false);
      return true;
    }

    // Dynamic mock user matching login credentials
    const newUser: UserAccount = {
      id: 'usr-' + Date.now(),
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      role: role || (email.includes('alumni') ? 'alumni' : 'student'),
      school: 'School of Information & Communication Technology (SoICT)',
      batchYear: role === 'alumni' ? 2018 : 2025,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      bio: 'Member of the Gautam Buddha University AlumNet community.',
      skills: ['Networking', 'Career Growth'],
      interests: ['Alumni Meetups', 'Mentorship'],
      isAvailableForMentoring: role === 'alumni',
      savedAlumniIds: [],
      connectedAlumniIds: [],
      pendingRequests: []
    };

    setCurrentUser(newUser);
    showToast(`Signed in successfully as ${newUser.fullName}`);
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = (userData: Partial<UserAccount>) => {
    setIsGuestMode(false);
    localStorage.removeItem('alumnet_guest_mode');
    setActiveTab('home');

    const newUser: UserAccount = {
      id: 'usr-' + Date.now(),
      fullName: userData.fullName || 'GBU Member',
      email: userData.email || 'user@gbu.ac.in',
      role: userData.role || 'alumni',
      batchYear: userData.batchYear || 2022,
      school: userData.school || 'School of Information & Communication Technology (SoICT)',
      degree: userData.degree || 'B.Tech',
      currentRole: userData.currentRole || 'Professional',
      currentCompany: userData.currentCompany || 'Industry',
      avatarUrl: userData.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=80',
      bio: userData.bio || 'Proud Gautam Buddha University graduate.',
      skills: userData.skills || ['Communication', 'Technology'],
      interests: userData.interests || ['Mentoring', 'Alumni Network'],
      isAvailableForMentoring: !!userData.isAvailableForMentoring,
      savedAlumniIds: [],
      connectedAlumniIds: [],
      pendingRequests: []
    };

    setCurrentUser(newUser);

    // If signed up as alumni, also append to alumni directory automatically!
    if (newUser.role === 'alumni') {
      const newAlumniCard: AlumniProfile = {
        id: 'gbu-alm-' + Date.now(),
        fullName: newUser.fullName,
        batchYear: newUser.batchYear || 2022,
        school: newUser.school,
        degree: newUser.degree || 'B.Tech',
        currentRole: newUser.currentRole || 'Software Engineer',
        currentCompany: newUser.currentCompany || 'Technology Corp',
        location: 'Delhi-NCR, India',
        country: 'India',
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
        bio: newUser.bio,
        skills: newUser.skills,
        isAvailableForMentoring: newUser.isAvailableForMentoring,
        industry: 'Technology',
        verified: true
      };
      setAlumniList(prev => [newAlumniCard, ...prev]);
    }

    showToast(`Account created for ${newUser.fullName}! Welcome to AlumNet.`);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsGuestMode(false);
    localStorage.removeItem('alumnet_current_user');
    localStorage.removeItem('alumnet_guest_mode');
    showToast('Signed out. Returning to Login & Guest page.');
    setActiveTab('login');
  };

  const updateProfile = (data: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    showToast('Your profile has been updated successfully.');
  };

  // Add alumni manually
  const addAlumni = (data: Omit<AlumniProfile, 'id' | 'verified'>) => {
    const newAlumni: AlumniProfile = {
      ...data,
      id: 'gbu-alm-' + Date.now(),
      verified: true
    };
    setAlumniList(prev => [newAlumni, ...prev]);
    showToast(`Alumni record for ${newAlumni.fullName} added successfully to the database!`);
    setIsAddAlumniModalOpen(false);
  };

  // Bookmark toggle
  const toggleBookmark = (alumniId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      showToast('Please log in to save alumni to your bookmarks.');
      return;
    }
    const exists = currentUser.savedAlumniIds.includes(alumniId);
    const updatedSaved = exists
      ? currentUser.savedAlumniIds.filter(id => id !== alumniId)
      : [...currentUser.savedAlumniIds, alumniId];

    setCurrentUser({
      ...currentUser,
      savedAlumniIds: updatedSaved
    });

    showToast(exists ? 'Removed from saved profiles' : 'Saved to your network list');
  };

  // Connect request
  const sendConnectionRequest = (alumniId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to send connection requests.');
      return;
    }
    if (currentUser.connectedAlumniIds.includes(alumniId)) {
      showToast('You are already connected with this alumnus!');
      return;
    }
    if (currentUser.pendingRequests.includes(alumniId)) {
      showToast('Connection request is already pending approval.');
      return;
    }

    const updatedPending = [...currentUser.pendingRequests, alumniId];
    setCurrentUser({
      ...currentUser,
      pendingRequests: updatedPending
    });

    const target = alumniList.find(a => a.id === alumniId);
    showToast(`Connection request sent to ${target ? target.fullName : 'alumnus'}!`);
  };

  // RSVP Event
  const toggleRsvp = (eventId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      showToast('Please log in to RSVP for university events.');
      return;
    }

    setEvents(prev =>
      prev.map(evt => {
        if (evt.id === eventId) {
          const hasRsvpd = evt.rsvpdUsers.includes(currentUser.id);
          const newUsers = hasRsvpd
            ? evt.rsvpdUsers.filter(uid => uid !== currentUser.id)
            : [...evt.rsvpdUsers, currentUser.id];
          const newCount = hasRsvpd ? Math.max(0, evt.rsvpCount - 1) : evt.rsvpCount + 1;
          showToast(hasRsvpd ? `RSVP cancelled for ${evt.title}` : `RSVP confirmed for ${evt.title}! See you there.`);
          return {
            ...evt,
            rsvpCount: newCount,
            rsvpdUsers: newUsers
          };
        }
        return evt;
      })
    );
  };

  const addEvent = (eventData: Omit<EventItem, 'id' | 'rsvpCount' | 'rsvpdUsers'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: 'evt-' + Date.now(),
      rsvpCount: 1,
      rsvpdUsers: currentUser ? [currentUser.id] : []
    };
    setEvents(prev => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" announced successfully!`);
  };

  // Book mentorship
  const bookMentorship = (mentorId: string, mentorName: string, topic: string, message: string, date: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to request a mentorship session.');
      return;
    }

    const newRequest: MentorshipSessionRequest = {
      id: 'req-' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderEmail: currentUser.email,
      mentorId,
      mentorName,
      topic,
      message,
      status: 'pending',
      requestedDate: date,
      createdAt: 'Just now'
    };

    setMentorshipRequests(prev => [newRequest, ...prev]);
    setSelectedMentorForBooking(null);
    showToast(`Mentorship request submitted to ${mentorName}! You will receive a confirmation email.`);
  };

  const postJob = (job: Omit<JobOpportunity, 'id' | 'postedAt'>) => {
    const newJob: JobOpportunity = {
      ...job,
      id: 'job-' + Date.now(),
      postedAt: 'Just now'
    };
    setJobs(prev => [newJob, ...prev]);
    showToast(`Opportunity "${newJob.title}" posted for GBU community!`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isGuestMode,
        enterAsGuest,
        login,
        signup,
        logout,
        updateProfile,
        alumniList,
        addAlumni,
        toggleBookmark,
        sendConnectionRequest,
        events,
        toggleRsvp,
        addEvent,
        mentorshipRequests,
        bookMentorship,
        jobs,
        postJob,
        activeTab,
        setActiveTab,
        globalSearchQuery,
        setGlobalSearchQuery,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAddAlumniModalOpen,
        setIsAddAlumniModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        selectedAlumniForDetail,
        setSelectedAlumniForDetail,
        selectedMentorForBooking,
        setSelectedMentorForBooking,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
