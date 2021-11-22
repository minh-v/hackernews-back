import { useSubscription } from "@apollo/client"
import { GET_POST, GET_POST_COMMENTS_SORTED_TOP } from "../lib/queries"
import Post from "../components/Post"
import { useUser } from "../lib/user"
import { useHistory } from "react-router"
import { Input, Button, Form, Menu, Dropdown } from "antd"
import CommentList from "../components/CommentList"
import { useState } from "react"
import { DownOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { config } from "../config"

const { TextArea } = Input
//get post given post id

const PostPage = (props) => {
  const user = useUser()
  const history = useHistory()

  const pieces = props.location.search.split("&")
  const id = pieces[0].split("=")[1]
  let sort = "new"

  if (pieces.length > 1) {
    sort = pieces[1].split("=")[1]
  }

  const [form] = Form.useForm()

  const QUERY = sort === "new" ? GET_POST : sort === "top" ? GET_POST_COMMENTS_SORTED_TOP : GET_POST

  const { data, loading } = useSubscription(QUERY, {
    variables: { id: parseInt(id), user_issuer: user ? user?.issuer : "" },
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
    await fetch(`${config.api}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ post_id: data.posts_by_pk.id, comment: comment }),
    })
    form.resetFields()
  }

  const menu = (
    <Menu>
      <Link to={`${props.location.pathname}${pieces[0]}`}>
        <Menu.Item key="new" onClick={() => setCommentDisplay("new")}>
          new
        </Menu.Item>
      </Link>
      <Link to={`${props.location.pathname}${pieces[0]}&sort=top`}>
        <Menu.Item key="top" onClick={() => setCommentDisplay("top")}>
          top
        </Menu.Item>
      </Link>
    </Menu>
  )

  if (loading) return <div>loading...</div>
  return (
    <div>
      <Post post={data.posts_by_pk} />
      <span className="comment-sort">
        sorted by{" "}
        <Dropdown overlay={menu} trigger={["click"]}>
          <span className="comment-select">
            {commentDisplay} <DownOutlined />
          </span>
        </Dropdown>
      </span>
      <Form onFinish={handleSubmit} form={form}>
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
            .sort((a, b) => {
              return b.likes.aggregate.count - a.likes.aggregate.count
            })} //comments with no parents
        />
      )}
    </div>
  )
}

export default PostPage
