"use client";

import React, { useEffect, useRef, useState } from "react";
import tracks from "../tracks";
import { AnimatePresence, motion } from "framer-motion";
import SeekBar from "./SeekBar";
import CloseButton from "./CloseButton";
import AlbumArt from "./AlbumArt";
import TrackInfo from "./TrackInfo";
import ControlButtons from "./ControlButtons";
import TrackDetails from "./TrackDetails";
import MoreOptions from "./MoreOptions";

type AudioPlayerProps = {
  trackId?: number;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  trackId = 1,
  isVisible,
  setIsVisible,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackId]);
  const [seekPosition, setSeekPosition] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
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

  const favouriteTrack = (trackId: string) => {
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
    if (isPlaying) {
      setIsPlaying(false);
    }
    setCurrentTrack(tracks[0])
    setIsVisible(false);
  };


  const setNewTrack = (direction: 'PREV' | 'NEXT') => {
    const crossfadeDuration = 500;
    const fadeOutStep = 0.2;
    const fadeInStep = 0.2;
    const fadeInterval = crossfadeDuration / (1 / fadeOutStep);

    const fadeOut = () => {
      if (audioRef.current) {
        let volume = audioRef.current.volume;
        const fadeOutInterval = setInterval(() => {
          if (volume > 0) {
            volume = Math.max(0, volume - fadeOutStep);
            if (audioRef.current) {
              audioRef.current.volume = volume;
            }
          } else {
            clearInterval(fadeOutInterval);
            setTrackAndFadeIn();
          }
        }, fadeInterval);
      }
    };

    const setTrackAndFadeIn = () => {
      const totalTracks = tracks.length;
      const currentTrackIndex = tracks.findIndex(track => track.id === currentTrack.id);
      let newTrackId = 0;
      if (direction === "PREV") {
        newTrackId = (currentTrackIndex + totalTracks - 1) % totalTracks;
      } else {
        newTrackId = (currentTrackIndex + 1) % totalTracks;
      }
      setCurrentTrack(tracks[newTrackId]);
      setSeekPosition(0);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          let volume = 0;
          audioRef.current.volume = volume;
          const fadeInInterval = setInterval(() => {
            if (volume < 1) {
              volume = Math.min(1, volume + fadeInStep);
              if (audioRef.current) {
                audioRef.current.volume = volume;
              }
            } else {
              clearInterval(fadeInInterval);
              setIsPlaying(true);
            }
          }, fadeInterval);
        }
      }, 100);
    };

    setIsPlaying(false);
    fadeOut();
  };

  useEffect(() => {
    if (isVisible) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
    return () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    };
  }, [isVisible]);

  return (
    <div className="fixed bottom-[30px] left-1/2 transform -translate-x-1/2 group p-2 group select-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, translateY: 100 }}
            animate={{ scale: 1, y: [0, -20, 0], translateY: 0 }}
            exit={{ scale: 0, translateY: 100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative mx-auto bg-gray-900 bg-opacity-85 text-white rounded-3xl shadow-lg border border-gray-800 backdrop-blur-lg backdrop-opacity-80  w-[90vw] md:w-[75vw] lg:w-[60vw] xl:w-[45vw]"
          >
            <SeekBar
              seekPosition={seekPosition}
              pauseTrack={() => {
                audioRef.current?.pause();
                setIsPlaying(false);
              }}
              playTrack={() => {
                audioRef.current?.play();
                setIsPlaying(true);
              }}
              handleSeekBarClick={handleSeekBarClick}
            />
            <CloseButton closePlayer={closePlayer} />
            <div className="flex gap-4 items-stretch">
              <AlbumArt src={currentTrack.cover} />
              <TrackInfo currentTrack={currentTrack} />
              <ControlButtons
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                setNewTrack={setNewTrack}
                trackId={currentTrack.id}
              />
              <TrackDetails currentTrack={currentTrack} showLyrics={showLyrics} />
              <MoreOptions track={currentTrack} favouriteTrack={favouriteTrack} setShowLyrics={setShowLyrics} showLyrics={showLyrics} />
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
              onEnded={() =>
                setNewTrack('NEXT')
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioPlayer;
