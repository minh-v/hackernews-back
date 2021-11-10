import { Button, Form, Input, Card } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

const Side = ({ handleSearch }) => {
  let history = useHistory()
  const handleSubmit = (values) => {
    const { search } = values
    history.push(`/search?q=${search}`)
  }

  return (
    <div className="side-container">
      <div className="side-search-div">
        <Form onFinish={handleSubmit} className="side-search-bar">
          <Form.Item
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
      <div className="side-card">
        <Card bordered={false}>
          <Link to="/submit">
            <Button type="primary">Submit a link</Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default Side
