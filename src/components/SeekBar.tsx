import React, { useEffect, useMemo, useRef, useState } from 'react';

type SeekBarProps = {
    seekPosition: number;
    handleSeekBarClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    pauseTrack: () => void;
    playTrack: () => void;
};

const SeekBar: React.FC<SeekBarProps> = ({ seekPosition, handleSeekBarClick, pauseTrack, playTrack }) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const seekerRef = useRef<HTMLDivElement>(null);
    const [hoveredTime, setHoveredTime] = useState({
        hoveredTime: '00:00',
        left: 0,
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (parentRef.current && seekerRef.current) {
                const { left, width } = parentRef.current.getBoundingClientRect();
                const seek = (e.clientX - left) / width;
                seekerRef.current.style.left = `${Math.min(Math.max(seek, 0), 1) * 100}%`;
            }
        };

        const handleMouseUp = () => {
            playTrack();
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        const handleMouseDown = () => {
            pauseTrack();
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        if (seekerRef.current) {
            seekerRef.current.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (seekerRef.current) {
                seekerRef.current.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, []);

    const currentSongTime = useMemo(() => {
        const minutes = Math.floor(seekPosition / 60);
        const seconds = Math.floor(seekPosition % 60);
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }, [seekPosition]);

    const calculateHoveredTime = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, width } = parentRef.current!.getBoundingClientRect();
        const seek = (e.clientX - left) / width;
        const totalDuration = 100; // total duration in seconds (1:40)

        const hoveredSeconds = Math.floor(seek * totalDuration);
        const minutes = Math.floor(hoveredSeconds / 60);
        const seconds = hoveredSeconds % 60;

        const time = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        setHoveredTime({
            hoveredTime: time,
            left: seek * 100,
        });
    };


    return (
        <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[95%] h-[1rem] bg-transparent rounded-full cursor-pointer group/seek"
            onClick={handleSeekBarClick}
            onMouseMoveCapture={calculateHoveredTime}
            id="seek-bar"
            ref={parentRef}
        >
            <div
                className="absolute top-0 h-[2px] rounded-full custom-gradient"
                style={{
                    width: `${seekPosition}%`,
                    transition: "width 0.1s linear",
                }}
            />
            <span className="absolute top-[-1.5rem] text-white text-xs hidden group-hover:block p-1 bg-gray-800 rounded-lg shadow-lg"
                style={{ left: `${seekPosition}%`, transform: "translateX(-50%)" }}
            >
                <span>
                    {currentSongTime}
                </span>
            </span>
            <span className="absolute top-[-1.5rem] text-white text-xs hidden group-hover/seek:block p-1 bg-gray-800 rounded-lg shadow-lg"
                style={{ left: `${hoveredTime.left}%`, transform: "translateX(-50%)" }}
            >
                <span>
                    {hoveredTime.hoveredTime}
                </span>
            </span>
            <div
                id="seeker"
                ref={seekerRef}
                className="absolute top-[-4px] h-3 w-3 bg-white rounded-full shadow cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${seekPosition}%`, transform: "translateX(-50%)" }}
            />
        </div>
    );
};

export default SeekBar;