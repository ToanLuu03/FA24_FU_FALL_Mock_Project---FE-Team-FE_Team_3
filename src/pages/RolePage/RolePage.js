import React from 'react';
import { Form, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { setRole } from '../../features/role/roleSlice'; // Import the setRole action
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './RolePage.css'; // External CSS for styling
import logo from '../../assets/FSA-logo.png';
import { PATH_NAME } from '../../constants/pathName'; // Ensure PATH_NAME includes the HomePage and AdminPage path

const { Option } = Select;

const RolePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        // Dispatch the selected role to Redux
        dispatch(setRole(values.role));
        console.log("Selected role:", values.role); // Log selected role

        // Redirect based on the selected role
        if (values.role === 'admin') {
            navigate(PATH_NAME.ADMIN); // Navigate to the admin page
        } else {
            navigate(PATH_NAME.TRAINER); // Navigate to the home page for trainers
        }
    };

    return (
        <div className="sign-in-container">
            <img src={logo} alt="FPT Software Academy" className="logo" />
            <h2 className="title">Sign in</h2>
            <Form onFinish={onFinish} className="sign-in-form">
                <Form.Item
                    name="role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                >
                    <Select placeholder="Select your role">
                        <Option value="admin">Admin</Option>
                        <Option value="trainer">Trainer</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="submit-button">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RolePage;
