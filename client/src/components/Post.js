import { useState } from "react"
import { timeDifferenceForDate } from "../utils/timeDifference"
import { List, Button } from "antd"
import { UpCircleTwoTone, DownCircleTwoTone, LinkOutlined } from "@ant-design/icons"
import { useUser } from "../lib/user"
import { useHistory, Link } from "react-router-dom"
import { REACT_APP_API_URL } from "../lib/constants"

const Post = ({ post, selected, setSelected, index }) => {
  const user = useUser()
  const history = useHistory()

  const totalVotes = post.votes?.aggregate?.sum.value || 0

  const [confirm, setConfirm] = useState(false)
  const [deleteText, setDeleteText] = useState("delete")

  const upvote = async (item) => {
    if (!user) {
      alert("You must be signed in to vote!")
      history.push("/signup")
      return
    }
    await fetch(`${REACT_APP_API_URL}/vote`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: item.id, value: 1, poster: post.user.issuer }), // Send the variables
    })
  }

  //if was upvote, change to downvote
  //if was downvote, remove downvote
  const downvote = async (item) => {
    if (!user) {
      alert("You must be signed in to vote!")
      //open signup modal eventually
      history.push("/signup")
      return
    }
    await fetch(`${REACT_APP_API_URL}/vote`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: item.id, value: -1, poster: post.user.issuer }), // Send the variables
    })
  }

  const handleDelete = async (item) => {
    if (user) {
      await fetch(`${REACT_APP_API_URL}/post`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: item.id }), // Send the variables
      })

      setDeleteText("deleted")
    }
  }

  let userVote = 0
  if (post.userVotes) {
    userVote = post?.userVotes[0]?.value
  }
  //3 button cases: if user upvoted, if user downvoted, else no vote
  return (
    <div
      className={selected === true ? "post-selected" : "post"}
      onClick={() => {
        if (typeof setSelected === "function") setSelected(post.id)
      }}
    >
      <List.Item>
        <div className="post-index">{index}.</div>
        <div>
          {userVote === 1 ? (
            <div className="vote">
              <Button
                type="link"
                htmlType="submit"
                icon={<UpCircleTwoTone twoToneColor="#52c41a" />}
                onClick={() => upvote(post)}
              />
              <span className="totalVotesUp">{totalVotes}</span>
              <Button type="link" htmlType="submit" icon={<DownCircleTwoTone />} onClick={() => downvote(post)} />
            </div>
          ) : userVote === -1 ? (
            <div className="vote">
              <Button type="link" htmlType="submit" icon={<UpCircleTwoTone />} onClick={() => upvote(post)} />
              <span className="totalVotesDown">{totalVotes}</span>
              <Button
                type="link"
                htmlType="submit"
                icon={<DownCircleTwoTone twoToneColor="#eb2f96" />}
                onClick={() => downvote(post)}
              />
            </div>
          ) : (
            <div className="vote">
              <Button type="link" htmlType="submit" icon={<UpCircleTwoTone />} onClick={() => upvote(post)} />
              <span className="totalVotes">{totalVotes}</span>
              <Button type="link" htmlType="submit" icon={<DownCircleTwoTone />} onClick={() => downvote(post)} />
            </div>
          )}
        </div>
        <div className="thumbnail">
          <List.Item>
            <LinkOutlined />
          </List.Item>
        </div>
        <List.Item.Meta
          title={
            <a href={`//${post.url}`}>
              {post.title} ({post.url})
            </a>
          }
          description={
            <p>
              by <Link to={`/user?id=${post.user.username}`}>{post.user.username}</Link> {timeDifferenceForDate(post.createdAt)} |{" "}
              <Link to={`/post?id=${post.id}`}>{post.comments_aggregate.aggregate.count} comments</Link>{" "}
              {post.user.username === user?.username ? (
                <span onClick={() => setConfirm(!confirm)}>
                  |{" "}
                  {confirm ? (
                    <span>
                      are you sure?{" "}
                      <span className="deleteConfirmation" onClick={() => handleDelete(post)}>
                        yes
                      </span>
                      /no
                    </span>
                  ) : (
                    deleteText
                  )}
                </span>
              ) : null}
            </p>
          }
        />
      </List.Item>
    </div>
  )
}

export default Post
