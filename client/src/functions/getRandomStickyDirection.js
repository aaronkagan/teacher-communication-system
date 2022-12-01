const getRandomStickyDirection = () => {
  return Math.random() < 0.5 ? "rotate(10deg)" : "rotate(-10deg)";
};

export default getRandomStickyDirection;
