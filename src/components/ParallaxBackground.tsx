'use client'

import React from 'react';
import { Parallax } from 'react-scroll-parallax';

const ParallaxBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Parallax className="absolute inset-0" translateY={[0, 100]} opacity={[1, 0.3]}>
        <div className="w-full h-full bg-gradient-to-br from-usmc-scarlet/20 to-usmc-gold/20 dark:from-usmc-scarlet/40 dark:to-usmc-gold/40"></div>
      </Parallax>
      <Parallax className="absolute inset-0" translateY={[0, 60]} opacity={[1, 0.6]}>
        <div className="w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-usmc-scarlet dark:bg-usmc-scarlet/80 rounded-full"></div>
          <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-usmc-gold dark:bg-usmc-gold/80 rounded-full"></div>
          <div className="absolute top-1/2 left-2/3 w-6 h-6 bg-usmc-scarlet dark:bg-usmc-scarlet/80 rounded-full"></div>
        </div>
      </Parallax>
    </div>
  );
};

export default ParallaxBackground;