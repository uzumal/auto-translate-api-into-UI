// components/ParticlesBackground.tsx

import React from 'react';
import Particles from 'react-tsparticles';
import particlesConfig from './particlesjs-config.json'; // 設定ファイルへのパスを指定


const ParticlesBackground = () => {
  return (
    <Particles params={particlesConfig} />
  );
};

export default ParticlesBackground;
