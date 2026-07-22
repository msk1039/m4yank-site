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
        src: "https://cdn.m4yank.com/assets/notebook/1-art.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/2-art.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/3-art.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/4-art.webp",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/notebook/5-art.webp",
        alt: "img",
      },
    ],
  },
  {
    title: "Draft work",
    description: "Work-in-progress shots, early iterations, and messy ideas.",
    images: [],
  },
  {
    title: "Random work",
    description: "Bits and pieces from various projects and experiments.",
    images: [],
  },
  {
    title: "Screenshots",
    description: "UI captures, terminal states, and interesting moments.",
    images: [],
  },
];
