import { useState } from 'react';
import StickyNote from './StickyNote';
import getRandomStickyColor from '../functions/getRandomStickyColor';
import getRandomStickyDirection from '../functions/getRandomStickyDirection';
import StudentBoardTaskModal from '../modals/StudentBoardTaskModal';

const StudentBoardTask = ({ task, boardState, setBoardState }) => {
  // This is used to open and close the modal that students use to see details add comments to the student board task (modal from MUI)
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {/* Opening the modal by clicking on the note to see details and and add new comments to the student task*/}
      <div onClick={() => setIsModalOpen(true)}>
        {/* The note itself */}
        <StickyNote
          task={task}
          stickyColor={getRandomStickyColor()}
          stickyDirection={getRandomStickyDirection()}
        />
        {/* The details and add comments modal */}
        <StudentBoardTaskModal
          stickyColor={getRandomStickyColor()}
          task={task}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          // Used to set the board state with the new comments
          boardState={boardState}
          setBoardState={setBoardState}
        />
      </div>
    </>
  );
};

export default StudentBoardTask;
