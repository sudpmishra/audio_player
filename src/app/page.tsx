"use client";

import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <Image
        src="/bg.jpg"
        alt="404"
        layout="responsive"
        width={1920}
        height={1080}
        className="w-full"
        onClick={() => {if(!isPlayerVisible) setIsPlayerVisible(true)}}
      />
      <AudioPlayer trackId={2} isVisible={isPlayerVisible} setIsVisible={setIsPlayerVisible} />
    </div>
  );
}
