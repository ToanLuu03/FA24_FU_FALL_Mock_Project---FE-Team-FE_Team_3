import { Button } from "antd";
import styled from "styled-components";

export const PollContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 0;
`;

export const TitleStyled = styled.h1``;

export const ButtonClickContainerStyled = styled.div`
  margin: 10px -24px -24px -24px;
  border-top: 1px solid #f0f0f0;
`;

export const ButtonClickStyled = styled(Button)`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: #00b3b3;

  &:hover {
    background-color: #00b3b3 !important;
  }
`;

export const AvatarStyled = styled.img`
  width: 300px;
  height: 300px;
`;
