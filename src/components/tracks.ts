export type Track = {
    id: string;
    title: string;
    artist: string;
    album: string;
    url: string;
    cover: string;
    plays: string;
    lyrics: string;
};
const sampleLyrics = `I got a lot of money, I'ma run through it`;
const tracks: Track[] = [
    {
        id: '1',
        title: 'Pneuma',
        artist: 'Tool',
        album: 'Tool',
        url: 'audio/sample-audio-1.mp3',
        cover: '/album-art/album-art-1.jpg',
        plays: '1.2M',
        lyrics: sampleLyrics,
    },
    {
        id: '2',
        title: 'Peaches',
        artist: 'Justin Bieber',
        album: 'Justice',
        url: 'audio/sample-audio-2.mp3',
        cover: '/album-art/album-art-2.jpg',
        plays: '1.7M',
        lyrics: sampleLyrics,
    },
    {
        id: '3',
        title: 'Save Your Tears',
        artist: 'The Weeknd',
        album: 'After Hours',
        url: 'audio/sample-audio-3.mp3',
        cover: '/album-art/album-art-3.jpg',
        plays: '2.3B',
        lyrics: sampleLyrics,
    },
    {
        id: '4',
        title: 'Levitating',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        url: 'audio/sample-audio-4.mp3',
        cover: '/album-art/album-art-4.jpg',
        plays: '5.7M',
        lyrics: sampleLyrics,
    },
    {
        id: '5',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        url: 'audio/sample-audio-5.mp3',
        cover: '/album-art/album-art-5.jpg',
        plays: '1.2B',
        lyrics: sampleLyrics,
    },
];
export default tracks;