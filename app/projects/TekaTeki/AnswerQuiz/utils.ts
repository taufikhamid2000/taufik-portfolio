// app/projects/TekaTeki/utils.ts

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap elements
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
};
