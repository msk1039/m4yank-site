export type NotebookImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type NotebookSection = {
  title: string;
  description?: string;
  images: NotebookImage[];
};

export const notebookSections: NotebookSection[] = [
  {
    title: "Art",
    description: "Generative pieces, sketches, and visual experiments.",
    images: [
      {
        src: "https://cdn.m4yank.com/assets/notebook/art-1.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/art-2.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/art-3.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/art-4.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/art-5.webp",
        alt: "img",
      },
    ],
  },
  {
    title: "Draft work",
    description: "Work-in-progress shots, early iterations, and messy ideas.",
    images: [
      {
        src: "https://cdn.m4yank.com/assets/notebook/df-1.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/df-2.webp",
        alt: "img",
      },
    ],
  },
  {
    title: "Random work",
    description: "Bits and pieces from various projects and experiments.",
    images: [
      {
        src: "https://cdn.m4yank.com/assets/notebook/rw-1.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/rw-2.webp",
        alt: "img",
      },
    ],
  },
  {
    title: "Screenshots",
    description: "UI captures, terminal states, and interesting moments.",
    images: [
      {
        src: "https://cdn.m4yank.com/assets/notebook/ss-1.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/ss-2.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/ss-3.webp",
        alt: "img",
      },
    ],
  },
];
