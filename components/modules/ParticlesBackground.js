// components/ParticlesBackground.js
'use client'

import React, { useEffect } from 'react';
import { particlesJS } from 'particles.js';

const ParticlesBackground = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // particles.js の設定
      particlesJS.load('particles-js', './particlesjs-config.json', () => {
        console.log('particles.js loaded - callback');
      });
    }
  }, []);

  return <div id="particles-js" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ParticlesBackground;
