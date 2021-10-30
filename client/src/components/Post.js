import { timeDifferenceForDate } from "../utils/timeDifference"
import { List, Button } from "antd"
import { UpOutlined, DownOutlined } from "@ant-design/icons"
import { useUser } from "../lib/user"
import { useHistory } from "react-router-dom"

const Post = ({ post }) => {
  const user = useUser()
  const history = useHistory()

  let voteTotal = 0
  post.votes.forEach((vote) => (voteTotal += vote.value))

  //if was downvote, change to upvote
  //if was upvote, remove upvote
  const upvote = async (item) => {
    if (!user) {
      history.push("/signup")
      return
    }
    const res = await fetch("http://localhost:3001/upvote", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: item.id }), // Send the variables
    })

    if (res.status === 500) {
      console.log("remove upvote")
    }
  }

  //if was upvote, change to downvote
  //if was downvote, remove downvote
  const downvote = async (item) => {
    if (!user) {
      history.push("/signup")
      return
    }
    const res = await fetch("http://localhost:3001/downvote", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: item.id }), // Send the variables
    })

    if (res.status === 500) {
      console.log("remove downvote")
    }
  }
  //query username here?
  return (
    <div>
      <List.Item>
        <div className="vote">
          <Button htmlType="submit" icon={<UpOutlined />} onClick={() => upvote(post)} />
          <Button htmlType="submit" icon={<DownOutlined />} onClick={() => downvote(post)} />
        </div>
        <span>{voteTotal}</span>
        <List.Item.Meta
          title={
            <a href={`//${post.url}`}>
              {post.title} ({post.url})
            </a>
          }
          description={`by ${post.user.username} ${timeDifferenceForDate(post.createdAt)}`}
        />
      </List.Item>
    </div>
  )
}

export default Post
