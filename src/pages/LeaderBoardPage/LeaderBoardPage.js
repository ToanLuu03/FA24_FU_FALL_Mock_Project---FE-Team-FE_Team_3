import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AvatarImgStyled,
  LeaderBoardContainerStyled,
  NameContainerStyled,
  NameIdStyled,
  NameStyled,
  TableContainerStyled,
  UserContainerStyled,
} from "./LeaderBoardPage.styled";
import { usersActions } from "../../features/users/usersSlice";
import Loading from "../../components/Loading/Loading";

const LeaderBoardPage = () => {
  const dispatch = useDispatch();

  const { loading, users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersActions.handleGetListUsers());
  }, [dispatch]);

  const listUser = useMemo(() => {
    return Object.values(users);
  }, [users]);

  const columns = [
    {
      key: "name",
      title: "User",
      dataIndex: "name",
      render: (text, record) => {
        return (
          <UserContainerStyled>
            <AvatarImgStyled
              src={record?.avatarURL ?? undefined}
              alt={record?.id}
            />
            <NameContainerStyled>
              <NameStyled>{text}</NameStyled>
              <NameIdStyled>{record?.id}</NameIdStyled>
            </NameContainerStyled>
          </UserContainerStyled>
        );
      },
    },
    {
      key: "answers",
      title: "Answered",
      dataIndex: "answers",
      render: (value) => Object.keys(value)?.length,
    },
    {
      key: "questions",
      title: "Created",
      dataIndex: "questions",
      render: (value) => value?.length,
    },
  ];

  return (
    <LeaderBoardContainerStyled>
      <Loading isLoading={loading} />
      <TableContainerStyled
        pagination={false}
        columns={columns}
        dataSource={listUser}
        bordered
      />
    </LeaderBoardContainerStyled>
  );
};

export default LeaderBoardPage;
