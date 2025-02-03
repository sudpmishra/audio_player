"use client";

import {
  FaBackwardStep,
  FaForwardStep,
  FaHeart,
  FaPause,
  FaPlay,
  FaRegHeart,
} from "react-icons/fa6";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import tracks, { Track } from "./tracks";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

type AudioPlayerProps = {
  trackId?: number;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  trackId = 0,
  isVisible,
  setIsVisible,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackId]);
  const [seekPosition, setSeekPosition] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeekBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const seek = (e.clientX - left) / width;
    audioRef.current!.currentTime = seek * audioRef.current!.duration;
    setSeekPosition(seek * 100);
  };

  const favouriteTrack = (trackId: number) => {
    const favouriteTracks = JSON.parse(
      localStorage.getItem("favouriteTracks") || "[]"
    );
    if (favouriteTracks.includes(trackId)) {
      const index = favouriteTracks.indexOf(trackId);
      favouriteTracks.splice(index, 1);
    } else {
      favouriteTracks.push(trackId);
    }
    localStorage.setItem("favouriteTracks", JSON.stringify(favouriteTracks));
  };

  const closePlayer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    audioRef.current?.pause();
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-[30px] left-1/2 transform -translate-x-1/2 group p-2 group select-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, translateY: 100 }}
            animate={{ scale: 1, y: [0, -20, 0], translateY: 0 }}
            exit={{ scale: 0, translateY: 100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative max-w-full mx-auto bg-gray-900 bg-opacity-85 text-white rounded-3xl shadow-lg border border-gray-800 backdrop-blur-lg backdrop-opacity-80"
          >
            <SeekBar
              seekPosition={seekPosition}
              handleSeekBarClick={handleSeekBarClick}
            />
            <CloseButton closePlayer={closePlayer} />
            <div className="flex gap-4 items-stretch">
              <AlbumArt src={currentTrack.cover} />
              <TrackInfo currentTrack={currentTrack} />
              <ControlButtons
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                setCurrentTrack={setCurrentTrack}
                trackId={trackId}
              />
              <TrackDetails currentTrack={currentTrack} />
              <MoreOptions trackId={trackId} favouriteTrack={favouriteTrack} />
            </div>
            <audio
              ref={audioRef}
              src={currentTrack.url}
              onTimeUpdate={() =>
                setSeekPosition(
                  (audioRef.current!.currentTime / audioRef.current!.duration) *
                    100
                )
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SeekBar: React.FC<{
  seekPosition: number;
  handleSeekBarClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}> = ({ seekPosition, handleSeekBarClick }) => (
  <div
    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[95%] h-[2px] bg-transparent rounded-full cursor-pointer"
    onClick={handleSeekBarClick}
    id="seek-bar"
  >
    <div
      className="absolute top-0 h-[2px] rounded-full custom-gradient"
      style={{
        width: `${seekPosition}%`,
        transition: "width 0.1s linear",
      }}
    />
    <div
      id="seeker"
      className="absolute top-[-4px] h-2 w-2 bg-white rounded-full shadow cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ left: `${seekPosition}%`, transform: "translateX(-50%)" }}
    />
  </div>
);

const CloseButton: React.FC<{
  closePlayer: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ closePlayer }) => (
  <button
    className="absolute top-[-.3rem] right-[-.3rem] p-1 rounded-full bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition-opacity border-2 border-gray-800"
    onClick={closePlayer}
  >
    <FaTimes className="w-3 h-3" />
  </button>
);

const AlbumArt: React.FC<{ src: string }> = ({ src }) => (
  <Image
    src={src}
    alt="Album Art"
    width={100}
    height={100}
    className="rounded-l-3xl"
  />
);

const TrackInfo: React.FC<{ currentTrack: Track }> = ({ currentTrack }) => (
  <div className="flex items-start justify-center gap-2 flex-col flex-1">
    <h3 className="text-lg font-semibold line-clamp-1">{currentTrack.title}</h3>
    <p className="text-sm text-gray-400 line-clamp-1">
      @{currentTrack.artist} • {currentTrack.plays} Plays
    </p>
  </div>
);

const ControlButtons: React.FC<{
  isPlaying: boolean;
  togglePlay: () => void;
  setCurrentTrack: (track: Track) => void;
  trackId: number;
}> = ({ isPlaying, togglePlay, setCurrentTrack, trackId }) => (
  <div className="flex items-center gap-2">
    <FaBackwardStep
      className="w-6 h-6 cursor-pointer text-gray-300"
      onClick={() => setCurrentTrack(tracks[trackId - 1])}
    />
    <button
      onClick={togglePlay}
      className="w-12 h-12 flex items-center justify-center bg-white bg-opacity-20 rounded-full"
    >
      {isPlaying ? (
        <FaPause className="w-6 h-6" />
      ) : (
        <FaPlay className="w-6 h-6" />
      )}
    </button>
    <FaForwardStep
      className="w-6 h-6 cursor-pointer text-gray-300"
      onClick={() => setCurrentTrack(tracks[trackId + 1])}
    />
  </div>
);

const TrackDetails: React.FC<{ currentTrack: Track }> = ({ currentTrack }) => (
  <div className="px-2 flex items-start justify-center gap-2 flex-col flex-1">
    <p className="text-sm line-clamp-1 text-gray-300 font-semibold">
      {currentTrack.album}
    </p>
    <p className="text-sm line-clamp-2 text-gray-400">{currentTrack.lyrics}</p>
  </div>
);

const MoreOptions: React.FC<{
  trackId: number;
  favouriteTrack: (trackId: number) => void;
}> = ({ trackId, favouriteTrack }) => {
  const [isFavourite, setIsFavorite] = useState(false);
  useEffect(() => {
    const favouriteTracks = JSON.parse(
      localStorage.getItem("favouriteTracks") || "[]"
    );
    setIsFavorite(favouriteTracks.includes(trackId));
  }, [trackId]);
  return (
    <div className="p-4 text-gray-400 grid grid-rows-2 gap-4">
      <FiMoreHorizontal className="w-5 h-5 cursor-pointer justify-self-end" />
      <div className="flex items-center gap-2 justify-self-end">
        <span className="text-sm">854K</span>
        {isFavourite ? (
          <FaHeart
            className="w-5 h-5 cursor-pointer text-red-500 animate-[ping_.3s_ease-in-out]"
            onClick={() => {
              favouriteTrack(trackId);
              setIsFavorite(false);
            }}
          />
        ) : (
          <FaRegHeart
            className="w-5 h-5 cursor-pointer animate-[ping_.3s_ease-in-out]"
            onClick={() => {
              favouriteTrack(trackId);
              setIsFavorite(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
