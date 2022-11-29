// const moment = require("moment");

// const addNewTaskToBoard = (boardState, setBoardState, newTaskFormData) => {
//   const newTaskNumber = `task-${Object.keys(boardState.tasks).length + 1}`;
//   const todaysDate = new Date();
//   setBoardState({
//     ...boardState,
//     tasks: {
//       ...boardState.tasks,
//       [newTaskNumber]: {
//         id: newTaskNumber,
//         title: newTaskFormData.title,
//         message: newTaskFormData.message,
//         dueDate: moment(newTaskFormData.dueDate).format("ll"),
//         isDeleted: false,
//         dateCreated: moment(todaysDate).format("ll"),
//         comments: [],
//         file: file
//       }
//     },
//     columns: { ...boardState.columns, [column.id]: { ...boardState.columns[[column.id]], taskIds: [...boardState.columns[[column.id]].taskIds, newTaskNumber] } }
//   });
// };

// export default addNewTaskToBoard;
