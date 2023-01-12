import styled from 'styled-components';
import { useState } from 'react';
import { Dialog } from '@mui/material';
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

// Component used for adding a new user in the admin panel

const initialFormData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  role: ''
};

const AddUser = ({ forceRefresh, setForceRefresh }) => {
  const [formData, setFormData] = useState({ ...initialFormData });
  // used for opening and closing the modal
  const [isOpen, setIsOpen] = useState(false);

  // Handling the cancel button on the modal
  const handleCancel = () => {
    setFormData(initialFormData);
    setIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Getting the form for the next step
    const form = document.getElementById('form');
    // Grabbing all the from elements. This is a quick way to add the disabled attribute to all the form elements using the forEach loop on the line below.
    // I'm using it to disable the form inputs while the form is being submitted. Below in the fetch result i'm using a similar technique to enable them. Much more clean than disabling and enabling each form element separately
    const formElements = Array.from(form.elements);

    formElements.forEach((elem) => {
      elem.setAttribute('disabled', '');
    });

    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        // forceRefresh, setForceRefresh is used to refresh the parent component (the admin panel) when a user is added (: TODO : probably could have done it in a less brute force way)
        setForceRefresh(!forceRefresh);
        alert(data.message);
        setIsOpen(false);
        // Removing the disabled attribute from all the from elements at once
        formElements.forEach((elem) => {
          elem.removeAttribute('disabled');
        });
        // Resetting the form data on success
        setFormData(initialFormData);
      })
      .catch((err) => {
        // Removing the disabled attribute from all the from elements at once
        formElements.forEach((elem) => {
          elem.removeAttribute('disabled');
        });
        alert(err);
      });
  };

  const handleChange = (event) => {
    // Setting the form state on input change
    // TODO : I know there has to be a more efficient way than to set the date and userId on each change but i tried a few other things and they didn't work. Adding the userId in the initialFormState doesn't work because it uses the same value for multiple users created without refreshing the page so i have to find another way. Also i might deprecate the UUIDV4 library usage in favor of crypto.randomUUID()
    setFormData({ ...formData, [event.target.id]: event.target.value, userId: uuidv4(), dateCreated: moment().format('ll') });
  };

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: '0'
          }
        }}
        open={isOpen}
      >
        <Form
          id="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2>Add User</h2>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Initial Password</label>
          <input
            type="password"
            id="password"
            defaultValue=""
            onChange={handleChange}
            required
          />
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option>Select a role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Reader</option>
            <option value="reader">Admin</option>
          </select>
          <ButtonsContainer>
            <SubmitButton
              type="submit"
              id="submit"
            >
              Submit
            </SubmitButton>
            <CancelButton
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </CancelButton>
          </ButtonsContainer>
        </Form>
      </Dialog>
      <AddUserButton onClick={() => setIsOpen(true)}>Add New User</AddUserButton>
    </>
  );
};

const AddUserButton = styled.button`
  border: 2px solid lightgray;
  padding: 5px 20px;
  width: max-content;
  border-radius: 5px;
  margin-top: 20px;
  font-weight: bold;
  background: white;
  margin-bottom: 5vh;
`;

const Form = styled.form`
  * {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;

  input,
  select {
    width: 200px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  width: 100px;
  margin-top: 8px;
  color: white;
  background: var(--success-color);
  border: 0;
  padding: 3px 0;
  border-radius: 2px;
`;

const CancelButton = styled(SubmitButton)`
  background: var(--cancel-color);
`;

export default AddUser;
