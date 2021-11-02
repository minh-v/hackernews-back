import { timeDifferenceForDate } from "../utils/timeDifference"
import { List, Button } from "antd"
import { UpOutlined, DownOutlined } from "@ant-design/icons"
import { useUser } from "../lib/user"
import { useHistory } from "react-router-dom"
import Post from "./Post"

//given posts json, display them all with antd list
const PostList = ({ posts }) => {
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
