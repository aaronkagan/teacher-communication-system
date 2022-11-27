import { Dialog } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import capitalize from "../functions/capitalize";

const roles = ["admin", "teacher", "student"];

const EditUserDialog = ({ user, forceRefresh, setForceRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmitChanges = (event) => {
    event.preventDefault();
    setIsDisabled(true);
    fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setIsDisabled(false);
        setIsOpen(false);
        setForceRefresh(!forceRefresh);
        alert(data.message);
      })
      .catch((err) => {
        console.log(err);
        setIsDisabled(false);
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <>
      <StyledDialog open={isOpen}>
        {console.log(formData)}
        <Form onSubmit={handleSubmitChanges}>
          <h2>Edit User Details</h2>
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" id="firstName" defaultValue={user.firstName} onChange={handleChange} disabled={isDisabled} />
          <Label htmlFor="lastName">Last Name</Label>
          <Input type="text" id="lastName" defaultValue={user.lastName} onChange={handleChange} disabled={isDisabled} />
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" defaultValue={user.email} onChange={handleChange} disabled={isDisabled} />
          <Label htmlFor="email">Password</Label>
          <Input type="password" id="password" defaultValue="" onChange={handleChange} disabled={isDisabled} />
          <Label htmlFor="role">Role</Label>
          <Select name="role" id="role" defaultValue={user.role} onChange={handleChange} disabled={isDisabled}>
            {roles.map((role) => {
              return <option key={role}>{role}</option>;
            })}
          </Select>
          <ButtonsWrapper>
            <SubmitButton type="submit" disabled={isDisabled}>
              Submit
            </SubmitButton>
            <CancelButton type="button" onClick={() => setIsOpen(false)} disabled={isDisabled}>
              Cancel
            </CancelButton>
          </ButtonsWrapper>
        </Form>
      </StyledDialog>
      <EditUserButton onClick={() => setIsOpen(true)} disabled={isDisabled}>
        Edit
      </EditUserButton>
    </>
  );
};

const StyledDialog = styled(Dialog)`
  font-family: sans-serif;
  * {
    padding: 0 35px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  padding-left: 0;
  margin: 10px 0;
`;

const Input = styled.input`
  padding: 3px 0 3px 2px;
  &:disabled {
    background: lightgray;
  }
`;

const Select = styled.select`
  padding: 3px 0;
  &:disabled {
    background: lightgray;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 25px 0;
`;

const SubmitButton = styled.button`
  background: #0000ffab;
  border: 0;
  padding: 5px 20px;
  color: white;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    background: lightgray;
  }
`;

const CancelButton = styled(SubmitButton)`
  background: #ff0000d0;
`;
const EditUserButton = styled.button`
  background: blue;
  border: 0;
  color: white;
  padding: 5px 10px;
  border-radius: 2px;
  margin: 10px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
`;

export default EditUserDialog;
