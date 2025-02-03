import { Track } from "../tracks";
type TrackDetailsProps = {
    currentTrack: Track;
    showLyrics: boolean;
};
const TrackDetails: React.FC<TrackDetailsProps> = ({ currentTrack, showLyrics }) => (
    <div className="px-2 flex items-start justify-center gap-2 flex-col flex-1">
        <p className="text-sm line-clamp-1 text-gray-300 font-semibold">
            {currentTrack.album}
        </p>
        <div className={`text-sm text-gray-400 ${showLyrics ? 'h-20 overflow-y-scroll' : 'line-clamp-2'}`} dangerouslySetInnerHTML={{ __html: currentTrack.lyrics }}></div>
    </div>
);


export default TrackDetails;