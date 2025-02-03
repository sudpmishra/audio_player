'use client';

import { Heart, MoreHorizontal, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";

import tracks from "./tracks";

type AudioPlayerProps = {
  trackId?: number;
};
const AudioPlayer: React.FC<AudioPlayerProps> = ({ trackId = 0 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(80); // Example progress value
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = useMemo(() => tracks[trackId], [trackId]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-[30px] left-1/2 transform -translate-x-1/2">
      <div className="relative w-[80vw] md:w-[60vw] lg:w-[40vw] mx-auto p-4 bg-gray-900 bg-opacity-90 text-white rounded-3xl shadow-lg overflow-hidden border border-gray-800 backdrop-blur-lg backdrop-opacity-80">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent" style={{ width: `${progress}%` }}></div>
        <div className="flex items-center gap-4 p-2 items-stretch">
          <Image src={currentTrack.cover} alt="Album Art" width={50} height={50} className="rounded-lg" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold line-clamp-1">{currentTrack.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-1">@{currentTrack.artist} • {currentTrack.plays} Plays</p>
          </div>
          <div className="flex items-center gap-2">
            <SkipBack className="w-6 h-6 cursor-pointer text-gray-300" />
            <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-20 rounded-full">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <SkipForward className="w-6 h-6 cursor-pointer text-gray-300" />
          </div>

          <div className="mt-2 px-2">
            <p className="text-sm line-clamp-1 text-gray-300">{currentTrack.album}</p>
            <p className="text-sm line-clamp-1 text-gray-500">{currentTrack.url}</p>
            <p className="text-sm line-clamp-1 text-gray-400">{currentTrack.lyrics}</p>
          </div>

          <div className="px-2 text-gray-400 grid grid-rows-2 gap-4">
            <MoreHorizontal className="w-5 h-5 cursor-pointer justify-self-end" />
            <div className="flex items-center gap-2 justify-self-end">
              <span className="text-sm">854K</span>
              <Heart className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>



        <audio ref={audioRef} src="/sample-audio.mp3" />
      </div>
    </div>
  );
}

export default AudioPlayer;