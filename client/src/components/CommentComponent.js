import { useState } from "react"
import { Button, Comment, Input, Form } from "antd"
import { useUser } from "../lib/user"
import { useHistory } from "react-router"
import { timeDifferenceForDate } from "../utils/timeDifference"
import CommentList from "./CommentList"
const { TextArea } = Input

const CommentComponent = ({ comment, children, comments }) => {
  const user = useUser()
  const history = useHistory()
  const [open, setOpen] = useState(false)

  //open reply box
  const toggleReply = () => {
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
  console.log("comment")
  console.log(comment)
  //display comment, and it's children nested if exists, else display just the comments
  return (
    <li>
      {children.length > 0 ? (
        <Comment
          actions={[
            <span key="comment-reply-to" onClick={toggleReply}>
              Reply to
            </span>,
          ]}
          author={comment.user.username}
          content={comment.comment}
          datetime={timeDifferenceForDate(comment.createdAt)}
        >
          {children.map((child) => (
            <CommentComponent comment={child} comments={comments} children={comments.filter((c) => c.parent_id === child.id)} />
          ))}
        </Comment>
      ) : (
        <Comment
          actions={[
            <span key="comment-reply-to" onClick={toggleReply}>
              Reply to
            </span>,
          ]}
          author={comment.user.username}
          content={comment.comment}
          datetime={timeDifferenceForDate(comment.createdAt)}
        />
      )}
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
