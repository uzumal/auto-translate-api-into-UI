'use client'
import React from 'react';
import Particles from 'react-tsparticles';
import particlesConfig from './particlesjs-config.json';
import { loadFull } from 'tsparticles';
import { Main } from 'tsparticles-engine';

const ParticlesBackground = () => {
  const particlesInit = async (main:Main) => {
    // tsparticlesのフル機能をロード
    await loadFull(main);
  };

  return (
    <Particles 
      id="tsparticles" 
      init={particlesInit}
      options={particlesConfig as any} 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
};

export default ParticlesBackground;
