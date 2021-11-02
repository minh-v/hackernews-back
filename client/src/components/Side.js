import { Button, Form, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"

const Side = ({ handleSearch }) => {
  let history = useHistory()
  const handleSubmit = (values) => {
    const { search } = values
    history.push(`/search?q=${search}`)
  }

  return (
    <div className="side">
      <Form onFinish={handleSubmit} className="side">
        <Form.Item
          // label="Search"
          name="search"
          rules={[
            {
              required: true,
              message: "Please no empty",
            },
          ]}
        >
          <Input placeholder="search" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" shape="circle" icon={<SearchOutlined />} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Side
