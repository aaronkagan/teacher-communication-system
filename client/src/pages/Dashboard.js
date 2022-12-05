import styled from "styled-components";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import DashboardCard from "../components/dashboard-cards/DashboardCard";
import DashboardData from "../data/DashboardCardData";
import getUserRole from "../functions/getUserRole";
const background = require("../style/assets/images/dashboard-background-50.png");

const DashBoard = () => {
  const { userState } = useContext(UserContext);

  return (
    <Wrapper>
      <Content>
        <h1>
          Welcome {userState.firstName} {userState.lastName}
        </h1>
        <h3>Role: {userState.role}</h3>
      </Content>
      <Cards>
        {DashboardData.map((card) => {
          if (card.rolesCanAccess.includes(getUserRole())) return <DashboardCard key={card.id} image={card.image} text={card.text} linkTo={card.linkTo} />;
        })}
      </Cards>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  text-align: center;
  padding-left: 2vw;
  padding-top: 10vh;
  display: flex;
  justify-content: center;
  gap: 90px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 5vh;
  background: #ffffff;
  height: max-content;
  padding: 20px;
  border-radius: 15px;
  h1 {
    font-size: 50px;
    font-family: "Courier New", Courier, monospace;
  }
  h3 {
    font-size: 30px;
    font-family: "Courier New", Courier, monospace;
  }
`;

const Cards = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
  height: 7vh;
`;

export default DashBoard;
