import { useSubscription } from "@apollo/client"
import { GET_POST } from "../lib/queries"
import Post from "../components/Post"
import { useUser } from "../lib/user"
import { useHistory } from "react-router"
import { Input, Button, Form, Menu, Dropdown } from "antd"
import CommentList from "../components/CommentList"
import { useState } from "react"
import { DownOutlined } from "@ant-design/icons"

const { TextArea } = Input
//get post given post id

const PostPage = (props) => {
  const user = useUser()
  const history = useHistory()

  const { data, loading } = useSubscription(GET_POST, {
    variables: { id: parseInt(props.location.search.slice(4)), user_issuer: user ? user?.issuer : "" },
  })

  //get comments

  //comment sort
  const [commentDisplay, setCommentDisplay] = useState("new")

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

  const menu = (
    <Menu>
      <Menu.Item key="new" onClick={() => setCommentDisplay("new")}>
        new
      </Menu.Item>
      <Menu.Item key="top" onClick={() => setCommentDisplay("top")}>
        top
      </Menu.Item>
    </Menu>
  )

  if (loading) return <div>loading...</div>
  console.log(data.posts_by_pk.comments.filter((c) => c.parent_id === null))
  return (
    <div>
      <Post post={data.posts_by_pk} />
      <span className="comment-sort">
        sorted by{" "}
        <Dropdown overlay={menu} trigger={["click"]}>
          {/* <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}> */}
          <span className="comment-select">
            {commentDisplay} <DownOutlined />
          </span>
          {/* </a> */}
        </Dropdown>
        ,
      </span>
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
      {commentDisplay === "new" ? (
        <CommentList
          comments={data.posts_by_pk.comments} //all comments
          baseComments={data.posts_by_pk.comments.filter((c) => c.parent_id === null)} //comments with no parents
        />
      ) : (
        <CommentList
          comments={data.posts_by_pk.comments} //all comments
          baseComments={data.posts_by_pk.comments
            .filter((c) => c.parent_id === null)
            .filter((c) => c.parent_id === null)
            .sort((a, b) => {
              return b.likes.aggregate.count - a.likes.aggregate.count
            })} //comments with no parents
        />
      )}
    </div>
  )
}

// .filter((c) => c.parent_id === null)
//   .sort((a, b) => {
//     return a.likes.aggregate.count - b.likes.aggregate.count
//   })

export default PostPage
