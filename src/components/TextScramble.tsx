'use client';

import React, { useState, useEffect } from 'react';

interface TextScrambleProps {
  text: string;
  duration?: number; // Total duration in seconds
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ text, duration = 1 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let iteration = 0;
    const totalFrames = duration * 33; // ~30ms interval
    
    // Calculate how many characters to reveal per frame to finish exactly at the duration
    const revealSpeed = text.length / totalFrames;
    
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            // If the character's index is less than the current reveal iteration
            if (index < iteration) {
              return text[index];
            }
            
            // Otherwise, show a random character
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }

      iteration += revealSpeed;
    }, 30);

    return () => clearInterval(interval);
  }, [text, duration]);

  return (
    <span className="cursor-default">
      {displayText}
    </span>
  );
}
