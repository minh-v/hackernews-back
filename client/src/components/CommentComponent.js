import { useState } from "react"
import { List, Button, Comment, Input, Form } from "antd"
import { useUser } from "../lib/user"
import { useHistory } from "react-router"
import { timeDifferenceForDate } from "../utils/timeDifference"
const { TextArea } = Input

const CommentComponent = ({ comment }) => {
  const user = useUser()
  const history = useHistory()
  const [open, setOpen] = useState(false)

  //open reply box
  const handleReply = () => {
    setOpen(!open)
  }

  //user replies to comment
  //submit comment
  const handleSubmit = async (values) => {
    console.log("reply values: ", comment)
    if (!user) {
      alert("You must be signed in to comment!")
      history.push("/login")
    }
    const { reply } = values
    const res = await fetch("http://localhost:3001/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ post_id: comment.post_id, comment: reply, parent_id: comment.id }),
    })

    setOpen(!open)
  }
  return (
    <li>
      <Comment
        actions={[
          <span key="comment-reply-to" onClick={handleReply}>
            Reply to
          </span>,
        ]}
        author={comment.user.username}
        content={comment.comment}
        datetime={timeDifferenceForDate(comment.createdAt)}
      />
      {open ? (
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="reply"
            rules={[
              {
                required: true,
                message: "Cannot enter empty reply",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Button htmlType="submit">reply</Button>
        </Form>
      ) : null}
    </li>
  )
}

export default CommentComponent
