import { Button, Form, Input } from "antd"
const { TextArea } = Input

const TextboxForm = ({ handleSubmit }) => {
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="comment"
        rules={[
          {
            required: true,
            message: "Cannot enter empty comment",
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Add comment
      </Button>
    </Form>
  )
}

export default TextboxForm
