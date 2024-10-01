import { Table } from "antd";
import styled from "styled-components";

export const LeaderBoardContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 0;
`;

export const TableContainerStyled = styled(Table)`
  width: 80%;
`;

export const UserContainerStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AvatarImgStyled = styled.img`
  width: 40px;
  height: 40px;
`;

export const NameContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 2px;
`;

export const NameStyled = styled.p`
  color: black;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
`;

export const NameIdStyled = styled.p`
  color: gray;
  margin: 0;
  font-size: 14px;
  margin-top: 0px;
`;
