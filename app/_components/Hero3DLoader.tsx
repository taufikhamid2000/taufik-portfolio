'use client';

import dynamic from 'next/dynamic';

// WebGL needs the browser — render only on the client, after hydration.
const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

export default function Hero3DLoader() {
  return <Hero3D />;
}
