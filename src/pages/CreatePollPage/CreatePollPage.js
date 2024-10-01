import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../features/users/usersSlice";
import { Button, Form, Input, notification } from "antd";
import { questionsActions } from "../../features/questions/questionsSlice";
import { EMPTY_STRING } from "../../constants/common";
import {
  CreatePollContainerStyled,
  FormStyled,
  SubTitleStyled,
  TitleStyled,
} from "./CreatePollPage.styled";
import { getUser } from "../../helpers/user";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../constants/pathName";

const CreatePollPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.questions);
  const user = getUser();

  const openNotification = () => {
    notification.open({
      message: "Success!",
      description: "Create new poll successfully",
    });
  };

  useEffect(() => {
    dispatch(usersActions.handleGetListUsers());
  }, [dispatch]);

  const onFinish = (values) => {
    const payload = {
      author: user?.name || EMPTY_STRING,
      firstOption: values.firstOption,
      secondOption: values.secondOption,
    };
    dispatch(
      questionsActions.handleSaveNewQuestion({
        data: payload,
        onSuccess: () => {
          form.resetFields();
          openNotification();
          navigate(PATH_NAME.HOME);
        },
      })
    );
  };

  return (
    <CreatePollContainerStyled>
      <Loading isLoading={loading} />
      <TitleStyled>Would You Rather</TitleStyled>
      <SubTitleStyled>Create Your Own Poll</SubTitleStyled>
      <FormStyled
        form={form}
        name="create_poll_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="First Option"
          required
          name="firstOption"
          rules={[{ required: true, message: "Please input first option" }]}
        >
          <Input placeholder="Option One" />
        </Form.Item>
        <Form.Item
          label="Second Option"
          required
          name="secondOption"
          rules={[{ required: true, message: "Please input second option" }]}
        >
          <Input placeholder="Option Two" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </FormStyled>
    </CreatePollContainerStyled>
  );
};

export default CreatePollPage;
