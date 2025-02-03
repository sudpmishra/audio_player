"use client";

import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <button
        className={`absolute top-20 left-1/2 transform -translate-x-1/2 z-100 bg-purple-500 p-4 rounded-full transition-opacity ${isPlayerVisible ? 'opacity-0' : 'opacity-1'
          }`}
        onClick={() => setIsPlayerVisible(!isPlayerVisible)}
      >
        Double click anywhere to start the music player
      </button>
      <Image
        src="/bg.jpg"
        alt="404"
        layout="responsive"
        width={1920}
        height={1080}
        className="w-full"
        onDoubleClick={() => { if (!isPlayerVisible) setIsPlayerVisible(true) }}
      />
      <AudioPlayer isVisible={isPlayerVisible} setIsVisible={setIsPlayerVisible} />
    </div>
  );
}
