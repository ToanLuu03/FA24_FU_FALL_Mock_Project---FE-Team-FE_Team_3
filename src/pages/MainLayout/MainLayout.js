import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Typography, Button, Menu } from 'antd';
import { GroupIcon, CapIcon, ClockIcon, BookIcon, QuestionIcon, TrainerManagementIcon } from '../../components/CustomIcons';
import { RxAvatar } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
import './MainLayout.css';

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  const selectMenuItem = (key) => {
    setSelectedKey(key);
  };

  const wrapIcon = (icon) => React.cloneElement(icon, { style: { width: 24, height: 24, marginRight: '15px' } });

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        className="styled-sider"
        trigger={null}
        collapsible
        collapsedWidth={0}
        width={240}
        collapsed={collapsed}
      >
        <div className="logo-container">
          <img
            className="logo"
            src="https://fams-test.fa.edu.vn/assets/images/logo/logo.svg"
            alt="Logo"
          />
        </div>
        <Menu
          className="styled-menu"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: '1',
              icon: wrapIcon(<GroupIcon />),
              label: <a href='#1'>Trainer Confirmation</a>,
            },
            {
              key: '2',
              icon: wrapIcon(<CapIcon />),
              label: <a href='#1'>Trainee Management</a>,
            },
            {
              key: '3',
              icon: wrapIcon(<TrainerManagementIcon />),
              label: <a href="/trainer/trainer_management">Trainer Management</a>,
            },
            {
              key: '4',
              icon: wrapIcon(<ClockIcon />),
              label: <a href='#1'>Log Work</a>,
            },
            {
              key: '5',
              icon: wrapIcon(<BookIcon />),
              label: <a href='#1'>Content Management</a>,
            },
            {
              key: '6',
              icon: wrapIcon(<QuestionIcon />),
              label: <a href='#1'>FAQs</a>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="styled-header">
          <Button
            className="collapse-button"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className="header-right">
            <Typography.Text>Welcome to TrangMNQ</Typography.Text>
            <Button shape="circle" className="avatar-button">
              <RxAvatar className="styled-avatar" />
            </Button>
            <Button shape="circle" className="avatar-button">
              <IoIosNotifications className="styled-notification" />
            </Button>
          </div>
        </Header>
        <Content className="styled-content">
          <Outlet context={{ selectMenuItem }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
