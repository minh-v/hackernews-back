import { timeDifferenceForDate } from "../utils/timeDifference"
import { List, Button } from "antd"
import { UpOutlined } from "@ant-design/icons"
import { useUser } from "../lib/user"
import { useHistory } from "react-router-dom"

//given posts json, display them all with antd list
const PostList = ({ posts }) => {
  const user = useUser()
  const history = useHistory()

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

  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item) => (
        <List.Item>
          <Button htmlType="submit" icon={<UpOutlined />} onClick={() => upvote(item)} />
          <span>{item.votes.length}</span>
          <List.Item.Meta
            title={
              <a href={`//${item.url}`}>
                {item.title} ({item.url})
              </a>
            }
            description={`by ${item.user.username} ${timeDifferenceForDate(item.createdAt)}`}
          />
        </List.Item>
      )}
    />
  )
}

export default PostList
