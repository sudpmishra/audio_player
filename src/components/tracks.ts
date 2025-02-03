export type Track = {
    id: string;
    title: string;
    artist: string;
    album: string;
    url: string;
    cover: string;
    plays: string;
    lyrics: string;
    isFavorite?: boolean;
};
const sampleLyrics = `
(Verse 1)
Drifting like a shadow in the midnight glow,
Chasing every whisper where the cold winds blow.
Memories like echoes, fading in the sky,
Trying to hold on, but I don’t know why.

(Pre-Chorus)
Every step I take, I'm running in reverse,
Caught inside a dream, but it only makes it worse.
If I call your name, will it reach your soul?
Or am I just a ghost in a world so cold?

(Chorus)
I'm lost in the echo of the words unsaid,
Trying to rewrite all the things I regret.
If time could rewind, would we meet again?
Or are we just strangers at the story’s end?

(Verse 2)
Footsteps in the silence, leading me astray,
Dancing with the past like it’s begging me to stay.
But I keep moving forward, through the fire and rain,
Learning how to love through the fear and pain.

(Bridge)
Let the stars burn bright in the endless night,
Let the waves crash down, let me feel alive.
Even if I fall, I will rise once more,
'Cause the heart still beats where the echoes roar.

(Chorus - Repeat)
I'm lost in the echo of the words unsaid,
Trying to rewrite all the things I regret.
If time could rewind, would we meet again?
Or are we just strangers at the story’s end?

(Outro)
Maybe in another life, we’ll get it right,
Till then, I’ll keep chasing the fading light...
`
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