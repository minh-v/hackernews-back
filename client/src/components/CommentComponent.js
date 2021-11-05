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
  const [open, setOpen] = useState(false) //reply box is open or not
  const [likes, setLikes] = useState(comment.likes.aggregate.count)
  const [dislikes, setDislikes] = useState(comment.dislikes.aggregate.count)
  const [action, setAction] = useState(comment.userLike[0]?.value || null)

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
    if (!user) {
      alert("You must be signed in to vote!")
      history.push("/signup")
      return
    }
    if (action === 1) {
      setLikes(likes - 1)
      setAction(null)
      const res = await fetch("http://localhost:3001/comment-vote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: comment.id, value: 0, id: comment.userLike[0]?.id }),
      })
    } else if (action === -1) {
      setLikes(likes + 1)
      setDislikes(dislikes - 1)
      setAction(1)
      //send request to add vote to db
      const res = await fetch("http://localhost:3001/comment-vote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: comment.id, value: 1 }),
      })
    } else {
      setLikes(likes + 1)
      setAction(1)
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
    if (!user) {
      alert("You must be signed in to vote!")
      history.push("/signup")
      return
    }
    if (action === -1) {
      setDislikes(dislikes - 1)
      setAction(null)
      const res = await fetch("http://localhost:3001/comment-vote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: comment.id, value: 0, id: comment.userLike[0]?.id }),
      })
    } else if (action === 1) {
      setLikes(likes - 1)
      setDislikes(dislikes + 1)
      setAction(-1)
      //send request to add vote to db
      const res = await fetch("http://localhost:3001/comment-vote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: comment.id, value: -1 }),
      })
    } else {
      setDislikes(dislikes + 1)
      setAction(-1)
      const res = await fetch("http://localhost:3001/comment-vote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: comment.id, value: -1 }),
      })
    }
  }

  //ant comment actions
  const actions = [
    <span onClick={like}>
      {action === 1 ? <LikeFilled /> : <LikeOutlined />}
      <span className="comment-action">{likes}</span>
    </span>,
    <span onClick={dislike}>
      {action === -1 ? <DislikeFilled /> : <DislikeOutlined />}
      <span className="comment-action">{dislikes}</span>
    </span>,
    <span key="comment-reply-to" onClick={() => setOpen(!open)}>
      Reply to
    </span>,
  ]

  //display comment, and it's children nested if exists, else display just the comments
  return (
    <li key={comment.id}>
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
