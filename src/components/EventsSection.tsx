import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem } from '../types';
import { ScrollableOptionsBar } from './ScrollableOptionsBar';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles, 
  Video, 
  Check, 
  Plus, 
  Share2, 
  GraduationCap, 
  ExternalLink,
  Tag
} from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { events, toggleRsvp, addEvent, currentUser, setIsAuthModalOpen, showToast } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isAnnounceModalOpen, setIsAnnounceModalOpen] = useState(false);

  // Announce Event Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventItem['category']>('Webinar');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('06:00 PM - 07:30 PM IST');
  const [venue, setVenue] = useState('Virtual Google Meet');
  const [isVirtual, setIsVirtual] = useState(true);
  const [speaker, setSpeaker] = useState('');
  const [speakerRole, setSpeakerRole] = useState('');
  const [description, setDescription] = useState('');

  const categories = ['All', 'Conclave', 'Webinar', 'Workshop', 'Networking', 'Reunion'];

  const filteredEvents = events.filter(evt => {
    if (filterCategory !== 'All' && evt.category !== filterCategory) return false;
    return true;
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) {
      showToast('Please provide event title and date.');
      return;
    }

    addEvent({
      title,
      category,
      date,
      time,
      venue,
      isVirtual,
      description: description || 'Alumni interactive session organized by Gautam Buddha University alumni association.',
      speaker: speaker || 'GBU Alumni Panel',
      speakerRole: speakerRole || 'Industry Leaders',
      organizer: currentUser ? `${currentUser.fullName} (${currentUser.role})` : 'GBU Alumni Cell',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
    });

    setIsAnnounceModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <section id="events-section" className="py-10 px-4 sm:px-6 lg:px-8 bg-[#1a1816]">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#383430]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#c99c7b] mb-1">
              <Calendar className="w-4 h-4" />
              <span>Campus & Global Gatherings</span>
            </div>
            <h2 className="font-locania text-2xl sm:text-3xl font-extrabold text-[#f5f2ed] tracking-wide">
              Event Announcements & Reunions
            </h2>
            <p className="text-xs sm:text-sm text-[#a1958b] mt-1 font-editorial text-[16px]">
              Stay informed on upcoming convocations, chapter mixers, tech symposiums, and webinars hosted by GBU alumni.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="announce-event-btn"
              onClick={() => {
                if (!currentUser) {
                  setIsAuthModalOpen(true);
                  showToast('Please sign in to announce an event.');
                  return;
                }
                setIsAnnounceModalOpen(true);
              }}
              className="px-4 py-2 rounded-md bg-[#8d7d70] text-[#141414] text-xs font-bold uppercase tracking-wider hover:bg-[#a1958b] transition-colors shadow-2xs flex items-center gap-2 cursor-pointer border border-[#8d7d70]"
            >
              <Plus className="w-4 h-4 text-[#141414]" />
              <span>Announce Event</span>
            </button>
          </div>
        </div>

        {/* Category Pills with working moving right scroll button */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-[#a1958b] mb-2 px-1">
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#c99c7b] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#c99c7b]" />
              <span>Event Categories</span>
            </span>
            <span className="text-[11px] text-[#78716c] hidden sm:inline">
              Click arrow to scroll options →
            </span>
          </div>

          <ScrollableOptionsBar idPrefix="events-cat" step={240} className="py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                  filterCategory === cat
                    ? 'bg-[#8d7d70] text-[#141414] font-bold shadow-2xs'
                    : 'bg-[#242220] text-[#c99c7b] border border-[#383430] hover:bg-[#2d2a27] hover:text-[#f5f2ed]'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollableOptionsBar>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => {
            const hasRsvpd = currentUser && evt.rsvpdUsers.includes(currentUser.id);

            return (
              <div
                key={evt.id}
                id={`event-card-${evt.id}`}
                className="bg-[#242220] rounded-xl border border-[#383430] overflow-hidden shadow-xs hover:border-[#8d7d70] transition-colors flex flex-col justify-between"
              >
                {/* Image Banner */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-[#1c1a18]">
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/30 to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10.5px] font-bold uppercase tracking-wider bg-[#141414]/80 text-[#f5f2ed] border border-[#383430]">
                      {evt.category}
                    </span>
                    {evt.isVirtual && (
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-[#2d2a27]/90 text-[#c99c7b] border border-[#383430] backdrop-blur-xs flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        <span>Virtual Stream</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 text-xs text-[#c99c7b] font-medium mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{evt.time}</span>
                    </div>
                  </div>
                </div>

                {/* Event Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-locania text-lg sm:text-xl font-bold text-[#f5f2ed] leading-snug mb-2">
                      {evt.title}
                    </h3>

                    <div className="flex items-start gap-1.5 text-xs text-[#c99c7b] mb-3">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#a1958b]" />
                      <span className="line-clamp-1">{evt.venue}</span>
                    </div>

                    <p className="text-xs text-[#d6cfc7] leading-relaxed line-clamp-3 mb-4 font-editorial text-[15px]">
                      {evt.description}
                    </p>

                    {/* Keynote / Speaker Spotlight */}
                    {evt.speaker && (
                      <div className="p-3 bg-[#1a1816] rounded-lg border border-[#383430] flex items-center gap-2.5 text-xs">
                        <div className="w-8 h-8 rounded-full bg-[#2d2a27] text-[#c99c7b] flex items-center justify-center shrink-0 font-bold">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#f5f2ed] truncate">
                            Speaker: {evt.speaker}
                          </p>
                          <p className="text-[11px] text-[#a1958b] truncate">
                            {evt.speakerRole} {evt.speakerBatch ? `(${evt.speakerBatch})` : ''}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions & RSVPs */}
                  <div className="pt-3 border-t border-[#383430] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#a1958b]">
                      <Users className="w-4 h-4 text-[#8d7d70]" />
                      <span className="font-semibold text-[#f5f2ed]">{evt.rsvpCount}</span>
                      <span>Graduates Attending</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {evt.isVirtual && evt.virtualLink && (
                        <a
                          href={evt.virtualLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 rounded text-xs font-semibold text-[#c99c7b] hover:bg-[#2d2a27] border border-[#383430] flex items-center gap-1 transition-colors"
                        >
                          <span>Stream Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <button
                        onClick={() => toggleRsvp(evt.id)}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                          hasRsvpd
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 hover:bg-emerald-900 shadow-2xs'
                            : 'bg-[#8d7d70] hover:bg-[#a1958b] text-[#141414]'
                        }`}
                      >
                        {hasRsvpd ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>RSVP Confirmed</span>
                          </>
                        ) : (
                          <span>RSVP Now</span>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Announce Event Modal */}
      {isAnnounceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#242220] rounded-xl shadow-2xl border border-[#383430] overflow-hidden my-6">
            <div className="bg-[#1c1a18] text-[#f5f2ed] px-6 py-4 flex items-center justify-between border-b border-[#383430]">
              <h3 className="font-locania text-lg font-bold text-[#f5f2ed] uppercase">
                Announce Alumni Event or Webinar
              </h3>
              <button
                onClick={() => setIsAnnounceModalOpen(false)}
                className="text-[#a1958b] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#d6cfc7] mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Homecoming & GBU Tech Alumni Fireside"
                  className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70]"
                  >
                    <option value="Conclave" className="bg-[#242220]">Conclave</option>
                    <option value="Webinar" className="bg-[#242220]">Webinar</option>
                    <option value="Workshop" className="bg-[#242220]">Workshop</option>
                    <option value="Networking" className="bg-[#242220]">Networking</option>
                    <option value="Reunion" className="bg-[#242220]">Reunion</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Date *</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. November 21, 2026"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 05:00 PM - 07:00 PM IST"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Venue / Platform</label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Campus Auditorium or Zoom"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Featured Speaker</label>
                  <input
                    type="text"
                    value={speaker}
                    onChange={(e) => setSpeaker(e.target.value)}
                    placeholder="e.g. Alumnus Name"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Speaker Designation</label>
                  <input
                    type="text"
                    value={speakerRole}
                    onChange={(e) => setSpeakerRole(e.target.value)}
                    placeholder="e.g. Senior Director at Adobe"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#d6cfc7] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key agenda, topics covered, target attendees..."
                  className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAnnounceModalOpen(false)}
                  className="px-3 py-1.5 rounded text-[#a1958b] hover:bg-[#2d2a27] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#8d7d70] hover:bg-[#a1958b] text-[#141414] font-bold uppercase transition-colors"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
