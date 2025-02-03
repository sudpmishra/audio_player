import React, { useRef, useEffect } from 'react';

const SeekBar: React.FC<{
    seekPosition: number;
    handleSeekBarClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    pauseTrack: () => void;
    playTrack: () => void;
}> = ({ seekPosition, handleSeekBarClick, pauseTrack, playTrack }) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const seekerRef = useRef<HTMLDivElement>(null);

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

        const handleMouseDown = (e: MouseEvent) => {
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

    return (
        <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[95%] h-[1rem] bg-transparent rounded-full cursor-pointer"
            onClick={handleSeekBarClick}
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