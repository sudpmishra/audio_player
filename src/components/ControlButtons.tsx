import { AnimatePresence, motion } from "framer-motion";
import { FaBackwardStep, FaForwardStep, FaPause, FaPlay } from "react-icons/fa6";

type ControlButtonsProps = {
    isPlaying: boolean;
    togglePlay: () => void;
    setNewTrack: (trackId: 'PREV' | 'NEXT') => void;
    trackId: string;
};

const ControlButtons: React.FC<ControlButtonsProps> = ({ isPlaying, togglePlay, setNewTrack, trackId }) => (
    <div className="flex items-center gap-2">
        <FaBackwardStep
            className="w-6 h-6 cursor-pointer text-gray-300"
            onClick={() => setNewTrack('PREV')}
        />
        <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center bg-white bg-opacity-20 rounded-full overflow-hidden"
        >
            <AnimatePresence mode="wait" initial={false}>
                {isPlaying ? (
                    <motion.div
                        key="pause"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FaPause className="w-6 h-6" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="play"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FaPlay className="w-6 h-6" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
        <FaForwardStep
            className="w-6 h-6 cursor-pointer text-gray-300"
            onClick={() => setNewTrack('NEXT')}
        />
    </div>
);

export default ControlButtons;
