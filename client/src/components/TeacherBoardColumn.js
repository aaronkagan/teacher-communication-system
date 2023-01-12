import AddTaskModal from '../modals/AddTaskModal';
import { useState } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import capitalize from '../functions/capitalize';
import TeacherBoardTask from './TeacherBoardTask';

const TeacherBoardColumn = ({ columnName, boardState, setBoardState, forceRefreshTeacherBoard, setForceRefreshTeacherBoard }) => {
  // Getting an array of task objects that are associated to the taskIds array for each column (ie getting an array of task objects for that column). These task object will be passed down to the column component to render the tasks for the columns.
  // To get the task objects I'm iterating over the taskIds array for this column and returning the task objects with that id to get all the task object for the column
  const columnTasks = boardState.columns[columnName].taskIds.map(
    (taskId) =>
      // Grabbing the full task object in the board state
      boardState.tasks[taskId]
  );

  const column = boardState.columns[columnName];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Wrapper>
      {/* {console.log(column)} */}
      <h4 onClick={() => setIsModalOpen(true)}>{capitalize(columnName)}</h4>
      {/* Most of this below is the boilerplate from the react-beautiful-dnd documentation except for the mapping of the individual tasks */}
      <DroppableContainer>
        <Droppable droppableId={columnName}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {columnTasks.length > 0 &&
                columnTasks[0] !== undefined &&
                columnTasks.map((task, index) => (
                  <TeacherBoardTask
                    key={task.id}
                    task={task}
                    index={index}
                    boardState={boardState}
                    forceRefreshTeacherBoard={forceRefreshTeacherBoard}
                    setForceRefreshTeacherBoard={setForceRefreshTeacherBoard}
                  />
                ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </DroppableContainer>
      {/* <AddNoteButton onClick={() => setIsModalOpen(true)}>Add Task +</AddNoteButton> */}
      <AddTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        boardState={boardState}
        setBoardState={setBoardState}
        column={column}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 12vw;
  text-align: center;
  color: white;
  h4 {
    padding: 10px 0;
    border-bottom: 1px solid #c3c3c3;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    font-size: 25px;
    color: #bababa;
    &:hover {
      cursor: pointer;
    }
  }

  border-right: 1px solid #c3c3c3;
  &:first-child {
    border-left: 1px solid #c3c3c3;
    border-radius: 5px 0 0px 5px;
  }
  &:last-child {
    border-radius: 0 5px 5px 0;
  }
  border-top: 1px solid #c3c3c3;
  border-bottom: 1px solid #c3c3c3;
`;

const DroppableContainer = styled.div`
  min-height: 67vh;
  height: 100%;
  border-radius: 5px;
`;

const TaskList = styled.div`
  background-color: ${(props) => (props.isDraggingOver ? '#ffe9ec' : 'transparent')};
  height: 90%;
  width: 95%;
  padding-top: 10px;
  margin-top: 2px;
  margin-left: 2.5%;
`;

export default TeacherBoardColumn;
