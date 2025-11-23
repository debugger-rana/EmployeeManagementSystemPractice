import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({ variant = 'default' }) => {
  return (
    <div className={`animated-bg-container ${variant}`}>
      {/* Geometric Shapes */}
      <div className="animated-shape shape-1">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#7c3aed" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,39.8,76.8C25.8,84.6,8.8,87.6,-7.1,87.1C-23,86.6,-37.9,82.6,-51.8,74.8C-65.7,67,-78.6,55.4,-85.4,40.9C-92.2,26.4,-92.9,9,-89.7,-7.1C-86.5,-23.2,-79.4,-38,-69.2,-50.9C-59,-63.8,-45.7,-74.8,-31.1,-81.8C-16.5,-88.8,-0.8,-91.8,13.6,-90.2C28,-88.6,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="animated-shape shape-2">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#06b6d4" d="M39.5,-65.5C51.4,-58.3,61.3,-47.7,68.3,-35.2C75.3,-22.7,79.4,-8.3,79.1,6.2C78.8,20.7,74.1,35.3,65.8,47.8C57.5,60.3,45.6,70.7,32.1,76.8C18.6,82.9,3.5,84.7,-11.4,83.3C-26.3,81.9,-41,77.3,-54.2,69.2C-67.4,61.1,-79.1,49.5,-84.6,35.4C-90.1,21.3,-89.4,4.7,-85.2,-10.5C-81,-25.7,-73.3,-39.5,-62.5,-51.2C-51.7,-62.9,-38.8,-72.5,-24.8,-77.9C-10.8,-83.3,4.3,-84.5,18.7,-80.8C33.1,-77.1,27.6,-72.7,39.5,-65.5Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="animated-shape shape-3">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ff6b6b" d="M48.1,-78.5C62.3,-70.8,73.9,-57.2,80.8,-41.8C87.7,-26.4,89.9,-9.2,87.6,7.1C85.3,23.4,78.5,38.8,68.6,51.8C58.7,64.8,45.7,75.4,31.1,80.7C16.5,86,0.3,86,-15.7,84.1C-31.7,82.2,-47.5,78.4,-61.2,70.2C-74.9,62,-86.5,49.4,-91.3,34.5C-96.1,19.6,-94.1,2.4,-89.2,-13.2C-84.3,-28.8,-76.5,-42.8,-65.5,-53.7C-54.5,-64.6,-40.3,-72.4,-25.4,-79.8C-10.5,-87.2,5.1,-94.2,20.9,-94.9C36.7,-95.6,33.9,-86.2,48.1,-78.5Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="animated-shape shape-4">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#10b981" d="M41.3,-70.8C54.1,-63.5,65.5,-53.2,72.8,-40.2C80.1,-27.2,83.3,-11.5,82.2,3.9C81.1,19.3,75.7,34.4,66.9,46.8C58.1,59.2,46,68.9,32.4,74.8C18.8,80.7,3.7,82.8,-11.2,81.5C-26.1,80.2,-40.8,75.5,-53.8,67.3C-66.8,59.1,-78.1,47.4,-83.9,33.4C-89.7,19.4,-89.9,3.1,-86.5,-12.1C-83.1,-27.3,-76.1,-41.4,-65.8,-50.8C-55.5,-60.2,-41.9,-64.9,-28.5,-71.9C-15.1,-78.9,-1.9,-88.2,10.6,-86.8C23.1,-85.4,28.5,-78.1,41.3,-70.8Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Gradient Orbs */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${15 + Math.random() * 10}s`,
              '--size': `${4 + Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
