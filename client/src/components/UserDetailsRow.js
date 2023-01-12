import styled from 'styled-components';
import capitalize from '../functions/capitalize';
import EditUserDialog from '../modals/EditUserDialog';
import DeleteUser from '../modals/DeleteUser';

// This is the row component for the admin user panel

// forceRefresh, setForceRefresh is used to refresh the parent component (the admin panel) when a user is edited or deleted (: TODO : probably could have done it in a less brute force way)
const UserDetailsRow = ({ user, forceRefresh, setForceRefresh }) => {
  return (
    <>
      <Tr>
        <Td>{user.firstName}</Td>
        <Td>{user.lastName}</Td>
        <Td>{user.email}</Td>
        <Td>{capitalize(user.role)}</Td>
      </Tr>
      <tr>
        <td>
          {/* Imported Modal for editing user (see modal component for full modal) */}
          <EditUserDialog
            // User Data
            user={user}
            // used to refresh the parent component
            forceRefresh={forceRefresh}
            setForceRefresh={setForceRefresh}
          />
          {/* Imported Modal for deleting user (see modal component for full modal)*/}
          <DeleteUser
            // User data
            user={user}
            // used to refresh the parent component
            forceRefresh={forceRefresh}
            setForceRefresh={setForceRefresh}
          />
        </td>
      </tr>
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
