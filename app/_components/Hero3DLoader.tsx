'use client';

import dynamic from 'next/dynamic';

// WebGL needs the browser — render only on the client, after hydration.
const ShaderBackground = dynamic(() => import('./ShaderBackground'), { ssr: false });
const ParticleField = dynamic(() => import('./Hero3D'), { ssr: false });

export default function Hero3DLoader() {
  return (
    <>
      <ShaderBackground />
      <div className="absolute inset-0">
        <ParticleField />
      </div>
    </>
  );
}
