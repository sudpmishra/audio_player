import Image from "next/image";

const AlbumArt: React.FC<{ src: string }> = ({ src }) => (
    <Image
        src={src}
        alt="Album Art"
        width={100}
        height={100}
        className="rounded-l-3xl"
    />
);


export default AlbumArt;