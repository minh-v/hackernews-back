import { useState } from "react"
import { Button, Comment, Input, Form } from "antd"
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from "@ant-design/icons"
import { useUser } from "../lib/user"
import { useHistory } from "react-router"
import { timeDifferenceForDate } from "../utils/timeDifference"
import { Link } from "react-router-dom"

const { TextArea } = Input

const CommentComponent = ({ comment, children, comments }) => {
  const user = useUser()
  const history = useHistory()
  const [open, setOpen] = useState(false) //reply box is open or not
  const [confirm, setConfirm] = useState(false) //for delete
  const [likes, setLikes] = useState(comment.likes.aggregate.count)
  const [dislikes, setDislikes] = useState(comment.dislikes.aggregate.count)
  const [action, setAction] = useState(comment.userLike[0]?.value || null)
  const [disabled, setDisabled] = useState(false) //to prevent double clicking
  //user replies to comment
  //submit comment

  const handleSubmit = async (values) => {
    if (!user) {
      alert("You must be signed in to comment!")
      history.push("/login")
    }
    const { reply } = values
    await fetch("http://localhost:3001/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ post_id: comment.post_id, comment: reply, parent_id: comment.id }),
    })
    setOpen(!open)
    history.go(0)
  }

  const like = async () => {
    if (!user) {
      alert("You must be signed in to vote!")
      history.push("/signup")
      return
    }
    setDisabled(true)
    if (action === 1) {
      setLikes(likes - 1)
      setAction(null)
      await fetch("http://localhost:3001/comment-vote", {
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
      await fetch("http://localhost:3001/comment-vote", {
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
      await fetch("http://localhost:3001/comment-vote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: comment.id, value: 1 }),
      })
    }
    setDisabled(false)
  }

  const dislike = async () => {
    if (!user) {
      alert("You must be signed in to vote!")
      history.push("/signup")
      return
    }
    setDisabled(true)
    if (action === -1) {
      setDislikes(dislikes - 1)
      setAction(null)
      await fetch("http://localhost:3001/comment-vote", {
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
      await fetch("http://localhost:3001/comment-vote", {
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
      await fetch("http://localhost:3001/comment-vote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: comment.id, value: -1 }),
      })
    }
    setDisabled(false)
  }

  //delete comment
  const handleDelete = async (comment) => {
    if (user) {
      await fetch("http://localhost:3001/comment", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: comment.id }),
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
    <span onClick={() => setConfirm(!confirm)}>
      {comment.user.username === user?.username ? (
        confirm ? (
          <span>
            are you sure?{" "}
            <span className="deleteConfirmation" onClick={() => handleDelete(comment)}>
              yes
            </span>
            /no
          </span>
        ) : (
          "delete"
        )
      ) : null}
    </span>,
  ]

  //display comment, and it's children nested if exists, else display just the comments
  return (
    <div key={comment.id} className="comment-div" disabled={disabled}>
      {/* <div className="spinner-on" style={{ display: "off" }}></div> */}
      {children?.length > 0 ? (
        <Comment
          actions={actions}
          author={<Link to={`/user?id=${comment.user.username}`}>{comment.user.username}</Link>}
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
          author={<Link to={`/user?id=${comment.user.username}`}>{comment.user.username}</Link>}
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
    </div>
  )
}

export default CommentComponent
