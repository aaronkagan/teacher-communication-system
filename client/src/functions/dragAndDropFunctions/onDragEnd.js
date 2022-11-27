const onDragEnd = (result) => {
  // Set the color back to original when drag ends
  document.body.style.color = "inherit";
  document.body.style.backgroundColor = "inherit";

  // DOCS for this part
  // https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback
  const { destination, source, draggableId } = result;

  // This is if the user drags the item into a non draggable location. Destination is null.
  if (!destination) return;

  // Checking if the user dropped the item into the same position
  if (destination.droppableId === source.droppableId && destination.index === source.index) return;

  const start = state.columns[source.droppableId];
  const finish = state.columns[destination.droppableId];

  // Case for when dragging inside same column
  if (start === finish) {
    // This is created to mutate a copy of the state and not the original state
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...finish,
      taskIds: newTaskIds
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    };
    setState(newState);
    return;
  }

  // Moving from one list to another
  const startTaskIds = Array.from(start.taskIds);
  startTaskIds.splice(source.index, 1);
  const newStart = {
    ...start,
    taskIds: startTaskIds
  };
  const finishTaskIds = Array.from(finish.taskIds);
  finishTaskIds.splice(destination.index, 0, draggableId);
  const newFinish = {
    ...finish,
    taskIds: finishTaskIds
  };

  const newState = {
    ...state,
    columns: {
      ...state.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    }
  };
  setState(newState);
};

export default onDragEnd;
