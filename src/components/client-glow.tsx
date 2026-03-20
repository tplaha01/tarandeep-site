"use client";

import { LightRays } from "@/components/magicui/light-rays";

export function ClientGlow() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-0 pointer-events-none overflow-hidden">
      <LightRays
        count={5}
        color="rgba(139, 92, 246, 0.12)"
        blur={100}
        speed={40}
        length="100vh"
      />
    </div>
  );
}