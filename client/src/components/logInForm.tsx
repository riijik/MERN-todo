import React, { useState, useEffect, useContext } from "react";
import 'antd/dist/antd.min.css';
import style from '../styles/formStyle.module.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import superagent from "superagent"
import { Link } from "react-router-dom"
import { MyContext } from "../App";



interface RegForm {
    email: string,
    password: string
}

export function LoginForm() {
    const [form] = Form.useForm();
    const [token, setToken] = useState("")

    const credentialState = useContext(MyContext)
    console.log(credentialState)

    const checkUser = async (user: RegForm) => {
        const post = await superagent.post("/login").send(user);
        const response = post.body;
        setToken(response.accessToken)
        localStorage.setItem("token", response.accessToken)
    };
    useEffect(() => {
        getUserTodo()
    }, [token])

    const getUserTodo = async () => {
        const data = await fetch("/todo", { method: "GET", headers: { 'x-access-token': token } })
        console.log(data.json)
    }


    return (
        <div className={style.formContainer}>
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
                onFinish={(form: RegForm) => { checkUser(form) }}
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
                        Log In
                    </Button>
                    <Link to="/register"><span className={style.regLink}>Create account</span></Link>
                </Form.Item>
            </Form>
        </div>
    );
};