import styled from "styled-components";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import DashboardCard from "../components/dashboard-cards/DashboardCard";
import DashboardData from "../data/DashboardCardData";
const DashBoard = () => {
  const { userState } = useContext(UserContext);
  return (
    <Wrapper>
      <Content>
        <h1>Welcome {userState.firstName}</h1>
        <h3>Role: {userState.role}</h3>
      </Content>
      <Cards>
        {Object.values(DashboardData).map((card) => {
          return <DashboardCard key={card.id} image={card.image} text={card.text} linkTo={card.linkTo} />;
        })}
      </Cards>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding-top: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 150px;
`;

const Content = styled.div`
  h1 {
    font-size: 30px;
  }
  h3 {
    font-size: 20px;
  }
`;

const Cards = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
`;

export default DashBoard;
