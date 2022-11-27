const onDragUpdate = (update) => {
  const { destination } = update;
  // sets opacity of the background based on the index of the task
  // As we drag the task up or down the list, the background opacity of the whole application is changing
  // DOCS https://egghead.io/lessons/react-customise-the-appearance-of-an-app-using-react-beautiful-dnd-ondragstart-and-ondragend
  const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
  document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  document.body.style.transition = "background-color 0.2s ease";
};

export default onDragUpdate;
