import { FaTimes } from "react-icons/fa";

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

export default CloseButton;