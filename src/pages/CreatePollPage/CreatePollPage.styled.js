import { Form } from "antd";
import styled from "styled-components";

export const CreatePollContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 0;

  .ant-form-vertical .ant-form-item-row {
    align-items: center;
  }
`;

export const TitleStyled = styled.p`
  color: black;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  margin: 10px 0;
`;

export const SubTitleStyled = styled.p`
  color: gray;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

export const FormStyled = styled(Form)`
  width: 80%;

  :last-child {
    display: flex;
    justify-content: center;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
`;
