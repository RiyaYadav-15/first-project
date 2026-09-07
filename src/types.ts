export type SchoolType =
  | 'School of Information & Communication Technology (SoICT)'
  | 'School of Management (SoM)'
  | 'School of Biotechnology (SoBT)'
  | 'School of Engineering (SoE)'
  | 'School of Vocational Studies & Applied Sciences (SoVSAS)'
  | 'School of Humanities & Social Sciences (SoHSS)'
  | 'School of Law, Justice & Governance (SoLJG)'
  | 'School of Buddhist Studies & Civilization (SoBSC)';

export interface AlumniProfile {
  id: string;
  fullName: string;
  enrollmentNo?: string;
  batchYear: number;
  school: SchoolType;
  degree: string; // e.g. B.Tech (CSE), MBA, M.Tech, Ph.D, Integrated B.Tech+M.Tech
  currentRole: string; // e.g. Senior Staff Engineer, Founder, Product Manager, IAS Officer
  currentCompany: string; // e.g. Google, Microsoft, Indian Administrative Service, McKinsey, GBU
  location: string; // e.g. Bengaluru, India; Seattle, USA; Noida, India
  country: string;
  email: string;
  linkedInUrl?: string;
  githubUrl?: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  isAvailableForMentoring: boolean;
  mentorshipTopics?: string[];
  industry: string; // e.g. Technology, Finance, Civil Services, Healthcare, Academia
  verified: boolean;
  featured?: boolean;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  role: 'alumni' | 'student' | 'faculty';
  batchYear?: number;
  school: SchoolType;
  degree?: string;
  currentRole?: string;
  currentCompany?: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  interests: string[];
  isAvailableForMentoring: boolean;
  savedAlumniIds: string[];
  connectedAlumniIds: string[];
  pendingRequests: string[];
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Reunion' | 'Conclave' | 'Webinar' | 'Networking' | 'Career Fair' | 'Workshop';
  date: string;
  time: string;
  venue: string;
  isVirtual: boolean;
  virtualLink?: string;
  description: string;
  speaker?: string;
  speakerRole?: string;
  speakerBatch?: string;
  organizer: string;
  rsvpCount: number;
  rsvpdUsers: string[];
  imageUrl: string;
}

export interface MentorshipTrack {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
  activeMentorCount: number;
}

export interface MentorshipSessionRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  mentorId: string;
  mentorName: string;
  topic: string;
  message: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  requestedDate: string;
  createdAt: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Remote' | 'Part-time';
  postedByAlumniName: string;
  postedByBatch: number;
  postedBySchool: string;
  description: string;
  applicationUrlOrEmail: string;
  skillsRequired: string[];
  postedAt: string;
}

export interface RecommendationQuestions {
  targetDomain: string; // e.g. "Software & AI", "Civil Services", "Management & Consulting", "Biotech & Pharma", "Core Engineering", "Research & Higher Studies"
  graduationEra: string; // e.g. "recent (2020-2025)", "experienced (2014-2019)", "founding (2008-2013)", "any"
  mentorshipNeeded: boolean;
  targetLocation: string; // e.g. "India - NCR", "India - Bengaluru/Hyderabad", "Abroad / Global", "Any"
  schoolFilter?: string;
}
