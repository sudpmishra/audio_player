import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";

export default function Home() {
  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <Image
        src="/bg.jpg"
        alt="404"
        layout="responsive"
        width={1920}
        height={1080}
        className="w-full"
      />
      <AudioPlayer trackId={2} />
    </div>
  );
}