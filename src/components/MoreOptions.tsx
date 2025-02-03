import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiMoreHorizontal } from "react-icons/fi";

type MoreOptionsProps = {
    trackId: string;
    favouriteTrack: (trackId: string) => void;
    setShowLyrics: (showLyrics: boolean) => void;
    showLyrics: boolean;
};

const MoreOptions: React.FC<{
    trackId: string;
    favouriteTrack: (trackId: string) => void;
    setShowLyrics: (showLyrics: boolean) => void;
    showLyrics: boolean;
}> = ({ trackId, favouriteTrack, setShowLyrics, showLyrics }) => {
    const [isFavourite, setIsFavorite] = useState(false);
    useEffect(() => {
        const favouriteTracks = JSON.parse(
            localStorage.getItem("favouriteTracks") || "[]"
        );
        setIsFavorite(favouriteTracks.includes(trackId));
    }, [trackId]);
    return (
        <div className="p-4 text-gray-400 grid grid-rows-2 gap-4">
            <FiMoreHorizontal className="w-5 h-5 cursor-pointer justify-self-end" onClick={() => setShowLyrics(!showLyrics)} />
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
                        className="w-5 h-5 cursor-pointer"
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


export default MoreOptions;