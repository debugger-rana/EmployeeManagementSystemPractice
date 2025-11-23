import React from 'react';
import './AnimatedIllustration.css';

const AnimatedIllustration = ({ type = 'dashboard' }) => {
  const illustrations = {
    dashboard: (
      <svg className="animated-illustration" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dashboard Chart */}
        <g className="chart-group">
          <rect x="50" y="200" width="80" height="300" rx="10" fill="url(#gradient1)" className="bar bar-1" />
          <rect x="150" y="150" width="80" height="350" rx="10" fill="url(#gradient2)" className="bar bar-2" />
          <rect x="250" y="100" width="80" height="400" rx="10" fill="url(#gradient3)" className="bar bar-3" />
          <rect x="350" y="180" width="80" height="320" rx="10" fill="url(#gradient1)" className="bar bar-4" />
        </g>
        
        {/* Floating Elements */}
        <circle cx="600" cy="150" r="80" fill="url(#gradient4)" className="float-element element-1" opacity="0.3" />
        <circle cx="650" cy="250" r="60" fill="url(#gradient5)" className="float-element element-2" opacity="0.3" />
        <circle cx="700" cy="180" r="50" fill="url(#gradient6)" className="float-element element-3" opacity="0.3" />
        
        {/* Animated Lines */}
        <path d="M 100 450 Q 250 350 400 400 T 700 380" stroke="url(#gradient7)" strokeWidth="4" fill="none" className="animated-line" strokeDasharray="10 5" />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#ee5a6f" />
          </linearGradient>
          <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
    ),
    
    employees: (
      <svg className="animated-illustration" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Team of people */}
        <g className="people-group">
          <circle cx="200" cy="200" r="60" fill="url(#gradientPerson1)" className="person person-1" />
          <rect x="160" y="270" width="80" height="120" rx="40" fill="url(#gradientPerson1)" className="person person-1" />
          
          <circle cx="400" cy="180" r="70" fill="url(#gradientPerson2)" className="person person-2" />
          <rect x="350" y="260" width="100" height="140" rx="50" fill="url(#gradientPerson2)" className="person person-2" />
          
          <circle cx="600" cy="210" r="55" fill="url(#gradientPerson3)" className="person person-3" />
          <rect x="565" y="275" width="70" height="110" rx="35" fill="url(#gradientPerson3)" className="person person-3" />
        </g>
        
        {/* Connection lines */}
        <line x1="200" y1="200" x2="400" y2="180" stroke="url(#gradient7)" strokeWidth="3" className="connection-line line-1" opacity="0.5" />
        <line x1="400" y1="180" x2="600" y2="210" stroke="url(#gradient7)" strokeWidth="3" className="connection-line line-2" opacity="0.5" />
        
        <defs>
          <linearGradient id="gradientPerson1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="gradientPerson2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="gradientPerson3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    ),
    
    attendance: (
      <svg className="animated-illustration" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Calendar */}
        <rect x="150" y="100" width="500" height="400" rx="20" fill="url(#gradientCalendar)" className="calendar" />
        <rect x="150" y="100" width="500" height="80" rx="20" fill="url(#gradientCalendarHeader)" className="calendar-header" />
        
        {/* Calendar Grid */}
        {[...Array(28)].map((_, i) => {
          const row = Math.floor(i / 7);
          const col = i % 7;
          const isChecked = Math.random() > 0.3;
          return (
            <g key={i} className={`calendar-day day-${i}`}>
              <rect 
                x={180 + col * 65} 
                y={200 + row * 65} 
                width="50" 
                height="50" 
                rx="10" 
                fill={isChecked ? "url(#gradientChecked)" : "rgba(255,255,255,0.05)"} 
                className="day-cell"
              />
              {isChecked && (
                <path 
                  d={`M ${195 + col * 65} ${220 + row * 65} l 8 8 l 12 -16`} 
                  stroke="#fff" 
                  strokeWidth="3" 
                  fill="none" 
                  className="checkmark"
                />
              )}
            </g>
          );
        })}
        
        <defs>
          <linearGradient id="gradientCalendar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(124, 58, 237, 0.1)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
          </linearGradient>
          <linearGradient id="gradientCalendarHeader" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="gradientChecked" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    ),
    
    departments: (
      <svg className="animated-illustration" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Building */}
        <rect x="250" y="100" width="300" height="400" rx="15" fill="url(#gradientBuilding)" className="building" />
        
        {/* Windows */}
        {[...Array(20)].map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          return (
            <rect 
              key={i}
              x={280 + col * 65} 
              y={140 + row * 60} 
              width="40" 
              height="40" 
              rx="5" 
              fill="rgba(255,255,255,0.2)" 
              className={`window window-${i}`}
            />
          );
        })}
        
        {/* Door */}
        <rect x="360" y="420" width="80" height="80" rx="10" fill="url(#gradientDoor)" className="door" />
        
        {/* Organizational circles */}
        <circle cx="150" cy="250" r="40" fill="url(#gradient1)" className="org-circle circle-1" />
        <circle cx="650" cy="250" r="40" fill="url(#gradient2)" className="org-circle circle-2" />
        <circle cx="400" cy="80" r="40" fill="url(#gradient3)" className="org-circle circle-3" />
        
        <defs>
          <linearGradient id="gradientBuilding" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
          <linearGradient id="gradientDoor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
      </svg>
    )
  };

  return (
    <div className="illustration-wrapper">
      {illustrations[type] || illustrations.dashboard}
    </div>
  );
};

export default AnimatedIllustration;
