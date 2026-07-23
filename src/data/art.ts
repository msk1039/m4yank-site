export type ArtImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Artist = {
  name: string;
  youtubeChannel: string;
  youtubeUrl?: string;
  image: string;
  backgroundImage: string;
  description?: string;
};

export type ArtPageData = {
  carouselImages: ArtImage[];
  artJourneyText: string;
  artists: Artist[];
  galleryImages: ArtImage[];
};

export const artData: ArtPageData = {
  carouselImages: [
    {
      src: "https://cdn.m4yank.com/assets/notebook/art-1.webp",
      alt: "Art piece 1",
    },
    {
      src: "https://cdn.m4yank.com/assets/notebook/art-2.webp",
      alt: "Art piece 2",
    },
    {
      src: "https://cdn.m4yank.com/assets/notebook/art-3.webp",
      alt: "Art piece 3",
    },
  ],

  artJourneyText:
    "I paint in oils. The slowness of the medium is what drew me in - wet paint, long drying times, and the room to change your mind halfway through a piece. Most of what I do starts from life or memory: still lifes, landscapes, and the occasional portrait. It's a deliberate break from the exactness of computer science; there's no compiler, no tests, just decisions you live with or paint over. The work here is personal, not professional - a way to stay patient and look at one thing for a long time.",

  artists: [
    {
      name: "Michael James Smith",
      youtubeChannel: "@MichaelJamesSmith",
      youtubeUrl: "https://www.youtube.com/@MichaelJamesSmith",
      image: "https://cdn.m4yank.com/assets/art/artists/1.webp",
      backgroundImage: "https://cdn.m4yank.com/assets/art/artists/1b.webp",
      description:
        "Realistic landscapes built with patience and atmospheric depth.",
    },
    {
      name: "Andrew Tischler",
      youtubeChannel: "@AndrewTischlerArt",
      youtubeUrl: "https://www.youtube.com/@AndrewTischlerArt",
      image: "https://cdn.m4yank.com/assets/art/artists/2.webp",
      backgroundImage: "https://cdn.m4yank.com/assets/art/artists/2b.webp",
      description:
        "Oil painting process, composition, and outdoor plein air work.",
    },
    {
      name: "KevinOilPainting",
      youtubeChannel: "@KevinOilPainting",
      youtubeUrl: "https://www.youtube.com/@KevinOilPainting",
      image: "https://cdn.m4yank.com/assets/art/artists/3.webp",
      backgroundImage: "https://cdn.m4yank.com/assets/art/artists/3b.webp",
      description:
        " approachable wet-on-wet tutorials and practical color mixing.",
    },
    {
      name: "Florent Farges",
      youtubeChannel: "@FlorentFargesarts",
      youtubeUrl: "https://www.youtube.com/@FlorentFargesarts",
      image: "https://cdn.m4yank.com/assets/art/artists/4.webp",
      backgroundImage: "https://cdn.m4yank.com/assets/art/artists/4b.webp",
      description:
        "Classical figure painting, color theory, and old-master techniques.",
    },
  ],

  galleryImages: [
    {
      src: "https://cdn.m4yank.com/assets/notebook/art-1.webp",
      alt: "Gallery image 1",
    },
    {
      src: "https://cdn.m4yank.com/assets/notebook/art-2.webp",
      alt: "Gallery image 2",
    },
    {
      src: "https://cdn.m4yank.com/assets/notebook/art-3.webp",
      alt: "Gallery image 3",
    },
    {
      src: "https://cdn.m4yank.com/assets/notebook/art-4.webp",
      alt: "Gallery image 4",
    },
    {
      src: "https://cdn.m4yank.com/assets/notebook/art-5.webp",
      alt: "Gallery image 5",
    },
  ],
};
