import React from "react"
import { Button, Form, Input, PageHeader } from "antd"
import { MailOutlined } from "@ant-design/icons"

const SignupForm = ({ handleLogin, disabled }) => {
  const handleSubmit = (values) => {
    const { email } = values
    handleLogin(email)
  }

  return (
    <div>
      <PageHeader title="Log in" className="form-header" />
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-email-icon" />} placeholder="Email" />
        </Form.Item>
        <Button type="primary" disabled={disabled} htmlType="submit" className="site-form-submit-button">
          Log in
        </Button>
      </Form>
    </div>
  )
}

export default SignupForm
