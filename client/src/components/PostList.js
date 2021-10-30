import { timeDifferenceForDate } from "../utils/timeDifference"
import { List, Button } from "antd"
import { UpOutlined, DownOutlined } from "@ant-design/icons"
import { useUser } from "../lib/user"
import { useHistory } from "react-router-dom"
import Post from "./Post"

//given posts json, display them all with antd list
const PostList = ({ posts }) => {
  // const user = useUser()
  // const history = useHistory()

  // //if was downvote, change to upvote
  // const upvote = async (item) => {
  //   if (!user) {
  //     history.push("/signup")
  //     return
  //   }
  //   const res = await fetch("http://localhost:3001/upvote", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ post_id: item.id }), // Send the variables
  //   })

  //   if (res.status === 500) {
  //     console.log("remove upvote")
  //   }
  // }

  // //if was upvote, change to downvote
  // const downvote = async (item) => {
  //   if (!user) {
  //     history.push("/signup")
  //     return
  //   }
  //   const res = await fetch("http://localhost:3001/downvote", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ post_id: item.id }), // Send the variables
  //   })

  //   if (res.status === 500) {
  //     console.log("remove downvote")
  //   }
  // }

  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item) => (
        // <List.Item>
        //   <div className="vote">
        //     <Button htmlType="submit" icon={<UpOutlined />} onClick={() => upvote(item)} />
        //     <Button htmlType="submit" icon={<DownOutlined />} onClick={() => downvote(item)} />
        //   </div>
        //   <span>{item.votes.length}</span>
        //   <List.Item.Meta
        //     title={
        //       <a href={`//${item.url}`}>
        //         {item.title} ({item.url})
        //       </a>
        //     }
        //     description={`by ${item.user.username} ${timeDifferenceForDate(item.createdAt)}`}
        //   />
        // </List.Item>
        <Post post={item} />
      )}
    />
  )
}

export default PostList
