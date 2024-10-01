import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../features/users/usersSlice";
import {
  AvatarStyled,
  ButtonClickContainerStyled,
  ButtonClickStyled,
  PollContainerStyled,
  TitleStyled,
} from "./PollPage.styled";
import { Card, Col, Row } from "antd";
import { useParams } from "react-router-dom";
import { questionsActions } from "../../features/questions/questionsSlice";
import { EMPTY_STRING } from "../../constants/common";
import { getUser } from "../../helpers/user";
import Loading from "../../components/Loading/Loading";

const PollPage = () => {
  const dispatch = useDispatch();
  const { questionId } = useParams();

  const { loading, questionById } = useSelector((state) => state.questions);
  const user = getUser();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (questionId) {
      const payload = {
        questionId: questionId,
      };
      dispatch(
        questionsActions.handleGetQuestionById({
          data: payload,
        })
      );
    }
  }, [dispatch, questionId]);

  useEffect(() => {
    dispatch(usersActions.handleGetListUsers());
  }, [dispatch]);

  const saveQuestionByAnswer = (type) => {
    const payload = {
      authedUser: user?.id,
      questionId: questionById?.id,
      answer: type,
    };
    if (user?.id && questionById?.id) {
      dispatch(
        questionsActions.handleSaveQuestionByAnswer({
          data: payload,
        })
      );
    }
  };

  return (
    <PollContainerStyled>
      <Loading isLoading={loading} />
      <TitleStyled>Poll by {questionById?.author}</TitleStyled>
      {questionById && users[questionById.author] ? (
        <AvatarStyled
          src={users[questionById?.author ?? ""].avatarURL ?? undefined}
          alt={questionById?.author || EMPTY_STRING}
        />
      ) : null}
      <TitleStyled>Would You Rather</TitleStyled>
      <Row gutter={8} style={{ width: "80%" }}>
        <Col span={12}>
          <Card style={{ textAlign: "center" }}>
            {questionById?.optionOne?.text || EMPTY_STRING}
            <ButtonClickContainerStyled>
              <ButtonClickStyled
                onClick={() => saveQuestionByAnswer("optionOne")}
                type="primary"
                block
              >
                Click
              </ButtonClickStyled>
            </ButtonClickContainerStyled>
          </Card>
        </Col>

        <Col span={12}>
          <Card style={{ textAlign: "center" }}>
            {questionById?.optionTwo?.text || EMPTY_STRING}
            <ButtonClickContainerStyled>
              <ButtonClickStyled
                onClick={() => saveQuestionByAnswer("optionTwo")}
                type="primary"
                block
              >
                Click
              </ButtonClickStyled>
            </ButtonClickContainerStyled>
          </Card>
        </Col>
      </Row>
    </PollContainerStyled>
  );
};

export default PollPage;
