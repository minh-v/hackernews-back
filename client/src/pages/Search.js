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

  const pieces = props.location.search.split("&")
  const search = pieces[0].split("=")[1]
  console.log(search)
  const { loading, data } = useSubscription(SEARCH_POSTS, {
    variables: { search: search, user_issuer: user ? user?.issuer : "" },
  })

  const handleSubmit = (values) => {
    const { search } = values

    history.push(`/search?q=${search}`)
  }
  if (loading) return <div>loading..</div>
  return (
    <div>
      <Form onFinish={handleSubmit} className="search-form">
        <Form.Item
          // label="Search"
          name="search"
          rules={[
            {
              required: true,
              message: "Please no empty",
            },
          ]}
          initialValue={search}
        >
          <Input placeholder="search" value="forceds" />
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
