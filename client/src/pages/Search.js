import { Button, Form, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"
import PostList from "../components/PostList"
import { useSubscription } from "@apollo/client"
import { SEARCH_POSTS } from "../lib/queries"
import { useUser } from "../lib/user"

const Search = (props) => {
  const user = useUser()
  let history = useHistory()

  const { loading, data } = useSubscription(SEARCH_POSTS, {
    variables: { search: props.location.search.slice(3), user_issuer: user ? user?.issuer : "" },
  })

  const handleSubmit = (values) => {
    const { search } = values

    history.push(`/search?q=${search}`)
  }
  if (loading) return <div>loading..</div>
  return (
    <div>
      <Form onFinish={handleSubmit} className="search">
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
      <div>
        <PostList posts={data?.posts} />
      </div>
    </div>
  )
}

export default Search
