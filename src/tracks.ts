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
const sampleLyrics = `(Verse 1)
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

const convertedLyricsToHtml = sampleLyrics.split('\n').map((line, index) => {
    if (line.trim() === '') {
        return '<br>';
    }
    return `<p>${line}</p>`;
}).join('');
const tracks: Track[] = [
    {
        id: '1',
        title: 'Creative Technology Showreel',
        artist: 'Random Artist - 1',
        album: 'Random Album - 1',
        url: 'audio/creative-technology-showreel-241274.mp3',
        cover: '/album-art/album-art-1.png',
        plays: '1.2M',
        lyrics: convertedLyricsToHtml,
    },
    {
        id: '2',
        title: 'Lost In Dreams (Abstract Beats)',
        artist: 'Random Artist - 2',
        album: 'Random Album - 2',
        url: 'audio/lost-in-dreams-abstract-chill-downtempo-cinematic-future-beats-270241.mp3',
        cover: '/album-art/album-art-2.png',
        plays: '1.7M',
        lyrics: convertedLyricsToHtml,
    },
    {
        id: '3',
        title: 'Spinning Head',
        artist: 'Random Artist - 3',
        album: 'Random Album - 3',
        url: 'audio/spinning-head-271171.mp3',
        cover: '/album-art/album-art-3.png',
        plays: '2.3B',
        lyrics: convertedLyricsToHtml,
    },
    {
        id: '4',
        title: 'Stylish Deep Electronic',
        artist: 'Random Artist - 4',
        album: 'Random Album - 4',
        url: 'audio/stylish-deep-electronic-262632.mp3',
        cover: '/album-art/album-art-4.png',
        plays: '5.7M',
        lyrics: convertedLyricsToHtml,
    },
    {
        id: '5',
        title: 'Tell Me The Truth',
        artist: 'Random Artist - 5',
        album: 'Random Album - 5',
        url: 'audio/tell-me-the-truth-260010.mp3',
        cover: '/album-art/album-art-5.png',
        plays: '1.2B',
        lyrics: convertedLyricsToHtml,
    },
    {
        id: '6',
        title: 'Vlog Music Beat',
        artist: 'Random Artist - 6',
        album: 'Random Album - 6',
        url: 'audio/vlog-music-beat-trailer-showreel-promo-background-intro-theme-274290.mp3',
        cover: '/album-art/album-art-6.png',
        plays: '3.6M',
        lyrics: convertedLyricsToHtml,
    }
];
export default tracks;