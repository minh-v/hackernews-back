import React from "react"
import { Button, Form, Input } from "antd"
import { PageHeader } from "antd"

const SubmitForm = ({ handleSubmit }) => {
  const handleFormSubmit = (values) => {
    const { title, url } = values
    handleSubmit(title, url)
  }

  return (
    <div>
      <PageHeader title="Submit link" className="form-header" />
      <Form onFinish={handleFormSubmit}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Title field must not be empty",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="URL"
          name="url"
          // add url validation rule
          rules={[
            {
              required: true,
              message: "Url field must not be empty",
            },
            // { type: "url", warningOnly: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="site-form-submit-button">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default SubmitForm
