const stickyColors = ["yellow", "lightGreen", "pink"];

const getRandomStickyColor = () => {
  return stickyColors[Math.floor(Math.random() * stickyColors.length)];
};

export default getRandomStickyColor;
