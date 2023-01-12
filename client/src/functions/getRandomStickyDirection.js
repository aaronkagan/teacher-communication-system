// Helper function used to randomly generate the angle at which the sticky notes on the student board should be angled
const getRandomStickyDirection = () => {
  return Math.random() < 0.5 ? 'rotate(10deg)' : 'rotate(-10deg)';
};

export default getRandomStickyDirection;
