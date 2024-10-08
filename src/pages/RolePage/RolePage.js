import React, { useState } from 'react';
import { Form, Button, Select, Input, Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { setRole } from '../../features/role/roleSlice'; 
import { useNavigate } from 'react-router-dom'; 
import './RolePage.css'; 
import logo from '../../assets/FSA-logo.png';
import { PATH_NAME } from '../../constants/pathName'; 
import { login } from '../../api/Login/Login'
const { Option } = Select;

const RolePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 

    const onFinish = async (values) => {
        setLoading(true);
        setErrorMessage(''); 

        try {
            await login(values.username, values.password);
            dispatch(setRole(values.role));
            console.log("Selected role:", values.role);

            if (values.role === 'admin') {
                navigate(PATH_NAME.ADMIN);
            } else {
                navigate(PATH_NAME.TRAINER);
            }
        }
        catch (error) {
            setErrorMessage('Username or Password is wrong');

        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="sign-in-container">
            <img src={logo} alt="FPT Software Academy" className="logo" />
            <h2 className="title">Sign in</h2>
            {errorMessage && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: '20px' }} />} {/* Hiển thị thông báo lỗi nếu có */}

            <Form onFinish={onFinish} className="sign-in-form">
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
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
                    <Button type="primary" htmlType="submit" className="submit-button" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RolePage;
