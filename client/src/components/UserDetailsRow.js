import styled from "styled-components";
import capitalize from "../functions/capitalize";
import EditUserDialog from "../modals/EditUserDialog";
import DeleteUser from "../modals/DeleteUser";

const UserDetailsRow = ({ user, forceRefresh, setForceRefresh }) => {
  return (
    <>
      <Tr>
        <Td>{user.firstName}</Td>
        <Td>{user.lastName}</Td>
        <Td>{user.email}</Td>
        <Td>{capitalize(user.role)}</Td>
      </Tr>
      <EditUserDialog user={user} forceRefresh={forceRefresh} setForceRefresh={setForceRefresh} />
      <DeleteUser user={user} forceRefresh={forceRefresh} setForceRefresh={setForceRefresh} />
    </>
  );
};

const Tr = styled.tr`
  border-bottom: 1px solid lightgray;
  background-color: #f4fbfd;
`;
const Td = styled.td`
  padding: 10px;
  font-size: 19px;
`;

export default UserDetailsRow;
