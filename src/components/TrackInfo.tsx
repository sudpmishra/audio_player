import { Track } from "../tracks";

const TrackInfo: React.FC<{ currentTrack: Track }> = ({ currentTrack }) => (
    <div className="flex items-start justify-center gap-2 flex-col flex-1">
        <h3 className="text-lg font-semibold line-clamp-1">{currentTrack.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-1">
            @{currentTrack.artist} • {currentTrack.plays} Plays
        </p>
    </div>
);


export default TrackInfo;