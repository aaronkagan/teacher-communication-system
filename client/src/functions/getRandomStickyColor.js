// Helper function used to get a random sticky color for the student board tasks from the supplied colors

const stickyColors = ['yellow', 'lightGreen', 'pink'];
const getRandomStickyColor = () => {
  return stickyColors[Math.floor(Math.random() * stickyColors.length)];
};

export default getRandomStickyColor;
