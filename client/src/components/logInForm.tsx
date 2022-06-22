import React, { useState } from "react";
import "antd/dist/antd.min.css";
import style from "../styles/formStyle.module.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import superagent from "superagent";
import { Link, useNavigate } from "react-router-dom";

interface RegForm {
  email: string;
  password: string;
}

export function LoginForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const checkUser = async (user: RegForm) => {
    try {
      const post = await superagent.post("/login").send(user);
      console.log(post);
      const response = post.body;
      localStorage.setItem("token", response.accessToken);
      navigate("/main");
    } catch (err) {
      form.resetFields();
      const errorToJson = JSON.stringify(err);
      const errorToObj = JSON.parse(errorToJson);
      const errMessage = JSON.parse(errorToObj.response.text);
      setError(errMessage.message);
    }
  };

  return (
    <div className={style.formContainer}>
      {error ? (
        <b style={{ textAlign: "center", color: "red", marginBottom: "10px" }}>
          {error}
        </b>
      ) : null}
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
        onFinish={(form: RegForm) => {
          checkUser(form);
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email",
            },
            {
              type: "email",
            },
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
              message: "Please input your Password!",
            },
            {
              min: 6,
            },
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
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "auto", marginLeft: "auto" }}
          >
            Log In
          </Button>
          <Link to="/register">
            <span className={style.regLink}>Create account</span>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
