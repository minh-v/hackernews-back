import { timeDifferenceForDate } from "../utils/timeDifference"
import { List, Button } from "antd"
import { UpCircleTwoTone, DownCircleTwoTone } from "@ant-design/icons"
import { useUser } from "../lib/user"
import { useHistory, Link } from "react-router-dom"

const Post = ({ post }) => {
  const user = useUser()
  const history = useHistory()

  const totalVotes = post.votes?.aggregate.sum.value || 0

  const upvote = async (item) => {
    if (!user) {
      alert("You must be signed in to vote!")
      history.push("/signup")
      return
    }
    const res = await fetch("http://localhost:3001/vote", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: item.id, value: 1 }), // Send the variables
    })

    if (res.status === 500) {
      console.log("remove upvote")
    }
  }

  //if was upvote, change to downvote
  //if was downvote, remove downvote
  const downvote = async (item) => {
    if (!user) {
      alert("You must be signed in to vote!")
      history.push("/signup")
      return
    }
    const res = await fetch("http://localhost:3001/vote", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: item.id, value: -1 }), // Send the variables
    })

    if (res.status === 500) {
      console.log("remove downvote")
    }
  }

  let userVote = 0
  if (post.userVotes) {
    userVote = post?.userVotes[0]?.value
  }
  //3 button cases: if user upvoted, if user downvoted, else no vote
  return (
    <div>
      <List.Item>
        <div className="vote">
          {userVote === 1 ? (
            <div className="vote">
              <Button
                type="link"
                htmlType="submit"
                icon={<UpCircleTwoTone twoToneColor="#52c41a" />}
                onClick={() => upvote(post)}
              />
              <Button type="link" htmlType="submit" icon={<DownCircleTwoTone />} onClick={() => downvote(post)} />
            </div>
          ) : userVote === -1 ? (
            <div className="vote">
              <Button type="link" htmlType="submit" icon={<UpCircleTwoTone />} onClick={() => upvote(post)} />
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
              <Button type="link" htmlType="submit" icon={<DownCircleTwoTone />} onClick={() => downvote(post)} />
            </div>
          )}
          {/* <Button htmlType="submit" icon={<UpCircleTwoTone />} onClick={() => upvote(post)} />
          <Button htmlType="submit" icon={<DownCircleTwoTone />} onClick={() => downvote(post)} /> */}
        </div>
        <span>{totalVotes}</span>
        <List.Item.Meta
          title={
            <a href={`//${post.url}`}>
              {post.title} ({post.url})
            </a>
          }
          description={
            <p>
              by {post.user.username} {timeDifferenceForDate(post.createdAt)} |{" "}
              <Link to={`/post?id=${post.id}`}>{post.comments_aggregate.aggregate.count} comments</Link>
            </p>
          }
        />
      </List.Item>
    </div>
  )
}

export default Post
