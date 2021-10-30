import { Link } from "react-router-dom"
import { Button, Form, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"

const Side = () => {
  const handleSearch = (values) => {
    const { search } = values
    console.log("entered boys", search)
  }
  return (
    <div className="side">
      <Form onFinish={handleSearch} className="side">
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
