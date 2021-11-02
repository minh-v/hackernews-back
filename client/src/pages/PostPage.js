import { useSubscription } from "@apollo/client"
import { GET_POST } from "../lib/queries"
import Post from "../components/Post"
import { useUser } from "../lib/user"
import { useHistory } from "react-router"
import { Input, Button, Form } from "antd"
import CommentList from "../components/CommentList"
const { TextArea } = Input
//get post given post id

const PostPage = (props) => {
  const user = useUser()
  const history = useHistory()
  const { data, loading } = useSubscription(GET_POST, {
    variables: { id: parseInt(props.location.search.slice(4)), user_issuer: user ? user?.issuer : "" },
  })

  //get comments

  //submit comment
  const handleSubmit = async (values) => {
    if (!user) {
      alert("You must be signed in to comment!")
      history.push("/login")
    }
    const { comment } = values
    const res = await fetch("http://localhost:3001/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ post_id: data.posts_by_pk.id, comment: comment }),
    })
  }

  if (loading) return <div>loading...</div>
  return (
    <div>
      <Post post={data.posts_by_pk} />
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
      <CommentList comments={data.posts_by_pk.comments} />
    </div>
  )
}

export default PostPage
