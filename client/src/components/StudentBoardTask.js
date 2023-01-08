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
      {/* Opening the modal to see details and and add new comments to the student task*/}
      <div onClick={() => setIsModalOpen(true)}>
        <StickyNote
          task={task}
          stickyColor={getRandomStickyColor()}
          stickyDirection={getRandomStickyDirection()}
        />
        <StudentBoardTaskModal
          stickyColor={getRandomStickyColor()}
          task={task}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          boardState={boardState}
          setBoardState={setBoardState}
        />
      </div>
    </>
  );
};

export default StudentBoardTask;
