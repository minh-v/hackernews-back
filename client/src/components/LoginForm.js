import React from "react"
import { Button, Form, Input } from "antd"
import { PageHeader } from "antd"

const SignupForm = ({ handleLogin, disabled }) => {
  const handleSubmit = (values) => {
    const { email } = values
    handleLogin(email)
  }

  return (
    <div>
      <PageHeader title="Log in" />
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" disabled={disabled} htmlType="submit">
          Log in
        </Button>
      </Form>
    </div>
  )
}

export default SignupForm
