import { timeDifferenceForDate } from "../utils/timeDifference"
import { List, Button } from "antd"
import { UpOutlined, DownOutlined, UpCircleTwoTone, DownCircleTwoTone } from "@ant-design/icons"
import { useUser } from "../lib/user"
import { useHistory } from "react-router-dom"

const Post = ({ post }) => {
  const user = useUser()
  const history = useHistory()

  let voteTotal = 0
  post.votes.forEach((vote) => (voteTotal += vote.value))
  //if post.votes.vote.user.id === user.id, highlight vote button
  //registers which ones

  //if triple unique key constraint, set to 0

  //if was downvote, change to upvote
  //if was upvote, remove upvote
  const upvote = async (item) => {
    if (!user) {
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
  //const userVote = post?.userVotes[0]?.value
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
