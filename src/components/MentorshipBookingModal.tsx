import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  Send,
  GraduationCap
} from 'lucide-react';

export const MentorshipBookingModal: React.FC = () => {
  const { 
    selectedMentorForBooking, 
    setSelectedMentorForBooking, 
    bookMentorship, 
    currentUser, 
    setIsAuthModalOpen,
    showToast 
  } = useApp();

  const [topic, setTopic] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-10-15');
  const [sessionTime, setSessionTime] = useState('06:00 PM IST');
  const [message, setMessage] = useState('');

  if (!selectedMentorForBooking) return null;

  const mentor = selectedMentorForBooking;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to request a mentorship slot.');
      return;
    }

    if (!topic.trim()) {
      showToast('Please specify the primary topic or goal for this session.');
      return;
    }

    bookMentorship(
      mentor.id,
      mentor.fullName,
      topic.trim(),
      message.trim() || `Mentorship request from ${currentUser.fullName} (${currentUser.degree || 'Student'}).`,
      `${preferredDate} at ${sessionTime}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="mentorship-booking-card"
        className="relative w-full max-w-lg bg-[#0f0f12] rounded-xl shadow-2xl border border-[#27272a] overflow-hidden my-6 text-white"
      >
        {/* Header */}
        <div className="bg-[#18181b] text-white px-6 py-4 flex items-center justify-between border-b border-[#27272a]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-locania text-lg font-bold text-white tracking-wide uppercase">
                Request Career Mentorship
              </h3>
              <p className="text-[11px] text-[#2dd4bf] font-medium">
                1-on-1 Guidance with verified GBU Alumni
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedMentorForBooking(null)}
            className="w-8 h-8 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#3f3f46]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Mentor Capsule */}
        <div className="bg-[#18181b] p-4 border-b border-[#27272a] flex items-center gap-3">
          <img
            src={mentor.avatarUrl}
            alt={mentor.fullName}
            className="w-12 h-12 rounded-full object-cover border border-[#27272a]"
          />
          <div>
            <h4 className="font-locania text-base font-bold text-white">
              {mentor.fullName}
            </h4>
            <p className="text-xs font-semibold text-[#2dd4bf]">
              {mentor.currentRole} at {mentor.currentCompany}
            </p>
            <p className="text-[11px] text-[#a1a1aa]">
              Batch of {mentor.batchYear} • {mentor.school.split('(')[1]?.replace(')', '') || mentor.school}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Preset Topics if any */}
          {mentor.mentorshipTopics && mentor.mentorshipTopics.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2dd4bf] mb-1.5">
                Suggested Topics by {mentor.fullName.split(' ')[0]}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {mentor.mentorshipTopics.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer text-left ${
                      topic === t 
                        ? 'bg-[#0d9488] text-white font-bold' 
                        : 'bg-[#18181b] hover:bg-[#27272a] text-[#cbd5e1] border border-[#27272a]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Topic */}
          <div>
            <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
              Session Objective / Primary Topic *
            </label>
            <input
              id="booking-topic"
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Guidance on Off-campus tech placements & Resume review"
              className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
            />
          </div>

          {/* Date & Preferred Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#2dd4bf]" />
                <input
                  id="booking-date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Preferred Time Slot
              </label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#2dd4bf]" />
                <input
                  id="booking-time"
                  type="text"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  placeholder="e.g. 06:00 PM IST (Weekend)"
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                />
              </div>
            </div>
          </div>

          {/* Message & Context */}
          <div>
            <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
              Your Background & Specific Questions
            </label>
            <textarea
              id="booking-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce your current year, branch, and 2-3 specific questions you'd love to ask during the 30-min session..."
              className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
            />
          </div>

          <div className="p-3 bg-[#18181b] rounded-lg border border-[#27272a] text-[11px] text-[#cbd5e1] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2dd4bf] shrink-0" />
            <span>
              All mentorship sessions are conducted virtually via Google Meet or Zoom, scheduled around mentor convenience.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSelectedMentorForBooking(null)}
              className="px-4 py-2 text-xs font-semibold text-[#a1a1aa] hover:bg-[#18181b] rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-booking-btn"
              type="submit"
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0d9488] hover:bg-[#0f766e] rounded-md transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 border border-[#0d9488]"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span>Submit Mentorship Request</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
