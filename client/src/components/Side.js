import { Button, Form, Input, Card } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useUser } from "../lib/user"

const Side = ({ handleSearch }) => {
  const user = useUser()
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
          <div
            onClick={() => {
              if (!user) {
                alert("You must be signed in to submit a link!")
                history.push("/login")
              }
            }}
          >
            <Link to="/submit">
              <Button type="primary" className="side-card-submit">
                Submit a link
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Side
