import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CardStyled, HomeContainerStyled } from "./HomePage.styled";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../../features/home/homeSlice";
import QuestionItem from "./components/QuestionItem/QuestionItem";
import { getUser } from "../../helpers/user";
import Loading from "../../components/Loading/Loading";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, questions } = useSelector((state) => state.home);
  const user = getUser();

  useEffect(() => {
    dispatch(homeActions.handleGetQuestions());
  }, [dispatch]);

  const handlePressQuestionItem = (questionId) => {
    navigate(`/questions/${questionId}`);
  };

  return (
    <HomeContainerStyled>
      <Loading isLoading={loading} />
      <CardStyled
        title="New Questions"
        style={{
          marginBottom: "20px",
        }}
        styles={{
          title: {
            textAlign: "center",
            fontSize: "36px",
          },
        }}
      >
        <Row gutter={[16, 16]}>
          {Object.values(questions)
            .filter((item) => !user?.questions.includes(item?.id))
            .map((question) => (
              <Col span={8} key={question?.id}>
                <QuestionItem
                  author={question?.author}
                  key={question?.id}
                  onClick={handlePressQuestionItem}
                  {...question}
                />
              </Col>
            ))}
        </Row>
      </CardStyled>
      <CardStyled
        title="Done"
        styles={{
          title: {
            textAlign: "center",
            fontSize: "36px",
          },
        }}
      >
        <Row gutter={[16, 16]}>
          {user?.questions.map((id, index) => (
            <Col span={8} key={index}>
              <QuestionItem
                key={index}
                {...questions[id]}
                onClick={handlePressQuestionItem}
              />
            </Col>
          ))}
        </Row>
      </CardStyled>
    </HomeContainerStyled>
  );
};

export default HomePage;
