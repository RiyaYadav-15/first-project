import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AlumniProfile, RecommendationQuestions } from '../types';
import { ScrollableOptionsBar } from './ScrollableOptionsBar';
import { 
  Sparkles, 
  ChevronRight, 
  Target, 
  Clock, 
  Compass, 
  Check, 
  RotateCcw, 
  Users, 
  ArrowUpRight, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  Briefcase 
} from 'lucide-react';

export const RecommendationBar: React.FC = () => {
  const { 
    alumniList, 
    setSelectedAlumniForDetail, 
    setSelectedMentorForBooking, 
    sendConnectionRequest, 
    currentUser,
    setActiveTab 
  } = useApp();

  const [isOpen, setIsOpen] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Filter questions state
  const [preferences, setPreferences] = useState<RecommendationQuestions>({
    targetDomain: 'Software & AI',
    graduationEra: 'any',
    mentorshipNeeded: true,
    targetLocation: 'Any',
    schoolFilter: 'All'
  });

  // Calculate matched alumni dynamically
  const recommendations = useMemo(() => {
    return alumniList
      .map(alumnus => {
        let score = 50; // baseline
        const matchReasons: string[] = [];

        // Domain & Industry Match
        if (preferences.targetDomain === 'Software & AI' && (alumnus.industry === 'Technology' || alumnus.skills.some(s => ['AI', 'Python', 'Machine Learning', 'Systems'].some(k => s.includes(k))))) {
          score += 25;
          matchReasons.push('Aligns with your interest in Software & AI');
        } else if (preferences.targetDomain === 'Civil Services' && (alumnus.industry.includes('Civil') || alumnus.currentRole.includes('IAS') || alumnus.currentRole.includes('Secretary'))) {
          score += 25;
          matchReasons.push('Alumnus serving in Civil Services / Governance');
        } else if (preferences.targetDomain === 'Management & Consulting' && (alumnus.industry.includes('Finance') || alumnus.currentCompany.includes('McKinsey') || alumnus.degree.includes('MBA'))) {
          score += 25;
          matchReasons.push('Strong Strategy & Consulting background');
        } else if (preferences.targetDomain === 'Biotech & Pharma' && alumnus.school.includes('Biotechnology')) {
          score += 25;
          matchReasons.push('Biotech & Life Sciences specialist');
        } else if (preferences.targetDomain === 'Startups & Venture' && (alumnus.currentRole.includes('Founder') || alumnus.industry.includes('Startups'))) {
          score += 25;
          matchReasons.push('Startup Founder / YC Alumnus');
        }

        // Mentorship Match
        if (preferences.mentorshipNeeded && alumnus.isAvailableForMentoring) {
          score += 15;
          matchReasons.push('Actively offering 1-on-1 mentorship to GBU graduates');
        }

        // Graduation Era Match
        if (preferences.graduationEra === 'recent' && alumnus.batchYear >= 2020) {
          score += 10;
          matchReasons.push(`Recent graduate (Batch ${alumnus.batchYear}) with fresh campus experience`);
        } else if (preferences.graduationEra === 'experienced' && alumnus.batchYear >= 2014 && alumnus.batchYear <= 2019) {
          score += 10;
          matchReasons.push(`Experienced industry leader (Batch ${alumnus.batchYear})`);
        } else if (preferences.graduationEra === 'founding' && alumnus.batchYear <= 2013) {
          score += 10;
          matchReasons.push(`Founding decade alumnus (Batch ${alumnus.batchYear})`);
        }

        // Location Match
        if (preferences.targetLocation === 'NCR' && (alumnus.location.includes('Noida') || alumnus.location.includes('Delhi') || alumnus.location.includes('Gurugram'))) {
          score += 10;
          matchReasons.push('Located in Delhi-NCR proximity');
        } else if (preferences.targetLocation === 'Abroad' && alumnus.country !== 'India') {
          score += 10;
          matchReasons.push(`International alumnus based in ${alumnus.location}`);
        }

        // Cap score at 99%
        const finalScore = Math.min(99, score);

        return {
          alumnus,
          matchScore: finalScore,
          matchReasons: matchReasons.slice(0, 2)
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 4);
  }, [alumniList, preferences]);

  const resetQuestions = () => {
    setPreferences({
      targetDomain: 'Software & AI',
      graduationEra: 'any',
      mentorshipNeeded: true,
      targetLocation: 'Any',
      schoolFilter: 'All'
    });
    setActiveStep(0);
  };

  return (
    <div id="recommendation-bar-container" className="w-full bg-[#201e1c] border-y border-[#383430] py-7 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Title with Locania Styling */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#383430]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2d2a27] border border-[#3e3833] flex items-center justify-center text-[#c99c7b] shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-locania text-xl sm:text-2xl font-bold text-[#f5f2ed] tracking-wide">
                  Personalized Connections & Mentorship Engine
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#2d2a27] text-[#c99c7b] border border-[#3e3833]">
                  Live Matching
                </span>
              </div>
              <p className="text-xs text-[#a1958b] mt-0.5 font-normal">
                Answer four quick questions about your career trajectory, interests, and goals to discover verified GBU alumni best suited to advise and connect with you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              id="reset-recommendations-btn"
              onClick={resetQuestions}
              className="px-3 py-1.5 rounded text-xs font-semibold text-[#c99c7b] hover:bg-[#2d2a27] border border-[#383430] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>

            <button
              id="toggle-recommendation-bar"
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 py-1.5 rounded text-xs font-semibold bg-[#2d2a27] text-[#f5f2ed] hover:bg-[#383430] border border-[#423c37] transition-colors cursor-pointer"
            >
              {isOpen ? 'Collapse Wizard' : 'Open Matching Wizard'}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="space-y-6">
            {/* 4 Interactive Valid Questions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-[#1a1816] p-4 rounded-xl border border-[#383430] shadow-md">
              
              {/* Question 1: Target Career Domain */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#d6cfc7] uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#c99c7b]" />
                  <span>1. Desired Domain</span>
                </label>
                <select
                  id="rec-q-domain"
                  value={preferences.targetDomain}
                  onChange={(e) => setPreferences({ ...preferences, targetDomain: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-[#242220] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70] cursor-pointer"
                >
                  <option value="Software & AI" className="bg-[#242220]">Software, Cloud & AI</option>
                  <option value="Civil Services" className="bg-[#242220]">Civil Services (IAS / UPPSC)</option>
                  <option value="Management & Consulting" className="bg-[#242220]">Consulting & Strategy</option>
                  <option value="Biotech & Pharma" className="bg-[#242220]">Biotech & Pharma R&D</option>
                  <option value="Startups & Venture" className="bg-[#242220]">Startups & Entrepreneurship</option>
                </select>
              </div>

              {/* Question 2: Graduation Era */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#d6cfc7] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c99c7b]" />
                  <span>2. Experience Level</span>
                </label>
                <select
                  id="rec-q-era"
                  value={preferences.graduationEra}
                  onChange={(e) => setPreferences({ ...preferences, graduationEra: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-[#242220] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70] cursor-pointer"
                >
                  <option value="any" className="bg-[#242220]">Any Experience (All Batches)</option>
                  <option value="recent" className="bg-[#242220]">Recent Alumni (2020 - 2025)</option>
                  <option value="experienced" className="bg-[#242220]">Senior Leaders (2014 - 2019)</option>
                  <option value="founding" className="bg-[#242220]">Founding Batches (2008 - 2013)</option>
                </select>
              </div>

              {/* Question 3: Mentorship Willingness */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#d6cfc7] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c99c7b]" />
                  <span>3. Mentorship Goal</span>
                </label>
                <select
                  id="rec-q-mentor"
                  value={preferences.mentorshipNeeded ? 'mentor' : 'all'}
                  onChange={(e) => setPreferences({ ...preferences, mentorshipNeeded: e.target.value === 'mentor' })}
                  className="w-full px-2.5 py-2 text-xs bg-[#242220] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70] cursor-pointer"
                >
                  <option value="mentor" className="bg-[#242220]">Actively Open to Mentor 1-on-1</option>
                  <option value="all" className="bg-[#242220]">General Professional Networking</option>
                </select>
              </div>

              {/* Question 4: Preferred Geography */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#d6cfc7] uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#c99c7b]" />
                  <span>4. Target Location</span>
                </label>
                <select
                  id="rec-q-location"
                  value={preferences.targetLocation}
                  onChange={(e) => setPreferences({ ...preferences, targetLocation: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-[#242220] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70] cursor-pointer"
                >
                  <option value="Any" className="bg-[#242220]">Global (Any Location)</option>
                  <option value="NCR" className="bg-[#242220]">Delhi-NCR / Noida / Gurugram</option>
                  <option value="Abroad" className="bg-[#242220]">International / Overseas Expats</option>
                </select>
              </div>

            </div>

            {/* Quick Domain Options Strip with Working Moving Right Button */}
            <div className="bg-[#1e1c1a] p-2.5 rounded-lg border border-[#383430]">
              <div className="flex items-center justify-between text-[11px] text-[#a1958b] mb-1.5 px-1">
                <span className="font-bold uppercase tracking-wider text-[#c99c7b] flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#c99c7b]" />
                  <span>Quick Domain Shortcuts</span>
                </span>
                <span className="text-[10px] text-[#78716c] hidden sm:inline">
                  Scroll options right →
                </span>
              </div>

              <ScrollableOptionsBar idPrefix="rec-domains" step={220}>
                {[
                  { label: 'Software, Cloud & AI', value: 'Software & AI' },
                  { label: 'Civil Services (IAS / UPPSC)', value: 'Civil Services' },
                  { label: 'Consulting & Strategy', value: 'Management & Consulting' },
                  { label: 'Biotech & Pharma R&D', value: 'Biotech & Pharma' },
                  { label: 'Startups & Venture Capital', value: 'Startups & Venture' },
                  { label: 'Judiciary & Corporate Law', value: 'Legal Services' },
                  { label: 'Core Engineering & Infrastructure', value: 'Core Engineering' }
                ].map((item) => {
                  const isActive = preferences.targetDomain === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setPreferences({ ...preferences, targetDomain: item.value })}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 border ${
                        isActive
                          ? 'bg-[#c99c7b] text-[#141414] font-bold border-[#c99c7b] shadow-xs'
                          : 'bg-[#242220] text-[#d6cfc7] border-[#383430] hover:bg-[#2d2a27] hover:text-[#f5f2ed]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </ScrollableOptionsBar>
            </div>

            {/* Recommendations Result Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8d7d70]"></span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5f2ed]">
                    Top Matched Alumni Profiles ({recommendations.length} Selected)
                  </h4>
                </div>
                <button
                  onClick={() => setActiveTab('directory')}
                  className="text-xs font-semibold text-[#c99c7b] hover:text-[#f5f2ed] flex items-center gap-1"
                >
                  <span>Explore full directory</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendations.map(({ alumnus, matchScore, matchReasons }) => (
                  <div
                    key={alumnus.id}
                    className="bg-[#242220] rounded-xl border border-[#383430] p-4 flex flex-col justify-between hover:border-[#504842] hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    {/* Compatibility Match Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-[#2d2a27] text-[#c99c7b] border border-[#3e3833] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#c99c7b]" />
                        <span>{matchScore}% Match</span>
                      </span>

                      {alumnus.isAvailableForMentoring && (
                        <span className="text-[10px] font-medium text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-800">
                          Mentor
                        </span>
                      )}
                    </div>

                    {/* Alumni info */}
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={alumnus.avatarUrl}
                        alt={alumnus.fullName}
                        className="w-12 h-12 rounded-full object-cover border border-[#8d7d70] shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 
                          onClick={() => setSelectedAlumniForDetail(alumnus)}
                          className="font-locania text-sm font-bold text-[#f5f2ed] truncate hover:text-[#c99c7b] cursor-pointer"
                        >
                          {alumnus.fullName}
                        </h5>
                        <p className="text-[11px] text-[#c99c7b] font-medium truncate">
                          {alumnus.currentRole}
                        </p>
                        <p className="text-[10.5px] text-[#a1958b] truncate flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-[#8d7d70] shrink-0" />
                          <span>{alumnus.currentCompany}</span>
                        </p>
                      </div>
                    </div>

                    {/* School & Batch */}
                    <div className="text-[10.5px] text-[#a1958b] bg-[#1c1a18] p-2 rounded-md mb-3 space-y-1 border border-[#383430]">
                      <p className="truncate font-medium text-[#f5f2ed]">
                        {alumnus.degree}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-[#8d7d70]">
                        <span>Batch of {alumnus.batchYear}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{alumnus.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Match reason chip */}
                    <div className="mb-4">
                      {matchReasons.map((reason, idx) => (
                        <p key={idx} className="text-[10px] text-[#a1958b] flex items-start gap-1 leading-tight mb-1">
                          <CheckCircle2 className="w-3 h-3 text-[#c99c7b] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{reason}</span>
                        </p>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#383430]">
                      <button
                        onClick={() => setSelectedAlumniForDetail(alumnus)}
                        className="py-1.5 px-2 rounded text-[11px] font-semibold text-[#d6cfc7] bg-[#2d2a27] hover:bg-[#383430] hover:text-white border border-[#3e3833] transition-colors cursor-pointer text-center"
                      >
                        Profile
                      </button>

                      {alumnus.isAvailableForMentoring ? (
                        <button
                          onClick={() => setSelectedMentorForBooking(alumnus)}
                          className="py-1.5 px-2 rounded text-[11px] font-bold text-[#141414] bg-[#8d7d70] hover:bg-[#a1958b] transition-colors cursor-pointer text-center"
                        >
                          Request Mentor
                        </button>
                      ) : (
                        <button
                          onClick={() => sendConnectionRequest(alumnus.id)}
                          className="py-1.5 px-2 rounded text-[11px] font-semibold text-[#f5f2ed] bg-[#2d2a27] border border-[#423c37] hover:bg-[#383430] transition-colors cursor-pointer text-center"
                        >
                          Connect
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
