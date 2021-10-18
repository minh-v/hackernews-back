import React from "react"
import { Button, Form, Input } from "antd"
import { PageHeader } from "antd"

const SignupForm = ({ handleSignup, disabled }) => {
  const handleSubmit = (values) => {
    const { email, username } = values
    handleSignup(email, username)
  }

  return (
    <div>
      <PageHeader title="Sign Up" />
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
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* email
        <input value={email} onChange={(event) => setEmail(event.target.value)} />
        username
        <input value={username} onChange={(event) => setUsername(event.target.value)} /> */}
        <Button type="primary" disabled={disabled} htmlType="submit">
          sign up
        </Button>
      </Form>
    </div>
  )
}

export default SignupForm
