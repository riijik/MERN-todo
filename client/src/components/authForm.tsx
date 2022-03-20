import React, { useState, useEffect } from "react";
import 'antd/dist/antd.min.css';
import style from '../styles/formStyle.module.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import superagent from "superagent"

interface RegForm {
    email: string,
    password: string
}

export function LoginForm() {
    const [successReg, setSuccessReg] = useState("");
    const [form] = Form.useForm();

    useEffect(() => { setTimeout(() => { setSuccessReg("") }, 3000) }, [successReg])

    const createUser = async (user: RegForm) => {
        try {
            const post = await superagent.post("/register").send(user);
            const response = post.body
            setSuccessReg(response)
            form.resetFields()
        }
        catch (error: any) { console.log(error.message) }
    };

    return (
        <div className={style.formContainer}>
            {successReg && <b className={style.successRegMessage}>Пользователь успешно зарегестрирован</b>}
            <Form
                form={form}
                name="normal_login"
                style={{ marginRight: "auto", marginLeft: "auto" }}
                wrapperCol={{
                    span: 30,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={(form: RegForm) => { createUser(form) }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input email',
                        },
                        {
                            type: "email"
                        }
                    ]}
                    hasFeedback
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        {
                            min: 6
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{ marginRight: "auto", marginLeft: "auto" }}>
                        Register
                    </Button>
                    {/* Or <a href="">register now!</a> */}
                </Form.Item>
            </Form>
        </div>
    );
};