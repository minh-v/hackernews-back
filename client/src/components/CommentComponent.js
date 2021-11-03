import { useState } from "react"
import { Button, Comment, Input, Form } from "antd"
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from "@ant-design/icons"
import { useUser } from "../lib/user"
import { useHistory } from "react-router"
import { timeDifferenceForDate } from "../utils/timeDifference"

const { TextArea } = Input

const CommentComponent = ({ comment, children, comments }) => {
  const user = useUser()
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState(null)

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

  const like = async () => {
    if (action === "liked") {
      setLikes(0)
      setAction(null)
    } else {
      setLikes(1)
      setDislikes(0)
      setAction("liked")

      const res = await fetch("http://localhost:3001/comment-vote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: comment.id, value: 1 }),
      })
    }
  }

  const dislike = async () => {
    if (action === "disliked") {
      setDislikes(0)
      setAction(null)
    } else {
      setLikes(0)
      setDislikes(1)
      setAction("disliked")
    }
  }

  //ant comment actions
  const actions = [
    <span onClick={like}>
      {action === "liked" ? <LikeFilled /> : <LikeOutlined />}
      <span className="comment-action">{likes}</span>
    </span>,
    <span onClick={dislike}>
      {action === "disliked" ? <DislikeFilled /> : <DislikeOutlined />}
      <span className="comment-action">{dislikes}</span>
    </span>,
    <span key="comment-reply-to" onClick={toggleReply}>
      Reply to
    </span>,
  ]

  //display comment, and it's children nested if exists, else display just the comments
  return (
    <li>
      {children.length > 0 ? (
        <Comment
          actions={actions}
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
          actions={actions}
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
