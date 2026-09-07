import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Github, 
  Sparkles, 
  Bookmark, 
  ShieldCheck, 
  UserCheck, 
  MessageSquare
} from 'lucide-react';

export const AlumniDetailModal: React.FC = () => {
  const { 
    selectedAlumniForDetail, 
    setSelectedAlumniForDetail, 
    setSelectedMentorForBooking,
    sendConnectionRequest, 
    toggleBookmark,
    currentUser 
  } = useApp();

  if (!selectedAlumniForDetail) return null;

  const a = selectedAlumniForDetail;
  const isBookmarked = currentUser?.savedAlumniIds.includes(a.id);
  const isConnected = currentUser?.connectedAlumniIds.includes(a.id);
  const isPending = currentUser?.pendingRequests.includes(a.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="alumni-detail-modal-card"
        className="relative w-full max-w-2xl bg-[#242220] rounded-xl shadow-2xl border border-[#383430] overflow-hidden my-6"
      >
        {/* Modal Top Header with university heritage banner */}
        <div className="h-28 bg-[#1c1a18] border-b border-[#383430] relative p-4 flex items-start justify-between">
          <div className="flex items-center gap-2 text-[#c99c7b] text-xs">
            <GraduationCap className="w-4 h-4 text-[#c99c7b]" />
            <span className="font-locania uppercase tracking-widest text-[11px] font-bold">
              GBU Alumni Profile
            </span>
          </div>

          <button
            id="close-alumni-modal-btn"
            onClick={() => setSelectedAlumniForDetail(null)}
            className="w-8 h-8 rounded-full bg-[#2d2a27] hover:bg-[#383430] text-[#a1958b] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#383430]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 pt-0 relative">
          
          {/* Avatar and Top Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="relative">
              <img
                src={a.avatarUrl}
                alt={a.fullName}
                className="w-24 h-24 rounded-xl object-cover border-4 border-[#242220] shadow-md bg-[#242220]"
              />
              {a.verified && (
                <span 
                  title="Verified GBU Alumnus"
                  className="absolute bottom-1 right-1 p-1 rounded-full bg-[#1c1a18] text-[#c99c7b] border border-[#383430]"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(a.id)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#2d2a27] border-[#8d7d70] text-[#c99c7b]'
                    : 'bg-[#1a1816] border-[#383430] text-[#a1958b] hover:text-[#f5f2ed]'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark profile'}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              {a.isAvailableForMentoring && (
                <button
                  id="modal-request-mentor-btn"
                  onClick={() => {
                    setSelectedMentorForBooking(a);
                    setSelectedAlumniForDetail(null);
                  }}
                  className="px-3 py-2 rounded-lg bg-[#8d7d70] text-[#141414] text-xs font-bold hover:bg-[#a1958b] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#141414]" />
                  <span>Request Mentorship</span>
                </button>
              )}

              <button
                id="modal-connect-btn"
                onClick={() => sendConnectionRequest(a.id)}
                disabled={isConnected || isPending}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isConnected
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                    : isPending
                    ? 'bg-amber-950/70 text-amber-300 border border-amber-800 cursor-default'
                    : 'bg-[#2d2a27] text-[#f5f2ed] hover:bg-[#383430] border border-[#383430]'
                }`}
              >
                {isConnected ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Connected</span>
                  </>
                ) : isPending ? (
                  <>
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Request Sent</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Alumnus Identity */}
          <div className="mb-5">
            <h3 className="font-locania text-2xl font-bold text-[#f5f2ed]">
              {a.fullName}
            </h3>
            <p className="text-sm font-semibold text-[#c99c7b] flex items-center gap-1.5 mt-0.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{a.currentRole} at <strong className="text-[#f5f2ed]">{a.currentCompany}</strong></span>
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#a1958b] mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8d7d70]" />
                <span>{a.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#8d7d70]" />
                <span>Batch of {a.batchYear}</span>
              </span>
              {a.enrollmentNo && (
                <span className="text-[11px] bg-[#1a1816] border border-[#383430] px-2 py-0.5 rounded text-[#a1958b] font-mono">
                  Roll: {a.enrollmentNo}
                </span>
              )}
            </div>
          </div>

          {/* Academic Profile Details */}
          <div className="bg-[#1c1a18] p-3.5 rounded-lg border border-[#383430] mb-5 space-y-1.5">
            <div className="text-xs">
              <span className="font-bold text-[#f5f2ed]">Faculty / School: </span>
              <span className="text-[#d6cfc7]">{a.school}</span>
            </div>
            <div className="text-xs">
              <span className="font-bold text-[#f5f2ed]">Degree: </span>
              <span className="text-[#d6cfc7]">{a.degree}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c99c7b] mb-2">
              About & Career Journey
            </h4>
            <p className="text-xs sm:text-sm text-[#d6cfc7] font-editorial text-[15px] sm:text-[16px] leading-relaxed">
              {a.bio}
            </p>
          </div>

          {/* Skills & Expertise */}
          <div className="mb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c99c7b] mb-2">
              Skills & Core Expertise
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {a.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#1a1816] text-[#f5f2ed] text-xs font-medium border border-[#383430]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Mentorship Topics if available */}
          {a.isAvailableForMentoring && a.mentorshipTopics && a.mentorshipTopics.length > 0 && (
            <div className="mb-5 p-3.5 rounded-lg bg-[#1c1a18] border border-[#383430]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c99c7b] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8d7d70]" />
                <span>Mentorship Offerings & Discussion Topics</span>
              </h4>
              <ul className="space-y-1 text-xs text-[#d6cfc7]">
                {a.mentorshipTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#8d7d70] font-bold">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact & Social Links */}
          <div className="pt-4 border-t border-[#383430] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#c99c7b]">
              <Mail className="w-4 h-4 text-[#8d7d70]" />
              <span className="font-mono text-[11px]">{a.email}</span>
            </div>

            <div className="flex items-center gap-3">
              {a.linkedInUrl && (
                <a
                  href={a.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1a1816] hover:bg-[#2d2a27] text-[#f5f2ed] border border-[#383430] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </a>
              )}
              {a.githubUrl && (
                <a
                  href={a.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1a1816] hover:bg-[#2d2a27] text-[#f5f2ed] border border-[#383430] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
