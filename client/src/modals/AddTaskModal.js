import { useState } from "react";
import styled from "styled-components";
import { Dialog } from "@mui/material";
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

// import addNewTaskToBoard from "../functions/addNewTaskToBoard";

const AddTaskModal = ({ isModalOpen, setIsModalOpen, boardState, setBoardState, column }) => {
  const emptyFormState = {
    title: "",
    message: "",
    dueDate: ""
    // comments: [],
    // file: ""
  };

  const [formData, setFormData] = useState({ ...emptyFormState });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const uniqueTaskId = uuidv4();
    const uniqueTaskId = "task-6";

    const todaysDate = moment().format("ll");

    // Enriching the form data
    const enrichedFormData = { ...formData };
    enrichedFormData.id = uniqueTaskId;
    enrichedFormData.created = todaysDate;
    enrichedFormData.dueDate = moment(formData.dueDate).format("ll");

    // Adding a new task
    // 1. Add the enriched task to the task list
    boardState.tasks[uniqueTaskId] = { ...enrichedFormData };
    // 2. Add the task id to the tasks array for that day
    boardState.columns[column.id].taskIds.push(uniqueTaskId);

    fetch("/api/tasks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(boardState)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          window.alert(data.error);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  // // File upload
  // // we will store the file added to the note in this boardState
  // const [file, setFile] = useState(null);

  // const handleAddFile = (event) => {
  //   event.preventDefault();
  //   // console.log(event.target.files[0]);
  //   // we will transform the file into a base64 string
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     // console.log("RESULT", reader.result);
  //     setFile(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  return (
    <Dialog open={isModalOpen}>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <h2>Add New Task</h2>
          <input type="text" id="title" placeholder="Title" onChange={handleChange} />
          <textarea name="message" id="message" cols="30" rows="4" placeholder="Message" onChange={handleChange} />
          <label htmlFor="due">Due:</label>
          <input type="date" id="dueDate" placeholder="due" onChange={handleChange} />
          {/* <input type="file" id="file" onChange={handleChange} /> */}
          <ButtonsContainer>
            <SubmitButton type="submit">Submit</SubmitButton>
            <CancelButton type="button" onClick={() => setIsModalOpen(false)}>
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
  background: lightblue;
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
  background: lightpink;
`;

export default AddTaskModal;
