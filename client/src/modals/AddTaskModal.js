import { useState } from 'react';
import styled from 'styled-components';
import { Dialog } from '@mui/material';
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
// Formatted for use in the date input to define the min date
const today = moment().format('YYYY-MM-DD');

// import addNewTaskToBoard from "../functions/addNewTaskToBoard";

// Modal used by the teacher board to add a new task
const AddTaskModal = ({ isModalOpen, setIsModalOpen, boardState, setBoardState, column }) => {
  // New task form
  const emptyFormState = {
    title: '',
    message: '',
    dueDate: '',
    comments: [],
    file: { fileName: null, fileString: null }
  };
  // Setting initial form data with form state template above
  const [formData, setFormData] = useState({ ...emptyFormState });
  // Function to update the form data with the user input
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    // Preventing page refresh on submit
    event.preventDefault();
    // In the future i would look into the built in crypto library crypto.randomUUID() to replace UUIDV4
    const uniqueTaskId = uuidv4();
    const todaysDate = moment().format('ll');

    // Enriching the form data
    const enrichedFormData = { ...formData };
    enrichedFormData.id = uniqueTaskId;
    enrichedFormData.created = todaysDate;

    // TODO : currently the color bar on the card is random but in the future the user will be able to select a color"
    enrichedFormData.color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // Setting the due date if the user (teacher) adds a due date (optional)
    if (formData.dueDate !== '') enrichedFormData.dueDate = moment(formData.dueDate).format('ll');

    // Adding the file object to the task only if there is a file uploaded
    if (fileName && fileString) {
      enrichedFormData.file.fileName = fileName;
      enrichedFormData.file.fileString = fileString;
    }

    // Adding a new task
    // 1. Add the enriched task to the task list
    boardState.tasks[uniqueTaskId] = { ...enrichedFormData };

    // 2. Add the task id to the tasks array for that day ( for the library to work you need both the task in the task list and the taskId for that task to be added to the task array for that day of the week)
    boardState.columns[column.id].taskIds.push(uniqueTaskId);

    // Updating the DB with the new board state with the new task added (the DB is updated every time a new task is added)
    fetch('/api/tasks', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(boardState)
    })
      .then((res) => res.json())
      .then((data) => {
        // Alert error and reload the page if there is an error in adding the new task to the DB. That way if the task doesn't get added to the DB the page will reload and the board will fetch the information from the DB so the board will be displaying the most accurate DB information and the local board state and he DB will stay in sync
        if (data.status === 400) {
          window.alert(data.error);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));

    setIsModalOpen(false);
  };

  // For file upload to the task
  const [fileString, setFileString] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleAddFile = (event) => {
    event.preventDefault();
    // console.log(event.target.files[0]);
    // Transforming the file into a base64 string

    // Grabbing the file from file input array (when you upload a file using the input type="file" tbe file gets stored in event.target.files array and here we are getting the first file since we are uploading only one file)
    const file = event.target.files[0];

    // Setting the fileName state with the name of the file that was uploaded
    setFileName(file.name);

    // Creating an instance of the FileReader() object. The file reader object is used to read the contents of a file that was selected via drag&drop or file input
    const reader = new FileReader();

    // It sets the onloadend event handler for the reader object. This event is triggered when the file reading operation is completed
    reader.onloadend = () => {
      // console.log("RESULT", reader.result);

      // setting the file string state with the result of the reader reading the file. This result will be the base64 string that represents the file.
      setFileString(reader.result);
    };

    // It starts the process of reading the file's contents by calling the readAsDataURL method on the reader object and passing the file object as an argument. This causes the reader object to start reading the file's contents, and when it is finished, the onloadend event is triggered and the file's contents are passed to the setFileString function.
    reader.readAsDataURL(file);
  };

  return (
    <Dialog
      // Removing the default border radius from the modal
      PaperProps={{
        style: {
          borderRadius: '0'
        }
      }}
      open={isModalOpen}
    >
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <h2>Add New Task For {column.title}</h2>
          <input
            type="text"
            id="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="4"
            placeholder="Message"
            onChange={handleChange}
            required
          />
          <label htmlFor="due">Due:</label>
          {/* Setting min due date to today and beyond for the due date input */}
          <input
            type="date"
            id="dueDate"
            min={today}
            onChange={handleChange}
          />
          <input
            type="file"
            id="file"
            onChange={handleAddFile}
          />
          <ButtonsContainer>
            <SubmitButton type="submit">Submit</SubmitButton>
            <CancelButton
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </CancelButton>
          </ButtonsContainer>
        </Form>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 10px 30px 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  background: var(--success-color);
  border: 0;
  color: white;
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const CancelButton = styled(SubmitButton)`
  background: var(--cancel-color);
`;

export default AddTaskModal;
