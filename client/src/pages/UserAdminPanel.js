import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import UserDetailsRow from "../components/UserDetailsRow";
import AddUser from "../modals/AddUser";

const UserAdminPanel = () => {
  const [userAccounts, setUserAccounts] = useState();
  const [forceRefresh, setForceRefresh] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUserAccounts(data.data))
      .catch((err) => console.log(err));
  }, [forceRefresh]);

  return (
    <>
      {userAccounts ? (
        <Wrapper>
          <Table>
            <Thead>
              <Title>User Admin</Title>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>

            <Tbody>
              {userAccounts
                ? userAccounts.map((user) => {
                    return <UserDetailsRow key={user.userId} user={user} forceRefresh={forceRefresh} setForceRefresh={setForceRefresh} />;
                  })
                : null}
            </Tbody>
          </Table>
          <AddUser forceRefresh={forceRefresh} setForceRefresh={setForceRefresh} />
        </Wrapper>
      ) : (
        <h3>Loading</h3>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3vh;
  background: #2d00f74f;
  min-height: 100vh;
  * {
    font-family: "Courier New", Courier, monospace;
  }
`;

const Table = styled.table`
  border: 1px solid lightgray;
  padding: 10px;
  width: 80vw;
  text-align: justify;
  margin-top: 30px;
  background: #ffffffb7;
  border-radius: 10px;
  overflow-y: scroll;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 30px;
`;

const Thead = styled.thead``;

const Th = styled.th`
  padding: 10px;
  font-size: 25px;
`;

const Tbody = styled.tbody``;
const Tr = styled.tr``;

export default UserAdminPanel;
