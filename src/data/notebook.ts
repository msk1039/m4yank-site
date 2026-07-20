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
        src: "https://cdn.m4yank.com/assets/1-art.jpeg",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/2-art.jpeg",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/3-art.jpeg",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/4-art.jpeg",
        alt: "img",
      },
      {
        src: "https://cdn.m4yank.com/assets/5-art.jpeg",
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
