import React from "react"
import { Button, Form, Input, PageHeader } from "antd"
import { MailOutlined, UserOutlined, SendOutlined } from "@ant-design/icons"

const SignupForm = ({ handleSignup, disabled }) => {
  const handleSubmit = (values) => {
    const { email, username } = values
    handleSignup(email, username)
  }

  return (
    <div>
      <PageHeader title="Sign Up" className="form-header" />
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-email-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="username"
          disabled={disabled}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-user-icon" />} placeholder="Username" />
        </Form.Item>
        <Button type="primary" disabled={disabled} htmlType="submit" icon={<SendOutlined />} className="site-form-submit-button">
          Sign up
        </Button>
      </Form>
    </div>
  )
}

export default SignupForm
