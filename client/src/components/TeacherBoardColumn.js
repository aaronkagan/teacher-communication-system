import capitalize from "../functions/capitalize";

const TeacherBoardColumn = ({ columnName, columnTasks }) => {
  return <h1>{capitalize(columnName)}</h1>;
};

export default TeacherBoardColumn;
